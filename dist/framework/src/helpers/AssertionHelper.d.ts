import { Locator, Page } from '@playwright/test';
import { FrameworkConfig } from '../types';
/**
 * 🎯 AssertionHelper - Simplified Playwright Assertions for Junior Developers
 *
 * This helper provides easy-to-use assertion methods with clear error messages.
 * All methods use proper Playwright expect() assertions for better debugging.
 *
 * Key Features:
 * - Clear, descriptive error messages
 * - Consistent timeout handling
 * - Junior developer friendly method names
 * - Proper Playwright assertion patterns
 *
 * @example Basic usage
 * ```typescript
 * // In your step class
 * await this.assert.assertElementVisible(loginButton);
 * await this.assert.assertElementHasText(heading, 'Welcome');
 * await this.assert.assertInputHasValue(emailInput, 'test@example.com');
 * ```
 */
export declare class AssertionHelper {
    private page;
    private readonly config;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * 🎯 Assert element has specific text content
     *
     * @param locator - The element locator
     * @param expectedText - The expected text content
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertElementHasText(locator: Locator, expectedText: string, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert element contains specific text
     *
     * @param locator - The element locator
     * @param expectedText - The text that should be contained
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertElementContainsText(locator: Locator, expectedText: string, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert element is visible
     *
     * @param locator - The element locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertElementVisible(locator: Locator, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert element is hidden
     *
     * @param locator - The element locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertElementHidden(locator: Locator, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert element is enabled
     *
     * @param locator - The element locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertElementEnabled(locator: Locator, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert element is disabled
     *
     * @param locator - The element locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertElementDisabled(locator: Locator, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert element is checked (for checkboxes/radio buttons)
     *
     * @param locator - The checkbox/radio button locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertElementChecked(locator: Locator, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert element is unchecked
     *
     * @param locator - The checkbox/radio button locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertElementUnchecked(locator: Locator, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert input has specific value
     *
     * @param locator - The input element locator
     * @param expectedValue - The expected value
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertInputHasValue(locator: Locator, expectedValue: string, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert element count
     *
     * @param locator - The element locator
     * @param expectedCount - The expected number of elements
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertElementCount(locator: Locator, expectedCount: number, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert page title
     *
     * @param expectedTitle - The expected page title
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertPageTitle(expectedTitle: string, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert page title contains text
     *
     * @param partialTitle - The text that should be in the title
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertPageTitleContains(partialTitle: string, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert page URL
     *
     * @param expectedUrl - The expected URL
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertPageURL(expectedUrl: string, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert page URL contains text
     *
     * @param partialUrl - The text that should be in the URL
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertPageURLContains(partialUrl: string, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert that a heading with specific text is visible
     *
     * This method first tries to find a heading by test ID, then falls back to text search.
     *
     * @param headingText - The text of the heading
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertHeadingVisible(headingText: string, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert element is clickable (visible and enabled)
     *
     * @param locator - The element locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertElementClickable(locator: Locator, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert element has specific attribute value
     *
     * @param locator - The element locator
     * @param attribute - The attribute name
     * @param expectedValue - The expected attribute value
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertElementHasAttribute(locator: Locator, attribute: string, expectedValue: string, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert element has specific class
     *
     * @param locator - The element locator
     * @param className - The class name to check for
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertElementHasClass(locator: Locator, className: string, timeout?: number): Promise<void>;
    /**
     * 🎯 Update configuration at runtime
     *
     * @param updates - Partial configuration updates
     */
    updateConfig(updates: Partial<FrameworkConfig>): void;
    /**
     * 🎯 Parse formatted number from string (utility method)
     *
     * @param value - The string value to parse
     * @returns The parsed number or NaN if invalid
     */
    parseFormattedNumber(value: string | null | undefined): number;
    /**
     * 🎯 Assert formatted number equals expected value
     *
     * @param locator - The element containing the formatted number
     * @param expectedValue - The expected numeric value
     * @param timeout - Optional timeout (uses default if not provided)
     */
    assertFormattedNumberEquals(locator: Locator, expectedValue: number, timeout?: number): Promise<void>;
    /**
     * 🎯 Assert HTTP response has successful status (200)
     * Use this when checking if GET requests worked
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseSuccess(response);
     */
    assertResponseSuccess(response: any): Promise<void>;
    /**
     * 🎯 Assert HTTP response has created status (201)
     * Use this when checking if POST requests created something new
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseCreated(response);
     */
    assertResponseCreated(response: any): Promise<void>;
    /**
     * 🎯 Assert HTTP response has no content status (204)
     * Use this when checking if DELETE requests worked
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseNoContent(response);
     */
    assertResponseNoContent(response: any): Promise<void>;
    /**
     * 🎯 Assert HTTP response has bad request status (400)
     * Use this when testing validation errors
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseBadRequest(response);
     */
    assertResponseBadRequest(response: any): Promise<void>;
    /**
     * 🎯 Assert HTTP response has unauthorized status (401)
     * Use this when testing authentication failures
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseUnauthorized(response);
     */
    assertResponseUnauthorized(response: any): Promise<void>;
    /**
     * 🎯 Assert HTTP response has forbidden status (403)
     * Use this when testing permission errors
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseForbidden(response);
     */
    assertResponseForbidden(response: any): Promise<void>;
    /**
     * 🎯 Assert HTTP response has not found status (404)
     * Use this when testing missing resources
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseNotFound(response);
     */
    assertResponseNotFound(response: any): Promise<void>;
    /**
     * 🎯 Assert HTTP response has server error status (500)
     * Use this when testing server errors
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseServerError(response);
     */
    assertResponseServerError(response: any): Promise<void>;
    /**
     * 🎯 Assert HTTP response has any custom status code
     * Use this for any other status codes not covered above
     *
     * @param response - The HTTP response object
     * @param expectedStatus - The expected status code
     * @example await this.assert.assertResponseStatus(response, 418);
     */
    assertResponseStatus(response: any, expectedStatus: number): Promise<void>;
}
//# sourceMappingURL=AssertionHelper.d.ts.map