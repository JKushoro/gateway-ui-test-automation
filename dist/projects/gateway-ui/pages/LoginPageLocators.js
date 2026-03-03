"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPageLocators = void 0;
const BasePage_1 = require("@framework/core/BasePage");
/**
 * LoginPageLocators - Page Object Model for the login functionality
 * Implements proper OOP principles with encapsulation and abstraction
 */
class LoginPageLocators extends BasePage_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
        // Private locators
        this.loginButtonLocator = this.page.getByRole('link', { name: 'Login' });
        this.usernameInputLocator = this.page.locator('input#i0116');
        this.passwordInputLocator = this.page.locator('input#i0118');
        this.primaryButtonLocator = this.page.locator('input#idSIButton9');
        this.errorMessageLocator = this.page.locator('[data-bind*="error"]').first();
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
    get errorMessage() {
        return this.errorMessageLocator;
    }
}
exports.LoginPageLocators = LoginPageLocators;
//# sourceMappingURL=LoginPageLocators.js.map