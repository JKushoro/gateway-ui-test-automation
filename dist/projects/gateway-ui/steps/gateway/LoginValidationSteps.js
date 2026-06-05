"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidationSteps = void 0;
// projects/gateway-ui/steps/gateway/LoginValidationSteps.ts
const SharedImports_1 = require("../../shared/SharedImports");
const LoginPageLocators_1 = require("@pages/auth/LoginPageLocators");
const LoginUIInteractions_1 = require("./LoginUIInteractions");
const LoginSessionManager_1 = require("./LoginSessionManager");
const LoginValidationConstants_1 = require("./LoginValidationConstants");
/**
 * LoginValidationSteps - Orchestrates login UI validation scenarios
 *
 * Follows SOLID principles:
 * - Single Responsibility: Orchestrates validation test scenarios only
 * - Open/Closed: Open for extension (new validation scenarios), closed for modification
 * - Dependency Inversion: Depends on abstractions (UI interactions, session management)
 */
class LoginValidationSteps extends SharedImports_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.loginPage = new LoginPageLocators_1.LoginPage(page, config);
        this.uiInteractions = new LoginUIInteractions_1.LoginUIInteractions(page, this.loginPage);
        this.sessionManager = new LoginSessionManager_1.LoginSessionManager(page, this.loginPage);
    }
    /* ==================== PUBLIC VALIDATION METHODS ==================== */
    /**
     * Verify login button is present and functional
     */
    async verifyLoginButtonPresent() {
        await this.prepareForValidation();
        await this.uiInteractions.expectLoginButtonVisible();
        await this.uiInteractions.clickLoginButton(true);
        this.logger.info('Login button validation completed successfully');
    }
    /**
     * Verify redirect to Microsoft login page
     */
    async verifyRedirectToMicrosoftLogin() {
        await this.prepareForValidation();
        await this.uiInteractions.expectLoginButtonVisible();
        await this.uiInteractions.clickLoginButton();
        await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: LoginValidationConstants_1.TIMEOUTS.URL_NAVIGATION });
        this.logger.info('Microsoft login redirect validation completed successfully');
    }
    /**
     * Verify username field focus and accessibility
     */
    async verifyLoginFormFocus() {
        await this.openMicrosoftLoginForValidation();
        await this.uiInteractions.expectUsernameFieldReady();
        this.logger.info('Username field is ready for input');
    }
    /**
     * Verify browser back navigation behavior
     */
    async verifyBrowserBackButton() {
        await this.prepareForValidation();
        const originalUrl = this.page.url();
        await this.uiInteractions.expectLoginButtonVisible();
        await this.uiInteractions.clickLoginButton();
        await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: LoginValidationConstants_1.TIMEOUTS.URL_NAVIGATION });
        await this.page.goto(originalUrl);
        await this.uiInteractions.expectLoginButtonVisible();
    }
    /* ==================== NEGATIVE VALIDATION TESTS ==================== */
    async attemptLoginWithInvalidUsername() {
        await this.openMicrosoftLoginForValidation();
        await this.uiInteractions.submitUsername(LoginValidationConstants_1.TEST_DATA.INVALID_USERNAME);
        await this.uiInteractions.expectErrorMessage(LoginValidationConstants_1.LOGIN_ERROR_MESSAGES.INVALID_USERNAME);
    }
    async attemptLoginWithInvalidPassword() {
        await this.openMicrosoftLoginForValidation();
        await this.uiInteractions.submitUsername(this.sessionManager.getAdvisorEmail());
        await this.uiInteractions.submitPassword(LoginValidationConstants_1.TEST_DATA.INVALID_PASSWORD);
        await this.uiInteractions.expectErrorMessage(LoginValidationConstants_1.LOGIN_ERROR_MESSAGES.INVALID_PASSWORD);
    }
    async attemptLoginWithEmptyUsername() {
        await this.openMicrosoftLoginForValidation();
        await this.uiInteractions.submitUsername();
        await this.uiInteractions.expectErrorMessage(LoginValidationConstants_1.LOGIN_ERROR_MESSAGES.EMPTY_USERNAME);
    }
    async attemptLoginWithEmptyPassword() {
        await this.openMicrosoftLoginForValidation();
        await this.uiInteractions.submitUsername(this.sessionManager.getAdvisorEmail());
        await this.uiInteractions.submitPassword();
        await this.uiInteractions.expectErrorMessage(LoginValidationConstants_1.LOGIN_ERROR_MESSAGES.EMPTY_PASSWORD);
    }
    async attemptLoginWithMalformedEmail() {
        await this.openMicrosoftLoginForValidation();
        await this.uiInteractions.submitUsername(LoginValidationConstants_1.TEST_DATA.MALFORMED_EMAIL);
        await this.uiInteractions.expectErrorMessage(LoginValidationConstants_1.LOGIN_ERROR_MESSAGES.USERNAME_NOT_FOUND);
    }
    /* ==================== SECURITY VALIDATION TESTS ==================== */
    async attemptLoginWithSQLInjection() {
        await this.openMicrosoftLoginForValidation();
        await this.uiInteractions.submitUsername(LoginValidationConstants_1.TEST_DATA.SQL_INJECTION);
        await this.uiInteractions.expectErrorMessage(LoginValidationConstants_1.LOGIN_ERROR_MESSAGES.EMPTY_USERNAME);
    }
    async attemptLoginWithXSSPayload() {
        await this.openMicrosoftLoginForValidation();
        await this.uiInteractions.submitUsername(LoginValidationConstants_1.TEST_DATA.XSS_PAYLOAD);
        await this.uiInteractions.expectErrorMessage(LoginValidationConstants_1.LOGIN_ERROR_MESSAGES.EMPTY_USERNAME);
    }
    async attemptLoginWithLongUsername() {
        await this.openMicrosoftLoginForValidation();
        const longUsername = `${LoginValidationConstants_1.TEST_DATA.LONG_USERNAME_PREFIX}@fairstone.co.uk`;
        await this.uiInteractions.submitUsername(longUsername);
        await this.uiInteractions.expectErrorMessage(LoginValidationConstants_1.LOGIN_ERROR_MESSAGES.USERNAME_NOT_FOUND);
    }
    async attemptLoginWithSpecialCharacters() {
        await this.openMicrosoftLoginForValidation();
        await this.uiInteractions.submitUsername(LoginValidationConstants_1.TEST_DATA.SPECIAL_CHARS_USERNAME);
        await this.uiInteractions.expectErrorMessage(LoginValidationConstants_1.LOGIN_ERROR_MESSAGES.USERNAME_NOT_FOUND);
    }
    async attemptLoginWithWhitespaceUsername() {
        await this.openMicrosoftLoginForValidation();
        await this.uiInteractions.submitUsername(LoginValidationConstants_1.TEST_DATA.WHITESPACE);
        await this.uiInteractions.expectErrorMessage(LoginValidationConstants_1.LOGIN_ERROR_MESSAGES.EMPTY_USERNAME);
    }
    async attemptLoginWithWhitespacePassword() {
        await this.openMicrosoftLoginForValidation();
        await this.uiInteractions.submitUsername(this.sessionManager.getAdvisorEmail());
        await this.uiInteractions.submitPassword(LoginValidationConstants_1.TEST_DATA.WHITESPACE);
        await this.uiInteractions.expectErrorMessage(LoginValidationConstants_1.LOGIN_ERROR_MESSAGES.INVALID_PASSWORD);
    }
    /* ==================== PRIVATE HELPER METHODS ==================== */
    async prepareForValidation(environment = 'qa') {
        await this.sessionManager.navigateToApplication(environment);
        await this.sessionManager.logoutIfLoggedIn();
        this.logger.info(`Current URL: ${this.page.url()}`);
    }
    async openMicrosoftLoginForValidation() {
        await this.prepareForValidation();
        await this.uiInteractions.expectLoginButtonVisible();
        await this.uiInteractions.clickLoginButton(true);
    }
}
exports.LoginValidationSteps = LoginValidationSteps;
//# sourceMappingURL=LoginValidationSteps.js.map