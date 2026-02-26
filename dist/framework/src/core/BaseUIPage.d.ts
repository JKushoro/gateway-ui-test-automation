import { Page, Locator } from '@playwright/test';
import { WaitHelper } from '../helpers/WaitHelper';
import { FrameworkConfig } from '../types';
/**
 * Abstract Base UI Page Class
 * Provides common functionality and enforces proper OOP structure for all page objects
 *
 * Key OOP Principles:
 * - Encapsulation: Protected members, private implementation details
 * - Inheritance: Common functionality in base class
 * - Abstraction: Abstract methods that must be implemented by subclasses
 * - Polymorphism: Consistent interface across all page objects
 */
export declare abstract class BaseUIPage {
    protected readonly page: Page;
    protected readonly waitHelper: WaitHelper;
    protected readonly config: Partial<FrameworkConfig>;
    protected abstract readonly pageUrl: string;
    protected abstract readonly pageIdentifier: string;
    protected constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Navigate to this page
     * Template method pattern - provides common navigation logic
     */
    navigate(): Promise<void>;
    /**
     * Wait for page to load - can be overridden for specific page requirements
     * Template method pattern with hook for customization
     */
    waitForPageLoad(): Promise<void>;
    /**
     * Hook method for subclasses to wait for page-specific elements
     * Default implementation does nothing - override as needed
     */
    protected waitForPageSpecificElements(): Promise<void>;
    /**
     * Check if page is loaded
     */
    isPageLoaded(): Promise<boolean>;
    /**
     * Get the page instance - provides access to underlying Playwright page
     */
    getPage(): Page;
    /**
     * Get current URL
     */
    getCurrentUrl(): string;
    /**
     * Get page title
     */
    getPageTitle(): Promise<string>;
    /**
     * Abstract method to get page-specific validation elements
     * Must be implemented by each page class to define what makes the page "loaded"
     */
    protected abstract getValidationElements(): Locator[];
    /**
     * Validate that all critical page elements are present
     * Uses the validation elements defined by subclasses
     */
    validatePageElements(): Promise<boolean>;
}
//# sourceMappingURL=BaseUIPage.d.ts.map