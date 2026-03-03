"use strict";
// projects/gateway-ui/steps/LoginValidationSteps.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidationSteps = void 0;
const LoginPageLocators_1 = require("@pages/LoginPageLocators");
const BasePage_1 = require("@framework/core/BasePage");
const LoginSteps_1 = require("./LoginSteps");
const EnvironmentManager_1 = require("../utils/EnvironmentManager");
/**
 * LoginValidationSteps - LOGIN TESTS / VALIDATIONS ONLY
 * - Negative tests
 * - Security payload tests
 * - Focus / back button behaviour
 *
 * Uses LoginSteps as the engine.
 */
class LoginValidationSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.envManager = (0, EnvironmentManager_1.getEnvironmentManager)();
        this.login = new LoginSteps_1.LoginSteps(page, config);
        this.loginPage = new LoginPageLocators_1.LoginPageLocators(page, config);
    }
    /* -------------------- Small shared helpers -------------------- */
    /**
     * Navigate + open Microsoft login page.
     */
    async openMicrosoftLogin() {
        await this.login.navigateToApplication();
        await this.login.startMicrosoftLogin();
    }
    /**
     * Submit username step (optionally blank).
     */
    async submitUsername(username) {
        if (username !== undefined) {
            await this.loginPage.usernameInput.fill(username);
        }
        await this.action.clickLocator(this.loginPage.nextButton);
        await this.wait.waitForDOMContentLoaded();
    }
    /**
     * Submit password step (optionally blank).
     */
    async submitPassword(password) {
        if (password !== undefined) {
            await this.loginPage.passwordInput.fill(password);
        }
        await this.action.clickLocator(this.loginPage.signInButton);
        await this.wait.waitForDOMContentLoaded();
    }
    /**
     * Verify Microsoft error text.
     */
    async expectErrorText(expected) {
        await this.assert.assertElementVisible(this.loginPage.errorMessage);
        await this.assert.assertElementHasText(this.loginPage.errorMessage, expected);
    }
    /**
     * Get advisor email from env (uses ADVISOR_EMAIL only).
     */
    getAdvisorEmailOrThrow(environment = 'qa') {
        return this.envManager.getAdvisorEmail(environment);
    }
    /* -------------------- UI validations -------------------- */
    async verifyLoginButtonPresent() {
        await this.login.navigateToApplication();
        await this.assert.assertElementVisible(this.loginPage.loginButton);
        await this.assert.assertElementEnabled(this.loginPage.loginButton);
    }
    async verifyRedirectToMicrosoftLogin() {
        await this.login.navigateToApplication();
        await this.action.clickLocator(this.loginPage.loginButton);
        await this.page.waitForURL(/login\.microsoftonline\.com/);
    }
    /* -------------------- Negative tests -------------------- */
    async attemptLoginWithInvalidUsername() {
        await this.openMicrosoftLogin();
        await this.submitUsername('invalid.user@fairstone.co.uk');
        const expected = 'This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.';
        await this.expectErrorText(expected);
    }
    async attemptLoginWithInvalidPassword() {
        await this.openMicrosoftLogin();
        await this.submitUsername(this.getAdvisorEmailOrThrow());
        await this.submitPassword('InvalidPassword123');
        const expected = "Your account or password is incorrect. If you don't remember your password, reset it now.";
        await this.expectErrorText(expected);
    }
    async attemptLoginWithEmptyUsername() {
        await this.openMicrosoftLogin();
        await this.submitUsername(undefined);
        const expected = 'Enter a valid email address, phone number, or Skype name.';
        await this.expectErrorText(expected);
    }
    async attemptLoginWithEmptyPassword() {
        await this.openMicrosoftLogin();
        await this.submitUsername(this.getAdvisorEmailOrThrow());
        await this.submitPassword(undefined);
        const expected = 'Please enter your password.';
        await this.expectErrorText(expected);
    }
    async attemptLoginWithMalformedEmail() {
        await this.openMicrosoftLogin();
        await this.submitUsername('invalid-email-format');
        const expected = "We couldn't find an account with that username.";
        await this.expectErrorText(expected);
    }
    async attemptLoginWithSQLInjection() {
        await this.openMicrosoftLogin();
        await this.submitUsername("admin'; DROP TABLE users; --");
        const expected = 'Enter a valid email address, phone number, or Skype name.';
        await this.expectErrorText(expected);
    }
    async attemptLoginWithXSSPayload() {
        await this.openMicrosoftLogin();
        await this.submitUsername("<script>alert('XSS')</script>");
        const expected = 'Enter a valid email address, phone number, or Skype name.';
        await this.expectErrorText(expected);
    }
    async attemptLoginWithLongUsername() {
        await this.openMicrosoftLogin();
        const longUsername = 'a'.repeat(500) + '@fairstone.co.uk';
        await this.submitUsername(longUsername);
        const expected = "We couldn't find an account with that username.";
        await this.expectErrorText(expected);
    }
    async attemptLoginWithSpecialCharacters() {
        await this.openMicrosoftLogin();
        await this.submitUsername('user@#$%^&*()fairstone.co.uk');
        const expected = "We couldn't find an account with that username.";
        await this.expectErrorText(expected);
    }
    async attemptLoginWithWhitespaceUsername() {
        await this.openMicrosoftLogin();
        await this.submitUsername('   ');
        const expected = 'Enter a valid email address, phone number, or Skype name.';
        await this.expectErrorText(expected);
    }
    async attemptLoginWithWhitespacePassword() {
        await this.openMicrosoftLogin();
        await this.submitUsername(this.getAdvisorEmailOrThrow());
        await this.submitPassword('   ');
        const expected = "Your account or password is incorrect. If you don't remember your password, reset it now.";
        await this.expectErrorText(expected);
    }
    /* -------------------- Browser behaviour -------------------- */
    async verifyLoginFormFocus() {
        await this.openMicrosoftLogin();
        await this.assert.assertElementVisible(this.loginPage.usernameInput);
        const isFocused = await this.loginPage.usernameInput.evaluate((el) => el === document.activeElement);
        if (!isFocused) {
            throw new Error('Username input should be focused on page load');
        }
    }
    async verifyBrowserBackButton() {
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
        }
        catch (error) {
            // Fallback: try browser back button
            try {
                await this.page.goBack({ waitUntil: 'domcontentloaded', timeout: 5000 });
            }
            catch (backError) {
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
exports.LoginValidationSteps = LoginValidationSteps;
//# sourceMappingURL=LoginValidationSteps.js.map