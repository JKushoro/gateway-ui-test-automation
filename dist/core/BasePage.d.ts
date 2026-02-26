import { Page, Locator } from '@playwright/test';
import { ActionHelper } from '../helpers/ActionHelper';
import { WaitHelper } from '../helpers/WaitHelper';
import { LocatorHelper } from '../helpers/LocatorHelper';
import { AssertionHelper } from '../helpers/AssertionHelper';
/**
 * Base page class that provides common functionality for all page objects
 * Follows the Page Object Model pattern with helper composition
 */
export declare abstract class BasePage {
    protected readonly page: Page;
    protected readonly actionHelper: ActionHelper;
    protected readonly waitHelper: WaitHelper;
    protected readonly locatorHelper: LocatorHelper;
    protected readonly assertionHelper: AssertionHelper;
    protected readonly baseUrl: string;
    constructor(page: Page);
    /**
     * Navigate to the page's URL
     * Should be implemented by each page class
     */
    abstract navigate(): Promise<void>;
    /**
     * Wait for the page to be loaded
     * Should be implemented by each page class to wait for key elements
     */
    abstract waitForPageLoad(): Promise<void>;
    /**
     * Verify that we're on the correct page
     * Should be implemented by each page class
     */
    abstract isPageLoaded(): Promise<boolean>;
    /**
     * Get the page instance
     */
    getPage(): Page;
    /**
     * Get the base URL
     */
    getBaseUrl(): string;
    /**
     * Navigate to a specific URL
     */
    navigateToUrl(url: string): Promise<void>;
    /**
     * Navigate to a relative path from base URL
     */
    navigateToPath(path: string): Promise<void>;
    /**
     * Get current URL
     */
    getCurrentUrl(): string;
    /**
     * Get page title
     */
    getPageTitle(): Promise<string>;
    /**
     * Take a screenshot
     */
    takeScreenshot(name?: string): Promise<Buffer>;
    /**
     * Wait for network to be idle
     */
    waitForNetworkIdle(): Promise<void>;
    /**
     * Reload the page
     */
    reload(): Promise<void>;
    /**
     * Go back in browser history
     */
    goBack(): Promise<void>;
    /**
     * Go forward in browser history
     */
    goForward(): Promise<void>;
    /**
     * Execute JavaScript in the page context
     */
    executeScript<T>(script: string, ...args: any[]): Promise<T>;
    /**
     * Clear browser storage
     */
    clearStorage(): Promise<void>;
    /**
     * Set viewport size
     */
    setViewportSize(width: number, height: number): Promise<void>;
    /**
     * Get all locators for common elements that might exist on any page
     */
    protected getCommonLocators(): {
        loadingSpinner: Locator;
        errorMessage: Locator;
        successMessage: Locator;
        modal: Locator;
        closeButton: Locator;
    };
    /**
     * Wait for loading to complete
     */
    waitForLoadingToComplete(): Promise<void>;
    /**
     * Close any open modals
     */
    closeModal(): Promise<void>;
}
//# sourceMappingURL=BasePage.d.ts.map