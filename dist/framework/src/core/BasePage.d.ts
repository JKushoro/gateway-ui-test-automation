import { Page } from '@playwright/test';
import { FrameworkConfig } from '../types';
import { WaitHelper } from '../helpers/WaitHelper';
import { ActionHelper } from '../helpers/ActionHelper';
import { AssertionHelper } from '../helpers/AssertionHelper';
import { LocatorHelper } from '../helpers/LocatorHelper';
import { TableHelper } from '../helpers/TableHelper';
import { ILogger } from '../utils/Logger';
/**
 * 🏗️ Simple Base Page Class
 *
 * A clean, easy-to-understand base class that follows SOLID principles:
 * - Single Responsibility: Provides core page functionality
 * - Open/Closed: Easy to extend with new functionality
 * - Simple to use: Pre-configured helpers for common tasks
 *
 * This class eliminates code duplication and provides a consistent
 * foundation for all page objects and step classes.
 *
 * @example Basic usage
 * ```typescript
 * class LoginPage extends BasePage {
 *   private emailInput = this.page.locator('#email');
 *   private passwordInput = this.page.locator('#password');
 *   private loginButton = this.page.locator('#login-button');
 *
 *   async login(email: string, password: string): Promise<void> {
 *     await this.action.fillInput(this.emailInput, email);
 *     await this.action.fillInput(this.passwordInput, password);
 *     await this.action.clickLocator(this.loginButton);
 *   }
 * }
 * ```
 */
export declare class BasePage {
    /** Playwright page instance */
    protected readonly page: Page;
    /** Framework configuration */
    protected readonly config: Partial<FrameworkConfig>;
    /** Logger for this class */
    protected readonly logger: ILogger;
    /** Wait for elements and conditions */
    protected readonly wait: WaitHelper;
    /** Perform UI actions (click, type, fill, etc.) */
    protected readonly action: ActionHelper;
    /** Find elements on the page */
    protected readonly locate: LocatorHelper;
    /** Assert element states and conditions */
    protected readonly assert: AssertionHelper;
    /** Work with tables and data grids */
    protected readonly table: TableHelper;
    /**
     * Creates a new BasePage instance with all helpers pre-configured
     *
     * @param page - Playwright page instance
     * @param config - Optional framework configuration
     *
     * @example
     * ```typescript
     * const loginPage = new LoginPage(page, { timeout: 10000 });
     * ```
     */
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Try to perform an action, but don't fail if it doesn't work
     * Useful for optional UI elements that might not be present
     *
     * @param action - The action to try
     * @param description - Description for logging (optional)
     *
     * @example
     * ```typescript
     * // Try to close a popup that might not be there
     * await this.tryAction(
     *   () => this.action.clickLocator(this.page.locator('.popup-close')),
     *   'closing optional popup'
     * );
     * ```
     */
    protected tryAction(action: () => Promise<void>, description?: string): Promise<void>;
    /**
     * Retry an action multiple times if it fails
     *
     * @param action - The action to retry
     * @param maxRetries - Maximum number of attempts (default: 3)
     * @param delayMs - Delay between retries in milliseconds (default: 1000)
     * @param description - Description for logging (optional)
     *
     * @example
     * ```typescript
     * // Retry clicking a button that might be temporarily disabled
     * await this.retryAction(
     *   () => this.action.clickLocator(this.submitButton),
     *   3,
     *   1000,
     *   'clicking submit button'
     * );
     * ```
     */
    protected retryAction(action: () => Promise<void>, maxRetries?: number, delayMs?: number, description?: string): Promise<void>;
    /**
     * Navigate to a specific URL
     *
     * @param url - URL to navigate to
     * @param waitForLoad - Whether to wait for page load (default: true)
     *
     * @example
     * ```typescript
     * await this.navigateTo('/login');
     * await this.navigateTo('https://example.com', false); // Don't wait for load
     * ```
     */
    protected navigateTo(url: string, waitForLoad?: boolean): Promise<void>;
    /**
     * Wait for the page to fully load
     *
     * @param timeoutMs - Custom timeout in milliseconds (optional)
     *
     * @example
     * ```typescript
     * await this.waitForPageLoad();
     * await this.waitForPageLoad(10000); // Custom 10 second timeout
     * ```
     */
    protected waitForPageLoad(timeoutMs?: number): Promise<void>;
    /**
     * Get the current page title
     *
     * @returns The page title
     *
     * @example
     * ```typescript
     * const title = await this.getPageTitle();
     * console.log(`Current page: ${title}`);
     * ```
     */
    protected getPageTitle(): Promise<string>;
    /**
     * Get the current page URL
     *
     * @returns The current URL
     *
     * @example
     * ```typescript
     * const url = await this.getCurrentUrl();
     * console.log(`Current URL: ${url}`);
     * ```
     */
    protected getCurrentUrl(): Promise<string>;
    /**
     * Take a screenshot for debugging
     *
     * @param name - Name for the screenshot file (optional)
     * @returns Path to the screenshot file
     *
     * @example
     * ```typescript
     * await this.takeScreenshot('login-page');
     * await this.takeScreenshot(); // Uses timestamp as name
     * ```
     */
    protected takeScreenshot(name?: string): Promise<string>;
    /**
     * @deprecated Use tryAction instead
     * @todo Remove in v2.0.0
     */
    protected try(fn: () => Promise<void>, context?: string): Promise<void>;
}
//# sourceMappingURL=BasePage.d.ts.map