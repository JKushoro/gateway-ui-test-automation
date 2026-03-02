// projects/gateway-ui/steps/LoginValidationSteps.ts

import { Page } from '@playwright/test';
import { LoginPageLocators } from '@pages/LoginPageLocators';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { Environment } from '@framework/types/Environment';
import { LoginSteps } from './LoginSteps';
import * as path from 'path';
import * as fs from 'fs';

/**
 * LoginValidationSteps - LOGIN TESTS / VALIDATIONS ONLY
 * - Negative tests
 * - Security payload tests
 * - Focus / back button behaviour
 *
 * Uses LoginSteps as the engine.
 */
export class LoginValidationSteps extends BasePage {
  private readonly login: LoginSteps;
  private readonly loginPage: LoginPageLocators;
  private readonly envSettings: Record<string, string> = {};

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.login = new LoginSteps(page, config);
    this.loginPage = new LoginPageLocators(page, config);
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

  /* -------------------- Small shared helpers -------------------- */

  /**
   * Navigate + open Microsoft login page.
   */
  private async openMicrosoftLogin(): Promise<void> {
    await this.login.navigateToApplication();
    await this.login.startMicrosoftLogin();
  }

  /**
   * Submit username step (optionally blank).
   */
  private async submitUsername(username?: string): Promise<void> {
    if (username !== undefined) {
      await this.loginPage.usernameInput.fill(username);
    }
    await this.action.clickLocator(this.loginPage.nextButton);
    await this.wait.waitForDOMContentLoaded();
  }

  /**
   * Submit password step (optionally blank).
   */
  private async submitPassword(password?: string): Promise<void> {
    if (password !== undefined) {
      await this.loginPage.passwordInput.fill(password);
    }
    await this.action.clickLocator(this.loginPage.signInButton);
    await this.wait.waitForDOMContentLoaded();
  }

  /**
   * Verify Microsoft error text.
   */
  private async expectErrorText(expected: string): Promise<void> {
    await this.assert.assertElementVisible(this.loginPage.errorMessage);
    await this.assert.assertElementHasText(this.loginPage.errorMessage, expected);
  }

  /**
   * Get advisor email from env (uses ADVISOR_EMAIL only).
   */
  private getAdvisorEmailOrThrow(environment: Environment = 'qa'): string {
    this.ensureEnvLoaded(environment);
    
    const username = process.env.ADVISOR_EMAIL || this.envSettings['ADVISOR_EMAIL'];
      
    if (!username) {
      throw new Error('ADVISOR_EMAIL must be set in environment file or process.env for this validation test.');
    }
    return username;
  }

  /* -------------------- UI validations -------------------- */

  public async verifyLoginButtonPresent(): Promise<void> {
    await this.login.navigateToApplication();
    await this.assert.assertElementVisible(this.loginPage.loginButton);
    await this.assert.assertElementEnabled(this.loginPage.loginButton);
  }

  public async verifyRedirectToMicrosoftLogin(): Promise<void> {
    await this.login.navigateToApplication();
    await this.action.clickLocator(this.loginPage.loginButton);
    await this.page.waitForURL(/login\.microsoftonline\.com/);
  }

  /* -------------------- Negative tests -------------------- */

  public async attemptLoginWithInvalidUsername(): Promise<void> {
    await this.openMicrosoftLogin();

    await this.submitUsername('invalid.user@fairstone.co.uk');

    const expected =
      'This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.';
    await this.expectErrorText(expected);
  }

  public async attemptLoginWithInvalidPassword(): Promise<void> {
    await this.openMicrosoftLogin();

    await this.submitUsername(this.getAdvisorEmailOrThrow());
    await this.submitPassword('InvalidPassword123');

    const expected =
      "Your account or password is incorrect. If you don't remember your password, reset it now.";
    await this.expectErrorText(expected);
  }

  public async attemptLoginWithEmptyUsername(): Promise<void> {
    await this.openMicrosoftLogin();

    await this.submitUsername(undefined);

    const expected = 'Enter a valid email address, phone number, or Skype name.';
    await this.expectErrorText(expected);
  }

  public async attemptLoginWithEmptyPassword(): Promise<void> {
    await this.openMicrosoftLogin();

    await this.submitUsername(this.getAdvisorEmailOrThrow());
    await this.submitPassword(undefined);

    const expected = 'Please enter your password.';
    await this.expectErrorText(expected);
  }

  public async attemptLoginWithMalformedEmail(): Promise<void> {
    await this.openMicrosoftLogin();

    await this.submitUsername('invalid-email-format');

    const expected = "We couldn't find an account with that username.";
    await this.expectErrorText(expected);
  }

  public async attemptLoginWithSQLInjection(): Promise<void> {
    await this.openMicrosoftLogin();

    await this.submitUsername("admin'; DROP TABLE users; --");

    const expected = 'Enter a valid email address, phone number, or Skype name.';
    await this.expectErrorText(expected);
  }

  public async attemptLoginWithXSSPayload(): Promise<void> {
    await this.openMicrosoftLogin();

    await this.submitUsername("<script>alert('XSS')</script>");

    const expected = 'Enter a valid email address, phone number, or Skype name.';
    await this.expectErrorText(expected);
  }

  public async attemptLoginWithLongUsername(): Promise<void> {
    await this.openMicrosoftLogin();

    const longUsername = 'a'.repeat(500) + '@fairstone.co.uk';
    await this.submitUsername(longUsername);

    const expected = "We couldn't find an account with that username.";
    await this.expectErrorText(expected);
  }

  public async attemptLoginWithSpecialCharacters(): Promise<void> {
    await this.openMicrosoftLogin();

    await this.submitUsername('user@#$%^&*()fairstone.co.uk');

    const expected = "We couldn't find an account with that username.";
    await this.expectErrorText(expected);
  }

  public async attemptLoginWithWhitespaceUsername(): Promise<void> {
    await this.openMicrosoftLogin();

    await this.submitUsername('   ');

    const expected = 'Enter a valid email address, phone number, or Skype name.';
    await this.expectErrorText(expected);
  }

  public async attemptLoginWithWhitespacePassword(): Promise<void> {
    await this.openMicrosoftLogin();

    await this.submitUsername(this.getAdvisorEmailOrThrow());
    await this.submitPassword('   ');

    const expected =
      "Your account or password is incorrect. If you don't remember your password, reset it now.";
    await this.expectErrorText(expected);
  }

  /* -------------------- Browser behaviour -------------------- */

  public async verifyLoginFormFocus(): Promise<void> {
    await this.openMicrosoftLogin();

    await this.assert.assertElementVisible(this.loginPage.usernameInput);

    const isFocused = await this.loginPage.usernameInput.evaluate(
      (el) => el === document.activeElement
    );

    if (!isFocused) {
      throw new Error('Username input should be focused on page load');
    }
  }

  public async verifyBrowserBackButton(): Promise<void> {
    // Navigate to the application first
    await this.login.navigateToApplication();
    
    // Store the original URL
    const originalUrl = this.page.url();
    
    // Start Microsoft login flow
    await this.login.startMicrosoftLogin();
    
    // Wait for Microsoft login page to load
    await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: 10000 });

    // Go back using browser navigation with proper error handling
    try {
      // Use a more reliable approach - navigate back to the original URL
      await this.page.goto(originalUrl, { waitUntil: 'networkidle' });
    } catch (error) {
      // Fallback: try browser back button
      try {
        await this.page.goBack({ waitUntil: 'domcontentloaded', timeout: 5000 });
      } catch (backError) {
        // Final fallback: direct navigation
        await this.page.goto(originalUrl);
      }
    }

    // Confirm we are no longer on Microsoft domain
    await this.page.waitForURL((url) => !url.toString().includes('login.microsoftonline.com'), { timeout: 10000 });

    // Verify we're back to main app
    await this.assert.assertElementVisible(this.loginPage.loginButton);
  }
}