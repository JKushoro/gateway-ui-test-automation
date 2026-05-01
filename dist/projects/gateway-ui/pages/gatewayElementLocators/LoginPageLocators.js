"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const BasePage_1 = require("@framework/core/BasePage");
class LoginPage extends BasePage_1.BasePage {
    constructor() {
        // ==========================================
        // PRIVATE LOCATORS
        // ==========================================
        super(...arguments);
        this.loginButton = this.page.getByRole('link', { name: 'Login' });
        this.usernameInput = this.page.locator('input#i0116');
        this.passwordInput = this.page.locator('input#i0118');
        this.primaryButton = this.page.locator('input#idSIButton9');
        this.microsoftErrorMessage = this.page.locator('[role="alert"]');
        this.loadingIndicator = this.page.locator('.loading, .spinner');
        this.dashboardIndicator = this.page.locator('[data-testid="dashboard"]');
        this.userMenuIndicator = this.page.locator('[data-testid="user-menu"]');
        this.logoutButton = this.page.getByRole('link', { name: 'Log out' });
    }
    // ==========================================
    // PAGE IDENTIFICATION
    // ==========================================
    // ==========================================
    // LOCATOR GETTERS
    // ==========================================
    getLoginButtonLocator() {
        return this.loginButton;
    }
    getUsernameInputLocator() {
        return this.usernameInput;
    }
    getLogoutButtonLocator() {
        return this.logoutButton;
    }
    getPasswordInputLocator() {
        return this.passwordInput;
    }
    getPrimaryButtonLocator() {
        return this.primaryButton;
    }
    getErrorMessageLocator() {
        return this.microsoftErrorMessage;
    }
    getLoadingIndicatorLocator() {
        return this.loadingIndicator;
    }
    getDashboardIndicatorLocator() {
        return this.dashboardIndicator;
    }
    getUserMenuIndicatorLocator() {
        return this.userMenuIndicator;
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPageLocators.js.map