"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const BasePage_1 = require("@framework/core/BasePage");
/**
 * LoginPage - Page Object Model for the login functionality
 * Implements proper OOP principles with encapsulation and abstraction
 */
class LoginPage extends BasePage_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
        // Private locators
        this.loginButtonLocator = this.page.getByRole('link', { name: 'Login' });
        this.usernameInputLocator = this.page.locator('input#i0116');
        this.passwordInputLocator = this.page.locator('input#i0118');
        this.primaryButtonLocator = this.page.locator('input#idSIButton9');
    }
    // Public getters
    get loginButton() {
        return this.loginButtonLocator;
    }
    get usernameInput() {
        return this.usernameInputLocator;
    }
    get nextButton() {
        return this.primaryButtonLocator;
    }
    get passwordInput() {
        return this.passwordInputLocator;
    }
    get signInButton() {
        return this.primaryButtonLocator;
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map