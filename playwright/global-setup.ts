//playwright/global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

import { AuthenticationService } from '../framework/src';

const authFile = path.resolve('playwright/.auth/user.json');

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export default async function globalSetup(_config: FullConfig) {
  const envName = (process.env.ENVIRONMENT as 'qa' | 'dev') ?? 'qa';

  ensureDir(authFile);

  const forceLogin = process.env.PW_FORCE_LOGIN === '1';
  const headed = process.env.PW_HEADED === '1';

  // reuse auth if it exists, unless forced
  if (!forceLogin && fs.existsSync(authFile)) {
    return;
  }

  // If forcing login, delete old auth
  if (forceLogin && fs.existsSync(authFile)) {
    fs.unlinkSync(authFile);
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
    
    // Authenticate with OTP support
    await authService.authenticateUser({
      environment: envName,
      skipOtp: false // Enable OTP if configured
    });

    // Save authentication state
    await context.storageState({ path: authFile });
    
    console.log(`Global setup completed successfully for environment: ${envName}`);
  } catch (error) {
    console.error('Global setup failed:', error);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}
