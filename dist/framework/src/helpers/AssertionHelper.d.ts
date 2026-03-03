import { Locator, Page } from '@playwright/test';
import { FrameworkConfig } from '../types';
/**
 * AssertionHelper with essential assertion methods
 * Focused on methods actually used in UI automation testing
 */
export declare class AssertionHelper {
    private page;
    private readonly config;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Assert element has specific text content
     */
    assertElementHasText(locator: Locator, expectedText: string, timeout?: number): Promise<void>;
    /**
     * Assert element contains specific text
     */
    assertElementContainsText(locator: Locator, expectedText: string, timeout?: number): Promise<void>;
    /**
     * Assert element is visible
     */
    assertElementVisible(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is hidden
     */
    assertElementHidden(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is enabled
     */
    assertElementEnabled(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is disabled
     */
    assertElementDisabled(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is checked (for checkboxes/radio buttons)
     */
    assertElementChecked(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is unchecked
     */
    assertElementUnchecked(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element has specific attribute value
     */
    assertElementHasAttribute(locator: Locator, attribute: string, value: string, timeout?: number): Promise<void>;
    /**
     * Assert element has specific class
     */
    assertElementHasClass(locator: Locator, className: string, timeout?: number): Promise<void>;
    /**
     * Assert input has specific value
     */
    assertInputHasValue(locator: Locator, value: string, timeout?: number): Promise<void>;
    /**
     * Assert element count
     */
    assertElementCount(locator: Locator, count: number, timeout?: number): Promise<void>;
    /**
     * Assert page title
     */
    assertPageTitle(expectedTitle: string, timeout?: number): Promise<void>;
    /**
     * Assert page title contains text
     */
    assertPageTitleContains(partialTitle: string, timeout?: number): Promise<void>;
    /**
     * Assert page URL
     */
    assertPageURL(expectedUrl: string, timeout?: number): Promise<void>;
    /**
     * Assert page URL contains text
     */
    assertPageURLContains(partialUrl: string, timeout?: number): Promise<void>;
    /**
     * Assert element is clickable (visible and enabled)
     */
    assertElementClickable(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Update configuration at runtime
     */
    updateConfig(updates: Partial<FrameworkConfig>): void;
    /**
     * Assert that a page or section title with the given text is visible
     */
    assertHeadingVisible(text: string, timeout?: number): Promise<void>;
    parseFormattedNumber(value: string | null | undefined): number;
    assertFormattedNumberEquals(locator: Locator, expected: number, timeout?: number): Promise<void>;
}
//# sourceMappingURL=AssertionHelper.d.ts.map