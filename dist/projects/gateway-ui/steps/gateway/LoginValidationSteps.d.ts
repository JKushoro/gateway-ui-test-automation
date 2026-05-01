import { Page, BasePage, FrameworkConfig } from '../../shared/SharedImports';
/**
 * LoginValidationSteps - LOGIN TESTS / VALIDATIONS ONLY
 * - Negative tests
 * - Security payload tests
 * - Focus / back button behaviour
 *
 * Page object contains locators only.
 * All logic stays in this steps class.
 */
export declare class LoginValidationSteps extends BasePage {
    private readonly login;
    private readonly loginPage;
    private readonly envManager;
    private readonly authService;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Navigate to application and open Microsoft login page.
     */
    private openMicrosoftLogin;
    /**
     * Submit username step (optionally blank).
     */
    private submitUsername;
    /**
     * Submit password step (optionally blank).
     */
    private submitPassword;
    /**
     * Verify Microsoft error message is displayed with expected text.
     */
    private expectErrorText;
    /**
     * Get advisor email from environment configuration.
     */
    private getAdvisorEmailOrThrow;
    /**
     * Check if user is currently logged in using UI indicators.
     */
    private isUserLoggedIn;
    /**
     * Logout user if already logged in.
     */
    private logoutIfLoggedIn;
    /**
     * Verify login button is visible.
     */
    private expectLoginButtonVisible;
    /**
     * Click login button and wait for username field.
     */
    private clickLoginButton;
    /**
     * Verify username input is visible and enabled.
     */
    private expectUsernameFieldReady;
    /**
     * Verify login button is present and functional.
     */
    verifyLoginButtonPresent(): Promise<void>;
    /**
     * Verify user is redirected to Microsoft login page.
     */
    verifyRedirectToMicrosoftLogin(): Promise<void>;
    /**
     * Attempt login with invalid username and verify error.
     */
    attemptLoginWithInvalidUsername(): Promise<void>;
    /**
     * Attempt login with invalid password and verify error.
     */
    attemptLoginWithInvalidPassword(): Promise<void>;
    /**
     * Attempt login with empty username and verify validation error.
     */
    attemptLoginWithEmptyUsername(): Promise<void>;
    /**
     * Attempt login with empty password and verify validation error.
     */
    attemptLoginWithEmptyPassword(): Promise<void>;
    /**
     * Attempt login with malformed email and verify error.
     */
    attemptLoginWithMalformedEmail(): Promise<void>;
    /**
     * Attempt login with SQL injection payload.
     */
    attemptLoginWithSQLInjection(): Promise<void>;
    /**
     * Attempt login with XSS payload.
     */
    attemptLoginWithXSSPayload(): Promise<void>;
    /**
     * Attempt login with excessively long username.
     */
    attemptLoginWithLongUsername(): Promise<void>;
    /**
     * Attempt login with special characters in username.
     */
    attemptLoginWithSpecialCharacters(): Promise<void>;
    /**
     * Attempt login with whitespace username.
     */
    attemptLoginWithWhitespaceUsername(): Promise<void>;
    /**
     * Attempt login with whitespace password.
     */
    attemptLoginWithWhitespacePassword(): Promise<void>;
    /**
     * Verify username field is focused and ready.
     */
    verifyLoginFormFocus(): Promise<void>;
    /**
     * Verify browser back navigation returns user to app.
     */
    verifyBrowserBackButton(): Promise<void>;
}
//# sourceMappingURL=LoginValidationSteps.d.ts.map