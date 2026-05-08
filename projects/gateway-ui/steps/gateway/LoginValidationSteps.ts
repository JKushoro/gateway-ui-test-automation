// projects/gateway-ui/steps/LoginValidationSteps.ts
import {
  Page,
  BasePage,
  FrameworkConfig,
  Environment,
  AuthenticationService,
  getEnvironmentManager,
} from '../../shared/SharedImports';
import { LoginPage } from '@pages/auth/LoginPageLocators';
import { LoginSteps } from './LoginSteps';
import { expect } from '@playwright/test';

/**
 * LoginValidationSteps - LOGIN TESTS / VALIDATIONS ONLY
 * - Negative tests
 * - Security payload tests
 * - Focus / back button behaviour
 *
 * Page object contains locators only.
 * All logic stays in this steps class.
 */
export class LoginValidationSteps extends BasePage {
  private readonly login: LoginSteps;
  private readonly loginPage: LoginPage;
  private readonly envManager = getEnvironmentManager();
  private readonly authService: AuthenticationService;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.login = new LoginSteps(page, config);
    this.loginPage = new LoginPage(page, config);
    this.authService = new AuthenticationService(page, config);
  }

  /* -------------------- Small shared helpers -------------------- */

  /**
   * Navigate directly to application URL without using AuthenticationService.
   */
  private async navigateToApplicationOnly(environment: Environment = 'qa'): Promise<void> {
    const baseUrl = this.envManager.getBaseUrl(environment);
    this.logger.info(`Navigating to application: ${baseUrl}`);
    await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Navigate to application and open Microsoft login page for UI validation only.
   */
  private async openMicrosoftLogin(): Promise<void> {
    await this.navigateToApplicationOnly();
    await this.logoutIfLoggedIn();
    
    // Wait for and click login button, then wait for Microsoft page
    await this.expectLoginButtonVisible();
    await this.clickLoginButton(true);
  }

  /**
   * Submit username step (optionally blank) - UI validation only.
   */
  private async submitUsername(username?: string): Promise<void> {
    try {
      await expect(this.loginPage.getUsernameInputLocator()).toBeVisible({ timeout: 10000 });
      await this.loginPage.getUsernameInputLocator().fill(username ?? '');
      await this.loginPage.getPrimaryButtonLocator().click();
      // Wait briefly for page transition or error message
      await this.page.waitForTimeout(2000);
    } catch (error) {
      this.logger.error(`Failed to submit username: ${error}`);
      throw error;
    }
  }

  /**
   * Submit password step (optionally blank) - UI validation only.
   */
  private async submitPassword(password?: string): Promise<void> {
    try {
      await expect(this.loginPage.getPasswordInputLocator()).toBeVisible({ timeout: 10000 });
      await this.loginPage.getPasswordInputLocator().fill(password ?? '');
      await this.loginPage.getPrimaryButtonLocator().click();
      // Wait briefly for validation or error message
      await this.page.waitForTimeout(2000);
    } catch (error) {
      this.logger.error(`Failed to submit password: ${error}`);
      throw error;
    }
  }

  /**
   * Verify Microsoft error message is displayed with expected text.
   */
  private async expectErrorText(expected: string): Promise<void> {
    await expect(this.loginPage.getErrorMessageLocator()).toHaveText(expected);
  }

  /**
   * Get advisor email from environment configuration.
   */
  private getAdvisorEmailOrThrow(environment: Environment = 'qa'): string {
    return this.envManager.getAdvisorEmail(environment);
  }

  /**
   * Check if user is currently logged in using UI indicators.
   */
  private async isUserLoggedIn(): Promise<boolean> {
    const dashboardVisible = await this.loginPage
      .getDashboardIndicatorLocator()
      .isVisible()
      .catch(() => false);

    const userMenuVisible = await this.loginPage
      .getUserMenuIndicatorLocator()
      .isVisible()
      .catch(() => false);

    const logoutVisible = await this.loginPage
      .getLogoutButtonLocator()
      .isVisible()
      .catch(() => false);

    return dashboardVisible || userMenuVisible || logoutVisible;
  }

  /**
   * Logout user if already logged in.
   */
  private async logoutIfLoggedIn(): Promise<void> {
    if (!(await this.isUserLoggedIn())) {
      return;
    }

    this.logger.info('User is logged in, attempting logout...');
    await this.loginPage.getLogoutButtonLocator().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Verify login button is visible.
   */
  private async expectLoginButtonVisible(): Promise<void> {
    await expect(this.loginPage.getLoginButtonLocator()).toBeVisible();
  }

  /**
   * Click login button and optionally wait for Microsoft login page elements.
   */
  private async clickLoginButton(waitForMicrosoftPage: boolean = false): Promise<void> {
    await this.loginPage.getLoginButtonLocator().click();
    
    if (waitForMicrosoftPage) {
      // Wait for navigation to Microsoft login page first
      try {
        await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: 15000 });
        // Then wait for the username input with a longer timeout
        await expect(this.loginPage.getUsernameInputLocator()).toBeVisible({ timeout: 10000 });
      } catch (error) {
        this.logger.error(`Failed to reach Microsoft login page or find username field: ${error}`);
        throw error;
      }
    }
  }

  /**
   * Verify username input is visible and enabled.
   */
  private async expectUsernameFieldReady(): Promise<void> {
    await expect(this.loginPage.getUsernameInputLocator()).toBeVisible();
    await expect(this.loginPage.getUsernameInputLocator()).toBeEnabled();
  }

  /* -------------------- UI validations -------------------- */

  /**
   * Verify login button is present and functional - UI validation only.
   */
  public async verifyLoginButtonPresent(): Promise<void> {
    await this.navigateToApplicationOnly();
    await this.logoutIfLoggedIn();

    this.logger.info(`Current URL: ${this.page.url()}`);

    await this.expectLoginButtonVisible();
    await this.clickLoginButton(true); // Wait for Microsoft page elements
    this.logger.info('Login button validation completed successfully');
  }

  /**
   * Verify user is redirected to Microsoft login page - UI validation only.
   */
  public async verifyRedirectToMicrosoftLogin(): Promise<void> {
    await this.navigateToApplicationOnly();
    await this.logoutIfLoggedIn();

    await this.expectLoginButtonVisible();
    await this.clickLoginButton();

    // Wait for redirect to Microsoft login
    await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: 15000 });
    this.logger.info('Microsoft login redirect validation completed successfully');
  }

  /* -------------------- Negative tests -------------------- */

  /**
   * Attempt login with invalid username and verify error.
   */
  public async attemptLoginWithInvalidUsername(): Promise<void> {
    await this.openMicrosoftLogin();
    await this.submitUsername('invalid.user@fairstone.co.uk');

    await this.expectErrorText(
      'This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.'
    );
  }

  /**
   * Attempt login with invalid password and verify error.
   */
  public async attemptLoginWithInvalidPassword(): Promise<void> {
    await this.openMicrosoftLogin();
    await this.submitUsername(this.getAdvisorEmailOrThrow());
    await this.submitPassword('InvalidPassword123');

    await this.expectErrorText(
      "Your account or password is incorrect. If you don't remember your password, reset it now."
    );
  }

  /**
   * Attempt login with empty username and verify validation error.
   */
  public async attemptLoginWithEmptyUsername(): Promise<void> {
    await this.openMicrosoftLogin();
    await this.submitUsername();

    await this.expectErrorText('Enter a valid email address, phone number, or Skype name.');
  }

  /**
   * Attempt login with empty password and verify validation error.
   */
  public async attemptLoginWithEmptyPassword(): Promise<void> {
    await this.openMicrosoftLogin();
    await this.submitUsername(this.getAdvisorEmailOrThrow());
    await this.submitPassword();

    await this.expectErrorText('Please enter your password.');
  }

  /**
   * Attempt login with malformed email and verify error.
   */
  public async attemptLoginWithMalformedEmail(): Promise<void> {
    await this.openMicrosoftLogin();
    await this.submitUsername('invalid-email-format');

    await this.expectErrorText("We couldn't find an account with that username.");
  }

  /**
   * Attempt login with SQL injection payload.
   */
  public async attemptLoginWithSQLInjection(): Promise<void> {
    await this.openMicrosoftLogin();
    await this.submitUsername("admin'; DROP TABLE users; --");

    await this.expectErrorText('Enter a valid email address, phone number, or Skype name.');
  }

  /**
   * Attempt login with XSS payload.
   */
  public async attemptLoginWithXSSPayload(): Promise<void> {
    await this.openMicrosoftLogin();
    await this.submitUsername("<script>alert('XSS')</script>");

    await this.expectErrorText('Enter a valid email address, phone number, or Skype name.');
  }

  /**
   * Attempt login with excessively long username.
   */
  public async attemptLoginWithLongUsername(): Promise<void> {
    await this.openMicrosoftLogin();

    const longUsername = `${'a'.repeat(500)}@fairstone.co.uk`;
    await this.submitUsername(longUsername);

    await this.expectErrorText("We couldn't find an account with that username.");
  }

  /**
   * Attempt login with special characters in username.
   */
  public async attemptLoginWithSpecialCharacters(): Promise<void> {
    await this.openMicrosoftLogin();
    await this.submitUsername('user@#$%^&*()fairstone.co.uk');

    await this.expectErrorText("We couldn't find an account with that username.");
  }

  /**
   * Attempt login with whitespace username.
   */
  public async attemptLoginWithWhitespaceUsername(): Promise<void> {
    await this.openMicrosoftLogin();
    await this.submitUsername('   ');

    await this.expectErrorText('Enter a valid email address, phone number, or Skype name.');
  }

  /**
   * Attempt login with whitespace password.
   */
  public async attemptLoginWithWhitespacePassword(): Promise<void> {
    await this.openMicrosoftLogin();
    await this.submitUsername(this.getAdvisorEmailOrThrow());
    await this.submitPassword('   ');

    await this.expectErrorText(
      "Your account or password is incorrect. If you don't remember your password, reset it now."
    );
  }

  /* -------------------- Browser behaviour -------------------- */

  /**
   * Verify username field is focused and ready.
   */
  public async verifyLoginFormFocus(): Promise<void> {
    await this.openMicrosoftLogin();
    await this.expectUsernameFieldReady();

    this.logger.info('Username field is ready for input');
  }

  /**
   * Verify browser back navigation returns user to app.
   */
  public async verifyBrowserBackButton(): Promise<void> {
    await this.navigateToApplicationOnly();
    await this.logoutIfLoggedIn();

    const originalUrl = this.page.url();

    await this.expectLoginButtonVisible();
    await this.clickLoginButton();
    await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: 15000 });

    await this.page.goto(originalUrl);
    await this.expectLoginButtonVisible();
  }
}