import { Locator } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
export declare class LoginPage extends BasePage {
    private readonly loginButton;
    private readonly usernameInput;
    private readonly passwordInput;
    private readonly primaryButton;
    private readonly microsoftErrorMessage;
    private readonly loadingIndicator;
    private readonly dashboardIndicator;
    private readonly userMenuIndicator;
    private readonly logoutButton;
    getLoginButtonLocator(): Locator;
    getUsernameInputLocator(): Locator;
    getLogoutButtonLocator(): Locator;
    getPasswordInputLocator(): Locator;
    getPrimaryButtonLocator(): Locator;
    getErrorMessageLocator(): Locator;
    getLoadingIndicatorLocator(): Locator;
    getDashboardIndicatorLocator(): Locator;
    getUserMenuIndicatorLocator(): Locator;
}
//# sourceMappingURL=LoginPageLocators.d.ts.map