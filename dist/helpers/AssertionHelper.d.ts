import { Locator, Page } from '@playwright/test';
/**
 * Enhanced AssertionHelper with comprehensive assertion methods
 * Provides reusable methods for verifying element states and content
 */
export declare class AssertionHelper {
    private page;
    private readonly defaultTimeout;
    constructor(page: Page);
    /**
     * Assert element has exact text
     */
    assertElementHasText(locator: Locator, expectedText: string, timeout?: number): Promise<void>;
    /**
     * Assert element contains text
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
     * Assert element has specific CSS property value
     */
    assertElementHasCSS(locator: Locator, property: string, value: string, timeout?: number): Promise<void>;
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
     * Assert element is attached to DOM
     */
    assertElementAttached(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is detached from DOM
     */
    assertElementDetached(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is editable
     */
    assertElementEditable(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is not editable
     */
    assertElementNotEditable(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is empty
     */
    assertElementEmpty(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is not empty
     */
    assertElementNotEmpty(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is focused
     */
    assertElementFocused(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is not focused
     */
    assertElementNotFocused(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element visible with optional text (combined assertion)
     */
    assertElementVisibleWithOptionalText(locator: Locator, expectedText?: string, timeout?: number): Promise<void>;
    /**
     * Assert multiple elements are visible
     */
    assertMultipleElementsVisible(locators: Locator[], timeout?: number): Promise<void>;
    /**
     * Assert multiple elements are hidden
     */
    assertMultipleElementsHidden(locators: Locator[], timeout?: number): Promise<void>;
    /**
     * Assert text matches regex pattern
     */
    assertTextMatchesPattern(locator: Locator, pattern: RegExp, timeout?: number): Promise<void>;
    /**
     * Assert element has specific ID
     */
    assertElementHasId(locator: Locator, id: string, timeout?: number): Promise<void>;
    /**
     * Assert dropdown has specific selected option
     */
    assertDropdownHasSelectedOption(locator: Locator, optionText: string, timeout?: number): Promise<void>;
    /**
     * Assert element has specific data attribute
     */
    assertElementHasDataAttribute(locator: Locator, dataAttribute: string, value: string, timeout?: number): Promise<void>;
    /**
     * Assert element has specific role
     */
    assertElementHasRole(locator: Locator, role: string, timeout?: number): Promise<void>;
    /**
     * Assert element has specific aria-label
     */
    assertElementHasAriaLabel(locator: Locator, label: string, timeout?: number): Promise<void>;
    /**
     * Assert element is within viewport
     */
    assertElementInViewport(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert element is not in viewport
     */
    assertElementNotInViewport(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Assert screenshot matches baseline
     */
    assertScreenshotMatches(locator: Locator, name: string, options?: any): Promise<void>;
    /**
     * Assert page screenshot matches baseline
     */
    assertPageScreenshotMatches(name: string, options?: any): Promise<void>;
    /**
     * Custom assertion with retry logic
     */
    assertWithRetry(assertion: () => Promise<void>, maxRetries?: number, retryDelay?: number): Promise<void>;
    /**
     * Soft assertion (doesn't stop test execution on failure)
     */
    softAssertElementVisible(locator: Locator, timeout?: number): Promise<void>;
    /**
     * Soft assertion for text content
     */
    softAssertElementHasText(locator: Locator, expectedText: string, timeout?: number): Promise<void>;
}
//# sourceMappingURL=AssertionHelper.d.ts.map