import { Page } from '@playwright/test';
import { LoginPage } from '@pages/auth/LoginPageLocators';
/**
 * Handles basic login UI interactions
 * Single Responsibility: UI form interactions only
 */
export declare class LoginUIInteractions {
    private readonly page;
    private readonly loginPage;
    constructor(page: Page, loginPage: LoginPage);
    clickLoginButton(waitForMicrosoftPage?: boolean): Promise<void>;
    submitUsername(username?: string): Promise<void>;
    submitPassword(password?: string): Promise<void>;
    expectLoginButtonVisible(): Promise<void>;
    expectUsernameFieldReady(): Promise<void>;
    expectErrorMessage(expectedText: string): Promise<void>;
    private waitForMicrosoftLoginPage;
}
//# sourceMappingURL=LoginUIInteractions.d.ts.map