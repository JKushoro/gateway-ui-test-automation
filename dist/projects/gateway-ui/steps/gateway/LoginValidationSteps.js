"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidationSteps = void 0;
// projects/gateway-ui/steps/LoginValidationSteps.ts
const SharedImports_1 = require("../../shared/SharedImports");
const LoginPageLocators_1 = require("@pages/gatewayElementLocators/LoginPageLocators");
const LoginSteps_1 = require("./LoginSteps");
const test_1 = require("@playwright/test");
/**
 * LoginValidationSteps - LOGIN TESTS / VALIDATIONS ONLY
 * - Negative tests
 * - Security payload tests
 * - Focus / back button behaviour
 *
 * Page object contains locators only.
 * All logic stays in this steps class.
 */
class LoginValidationSteps extends SharedImports_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.envManager = (0, SharedImports_1.getEnvironmentManager)();
        this.login = new LoginSteps_1.LoginSteps(page, config);
        this.loginPage = new LoginPageLocators_1.LoginPage(page, config);
        this.authService = new SharedImports_1.AuthenticationService(page, config);
    }
    /* -------------------- Small shared helpers -------------------- */
    /**
     * Navigate to application and open Microsoft login page.
     */
    async openMicrosoftLogin() {
        await this.authService.navigateToApplication();
        await this.authService.startMicrosoftLogin();
    }
    /**
     * Submit username step (optionally blank).
     */
    async submitUsername(username) {
        await this.authService.submitUsername(username ?? '');
    }
    /**
     * Submit password step (optionally blank).
     */
    async submitPassword(password) {
        await this.authService.submitPassword(password ?? '');
    }
    /**
     * Verify Microsoft error message is displayed with expected text.
     */
    async expectErrorText(expected) {
        await (0, test_1.expect)(this.loginPage.getErrorMessageLocator()).toHaveText(expected);
    }
    /**
     * Get advisor email from environment configuration.
     */
    getAdvisorEmailOrThrow(environment = 'qa') {
        return this.envManager.getAdvisorEmail(environment);
    }
    /**
     * Check if user is currently logged in using UI indicators.
     */
    async isUserLoggedIn() {
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
    async logoutIfLoggedIn() {
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
    async expectLoginButtonVisible() {
        await (0, test_1.expect)(this.loginPage.getLoginButtonLocator()).toBeVisible();
    }
    /**
     * Click login button and wait for username field.
     */
    async clickLoginButton() {
        await this.loginPage.getLoginButtonLocator().click();
        await (0, test_1.expect)(this.loginPage.getUsernameInputLocator()).toBeVisible();
    }
    /**
     * Verify username input is visible and enabled.
     */
    async expectUsernameFieldReady() {
        await (0, test_1.expect)(this.loginPage.getUsernameInputLocator()).toBeVisible();
        await (0, test_1.expect)(this.loginPage.getUsernameInputLocator()).toBeEnabled();
    }
    /* -------------------- UI validations -------------------- */
    /**
     * Verify login button is present and functional.
     */
    async verifyLoginButtonPresent() {
        await this.login.navigateToApplication();
        await this.logoutIfLoggedIn();
        this.logger.info(`Current URL: ${this.page.url()}`);
        await this.expectLoginButtonVisible();
        await this.clickLoginButton();
    }
    /**
     * Verify user is redirected to Microsoft login page.
     */
    async verifyRedirectToMicrosoftLogin() {
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
    async attemptLoginWithInvalidUsername() {
        await this.openMicrosoftLogin();
        await this.submitUsername('invalid.user@fairstone.co.uk');
        await this.expectErrorText('This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.');
    }
    /**
     * Attempt login with invalid password and verify error.
     */
    async attemptLoginWithInvalidPassword() {
        await this.openMicrosoftLogin();
        await this.submitUsername(this.getAdvisorEmailOrThrow());
        await this.submitPassword('InvalidPassword123');
        await this.expectErrorText("Your account or password is incorrect. If you don't remember your password, reset it now.");
    }
    /**
     * Attempt login with empty username and verify validation error.
     */
    async attemptLoginWithEmptyUsername() {
        await this.openMicrosoftLogin();
        await this.submitUsername();
        await this.expectErrorText('Enter a valid email address, phone number, or Skype name.');
    }
    /**
     * Attempt login with empty password and verify validation error.
     */
    async attemptLoginWithEmptyPassword() {
        await this.openMicrosoftLogin();
        await this.submitUsername(this.getAdvisorEmailOrThrow());
        await this.submitPassword();
        await this.expectErrorText('Please enter your password.');
    }
    /**
     * Attempt login with malformed email and verify error.
     */
    async attemptLoginWithMalformedEmail() {
        await this.openMicrosoftLogin();
        await this.submitUsername('invalid-email-format');
        await this.expectErrorText("We couldn't find an account with that username.");
    }
    /**
     * Attempt login with SQL injection payload.
     */
    async attemptLoginWithSQLInjection() {
        await this.openMicrosoftLogin();
        await this.submitUsername("admin'; DROP TABLE users; --");
        await this.expectErrorText('Enter a valid email address, phone number, or Skype name.');
    }
    /**
     * Attempt login with XSS payload.
     */
    async attemptLoginWithXSSPayload() {
        await this.openMicrosoftLogin();
        await this.submitUsername("<script>alert('XSS')</script>");
        await this.expectErrorText('Enter a valid email address, phone number, or Skype name.');
    }
    /**
     * Attempt login with excessively long username.
     */
    async attemptLoginWithLongUsername() {
        await this.openMicrosoftLogin();
        const longUsername = `${'a'.repeat(500)}@fairstone.co.uk`;
        await this.submitUsername(longUsername);
        await this.expectErrorText("We couldn't find an account with that username.");
    }
    /**
     * Attempt login with special characters in username.
     */
    async attemptLoginWithSpecialCharacters() {
        await this.openMicrosoftLogin();
        await this.submitUsername('user@#$%^&*()fairstone.co.uk');
        await this.expectErrorText("We couldn't find an account with that username.");
    }
    /**
     * Attempt login with whitespace username.
     */
    async attemptLoginWithWhitespaceUsername() {
        await this.openMicrosoftLogin();
        await this.submitUsername('   ');
        await this.expectErrorText('Enter a valid email address, phone number, or Skype name.');
    }
    /**
     * Attempt login with whitespace password.
     */
    async attemptLoginWithWhitespacePassword() {
        await this.openMicrosoftLogin();
        await this.submitUsername(this.getAdvisorEmailOrThrow());
        await this.submitPassword('   ');
        await this.expectErrorText("Your account or password is incorrect. If you don't remember your password, reset it now.");
    }
    /* -------------------- Browser behaviour -------------------- */
    /**
     * Verify username field is focused and ready.
     */
    async verifyLoginFormFocus() {
        await this.openMicrosoftLogin();
        await this.expectUsernameFieldReady();
        this.logger.info('Username field is ready for input');
    }
    /**
     * Verify browser back navigation returns user to app.
     */
    async verifyBrowserBackButton() {
        await this.login.navigateToApplication();
        const originalUrl = this.page.url();
        await this.login.startMicrosoftLogin();
        await this.page.waitForURL(/login\.microsoftonline\.com/, { timeout: 10000 });
        try {
            await this.page.goto(originalUrl, { waitUntil: 'networkidle' });
        }
        catch {
            try {
                await this.page.goBack({ waitUntil: 'domcontentloaded', timeout: 5000 });
            }
            catch {
                await this.page.goto(originalUrl);
            }
        }
        await this.page.waitForURL(url => !url.toString().includes('login.microsoftonline.com'), {
            timeout: 10000,
        });
        await this.expectLoginButtonVisible();
    }
}
exports.LoginValidationSteps = LoginValidationSteps;
//# sourceMappingURL=LoginValidationSteps.js.map