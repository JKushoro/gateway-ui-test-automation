"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertionHelper = void 0;
exports.getFieldInputByTestId = getFieldInputByTestId;
//framework/src/helpers/AssertionHelper.ts
const test_1 = require("@playwright/test");
// Helper function to get field input by test ID
function getFieldInputByTestId(page, testId) {
    return page.getByTestId(testId);
}
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
class AssertionHelper {
    constructor(page, config = {}) {
        this.page = page;
        this.config = {
            timeout: 30000,
            ...config,
        };
    }
    /**
     * 🎯 Assert element has specific text content
     *
     * @param locator - The element locator
     * @param expectedText - The expected text content
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertElementHasText(locator, expectedText, timeout) {
        await (0, test_1.expect)(locator, `Element should have text "${expectedText}"`).toHaveText(expectedText, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert element contains specific text
     *
     * @param locator - The element locator
     * @param expectedText - The text that should be contained
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertElementContainsText(locator, expectedText, timeout) {
        await (0, test_1.expect)(locator, `Element should contain text "${expectedText}"`).toContainText(expectedText, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert element is visible
     *
     * @param locator - The element locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertElementVisible(locator, timeout) {
        await (0, test_1.expect)(locator, 'Element should be visible').toBeVisible({
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert element is hidden
     *
     * @param locator - The element locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertElementHidden(locator, timeout) {
        await (0, test_1.expect)(locator, 'Element should be hidden').toBeHidden({
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert element is enabled
     *
     * @param locator - The element locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertElementEnabled(locator, timeout) {
        await (0, test_1.expect)(locator, 'Element should be enabled').toBeEnabled({
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert element is disabled
     *
     * @param locator - The element locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertElementDisabled(locator, timeout) {
        await (0, test_1.expect)(locator, 'Element should be disabled').toBeDisabled({
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert element is checked (for checkboxes/radio buttons)
     *
     * @param locator - The checkbox/radio button locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertElementChecked(locator, timeout) {
        await (0, test_1.expect)(locator, 'Element should be checked').toBeChecked({
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert element is unchecked
     *
     * @param locator - The checkbox/radio button locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertElementUnchecked(locator, timeout) {
        await (0, test_1.expect)(locator, 'Element should be unchecked').not.toBeChecked({
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert input has specific value
     *
     * @param locator - The input element locator
     * @param expectedValue - The expected value
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertInputHasValue(locator, expectedValue, timeout) {
        await (0, test_1.expect)(locator, `Input should have value "${expectedValue}"`).toHaveValue(expectedValue, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert element count
     *
     * @param locator - The element locator
     * @param expectedCount - The expected number of elements
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertElementCount(locator, expectedCount, timeout) {
        await (0, test_1.expect)(locator, `Should find exactly ${expectedCount} element(s)`).toHaveCount(expectedCount, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert page title
     *
     * @param expectedTitle - The expected page title
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertPageTitle(expectedTitle, timeout) {
        await (0, test_1.expect)(this.page, `Page title should be "${expectedTitle}"`).toHaveTitle(expectedTitle, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert page title contains text
     *
     * @param partialTitle - The text that should be in the title
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertPageTitleContains(partialTitle, timeout) {
        await (0, test_1.expect)(this.page, `Page title should contain "${partialTitle}"`).toHaveTitle(new RegExp(partialTitle), {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert page URL
     *
     * @param expectedUrl - The expected URL
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertPageURL(expectedUrl, timeout) {
        await (0, test_1.expect)(this.page, `Page URL should be "${expectedUrl}"`).toHaveURL(expectedUrl, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert page URL contains text
     *
     * @param partialUrl - The text that should be in the URL
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertPageURLContains(partialUrl, timeout) {
        await (0, test_1.expect)(this.page, `Page URL should contain "${partialUrl}"`).toHaveURL(new RegExp(partialUrl), {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert that a heading with specific text is visible
     *
     * This method first tries to find a heading by test ID, then falls back to text search.
     *
     * @param headingText - The text of the heading
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertHeadingVisible(headingText, timeout) {
        const t = timeout ?? this.config.timeout;
        // Try to find by test ID first (more reliable)
        const titleByTestId = this.page.getByTestId('definition-form-active-page-title');
        const titleByText = this.page.getByText(headingText, { exact: false }).first();
        const element = (await titleByTestId.count()) ? titleByTestId : titleByText;
        await (0, test_1.expect)(element, `Heading "${headingText}" should be visible`).toBeVisible({ timeout: t });
    }
    /**
     * 🚫 Assert that a heading with specific text is NOT visible
     *
     * This method locates the heading using the test ID and filters by the provided text,
     * then verifies that the element is either hidden or not present in the DOM.
     *
     * @param headingText - The text of the heading
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertHeadingNotVisible(headingText, timeout) {
        const t = timeout ?? this.config.timeout;
        const locator = this.page
            .getByTestId('definition-form-active-page-title')
            .filter({ hasText: headingText });
        await (0, test_1.expect)(locator, `Heading "${headingText}" should NOT be visible`).toBeHidden({
            timeout: t,
        });
    }
    /**
     * 🎯 Assert element is clickable (visible and enabled)
     *
     * @param locator - The element locator
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertElementClickable(locator, timeout) {
        await this.assertElementVisible(locator, timeout);
        await this.assertElementEnabled(locator, timeout);
    }
    /**
     * 🎯 Assert element has specific attribute value
     *
     * @param locator - The element locator
     * @param attribute - The attribute name
     * @param expectedValue - The expected attribute value
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertElementHasAttribute(locator, attribute, expectedValue, timeout) {
        await (0, test_1.expect)(locator, `Element should have attribute "${attribute}" with value "${expectedValue}"`).toHaveAttribute(attribute, expectedValue, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Assert element has specific class
     *
     * @param locator - The element locator
     * @param className - The class name to check for
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertElementHasClass(locator, className, timeout) {
        await (0, test_1.expect)(locator, `Element should have class "${className}"`).toHaveClass(new RegExp(className), {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * 🎯 Update configuration at runtime
     *
     * @param updates - Partial configuration updates
     */
    updateConfig(updates) {
        Object.assign(this.config, updates);
    }
    /**
     * 🎯 Parse formatted number from string (utility method)
     *
     * @param value - The string value to parse
     * @returns The parsed number or NaN if invalid
     */
    parseFormattedNumber(value) {
        if (value == null)
            return NaN;
        const trimmed = value.trim();
        if (!trimmed)
            return NaN;
        const cleaned = trimmed
            .replace(/,/g, '')
            .replace(/[^\d.-]/g, '')
            .replace(/(?!^)-/g, '');
        const n = Number(cleaned);
        return Number.isFinite(n) ? n : NaN;
    }
    /**
     * 🎯 Assert formatted number equals expected value
     *
     * @param locator - The element containing the formatted number
     * @param expectedValue - The expected numeric value
     * @param timeout - Optional timeout (uses default if not provided)
     */
    async assertFormattedNumberEquals(locator, expectedValue, timeout) {
        const t = timeout || this.config.timeout;
        await (0, test_1.expect)(locator).toBeVisible({ timeout: t });
        // Get the value from the element - prefer inputValue for form elements
        const tagName = await locator.evaluate(el => el.tagName.toLowerCase());
        const rawValue = tagName === 'input' || tagName === 'textarea'
            ? await locator.inputValue({ timeout: t })
            : ((await locator.textContent({ timeout: t })) ?? '');
        const actualValue = this.parseFormattedNumber(rawValue);
        (0, test_1.expect)(actualValue, `Formatted number should equal ${expectedValue}, but got "${rawValue}" (parsed as ${actualValue})`).toBe(expectedValue);
    }
    // ========================================
    // 🌐 HTTP RESPONSE ASSERTIONS
    // ========================================
    /**
     * 🎯 Assert HTTP response has successful status (200)
     * Use this when checking if GET requests worked
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseSuccess(response);
     */
    async assertResponseSuccess(response) {
        (0, test_1.expect)(response.status(), 'Response should have status 200 (Success)').toBe(200);
    }
    /**
     * 🎯 Assert HTTP response has created status (201)
     * Use this when checking if POST requests created something new
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseCreated(response);
     */
    async assertResponseCreated(response) {
        (0, test_1.expect)(response.status(), 'Response should have status 201 (Created)').toBe(201);
    }
    /**
     * 🎯 Assert HTTP response has no content status (204)
     * Use this when checking if DELETE requests worked
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseNoContent(response);
     */
    async assertResponseNoContent(response) {
        (0, test_1.expect)(response.status(), 'Response should have status 204 (No Content)').toBe(204);
    }
    /**
     * 🎯 Assert HTTP response has bad request status (400)
     * Use this when testing validation errors
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseBadRequest(response);
     */
    async assertResponseBadRequest(response) {
        (0, test_1.expect)(response.status(), 'Response should have status 400 (Bad Request)').toBe(400);
    }
    /**
     * 🎯 Assert HTTP response has unauthorized status (401)
     * Use this when testing authentication failures
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseUnauthorized(response);
     */
    async assertResponseUnauthorized(response) {
        (0, test_1.expect)(response.status(), 'Response should have status 401 (Unauthorized)').toBe(401);
    }
    /**
     * 🎯 Assert HTTP response has forbidden status (403)
     * Use this when testing permission errors
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseForbidden(response);
     */
    async assertResponseForbidden(response) {
        (0, test_1.expect)(response.status(), 'Response should have status 403 (Forbidden)').toBe(403);
    }
    /**
     * 🎯 Assert HTTP response has not found status (404)
     * Use this when testing missing resources
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseNotFound(response);
     */
    async assertResponseNotFound(response) {
        (0, test_1.expect)(response.status(), 'Response should have status 404 (Not Found)').toBe(404);
    }
    /**
     * 🎯 Assert HTTP response has server error status (500)
     * Use this when testing server errors
     *
     * @param response - The HTTP response object
     * @example await this.assert.assertResponseServerError(response);
     */
    async assertResponseServerError(response) {
        (0, test_1.expect)(response.status(), 'Response should have status 500 (Server Error)').toBe(500);
    }
    /**
     * 🎯 Assert HTTP response has any custom status code
     * Use this for any other status codes not covered above
     *
     * @param response - The HTTP response object
     * @param expectedStatus - The expected status code
     * @example await this.assert.assertResponseStatus(response, 418);
     */
    async assertResponseStatus(response, expectedStatus) {
        (0, test_1.expect)(response.status(), `Response should have status ${expectedStatus}`).toBe(expectedStatus);
    }
    // ─── Assertion helpers for prepopulation verification ───
    async assertInputValue(page, fieldName, expected) {
        const input = getFieldInputByTestId(page, `input-${fieldName}`);
        await input.waitFor({ state: 'visible' });
        await (0, test_1.expect)(input).toHaveValue(expected);
    }
    async assertMoneyValue(page, fieldName, expected) {
        const input = getFieldInputByTestId(page, `input-money-${fieldName}`);
        await input.waitFor({ state: 'visible' });
        await (0, test_1.expect)(input).toHaveValue(`£${Number(expected).toLocaleString('en-GB')}`);
    }
    async assertNumberValue(page, fieldName, expected) {
        const input = getFieldInputByTestId(page, `number-input-${fieldName}`);
        await input.waitFor({ state: 'visible' });
        await (0, test_1.expect)(input).toHaveValue(expected);
    }
    async assertDropdownValue(page, fieldName, expected) {
        const container = getFieldInputByTestId(page, `select-${fieldName}`);
        await container.waitFor({ state: 'visible' });
        const selectedValue = container.locator('.react-select__single-value').first();
        await (0, test_1.expect)(selectedValue).toHaveText(expected);
    }
    async assertDateValue(page, fieldName, expected) {
        const container = getFieldInputByTestId(page, `date-picker-${fieldName}`);
        const input = container.locator('input').first();
        await input.waitFor({ state: 'visible' });
        await (0, test_1.expect)(input).toHaveValue(expected);
    }
    async assertRadioChecked(page, fieldName, expectedLabel) {
        const checkedLabel = page
            .locator('label', {
            has: page.locator(`input[name="${fieldName}"]:checked`),
        })
            .first();
        await checkedLabel.waitFor({ state: 'visible' });
        await (0, test_1.expect)(checkedLabel).toContainText(expectedLabel);
    }
    // ─── Order-tolerant assertion helpers (DB may return items in any order) ───
    async assertDropdownValueOneOf(page, fieldName, acceptableValues) {
        const container = getFieldInputByTestId(page, `select-${fieldName}`);
        await container.waitFor({ state: 'visible' });
        const selectedValue = container.locator('.react-select__single-value').first();
        const text = (await selectedValue.textContent())?.trim() ?? '';
        (0, test_1.expect)(acceptableValues, `Dropdown ${fieldName}: "${text}" not in [${acceptableValues}]`).toContainEqual(text);
    }
    async assertMoneyValueOneOf(page, fieldName, acceptableValues) {
        const input = getFieldInputByTestId(page, `input-money-${fieldName}`);
        await input.waitFor({ state: 'visible' });
        const formatted = acceptableValues.map(v => `£${Number(v).toLocaleString('en-GB')}`);
        const actual = await input.inputValue();
        (0, test_1.expect)(formatted, `Money ${fieldName}: "${actual}" not in [${formatted}]`).toContainEqual(actual);
    }
    async assertInputValueOneOf(page, fieldName, acceptableValues) {
        const input = getFieldInputByTestId(page, `input-${fieldName}`);
        await input.waitFor({ state: 'visible' });
        const actual = await input.inputValue();
        (0, test_1.expect)(acceptableValues, `Input ${fieldName}: "${actual}" not in [${acceptableValues}]`).toContainEqual(actual);
    }
    async assertDateValueOneOf(page, fieldName, acceptableValues) {
        const container = getFieldInputByTestId(page, `date-picker-${fieldName}`);
        const input = container.locator('input').first();
        await input.waitFor({ state: 'visible' });
        const actual = await input.inputValue();
        (0, test_1.expect)(acceptableValues, `Date ${fieldName}: "${actual}" not in [${acceptableValues}]`).toContainEqual(actual);
    }
}
exports.AssertionHelper = AssertionHelper;
//# sourceMappingURL=AssertionHelper.js.map