import { Locator, Page, Response } from '@playwright/test';
import { FrameworkConfig } from '../types';
/**
 * Professional WaitHelper with comprehensive waiting strategies
 * Self-contained with configurable options and no external dependencies
 */
export declare class WaitHelper {
    private page;
    private readonly config;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Wait for element to be visible
     */
    waitForElement(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for element to be hidden
     */
    waitForElementToBeHidden(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for element to be attached to DOM
     */
    waitForElementToBeAttached(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for element to be detached from DOM
     */
    waitForElementToBeDetached(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for selector to be visible
     */
    waitForVisible(target: string | Locator, timeout?: number): Promise<void>;
    /**
     * Wait for selector to be hidden
     */
    waitForHidden(selector: string, timeout?: number): Promise<void>;
    /**
     * Wait for custom function to return truthy value
     */
    waitForFunction(fn: (arg: any) => unknown, arg: any, timeout?: number): Promise<void>;
    /**
     * Wait for locator to have specific count
     */
    waitForLocatorToHaveCount(locator: Locator, expectedCount: number, timeout?: number): Promise<void>;
    /**
     * Wait for locator to be hidden (alias for consistency)
     */
    waitForLocatorToBeHidden(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for locator to be detached (alias for consistency)
     */
    waitForLocatorToBeDetached(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for new tab/page to open
     */
    waitForNewTab(clickAction: () => Promise<void>): Promise<Page>;
    /**
     * Wait for page to load completely
     */
    waitForPageLoad(url?: string, waitUntil?: 'load' | 'domcontentloaded' | 'networkidle'): Promise<Response | null>;
    /**
     * Wait for network to be idle
     */
    waitForNetworkIdle(timeout?: number): Promise<void>;
    /**
     * Wait for DOM content to be loaded
     */
    waitForDOMContentLoaded(timeout?: number): Promise<void>;
    /**
     * Wait for page title to contain specific text
     */
    waitForTitleToContain(partialTitle: string, timeout?: number): Promise<void>;
    /**
     * Wait for URL to change from original
     */
    waitForUrlToChangeFrom(originalUrl: string, timeout?: number): Promise<void>;
    /**
     * Wait for a CSS/XPath selector to be visible
     */
    waitForSelectorVisible(selector: string, timeout?: number): Promise<void>;
    /**
     * Wait for URL to match pattern
     */
    waitForUrlToMatch(urlPattern: string | RegExp, timeout?: number): Promise<void>;
    /**
     * Wait for element to have specific text
     */
    waitForElementToHaveText(locator: Locator, expectedText: string, timeout?: number): Promise<void>;
    /**
     * Wait for element to contain specific text
     */
    waitForElementToContainText(locator: Locator, expectedText: string, timeout?: number): Promise<void>;
    /**
     * Wait for element to have specific attribute value
     */
    waitForElementToHaveAttribute(locator: Locator, attribute: string, value: string, timeout?: number): Promise<void>;
    /**
     * Wait for element to be enabled
     */
    waitForElementToBeEnabled(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for element to be disabled
     */
    waitForElementToBeDisabled(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for element to be checked (for checkboxes/radio buttons)
     */
    waitForElementToBeChecked(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for element to be unchecked
     */
    waitForElementToBeUnchecked(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for specific timeout (use sparingly)
     */
    waitForTimeout(milliseconds: number): Promise<void>;
    /**
     * Wait for request to complete
     */
    waitForRequest(urlPattern: string | RegExp, timeout?: number): Promise<void>;
    /**
     * Wait for response to complete
     */
    waitForResponse(urlPattern: string | RegExp, timeout?: number): Promise<Response>;
    /**
     * Wait for console message
     */
    waitForConsoleMessage(predicate?: (message: any) => boolean, timeout?: number): Promise<any>;
    /**
     * Wait for download to start
     */
    waitForDownload(clickAction: () => Promise<void>): Promise<any>;
    /**
     * Verify page title contains text (combines wait and assertion)
     */
    verifyPageTitleContains(partialTitle: string, timeout?: number): Promise<void>;
    /**
     * Assert element visible with optional text (combines wait and assertion)
     */
    assertElementVisibleWithOptionalText(locator: Locator, expectedText?: string, timeout?: number): Promise<void>;
    /**
     * Update configuration at runtime
     */
    updateConfig(updates: Partial<FrameworkConfig>): void;
    /**
     * Wait for loading indicators to disappear
     */
    waitForLoadingToComplete(): Promise<void>;
    /**
     * Wait for form elements to be ready for interaction
     */
    waitForFormElementReady(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for input field to be ready and clear any existing value
     */
    waitForInputReady(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for dropdown to be populated with options
     */
    waitForDropdownPopulated(locator: Locator, minOptions?: number, timeout?: number): Promise<void>;
    /**
     * Wait for MUI/React dropdown to be ready
     */
    waitForMuiDropdownReady(comboboxLocator: Locator, timeout?: number): Promise<void>;
    /**
     * Wait for data generation to complete (simulated delay)
     */
    waitForDataGeneration(delayMs?: number): Promise<void>;
    /**
     * Wait for element to be stable (not moving/changing)
     */
    waitForElementStable(locator: Locator, stableTime?: number, timeout?: number): Promise<void>;
    /**
     * Get current timeout setting
     */
    getTimeout(): number;
}
//# sourceMappingURL=WaitHelper.d.ts.map