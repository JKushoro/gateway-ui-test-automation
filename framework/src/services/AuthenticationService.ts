// framework/src/services/AuthenticationService.ts

import { Page, expect } from '@playwright/test';
import { generateOTP } from '../utils/generateOtp';
import { Environment } from '../types/Environment';
import { BasePage } from '../core/BasePage';
import { FrameworkConfig } from '../types';
import { AuthConfig, AuthenticationOptions } from '../types/AuthTypes';

/**
 * Clean Authentication Service
 * Uses proper page locators, Playwright assertions, and eliminates all duplication
 */
export class AuthenticationService extends BasePage {
  private microsoftLoginPage: any;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    const { MicrosoftLoginPageLocators } = require('../../../projects/gateway-ui/pages/MicrosoftLoginPageLocators');
    this.microsoftLoginPage = new MicrosoftLoginPageLocators(page, config);
  }

  /**
   * Get authentication configuration using EnvironmentManager
   */
  public getAuthConfig(environment: Environment = 'qa'): AuthConfig {
    const { getEnvironmentManager } = require('../utils/EnvironmentManager');
    return getEnvironmentManager().getAuthConfig(environment);
  }

  /**
   * Navigate to application
   */
  public async navigateToApplication(environment: Environment = 'qa'): Promise<void> {
    const authConfig = this.getAuthConfig(environment);
    await this.page.goto(authConfig.baseUrl);
    await this.wait.waitForLoadingToComplete();
  }

  /**
   * Start Microsoft login flow
   */
  public async startMicrosoftLogin(): Promise<void> {
    await expect(this.microsoftLoginPage.loginButton).toBeVisible();
    await this.action.clickLocator(this.microsoftLoginPage.loginButton);
    await this.page.waitForURL(/login\.microsoftonline\.com/);
    await this.wait.waitForDOMContentLoaded();
  }

  /**
   * Submit username for Microsoft login
   */
  public async submitUsername(username: string): Promise<void> {
    await expect(this.microsoftLoginPage.usernameInput).toBeVisible();
    await this.microsoftLoginPage.usernameInput.fill(username);
    await this.action.clickLocator(this.microsoftLoginPage.nextButton);
    await this.wait.waitForDOMContentLoaded();
  }

  /**
   * Submit password for Microsoft login
   */
  public async submitPassword(password: string): Promise<void> {
    await expect(this.microsoftLoginPage.passwordInput).toBeVisible();
    await this.microsoftLoginPage.passwordInput.fill(password);
    await this.action.clickLocator(this.microsoftLoginPage.signInButton);
    await this.wait.waitForDOMContentLoaded();
  }

  /**
   * Handle OTP if present
   */
  public async handleOtpChallenge(otpSecret: string): Promise<void> {
    try {
      await expect(this.microsoftLoginPage.otpInput).toBeVisible({ timeout: 2000 });
      const otpCode = generateOTP(otpSecret);
      await this.microsoftLoginPage.otpInput.fill(otpCode);
      await this.action.clickLocator(this.microsoftLoginPage.signInButton);
      await this.wait.waitForDOMContentLoaded();
    } catch {
      // No OTP required - continue
    }
  }

  /**
   * Handle stay signed in prompt
   */
  public async handleStaySignedInPrompt(): Promise<void> {
    try {
      await expect(this.microsoftLoginPage.staySignedInPrompt).toBeVisible({ timeout: 3000 });
      await this.action.clickLocator(this.microsoftLoginPage.noButton);
      await this.wait.waitForDOMContentLoaded();
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
    
    await this.startMicrosoftLogin();
    
    const username = options.customCredentials?.username || authConfig.username;
    const password = options.customCredentials?.password || authConfig.password;
    
    await this.submitUsername(username);
    await this.submitPassword(password);

    if (!options.skipOtp && authConfig.otpSecret) {
      await this.handleOtpChallenge(authConfig.otpSecret);
    }

    await this.handleStaySignedInPrompt();
    await this.wait.waitForNetworkIdle();
  }
}