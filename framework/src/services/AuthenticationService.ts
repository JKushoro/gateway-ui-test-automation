// framework/src/services/AuthenticationService.ts
import { Page, expect } from '@playwright/test';
import { generateOTP } from '../utils/generateOtp';
import { Environment } from '../types/Environment';
import { BasePage } from '../core/BasePage';
import { FrameworkConfig } from '../types';
import { AuthConfig, AuthenticationOptions } from '../types/AuthTypes';
import { getEnvironmentManager } from '../utils/EnvironmentManager';
import { MicrosoftLoginPageLocators } from '../../../projects/gateway-ui/pages/auth/MicrosoftLoginPageLocators';

/**
 * Clean Authentication Service
 * Uses proper page locators, Playwright assertions, and eliminates all duplication
 */
export class AuthenticationService extends BasePage {
  private microsoftLoginPage: MicrosoftLoginPageLocators;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.microsoftLoginPage = new MicrosoftLoginPageLocators(page, config);
  }

  /**
   * Get authentication configuration using EnvironmentManager
   */
  public getAuthConfig(environment: Environment = 'qa'): AuthConfig {
    return getEnvironmentManager().getAuthConfig(environment);
  }

  /**
   * Navigate to application
   */
  public async navigateToApplication(environment: Environment = 'qa'): Promise<void> {
    const authConfig = this.getAuthConfig(environment);
    await this.page.goto(authConfig.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Start Microsoft login flow
   */
  public async startMicrosoftLogin(): Promise<void> {
    const hasDashboard = await this.microsoftLoginPage.dashboardIndicator.isVisible().catch(() => false);
    const hasLogout = await this.microsoftLoginPage.logoutButton.isVisible().catch(() => false);
    
    if (hasDashboard || hasLogout) {
      this.logger.info('User already logged in, skipping login flow');
      return;
    }

    await expect(this.microsoftLoginPage.loginButton).toBeVisible({ timeout: 10000 });
    await this.microsoftLoginPage.loginButton.click();
    await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: 15000 });
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Submit username for Microsoft login
   */
  public async submitUsername(username: string): Promise<void> {
    await expect(this.microsoftLoginPage.usernameInput).toBeVisible({ timeout: 10000 });
    await this.microsoftLoginPage.usernameInput.fill(username);
    await this.microsoftLoginPage.nextButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Submit password for Microsoft login
   */
  public async submitPassword(password: string): Promise<void> {
    await expect(this.microsoftLoginPage.passwordInput).toBeVisible({ timeout: 10000 });
    await this.microsoftLoginPage.passwordInput.fill(password);
    await this.microsoftLoginPage.signInButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Handle OTP if present
   */
  public async handleOtpChallenge(otpSecret: string): Promise<void> {
    try {
      await expect(this.microsoftLoginPage.otpInput).toBeVisible({ timeout: 10000 });
      const otpCode = generateOTP(otpSecret);
      await this.microsoftLoginPage.otpInput.fill(otpCode);
      await this.microsoftLoginPage.signInButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    } catch {
      // No OTP required - continue
    }
  }

  /**
   * Handle stay signed in prompt
   */
  public async handleStaySignedInPrompt(): Promise<void> {
    try {
      await expect(this.microsoftLoginPage.staySignedInPrompt).toBeVisible({ timeout: 10000 });
      await this.microsoftLoginPage.yesButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    } catch {
      // Prompt not present
    }
  }

  /**
   * Complete authentication flow (navigate + login)
   */
  public async authenticateUser(options: AuthenticationOptions = {}): Promise<void> {
    const environment = options.environment || 'qa';
    await this.navigateToApplication(environment);
    await this.performLogin(options);
  }

  /**
   * Login flow (can be used standalone or by authenticateUser)
   */
  public async performLogin(options: AuthenticationOptions = {}): Promise<void> {
    const environment = options.environment || 'qa';
    const authConfig = this.getAuthConfig(environment);
    
    // Check if already logged in
    const hasDashboard = await this.microsoftLoginPage.dashboardIndicator.isVisible().catch(() => false);
    const hasLogout = await this.microsoftLoginPage.logoutButton.isVisible().catch(() => false);
    
    if (hasDashboard || hasLogout) {
      this.logger.info('User already logged in, skipping entire login flow');
      return;
    }
    
    await this.startMicrosoftLogin();
    
    const username = options.customCredentials?.username || authConfig.username;
    const password = options.customCredentials?.password || authConfig.password;
    
    await this.submitUsername(username);
    await this.submitPassword(password);

    if (!options.skipOtp && authConfig.otpSecret) {
      await this.handleOtpChallenge(authConfig.otpSecret);
    }

    await this.handleStaySignedInPrompt();
    
    await this.page.waitForURL('**/dashboard/**', { timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }
}