import { Locator } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
/**
 * LoginPageLocators - Provides element locators for login-related pages
 *
 * Single Responsibility: Centralized locator management for login workflows
 * Covers both application login page and Microsoft OAuth page elements
 */
export declare class LoginPageLocators extends BasePage {
    private readonly loginButton;
    private readonly logoutButton;
    private readonly usernameInput;
    private readonly passwordInput;
    private readonly primaryButton;
    private readonly errorMessage;
    private readonly dashboardIndicator;
    private readonly userMenuIndicator;
    private readonly loadingIndicator;
    getLoginButtonLocator(): Locator;
    getLogoutButtonLocator(): Locator;
    getUsernameInputLocator(): Locator;
    getPasswordInputLocator(): Locator;
    getPrimaryButtonLocator(): Locator;
    getErrorMessageLocator(): Locator;
    getDashboardIndicatorLocator(): Locator;
    getUserMenuIndicatorLocator(): Locator;
    getLoadingIndicatorLocator(): Locator;
}
export declare class LoginPage extends LoginPageLocators {
}
//# sourceMappingURL=LoginPageLocators.d.ts.map