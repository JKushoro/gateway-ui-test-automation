import { Locator, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
/**
 * LoginPage - Page Object Model for the login functionality
 * Implements proper OOP principles with encapsulation and abstraction
 */
export declare class LoginPage extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    private readonly loginButtonLocator;
    private readonly usernameInputLocator;
    private readonly passwordInputLocator;
    private readonly primaryButtonLocator;
    get loginButton(): Locator;
    get usernameInput(): Locator;
    get nextButton(): Locator;
    get passwordInput(): Locator;
    get signInButton(): Locator;
}
//# sourceMappingURL=LoginPage.d.ts.map