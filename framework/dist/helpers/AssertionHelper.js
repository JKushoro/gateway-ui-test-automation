"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertionHelper = void 0;
const test_1 = require("@playwright/test");
/**
 * Professional AssertionHelper with comprehensive assertion methods
 * Self-contained with configurable options and no external dependencies
 */
class AssertionHelper {
    constructor(page, config = {}) {
        this.page = page;
        this.config = {
            timeout: 30000,
            ...config
        };
    }
    /**
     * Assert element has exact text
     */
    async assertElementHasText(locator, expectedText, timeout) {
        await (0, test_1.expect)(locator).toHaveText(expectedText, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element contains text
     */
    async assertElementContainsText(locator, expectedText, timeout) {
        await (0, test_1.expect)(locator).toContainText(expectedText, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is visible
     */
    async assertElementVisible(locator, timeout) {
        await (0, test_1.expect)(locator).toBeVisible({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is hidden
     */
    async assertElementHidden(locator, timeout) {
        await (0, test_1.expect)(locator).toBeHidden({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is enabled
     */
    async assertElementEnabled(locator, timeout) {
        await (0, test_1.expect)(locator).toBeEnabled({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is disabled
     */
    async assertElementDisabled(locator, timeout) {
        await (0, test_1.expect)(locator).toBeDisabled({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is checked (for checkboxes/radio buttons)
     */
    async assertElementChecked(locator, timeout) {
        await (0, test_1.expect)(locator).toBeChecked({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is unchecked
     */
    async assertElementUnchecked(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeChecked({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element has specific attribute value
     */
    async assertElementHasAttribute(locator, attribute, value, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute(attribute, value, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element has specific class
     */
    async assertElementHasClass(locator, className, timeout) {
        await (0, test_1.expect)(locator).toHaveClass(new RegExp(className), {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element has specific CSS property value
     */
    async assertElementHasCSS(locator, property, value, timeout) {
        await (0, test_1.expect)(locator).toHaveCSS(property, value, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert input has specific value
     */
    async assertInputHasValue(locator, value, timeout) {
        await (0, test_1.expect)(locator).toHaveValue(value, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element count
     */
    async assertElementCount(locator, count, timeout) {
        await (0, test_1.expect)(locator).toHaveCount(count, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert page title
     */
    async assertPageTitle(expectedTitle, timeout) {
        await (0, test_1.expect)(this.page).toHaveTitle(expectedTitle, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert page title contains text
     */
    async assertPageTitleContains(partialTitle, timeout) {
        await (0, test_1.expect)(this.page).toHaveTitle(new RegExp(partialTitle), {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert page URL
     */
    async assertPageURL(expectedUrl, timeout) {
        await (0, test_1.expect)(this.page).toHaveURL(expectedUrl, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert page URL contains text
     */
    async assertPageURLContains(partialUrl, timeout) {
        await (0, test_1.expect)(this.page).toHaveURL(new RegExp(partialUrl), {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is attached to DOM
     */
    async assertElementAttached(locator, timeout) {
        await (0, test_1.expect)(locator).toBeAttached({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is detached from DOM
     */
    async assertElementDetached(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeAttached({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is editable
     */
    async assertElementEditable(locator, timeout) {
        await (0, test_1.expect)(locator).toBeEditable({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is not editable
     */
    async assertElementNotEditable(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeEditable({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is empty
     */
    async assertElementEmpty(locator, timeout) {
        await (0, test_1.expect)(locator).toBeEmpty({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is not empty
     */
    async assertElementNotEmpty(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeEmpty({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is focused
     */
    async assertElementFocused(locator, timeout) {
        await (0, test_1.expect)(locator).toBeFocused({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is not focused
     */
    async assertElementNotFocused(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeFocused({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element visible with optional text (combined assertion)
     */
    async assertElementVisibleWithOptionalText(locator, expectedText, timeout) {
        await (0, test_1.expect)(locator).toBeVisible({
            timeout: timeout || this.config.timeout
        });
        if (expectedText) {
            await (0, test_1.expect)(locator).toHaveText(expectedText, {
                timeout: timeout || this.config.timeout
            });
        }
    }
    /**
     * Assert multiple elements are visible
     */
    async assertMultipleElementsVisible(locators, timeout) {
        for (const locator of locators) {
            await (0, test_1.expect)(locator).toBeVisible({
                timeout: timeout || this.config.timeout
            });
        }
    }
    /**
     * Assert multiple elements are hidden
     */
    async assertMultipleElementsHidden(locators, timeout) {
        for (const locator of locators) {
            await (0, test_1.expect)(locator).toBeHidden({
                timeout: timeout || this.config.timeout
            });
        }
    }
    /**
     * Assert text matches regex pattern
     */
    async assertTextMatchesPattern(locator, pattern, timeout) {
        await (0, test_1.expect)(locator).toHaveText(pattern, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element has specific ID
     */
    async assertElementHasId(locator, id, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute('id', id, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert dropdown has specific selected option
     */
    async assertDropdownHasSelectedOption(locator, optionText, timeout) {
        await (0, test_1.expect)(locator).toHaveValue(optionText, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element has specific data attribute
     */
    async assertElementHasDataAttribute(locator, dataAttribute, value, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute(`data-${dataAttribute}`, value, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element has specific role
     */
    async assertElementHasRole(locator, role, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute('role', role, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element has specific aria-label
     */
    async assertElementHasAriaLabel(locator, label, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute('aria-label', label, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is within viewport
     */
    async assertElementInViewport(locator, timeout) {
        await (0, test_1.expect)(locator).toBeInViewport({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element is not in viewport
     */
    async assertElementNotInViewport(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeInViewport({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert screenshot matches baseline
     */
    async assertScreenshotMatches(locator, name, screenshotOptions) {
        await (0, test_1.expect)(locator).toHaveScreenshot(name, screenshotOptions);
    }
    /**
     * Assert page screenshot matches baseline
     */
    async assertPageScreenshotMatches(name, screenshotOptions) {
        await (0, test_1.expect)(this.page).toHaveScreenshot(name, screenshotOptions);
    }
    /**
     * Assert element has specific placeholder
     */
    async assertElementHasPlaceholder(locator, placeholder, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute('placeholder', placeholder, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element has specific title
     */
    async assertElementHasTitle(locator, title, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute('title', title, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element has specific href
     */
    async assertElementHasHref(locator, href, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute('href', href, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element has specific src
     */
    async assertElementHasSrc(locator, src, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute('src', src, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element has specific alt text
     */
    async assertElementHasAlt(locator, alt, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute('alt', alt, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element count is greater than
     */
    async assertElementCountGreaterThan(locator, count) {
        const actualCount = await locator.count();
        (0, test_1.expect)(actualCount).toBeGreaterThan(count);
    }
    /**
     * Assert element count is less than
     */
    async assertElementCountLessThan(locator, count) {
        const actualCount = await locator.count();
        (0, test_1.expect)(actualCount).toBeLessThan(count);
    }
    /**
     * Assert element count is between range
     */
    async assertElementCountBetween(locator, min, max) {
        const actualCount = await locator.count();
        (0, test_1.expect)(actualCount).toBeGreaterThanOrEqual(min);
        (0, test_1.expect)(actualCount).toBeLessThanOrEqual(max);
    }
    /**
     * Custom assertion with retry logic
     */
    async assertWithRetry(assertion, maxRetries = 3, retryDelay = 1000) {
        let lastError = null;
        for (let i = 0; i <= maxRetries; i++) {
            try {
                await assertion();
                return; // Success, exit the function
            }
            catch (error) {
                lastError = error;
                if (i < maxRetries) {
                    await this.page.waitForTimeout(retryDelay);
                }
            }
        }
        throw lastError; // Throw the last error if all retries failed
    }
    /**
     * Soft assertion (doesn't stop test execution on failure)
     */
    async softAssertElementVisible(locator, timeout) {
        await test_1.expect.soft(locator).toBeVisible({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Soft assertion for text content
     */
    async softAssertElementHasText(locator, expectedText, timeout) {
        await test_1.expect.soft(locator).toHaveText(expectedText, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element has specific value (for inputs)
     */
    async assertElementHasValue(locator, value, timeout) {
        await (0, test_1.expect)(locator).toHaveValue(value, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Assert element contains specific value (partial match)
     */
    async assertElementContainsValue(locator, value, timeout) {
        const actualValue = await locator.inputValue();
        (0, test_1.expect)(actualValue).toContain(value);
    }
    /**
     * Assert element has specific inner text
     */
    async assertElementHasInnerText(locator, text, timeout) {
        await (0, test_1.expect)(locator).toHaveText(text, {
            timeout: timeout || this.config.timeout,
            useInnerText: true
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
     * Assert element has specific tag name
     */
    async assertElementHasTagName(locator, tagName) {
        const actualTagName = await locator.evaluate(el => el.tagName.toLowerCase());
        (0, test_1.expect)(actualTagName).toBe(tagName.toLowerCase());
    }
    /**
     * Assert element has specific computed style
     */
    async assertElementHasComputedStyle(locator, property, value) {
        const computedValue = await locator.evaluate((el, prop) => {
            return window.getComputedStyle(el).getPropertyValue(prop);
        }, property);
        (0, test_1.expect)(computedValue).toBe(value);
    }
    /**
     * Update configuration at runtime
     */
    updateConfig(updates) {
        Object.assign(this.config, updates);
    }
    /**
     * Verify text is present on page
     */
    async verifyTextIsPresent(expectedText, timeout) {
        const textLocator = this.page.getByText(expectedText);
        await (0, test_1.expect)(textLocator).toBeVisible({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Get current timeout setting
     */
    getTimeout() {
        return this.config.timeout || 30000;
    }
}
exports.AssertionHelper = AssertionHelper;
//# sourceMappingURL=AssertionHelper.js.map