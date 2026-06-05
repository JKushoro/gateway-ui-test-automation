"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUIInteractions = void 0;
const test_1 = require("@playwright/test");
const LoginValidationConstants_1 = require("./LoginValidationConstants");
/**
 * Handles basic login UI interactions
 * Single Responsibility: UI form interactions only
 */
class LoginUIInteractions {
    constructor(page, loginPage) {
        this.page = page;
        this.loginPage = loginPage;
    }
    async clickLoginButton(waitForMicrosoftPage = false) {
        await this.loginPage.getLoginButtonLocator().click();
        if (waitForMicrosoftPage) {
            await this.waitForMicrosoftLoginPage();
        }
    }
    async submitUsername(username = '') {
        await (0, test_1.expect)(this.loginPage.getUsernameInputLocator())
            .toBeVisible({ timeout: LoginValidationConstants_1.TIMEOUTS.ELEMENT_VISIBILITY });
        await this.loginPage.getUsernameInputLocator().fill(username);
        await this.loginPage.getPrimaryButtonLocator().click();
        await this.page.waitForTimeout(LoginValidationConstants_1.TIMEOUTS.FORM_SUBMISSION);
    }
    async submitPassword(password = '') {
        await (0, test_1.expect)(this.loginPage.getPasswordInputLocator())
            .toBeVisible({ timeout: LoginValidationConstants_1.TIMEOUTS.ELEMENT_VISIBILITY });
        await this.loginPage.getPasswordInputLocator().fill(password);
        await this.loginPage.getPrimaryButtonLocator().click();
        await this.page.waitForTimeout(LoginValidationConstants_1.TIMEOUTS.FORM_SUBMISSION);
    }
    async expectLoginButtonVisible() {
        await (0, test_1.expect)(this.loginPage.getLoginButtonLocator()).toBeVisible();
    }
    async expectUsernameFieldReady() {
        await (0, test_1.expect)(this.loginPage.getUsernameInputLocator()).toBeVisible();
        await (0, test_1.expect)(this.loginPage.getUsernameInputLocator()).toBeEnabled();
    }
    async expectErrorMessage(expectedText) {
        await (0, test_1.expect)(this.loginPage.getErrorMessageLocator()).toHaveText(expectedText);
    }
    async waitForMicrosoftLoginPage() {
        await this.page.waitForURL(/login\.microsoftonline\.com/, {
            timeout: LoginValidationConstants_1.TIMEOUTS.URL_NAVIGATION
        });
        await (0, test_1.expect)(this.loginPage.getUsernameInputLocator())
            .toBeVisible({ timeout: LoginValidationConstants_1.TIMEOUTS.ELEMENT_VISIBILITY });
    }
}
exports.LoginUIInteractions = LoginUIInteractions;
//# sourceMappingURL=LoginUIInteractions.js.map