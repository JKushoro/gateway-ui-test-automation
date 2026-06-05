"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = exports.LoginPageLocators = void 0;
const BasePage_1 = require("@framework/core/BasePage");
/**
 * LoginPageLocators - Provides element locators for login-related pages
 *
 * Single Responsibility: Centralized locator management for login workflows
 * Covers both application login page and Microsoft OAuth page elements
 */
class LoginPageLocators extends BasePage_1.BasePage {
    constructor() {
        /* ==================== APPLICATION LOGIN PAGE ==================== */
        super(...arguments);
        this.loginButton = this.page.getByRole('link', { name: 'Login' });
        this.logoutButton = this.page.getByRole('link', { name: 'Log out' });
        /* ==================== MICROSOFT OAUTH PAGE ==================== */
        this.usernameInput = this.page.locator('input#i0116');
        this.passwordInput = this.page.locator('input#i0118');
        this.primaryButton = this.page.locator('input#idSIButton9');
        this.errorMessage = this.page.locator('[role="alert"]');
        /* ==================== DASHBOARD/SESSION INDICATORS ==================== */
        this.dashboardIndicator = this.page.locator('[data-testid="dashboard"]');
        this.userMenuIndicator = this.page.locator('[data-testid="user-menu"]');
        this.loadingIndicator = this.page.locator('.loading, .spinner');
    }
    /* ==================== PUBLIC LOCATOR GETTERS ==================== */
    // Application Login Elements
    getLoginButtonLocator() {
        return this.loginButton;
    }
    getLogoutButtonLocator() {
        return this.logoutButton;
    }
    // Microsoft OAuth Elements
    getUsernameInputLocator() {
        return this.usernameInput;
    }
    getPasswordInputLocator() {
        return this.passwordInput;
    }
    getPrimaryButtonLocator() {
        return this.primaryButton;
    }
    getErrorMessageLocator() {
        return this.errorMessage;
    }
    // Session State Elements
    getDashboardIndicatorLocator() {
        return this.dashboardIndicator;
    }
    getUserMenuIndicatorLocator() {
        return this.userMenuIndicator;
    }
    getLoadingIndicatorLocator() {
        return this.loadingIndicator;
    }
}
exports.LoginPageLocators = LoginPageLocators;
// Backward compatibility - can be removed after updating all imports
class LoginPage extends LoginPageLocators {
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPageLocators.js.map