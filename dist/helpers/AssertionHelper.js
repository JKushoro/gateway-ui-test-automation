"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertionHelper = void 0;
const test_1 = require("@playwright/test");
const EnvManager_1 = require("../config/EnvManager");
/**
 * Enhanced AssertionHelper with comprehensive assertion methods
 * Provides reusable methods for verifying element states and content
 */
class AssertionHelper {
    constructor(page) {
        this.page = page;
        this.defaultTimeout = EnvManager_1.envManager.getTimeout();
    }
    /**
     * Assert element has exact text
     */
    async assertElementHasText(locator, expectedText, timeout) {
        await (0, test_1.expect)(locator).toHaveText(expectedText, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element contains text
     */
    async assertElementContainsText(locator, expectedText, timeout) {
        await (0, test_1.expect)(locator).toContainText(expectedText, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is visible
     */
    async assertElementVisible(locator, timeout) {
        await (0, test_1.expect)(locator).toBeVisible({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is hidden
     */
    async assertElementHidden(locator, timeout) {
        await (0, test_1.expect)(locator).toBeHidden({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is enabled
     */
    async assertElementEnabled(locator, timeout) {
        await (0, test_1.expect)(locator).toBeEnabled({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is disabled
     */
    async assertElementDisabled(locator, timeout) {
        await (0, test_1.expect)(locator).toBeDisabled({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is checked (for checkboxes/radio buttons)
     */
    async assertElementChecked(locator, timeout) {
        await (0, test_1.expect)(locator).toBeChecked({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is unchecked
     */
    async assertElementUnchecked(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeChecked({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element has specific attribute value
     */
    async assertElementHasAttribute(locator, attribute, value, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute(attribute, value, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element has specific class
     */
    async assertElementHasClass(locator, className, timeout) {
        await (0, test_1.expect)(locator).toHaveClass(new RegExp(className), {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element has specific CSS property value
     */
    async assertElementHasCSS(locator, property, value, timeout) {
        await (0, test_1.expect)(locator).toHaveCSS(property, value, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert input has specific value
     */
    async assertInputHasValue(locator, value, timeout) {
        await (0, test_1.expect)(locator).toHaveValue(value, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element count
     */
    async assertElementCount(locator, count, timeout) {
        await (0, test_1.expect)(locator).toHaveCount(count, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert page title
     */
    async assertPageTitle(expectedTitle, timeout) {
        await (0, test_1.expect)(this.page).toHaveTitle(expectedTitle, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert page title contains text
     */
    async assertPageTitleContains(partialTitle, timeout) {
        await (0, test_1.expect)(this.page).toHaveTitle(new RegExp(partialTitle), {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert page URL
     */
    async assertPageURL(expectedUrl, timeout) {
        await (0, test_1.expect)(this.page).toHaveURL(expectedUrl, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert page URL contains text
     */
    async assertPageURLContains(partialUrl, timeout) {
        await (0, test_1.expect)(this.page).toHaveURL(new RegExp(partialUrl), {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is attached to DOM
     */
    async assertElementAttached(locator, timeout) {
        await (0, test_1.expect)(locator).toBeAttached({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is detached from DOM
     */
    async assertElementDetached(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeAttached({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is editable
     */
    async assertElementEditable(locator, timeout) {
        await (0, test_1.expect)(locator).toBeEditable({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is not editable
     */
    async assertElementNotEditable(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeEditable({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is empty
     */
    async assertElementEmpty(locator, timeout) {
        await (0, test_1.expect)(locator).toBeEmpty({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is not empty
     */
    async assertElementNotEmpty(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeEmpty({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is focused
     */
    async assertElementFocused(locator, timeout) {
        await (0, test_1.expect)(locator).toBeFocused({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is not focused
     */
    async assertElementNotFocused(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeFocused({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element visible with optional text (combined assertion)
     */
    async assertElementVisibleWithOptionalText(locator, expectedText, timeout) {
        await (0, test_1.expect)(locator).toBeVisible({
            timeout: timeout || this.defaultTimeout
        });
        if (expectedText) {
            await (0, test_1.expect)(locator).toHaveText(expectedText, {
                timeout: timeout || this.defaultTimeout
            });
        }
    }
    /**
     * Assert multiple elements are visible
     */
    async assertMultipleElementsVisible(locators, timeout) {
        for (const locator of locators) {
            await (0, test_1.expect)(locator).toBeVisible({
                timeout: timeout || this.defaultTimeout
            });
        }
    }
    /**
     * Assert multiple elements are hidden
     */
    async assertMultipleElementsHidden(locators, timeout) {
        for (const locator of locators) {
            await (0, test_1.expect)(locator).toBeHidden({
                timeout: timeout || this.defaultTimeout
            });
        }
    }
    /**
     * Assert text matches regex pattern
     */
    async assertTextMatchesPattern(locator, pattern, timeout) {
        await (0, test_1.expect)(locator).toHaveText(pattern, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element has specific ID
     */
    async assertElementHasId(locator, id, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute('id', id, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert dropdown has specific selected option
     */
    async assertDropdownHasSelectedOption(locator, optionText, timeout) {
        await (0, test_1.expect)(locator).toHaveValue(optionText, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element has specific data attribute
     */
    async assertElementHasDataAttribute(locator, dataAttribute, value, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute(`data-${dataAttribute}`, value, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element has specific role
     */
    async assertElementHasRole(locator, role, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute('role', role, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element has specific aria-label
     */
    async assertElementHasAriaLabel(locator, label, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute('aria-label', label, {
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is within viewport
     */
    async assertElementInViewport(locator, timeout) {
        await (0, test_1.expect)(locator).toBeInViewport({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert element is not in viewport
     */
    async assertElementNotInViewport(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeInViewport({
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Assert screenshot matches baseline
     */
    async assertScreenshotMatches(locator, name, options) {
        await (0, test_1.expect)(locator).toHaveScreenshot(name, options);
    }
    /**
     * Assert page screenshot matches baseline
     */
    async assertPageScreenshotMatches(name, options) {
        await (0, test_1.expect)(this.page).toHaveScreenshot(name, options);
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
            timeout: timeout || this.defaultTimeout
        });
    }
    /**
     * Soft assertion for text content
     */
    async softAssertElementHasText(locator, expectedText, timeout) {
        await test_1.expect.soft(locator).toHaveText(expectedText, {
            timeout: timeout || this.defaultTimeout
        });
    }
}
exports.AssertionHelper = AssertionHelper;
//# sourceMappingURL=AssertionHelper.js.map