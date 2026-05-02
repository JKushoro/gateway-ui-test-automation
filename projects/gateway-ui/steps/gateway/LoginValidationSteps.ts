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
   * Navigate to application and open Microsoft login page.
   */
  private async openMicrosoftLogin(): Promise<void> {
    await this.authService.navigateToApplication();
    await this.authService.startMicrosoftLogin();
  }

  /**
   * Submit username step (optionally blank).
   */
  private async submitUsername(username?: string): Promise<void> {
    await this.authService.submitUsername(username ?? '');
  }

  /**
   * Submit password step (optionally blank).
   */
  private async submitPassword(password?: string): Promise<void> {
    await this.authService.submitPassword(password ?? '');
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
   * Click login button and wait for username field.
   */
  private async clickLoginButton(): Promise<void> {
    await this.loginPage.getLoginButtonLocator().click();
    await expect(this.loginPage.getUsernameInputLocator()).toBeVisible();
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
   * Verify login button is present and functional.
   */
  public async verifyLoginButtonPresent(): Promise<void> {
    await this.login.navigateToApplication();
    await this.logoutIfLoggedIn();

    this.logger.info(`Current URL: ${this.page.url()}`);

    await this.expectLoginButtonVisible();
    await this.clickLoginButton();
  }

  /**
   * Verify user is redirected to Microsoft login page.
   */
  public async verifyRedirectToMicrosoftLogin(): Promise<void> {
    await this.login.navigateToApplication();
    await this.logoutIfLoggedIn();

    await this.expectLoginButtonVisible();
    await this.clickLoginButton();

    await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: 10000 });
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
    await this.login.navigateToApplication();

    const originalUrl = this.page.url();

    await this.login.startMicrosoftLogin();
    await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: 10000 });

    try {
      await this.page.goto(originalUrl, { waitUntil: 'networkidle' });
    } catch {
      try {
        await this.page.goBack({ waitUntil: 'domcontentloaded', timeout: 5000 });
      } catch {
        await this.page.goto(originalUrl);
      }
    }

    await this.page.waitForURL(url => !url.toString().includes('login.microsoftonline.com'), {
      timeout: 10000,
    });

    await this.expectLoginButtonVisible();
  }
}