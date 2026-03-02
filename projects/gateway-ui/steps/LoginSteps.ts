// projects/gateway-ui/steps/LoginSteps.ts

import { Page } from '@playwright/test';
import { LoginPageLocators } from '@pages/LoginPageLocators';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { Environment } from '@framework/types/Environment';
import { DashboardSteps } from '@steps/DashboardSteps';
import * as path from 'path';
import * as fs from 'fs';

type Credentials = { username: string; password: string };

/**
 * LoginSteps - Complete Login Engine and Setup
 * - Loads environment settings
 * - Resolves BASE_URL
 * - Performs Microsoft login flow (AAD)
 * - Provides complete setup functionality (replaces GatewaySetup)
 */
export class LoginSteps extends BasePage {
  private readonly loginPage: LoginPageLocators;
  private readonly dashboardSteps: DashboardSteps;
  private readonly envSettings: Record<string, string> = {};

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.loginPage = new LoginPageLocators(page, config);
    this.dashboardSteps = new DashboardSteps(page);
  }

  /* -------------------- Environment Management -------------------- */

  /**
   * Load environment settings from .env.<environment>
   */
  private loadEnvironment(environment: Environment = 'qa'): void {
    const envFile = path.join(__dirname, '..', 'environments', `.env.${environment}`);

    if (!fs.existsSync(envFile)) {
      throw new Error(`Environment file not found: .env.${environment}`);
    }

    const content = fs.readFileSync(envFile, 'utf8');

    content.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const [key, ...parts] = trimmed.split('=');
      if (!key || parts.length === 0) return;

      this.envSettings[key.trim()] = parts.join('=').trim();
    });
  }

  /**
   * Ensure env is loaded (lazy loading).
   */
  private ensureEnvLoaded(environment: Environment = 'qa'): void {
    if (Object.keys(this.envSettings).length > 0) return;
    this.loadEnvironment(environment);
  }

  /**
   * Resolve base URL from env file.
   */
  private getBaseUrl(environment: Environment = 'qa'): string {
    this.ensureEnvLoaded(environment);
    return this.envSettings['BASE_URL'] || 'https://qa-fairstonegateway.fairstone.co.uk';
  }

  /**
   * Get credentials from environment or process.env
   * Uses ADVISOR_EMAIL and ADVISOR_PASSWORD only
   */
  private getCredentials(environment: Environment = 'qa'): Credentials {
    this.ensureEnvLoaded(environment);

    const username = process.env.ADVISOR_EMAIL || this.envSettings['ADVISOR_EMAIL'];
    const password = process.env.ADVISOR_PASSWORD || this.envSettings['ADVISOR_PASSWORD'];

    if (!username || !password) {
      throw new Error('ADVISOR_EMAIL and ADVISOR_PASSWORD must be set in environment file or process.env');
    }

    return { username, password };
  }

  /* -------------------- Navigation -------------------- */

  /**
   * Navigate to Gateway application landing page.
   */
  public async navigateToApplication(environment: Environment = 'qa'): Promise<void> {
    const baseUrl = this.getBaseUrl(environment);
    await this.page.goto(baseUrl);
    await this.wait.waitForLoadingToComplete();
  }

  /* -------------------- Login Flow -------------------- */

  /**
   * Start AAD login flow by clicking app login button.
   */
  public async startMicrosoftLogin(): Promise<void> {
    await this.action.clickLocator(this.loginPage.loginButton);
    // URL-based wait is less flaky than waiting for network idle on AAD pages
    await this.page.waitForURL(/login\.microsoftonline\.com/);
    await this.wait.waitForDOMContentLoaded();
  }

  /**
   * Perform a full login.
   * If username/password not provided, uses env credentials.
   */
  public async login(username?: string, password?: string, environment: Environment = 'qa'): Promise<void> {
    await this.startMicrosoftLogin();

    const creds = (!username || !password) ? this.getCredentials(environment) : undefined;
    const loginUsername = username ?? creds!.username;
    const loginPassword = password ?? creds!.password;

    // Username -> Next
    await this.loginPage.usernameInput.fill(loginUsername);
    await this.action.clickLocator(this.loginPage.nextButton);
    await this.wait.waitForDOMContentLoaded();

    // Password -> Sign in
    await this.loginPage.passwordInput.fill(loginPassword);
    await this.action.clickLocator(this.loginPage.signInButton);

    // Let redirect complete
    await this.wait.waitForDOMContentLoaded();
    await this.wait.waitForNetworkIdle();
  }

  /**
   * Convenience: Navigate + login using env credentials.
   */
  public async performValidLogin(environment: Environment = 'qa'): Promise<void> {
    await this.navigateToApplication(environment);
    await this.login(undefined, undefined, environment);
  }

  /* -------------------- Complete Setup (replaces GatewaySetup) -------------------- */

  /**
   * Complete Gateway setup for testing - Navigate, login and verify dashboard
   * This replaces the old GatewaySetup.setupForEnvironment method
   */
  public static async setupForEnvironment(page: Page, environment: Environment = 'qa'): Promise<void> {
    const loginSteps = new LoginSteps(page);
    await loginSteps.navigateToApplication(environment);
    await loginSteps.login(undefined, undefined, environment);
    await loginSteps.verifyDashboard();
  }

  /**
   * Verify dashboard is loaded after login
   */
  public async verifyDashboard(): Promise<void> {
    await this.dashboardSteps.verifyDashboard();
  }

  /* -------------------- Legacy Support -------------------- */

  /**
   * Legacy method for backward compatibility
   * @deprecated Use login() instead
   */
  public async clickLogin(username?: string, password?: string): Promise<void> {
    await this.login(username, password);
  }
}