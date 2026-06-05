import { Page, Locator } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
/**
 * Microsoft Login Page Locators
 * Contains all element selectors for Microsoft AAD login flow
 */
export declare class MicrosoftLoginPageLocators extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    get loginButton(): Locator;
    get usernameInput(): Locator;
    get passwordInput(): Locator;
    get nextButton(): Locator;
    get signInButton(): Locator;
    get otpInput(): Locator;
    get staySignedInPrompt(): Locator;
    get noButton(): Locator;
    get yesButton(): Locator;
    get dashboardIndicator(): Locator;
    get logoutButton(): Locator;
}
//# sourceMappingURL=MicrosoftLoginPageLocators.d.ts.map