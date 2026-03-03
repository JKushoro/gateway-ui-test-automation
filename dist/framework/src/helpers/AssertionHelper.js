"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertionHelper = void 0;
//framework/src/helpers/AssertionHelper.ts
const test_1 = require("@playwright/test");
/**
 * AssertionHelper with essential assertion methods
 * Focused on methods actually used in UI automation testing
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
     * Assert element has specific text content
     */
    async assertElementHasText(locator, expectedText, timeout) {
        await (0, test_1.expect)(locator).toHaveText(expectedText, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert element contains specific text
     */
    async assertElementContainsText(locator, expectedText, timeout) {
        await (0, test_1.expect)(locator).toContainText(expectedText, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert element is visible
     */
    async assertElementVisible(locator, timeout) {
        await (0, test_1.expect)(locator).toBeVisible({
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert element is hidden
     */
    async assertElementHidden(locator, timeout) {
        await (0, test_1.expect)(locator).toBeHidden({
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert element is enabled
     */
    async assertElementEnabled(locator, timeout) {
        await (0, test_1.expect)(locator).toBeEnabled({
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert element is disabled
     */
    async assertElementDisabled(locator, timeout) {
        await (0, test_1.expect)(locator).toBeDisabled({
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert element is checked (for checkboxes/radio buttons)
     */
    async assertElementChecked(locator, timeout) {
        await (0, test_1.expect)(locator).toBeChecked({
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert element is unchecked
     */
    async assertElementUnchecked(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeChecked({
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert element has specific attribute value
     */
    async assertElementHasAttribute(locator, attribute, value, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute(attribute, value, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert element has specific class
     */
    async assertElementHasClass(locator, className, timeout) {
        await (0, test_1.expect)(locator).toHaveClass(new RegExp(className), {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert input has specific value
     */
    async assertInputHasValue(locator, value, timeout) {
        await (0, test_1.expect)(locator).toHaveValue(value, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert element count
     */
    async assertElementCount(locator, count, timeout) {
        await (0, test_1.expect)(locator).toHaveCount(count, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert page title
     */
    async assertPageTitle(expectedTitle, timeout) {
        await (0, test_1.expect)(this.page).toHaveTitle(expectedTitle, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert page title contains text
     */
    async assertPageTitleContains(partialTitle, timeout) {
        await (0, test_1.expect)(this.page).toHaveTitle(new RegExp(partialTitle), {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert page URL
     */
    async assertPageURL(expectedUrl, timeout) {
        await (0, test_1.expect)(this.page).toHaveURL(expectedUrl, {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert page URL contains text
     */
    async assertPageURLContains(partialUrl, timeout) {
        await (0, test_1.expect)(this.page).toHaveURL(new RegExp(partialUrl), {
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Assert element is clickable (visible and enabled)
     */
    async assertElementClickable(locator, timeout) {
        await this.assertElementVisible(locator, timeout);
        await this.assertElementEnabled(locator, timeout);
    }
    /**
     * Update configuration at runtime
     */
    updateConfig(updates) {
        Object.assign(this.config, updates);
    }
    /**
     * Assert that a page or section title with the given text is visible
     */
    async assertHeadingVisible(text, timeout) {
        const t = timeout ?? this.config.timeout;
        const title = this.page.getByTestId('definition-form-active-page-title');
        const el = (await title.count()) ? title : this.page.getByText(text, { exact: false }).first();
        await (0, test_1.expect)(el).toBeVisible({ timeout: t });
    }
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
    async assertFormattedNumberEquals(locator, expected, timeout) {
        const t = timeout ?? this.config.timeout ?? 30000;
        await test_1.expect
            .poll(async () => this.parseFormattedNumber(await locator.inputValue()), { timeout: t })
            .toBe(expected);
    }
}
exports.AssertionHelper = AssertionHelper;
//# sourceMappingURL=AssertionHelper.js.map