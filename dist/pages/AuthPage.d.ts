import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * AuthPage - Page Object Model for OAuth authentication
 * Handles Microsoft OAuth login flow that redirects to Development Dashboard
 */
export declare class AuthPage extends BasePage {
    constructor(page: Page);
    get locators(): {
        microsoftLoginButton: import("playwright-core").Locator;
        loadingSpinner: import("playwright-core").Locator;
        fairstoneLogo: import("playwright-core").Locator;
        fairstoneGroup: import("playwright-core").Locator;
    };
    /**
     * Navigate to the QA authentication page
     */
    navigate(): Promise<void>;
    /**
     * Wait for authentication page to load
     */
    waitForPageLoad(): Promise<void>;
    /**
     * Check if we're on the authentication page
     */
    isPageLoaded(): Promise<boolean>;
    /**
     * Click the Microsoft OAuth login button
     */
    clickLogin(): Promise<void>;
    /**
     * Wait for loading spinner to appear and disappear
     */
    waitForLoadingToComplete(): Promise<void>;
    /**
     * Check if loading spinner is displayed
     */
    isLoadingSpinnerDisplayed(): Promise<boolean>;
    /**
     * Perform OAuth login and wait for redirect to dashboard
     */
    performOAuthLogin(): Promise<void>;
    /**
     * Handle Microsoft OAuth authentication flow
     */
    private handleMicrosoftOAuth;
    /**
     * Get the current page URL
     */
    getCurrentUrl(): string;
    /**
     * Check if we're still on the auth page (login failed)
     */
    isStillOnAuthPage(): Promise<boolean>;
}
//# sourceMappingURL=AuthPage.d.ts.map