// projects/gateway-ui/steps/gateway/LoginValidationSteps.ts
import { Page, BasePage, FrameworkConfig, Environment } from '../../shared/SharedImports';
import { LoginPage } from '@pages/auth/LoginPageLocators';
import { LoginUIInteractions } from './LoginUIInteractions';
import { LoginSessionManager } from './LoginSessionManager';
import { LOGIN_ERROR_MESSAGES, TEST_DATA, TIMEOUTS } from './LoginValidationConstants';

/**
 * LoginValidationSteps - Orchestrates login UI validation scenarios
 * 
 * Follows SOLID principles:
 * - Single Responsibility: Orchestrates validation test scenarios only
 * - Open/Closed: Open for extension (new validation scenarios), closed for modification
 * - Dependency Inversion: Depends on abstractions (UI interactions, session management)
 */
export class LoginValidationSteps extends BasePage {
  private readonly loginPage: LoginPage;
  private readonly uiInteractions: LoginUIInteractions;
  private readonly sessionManager: LoginSessionManager;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.loginPage = new LoginPage(page, config);
    this.uiInteractions = new LoginUIInteractions(page, this.loginPage);
    this.sessionManager = new LoginSessionManager(page, this.loginPage);
  }

  /* ==================== PUBLIC VALIDATION METHODS ==================== */

  /**
   * Verify login button is present and functional
   */
  async verifyLoginButtonPresent(): Promise<void> {
    await this.prepareForValidation();
    await this.uiInteractions.expectLoginButtonVisible();
    await this.uiInteractions.clickLoginButton(true);
    this.logger.info('Login button validation completed successfully');
  }

  /**
   * Verify redirect to Microsoft login page
   */
  async verifyRedirectToMicrosoftLogin(): Promise<void> {
    await this.prepareForValidation();
    await this.uiInteractions.expectLoginButtonVisible();
    await this.uiInteractions.clickLoginButton();
    await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: TIMEOUTS.URL_NAVIGATION });
    this.logger.info('Microsoft login redirect validation completed successfully');
  }

  /**
   * Verify username field focus and accessibility
   */
  async verifyLoginFormFocus(): Promise<void> {
    await this.openMicrosoftLoginForValidation();
    await this.uiInteractions.expectUsernameFieldReady();
    this.logger.info('Username field is ready for input');
  }

  /**
   * Verify browser back navigation behavior
   */
  async verifyBrowserBackButton(): Promise<void> {
    await this.prepareForValidation();
    const originalUrl = this.page.url();

    await this.uiInteractions.expectLoginButtonVisible();
    await this.uiInteractions.clickLoginButton();
    await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: TIMEOUTS.URL_NAVIGATION });

    await this.page.goto(originalUrl);
    await this.uiInteractions.expectLoginButtonVisible();
  }

  /* ==================== NEGATIVE VALIDATION TESTS ==================== */

  async attemptLoginWithInvalidUsername(): Promise<void> {
    await this.openMicrosoftLoginForValidation();
    await this.uiInteractions.submitUsername(TEST_DATA.INVALID_USERNAME);
    await this.uiInteractions.expectErrorMessage(LOGIN_ERROR_MESSAGES.INVALID_USERNAME);
  }

  async attemptLoginWithInvalidPassword(): Promise<void> {
    await this.openMicrosoftLoginForValidation();
    await this.uiInteractions.submitUsername(this.sessionManager.getAdvisorEmail());
    await this.uiInteractions.submitPassword(TEST_DATA.INVALID_PASSWORD);
    await this.uiInteractions.expectErrorMessage(LOGIN_ERROR_MESSAGES.INVALID_PASSWORD);
  }

  async attemptLoginWithEmptyUsername(): Promise<void> {
    await this.openMicrosoftLoginForValidation();
    await this.uiInteractions.submitUsername();
    await this.uiInteractions.expectErrorMessage(LOGIN_ERROR_MESSAGES.EMPTY_USERNAME);
  }

  async attemptLoginWithEmptyPassword(): Promise<void> {
    await this.openMicrosoftLoginForValidation();
    await this.uiInteractions.submitUsername(this.sessionManager.getAdvisorEmail());
    await this.uiInteractions.submitPassword();
    await this.uiInteractions.expectErrorMessage(LOGIN_ERROR_MESSAGES.EMPTY_PASSWORD);
  }

  async attemptLoginWithMalformedEmail(): Promise<void> {
    await this.openMicrosoftLoginForValidation();
    await this.uiInteractions.submitUsername(TEST_DATA.MALFORMED_EMAIL);
    await this.uiInteractions.expectErrorMessage(LOGIN_ERROR_MESSAGES.USERNAME_NOT_FOUND);
  }

  /* ==================== SECURITY VALIDATION TESTS ==================== */

  async attemptLoginWithSQLInjection(): Promise<void> {
    await this.openMicrosoftLoginForValidation();
    await this.uiInteractions.submitUsername(TEST_DATA.SQL_INJECTION);
    await this.uiInteractions.expectErrorMessage(LOGIN_ERROR_MESSAGES.EMPTY_USERNAME);
  }

  async attemptLoginWithXSSPayload(): Promise<void> {
    await this.openMicrosoftLoginForValidation();
    await this.uiInteractions.submitUsername(TEST_DATA.XSS_PAYLOAD);
    await this.uiInteractions.expectErrorMessage(LOGIN_ERROR_MESSAGES.EMPTY_USERNAME);
  }

  async attemptLoginWithLongUsername(): Promise<void> {
    await this.openMicrosoftLoginForValidation();
    const longUsername = `${TEST_DATA.LONG_USERNAME_PREFIX}@fairstone.co.uk`;
    await this.uiInteractions.submitUsername(longUsername);
    await this.uiInteractions.expectErrorMessage(LOGIN_ERROR_MESSAGES.USERNAME_NOT_FOUND);
  }

  async attemptLoginWithSpecialCharacters(): Promise<void> {
    await this.openMicrosoftLoginForValidation();
    await this.uiInteractions.submitUsername(TEST_DATA.SPECIAL_CHARS_USERNAME);
    await this.uiInteractions.expectErrorMessage(LOGIN_ERROR_MESSAGES.USERNAME_NOT_FOUND);
  }

  async attemptLoginWithWhitespaceUsername(): Promise<void> {
    await this.openMicrosoftLoginForValidation();
    await this.uiInteractions.submitUsername(TEST_DATA.WHITESPACE);
    await this.uiInteractions.expectErrorMessage(LOGIN_ERROR_MESSAGES.EMPTY_USERNAME);
  }

  async attemptLoginWithWhitespacePassword(): Promise<void> {
    await this.openMicrosoftLoginForValidation();
    await this.uiInteractions.submitUsername(this.sessionManager.getAdvisorEmail());
    await this.uiInteractions.submitPassword(TEST_DATA.WHITESPACE);
    await this.uiInteractions.expectErrorMessage(LOGIN_ERROR_MESSAGES.INVALID_PASSWORD);
  }

  /* ==================== PRIVATE HELPER METHODS ==================== */

  private async prepareForValidation(environment: Environment = 'qa'): Promise<void> {
    await this.sessionManager.navigateToApplication(environment);
    await this.sessionManager.logoutIfLoggedIn();
    this.logger.info(`Current URL: ${this.page.url()}`);
  }

  private async openMicrosoftLoginForValidation(): Promise<void> {
    await this.prepareForValidation();
    await this.uiInteractions.expectLoginButtonVisible();
    await this.uiInteractions.clickLoginButton(true);
  }
}