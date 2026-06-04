//playwright/global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

import { AuthenticationService } from '../framework/src';

const authFile = path.resolve('playwright/.auth/user.json');

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Load environment variables from the .env.qa file and set them in process.env
function loadEnvironmentVariables(environment: 'qa' | 'dev' = 'qa') {
  const envFile = path.join(__dirname, '..', 'projects', 'gateway-ui', 'environments', `.env.${environment}`);
  
  if (!fs.existsSync(envFile)) {
    console.warn(`Environment file not found: .env.${environment} at ${envFile}`);
    return;
  }

  const content = fs.readFileSync(envFile, 'utf8');

  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const [key, ...parts] = trimmed.split('=');
    if (!key || parts.length === 0) return;

    const envKey = key.trim();
    const envValue = parts.join('=').trim();
    
    // Set in process.env if not already set
    if (!process.env[envKey]) {
      process.env[envKey] = envValue;
    }
  });

  console.log(`Environment variables loaded from .env.${environment}`);
}

export default async function globalSetup(_config: FullConfig) {
  const envName = (process.env.ENVIRONMENT as 'qa' | 'dev') ?? 'qa';
  
  // Load environment variables from the .env file
  loadEnvironmentVariables(envName);

  ensureDir(authFile);

  const forceLogin = process.env.PW_FORCE_LOGIN === '1';
  const headed = process.env.PW_HEADED === '1';

  // reuse auth if it exists and contains valid cookies, unless forced
  if (!forceLogin && fs.existsSync(authFile)) {
    try {
      const authData = JSON.parse(fs.readFileSync(authFile, 'utf8'));
      if (authData.cookies && authData.cookies.length > 0) {
        console.log(`Using existing authentication file with ${authData.cookies.length} cookies`);
        return;
      } else {
        console.log('Authentication file exists but has no cookies, performing fresh login');
      }
    } catch (error) {
      console.log('Authentication file is invalid, performing fresh login');
    }
  }

  // If forcing login, delete old auth
  if (forceLogin && fs.existsSync(authFile)) {
    fs.unlinkSync(authFile);
    console.log('Deleted existing authentication file due to force login');
  }

  const browser = await chromium.launch({
    headless: !headed,
    slowMo: headed ? 250 : 0,
    args: headed ? ['--start-maximized'] : [],
  });

  const context = await browser.newContext({
    bypassCSP: true,
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    viewport: null,
  });

  context.setDefaultTimeout(60_000);
  context.setDefaultNavigationTimeout(90_000);

  const page = await context.newPage();

  try {
    const authService = new AuthenticationService(page);

    console.log(`Starting authentication for environment: ${envName}`);
    console.log(`Base URL: ${process.env.BASE_URL}`);
    console.log(`Advisor Email: ${process.env.ADVISOR_EMAIL}`);

    // First check if we're already authenticated by navigating to the application
    await page.goto(process.env.BASE_URL || 'https://qa-fairstonegateway.fairstone.co.uk');
    await page.waitForLoadState('networkidle');

    // Wait a bit to see if we're redirected to dashboard via OAuth
    await page.waitForTimeout(5000);

    const currentUrl = page.url();
    console.log(`Current URL after navigation: ${currentUrl}`);

    if (currentUrl.includes('/dashboard')) {
      console.log('✓ Already authenticated via OAuth flow');
    } else {
      console.log('Not authenticated, attempting manual login');
      try {
        // Try to authenticate using the service
        await authService.authenticateUser({
          environment: envName,
          skipOtp: false // Enable OTP if configured in environment
        });
      } catch (authError) {
        console.log('Authentication service failed, checking if OAuth completed anyway...');
        await page.waitForTimeout(3000);
        const finalUrl = page.url();
        if (!finalUrl.includes('/dashboard')) {
          console.error('Authentication failed and user not on dashboard');
          throw authError;
        }
        console.log('✓ OAuth authentication completed successfully despite service error');
      }
    }

    // Save authentication state
    await context.storageState({ path: authFile });

    // Verify cookies were saved
    const savedState = JSON.parse(require('fs').readFileSync(authFile, 'utf8'));
    console.log(`✓ Authentication state saved with ${savedState.cookies.length} cookies`);
    console.log(`Global setup completed successfully for environment: ${envName}`);
  } catch (error) {
    console.error('Global setup failed:', error);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}
