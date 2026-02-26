import { Page } from '@playwright/test';
import { LoginPageLocators } from '@pages/LoginPageLocators';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { Environment } from '@framework/types/Environment';
import * as path from 'path';
import * as fs from 'fs';

/**
 * LoginSteps - Simple login functionality
 * Now extends BaseSteps to eliminate helper duplication
 */
export class LoginSteps extends BasePage {
  private loginPage: LoginPageLocators;
  private envSettings: Record<string, string> = {};

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.loginPage = new LoginPageLocators(page, config);
  }

  /**
   * Load environment settings from .env file
   */
  private loadEnvironment(environment: Environment): void {
    const envFile = path.join(__dirname, '..', 'environments', `.env.${environment}`);

    if (!fs.existsSync(envFile)) {
      throw new Error(`Environment file not found: .env.${environment}`);
    }

    const content = fs.readFileSync(envFile, 'utf8');

    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...parts] = trimmed.split('=');
        if (key && parts.length > 0) {
          this.envSettings[key.trim()] = parts.join('=').trim();
        }
      }
    });
  }

  /**
   * Get credentials from environment settings
   */
  private getCredentials(): { username: string; password: string } {
    if (Object.keys(this.envSettings).length === 0) {
      this.loadEnvironment('qa'); // Default to qa environment
    }

    const username = this.envSettings['USER_NAME'];
    const password = this.envSettings['PASSWORD'];

    if (!username || !password) {
      throw new Error('USER_NAME and PASSWORD must be set in environment file');
    }

    return { username, password };
  }

  /**
   * Click the login button and handle the complete authentication flow
   */
  public async clickLogin(username?: string, password?: string): Promise<void> {
    // Click the initial login button
    await this.action.clickLocator(this.loginPage.loginButton);

    // Wait for the AAD redirect to complete
    await this.wait.waitForDOMContentLoaded();
    await this.wait.waitForNetworkIdle();

    // Get credentials from parameters or environment settings
    let loginUsername = username;
    let loginPassword = password;

    if (!loginUsername || !loginPassword) {
      const credentials = this.getCredentials();
      loginUsername = loginUsername || credentials.username;
      loginPassword = loginPassword || credentials.password;
    }

    // Enter username and click next
    await this.loginPage.usernameInput.fill(loginUsername);
    await this.action.clickLocator(this.loginPage.nextButton);

    // Wait for password page to load
    await this.wait.waitForDOMContentLoaded();

    // Enter password and click sign in
    await this.loginPage.passwordInput.fill(loginPassword);
    await this.action.clickLocator(this.loginPage.signInButton);

    // Wait for login to complete
    await this.wait.waitForDOMContentLoaded();
    await this.wait.waitForNetworkIdle();
  }

  /**
   * Private helper method to navigate to application
   */
  private async navigateToApplication(): Promise<void> {
    if (Object.keys(this.envSettings).length === 0) {
      this.loadEnvironment('qa'); // Default to qa environment
    }

    const baseUrl = this.envSettings['BASE_URL'] || 'https://qa-fairstonegateway.fairstone.co.uk';
    await this.page.goto(baseUrl);
    await this.wait.waitForLoadingToComplete();
  }

  /**
   * Private helper method to initiate login flow
   */
  private async initiateLoginFlow(): Promise<void> {
    await this.action.clickLocator(this.loginPage.loginButton);
    await this.wait.waitForDOMContentLoaded();
    await this.wait.waitForNetworkIdle();
  }

  /**
   * Private helper method to capture and verify exact error message
   */
  private async verifySpecificErrorMessage(expectedErrorText: string): Promise<void> {
    await this.wait.waitForDOMContentLoaded();
    await this.assert.assertElementVisible(this.loginPage.errorMessage);
    await this.assert.assertElementHasText(this.loginPage.errorMessage, expectedErrorText);
  }

  /**
   * Private helper method to enter username and proceed
   */
  private async enterUsernameAndProceed(username: string): Promise<void> {
    await this.loginPage.usernameInput.fill(username);
    await this.action.clickLocator(this.loginPage.nextButton);
    await this.wait.waitForDOMContentLoaded();
  }

  /**
   * Private helper method to enter password and submit
   */
  private async enterPasswordAndSubmit(password: string): Promise<void> {
    await this.loginPage.passwordInput.fill(password);
    await this.action.clickLocator(this.loginPage.signInButton);
  }

  /**
   * Private helper method for complete login flow with specific error verification
   */
  private async attemptLoginWithCredentials(username?: string, password?: string, expectedError?: string): Promise<void> {
    await this.navigateToApplication();
    await this.initiateLoginFlow();

    if (username !== undefined) {
      await this.enterUsernameAndProceed(username);
    } else {
      await this.action.clickLocator(this.loginPage.nextButton);
    }

    if (password !== undefined) {
      await this.enterPasswordAndSubmit(password);
    } else {
      await this.action.clickLocator(this.loginPage.signInButton);
    }

    if (expectedError) {
      await this.verifySpecificErrorMessage(expectedError);
    }
  }

  /**
   * Perform successful login using environment credentials
   */
  public async performValidLogin(): Promise<void> {
    await this.navigateToApplication();
    await this.clickLogin();
  }

  /**
   * Attempt login with invalid username and verify specific error message
   */
  public async attemptLoginWithInvalidUsername(): Promise<void> {
    const expectedError = "This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.";
    await this.attemptLoginWithCredentials('invalid.user@fairstone.co.uk', undefined, expectedError);
  }

  /**
   * Attempt login with valid username but invalid password and verify specific error message
   */
  public async attemptLoginWithInvalidPassword(): Promise<void> {
    const credentials = this.getCredentials();
    const expectedError = "Your account or password is incorrect. If you don't remember your password, reset it now.";
    await this.attemptLoginWithCredentials(credentials.username, 'InvalidPassword123', expectedError);
  }

  /**
   * Attempt login with empty username and verify specific error message
   */
  public async attemptLoginWithEmptyUsername(): Promise<void> {
    const expectedError = "Enter a valid email address, phone number, or Skype name.";
    await this.attemptLoginWithCredentials(undefined, undefined, expectedError);
  }

  /**
   * Attempt login with empty password and verify specific error message
   */
  public async attemptLoginWithEmptyPassword(): Promise<void> {
    const credentials = this.getCredentials();
    const expectedError = "Please enter your password.";
    await this.attemptLoginWithCredentials(credentials.username, undefined, expectedError);
  }

  /**
   * Attempt login with malformed email and verify specific error message
   */
  public async attemptLoginWithMalformedEmail(): Promise<void> {
    const expectedError = "We couldn't find an account with that username.";
    await this.attemptLoginWithCredentials('invalid-email-format', undefined, expectedError);
  }

  /**
   * Verify login button is present and clickable
   */
  public async verifyLoginButtonPresent(): Promise<void> {
    await this.navigateToApplication();
    await this.assert.assertElementVisible(this.loginPage.loginButton);
    await this.assert.assertElementEnabled(this.loginPage.loginButton);
  }

  /**
   * Navigate to application and verify redirect to Microsoft login
   */
  public async verifyRedirectToMicrosoftLogin(): Promise<void> {
    await this.navigateToApplication();
    await this.action.clickLocator(this.loginPage.loginButton);
    await this.wait.waitForDOMContentLoaded();
    await this.page.waitForURL(/login\.microsoftonline\.com/);
  }

  /**
   * Attempt login with SQL injection payload and verify error
   */
  public async attemptLoginWithSQLInjection(): Promise<void> {
    const expectedError = "Enter a valid email address, phone number, or Skype name.";
    await this.attemptLoginWithCredentials("admin'; DROP TABLE users; --", undefined, expectedError);
  }

  /**
   * Attempt login with XSS payload and verify error
   */
  public async attemptLoginWithXSSPayload(): Promise<void> {
    const expectedError = "Enter a valid email address, phone number, or Skype name.";
    await this.attemptLoginWithCredentials("<script>alert('XSS')</script>", undefined, expectedError);
  }

  /**
   * Attempt login with very long username and verify error
   */
  public async attemptLoginWithLongUsername(): Promise<void> {
    const longUsername = "a".repeat(500) + "@fairstone.co.uk";
    const expectedError = "We couldn't find an account with that username.";
    await this.attemptLoginWithCredentials(longUsername, undefined, expectedError);
  }

  /**
   * Attempt login with special characters in username and verify error
   */
  public async attemptLoginWithSpecialCharacters(): Promise<void> {
    const expectedError = "We couldn't find an account with that username.";
    await this.attemptLoginWithCredentials("user@#$%^&*()fairstone.co.uk", undefined, expectedError);
  }

  /**
   * Attempt login with whitespace only username and verify error
   */
  public async attemptLoginWithWhitespaceUsername(): Promise<void> {
    const expectedError = "Enter a valid email address, phone number, or Skype name.";
    await this.attemptLoginWithCredentials("   ", undefined, expectedError);
  }

  /**
   * Attempt login with whitespace only password and verify error
   */
  public async attemptLoginWithWhitespacePassword(): Promise<void> {
    const credentials = this.getCredentials();
    const expectedError = "Your account or password is incorrect. If you don't remember your password, reset it now.";
    await this.attemptLoginWithCredentials(credentials.username, "   ", expectedError);
  }

  /**
   * Verify login form elements are properly focused
   */
  public async verifyLoginFormFocus(): Promise<void> {
    await this.navigateToApplication();
    await this.action.clickLocator(this.loginPage.loginButton);
    await this.wait.waitForDOMContentLoaded();
    await this.wait.waitForNetworkIdle();

    // Verify username input is focused after page load
    await this.assert.assertElementVisible(this.loginPage.usernameInput);
    const isFocused = await this.loginPage.usernameInput.evaluate(el => el === document.activeElement);
    if (!isFocused) {
      throw new Error('Username input should be focused on page load');
    }
  }

  /**
   * Verify login form handles browser back button correctly
   */
  public async verifyBrowserBackButton(): Promise<void> {
    await this.navigateToApplication();
    await this.action.clickLocator(this.loginPage.loginButton);
    await this.wait.waitForDOMContentLoaded();
    await this.wait.waitForNetworkIdle();

    // Go back using browser back button
    await this.page.goBack();
    await this.wait.waitForDOMContentLoaded();

    // Verify we're back to the main application page
    await this.assert.assertElementVisible(this.loginPage.loginButton);
  }
}
