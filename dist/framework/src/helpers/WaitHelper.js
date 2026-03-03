"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitHelper = void 0;
//framework/src/helpers/WaitHelper.ts
const test_1 = require("@playwright/test");
/**
 * Professional WaitHelper with comprehensive waiting strategies
 * Self-contained with configurable options and no external dependencies
 */
class WaitHelper {
    constructor(page, config = {}) {
        this.page = page;
        this.config = {
            timeout: 60000,
            ...config
        };
    }
    /**
     * Wait for element to be visible
     */
    async waitForElement(locator, timeout) {
        await locator.waitFor({
            state: 'visible',
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for element to be hidden
     */
    async waitForElementToBeHidden(locator, timeout) {
        await locator.waitFor({
            state: 'hidden',
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for element to be attached to DOM
     */
    async waitForElementToBeAttached(locator, timeout) {
        await locator.waitFor({
            state: 'attached',
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for element to be detached from DOM
     */
    async waitForElementToBeDetached(locator, timeout) {
        await locator.waitFor({
            state: 'detached',
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for selector to be visible
     */
    async waitForVisible(target, timeout) {
        const locator = typeof target === 'string' ? this.page.locator(target) : target;
        await locator.waitFor({
            state: 'visible',
            timeout: timeout ?? this.config.timeout,
        });
    }
    /**
     * Wait for selector to be hidden
     */
    async waitForHidden(selector, timeout) {
        await this.page.locator(selector).waitFor({
            state: 'hidden',
            timeout: timeout || this.config.timeout,
        });
    }
    /**
     * Wait for custom function to return truthy value
     */
    async waitForFunction(fn, arg, timeout) {
        await this.page.waitForFunction(fn, arg, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for locator to have specific count
     */
    async waitForLocatorToHaveCount(locator, expectedCount, timeout) {
        await (0, test_1.expect)(locator).toHaveCount(expectedCount, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for locator to be hidden (alias for consistency)
     */
    async waitForLocatorToBeHidden(locator, timeout) {
        await this.waitForElementToBeHidden(locator, timeout);
    }
    /**
     * Wait for locator to be detached (alias for consistency)
     */
    async waitForLocatorToBeDetached(locator, timeout) {
        await this.waitForElementToBeDetached(locator, timeout);
    }
    /**
     * Wait for new tab/page to open
     */
    async waitForNewTab(clickAction) {
        const [newTab] = await Promise.all([
            this.page.context().waitForEvent('page'),
            clickAction(),
        ]);
        await newTab.waitForLoadState('domcontentloaded');
        return newTab;
    }
    /**
     * Wait for page to load completely
     */
    async waitForPageLoad(url, waitUntil = 'load') {
        if (url) {
            return this.page.goto(url, { waitUntil });
        }
        else {
            await this.page.waitForLoadState(waitUntil);
            return null;
        }
    }
    /**
     * Wait for network to be idle
     */
    async waitForNetworkIdle(timeout) {
        await this.page.waitForLoadState('networkidle', {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for DOM content to be loaded
     */
    async waitForDOMContentLoaded(timeout) {
        await this.page.waitForLoadState('domcontentloaded', {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for page title to contain specific text
     */
    async waitForTitleToContain(partialTitle, timeout) {
        await (0, test_1.expect)(this.page).toHaveTitle(new RegExp(partialTitle), {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for URL to change from original
     */
    async waitForUrlToChangeFrom(originalUrl, timeout) {
        await this.page.waitForURL((url) => url.toString() !== originalUrl, { timeout: timeout || this.config.timeout });
    }
    /**
     * Wait for a CSS/XPath selector to be visible
     */
    async waitForSelectorVisible(selector, timeout) {
        await this.page.waitForSelector(selector, {
            state: 'visible',
            timeout: timeout ?? this.config.timeout
        });
    }
    /**
     * Wait for URL to match pattern
     */
    async waitForUrlToMatch(urlPattern, timeout) {
        await this.page.waitForURL(urlPattern, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for element to have specific text
     */
    async waitForElementToHaveText(locator, expectedText, timeout) {
        await (0, test_1.expect)(locator).toHaveText(expectedText, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for element to contain specific text
     */
    async waitForElementToContainText(locator, expectedText, timeout) {
        await (0, test_1.expect)(locator).toContainText(expectedText, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for element to have specific attribute value
     */
    async waitForElementToHaveAttribute(locator, attribute, value, timeout) {
        await (0, test_1.expect)(locator).toHaveAttribute(attribute, value, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for element to be enabled
     */
    async waitForElementToBeEnabled(locator, timeout) {
        await (0, test_1.expect)(locator).toBeEnabled({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for element to be disabled
     */
    async waitForElementToBeDisabled(locator, timeout) {
        await (0, test_1.expect)(locator).toBeDisabled({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for element to be checked (for checkboxes/radio buttons)
     */
    async waitForElementToBeChecked(locator, timeout) {
        await (0, test_1.expect)(locator).toBeChecked({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for element to be unchecked
     */
    async waitForElementToBeUnchecked(locator, timeout) {
        await (0, test_1.expect)(locator).not.toBeChecked({
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for specific timeout (use sparingly)
     */
    async waitForTimeout(milliseconds) {
        await this.page.waitForTimeout(milliseconds);
    }
    /**
     * Wait for request to complete
     */
    async waitForRequest(urlPattern, timeout) {
        await this.page.waitForRequest(urlPattern, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for response to complete
     */
    async waitForResponse(urlPattern, timeout) {
        return await this.page.waitForResponse(urlPattern, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for console message
     */
    async waitForConsoleMessage(predicate, timeout) {
        return await this.page.waitForEvent('console', {
            predicate,
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for download to start
     */
    async waitForDownload(clickAction) {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            clickAction(),
        ]);
        return download;
    }
    /**
     * Verify page title contains text (combines wait and assertion)
     */
    async verifyPageTitleContains(partialTitle, timeout) {
        await this.waitForTitleToContain(partialTitle, timeout);
    }
    /**
     * Assert element visible with optional text (combines wait and assertion)
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
     * Update configuration at runtime
     */
    updateConfig(updates) {
        Object.assign(this.config, updates);
    }
    /**
     * Wait for loading indicators to disappear
     */
    async waitForLoadingToComplete() {
        const loadingSelectors = [
            '.loading',
            '.spinner',
            '[data-testid*="loading"]',
            '[aria-label*="loading"]'
        ];
        for (const selector of loadingSelectors) {
            try {
                await this.waitForHidden(selector, 1000);
            }
            catch (error) {
                // Loading element might not exist, which is fine
            }
        }
    }
    /**
     * Wait for form elements to be ready for interaction
     */
    async waitForFormElementReady(locator, timeout) {
        await this.waitForElement(locator, timeout);
        await (0, test_1.expect)(locator).toBeEnabled({ timeout: timeout || this.config.timeout });
        await this.waitForTimeout(200); // Small delay for element stabilization
    }
    /**
     * Wait for input field to be ready and clear any existing value
     */
    async waitForInputReady(locator, timeout) {
        await this.waitForFormElementReady(locator, timeout);
        // Additional check for input-specific readiness
        await (0, test_1.expect)(locator).not.toHaveAttribute('readonly', { timeout: 1000 }).catch(() => { });
        await this.waitForTimeout(100);
    }
    /**
     * Wait for dropdown to be populated with options
     */
    async waitForDropdownPopulated(locator, minOptions = 1, timeout) {
        await this.waitForElement(locator, timeout);
        // Wait for options to be populated
        await this.waitForFunction((args) => {
            const [selector, min] = args;
            const element = document.querySelector(selector);
            if (!element)
                return false;
            // For native select elements
            if (element.tagName === 'SELECT') {
                return element.options.length > min;
            }
            // For custom dropdowns, check for option elements
            const options = element.querySelectorAll('[role="option"], option, .option');
            return options.length >= min;
        }, [locator.toString(), minOptions], timeout || this.config.timeout);
        await this.waitForTimeout(300); // Additional stabilization time
    }
    /**
     * Wait for MUI/React dropdown to be ready
     */
    async waitForMuiDropdownReady(comboboxLocator, timeout) {
        await this.waitForElement(comboboxLocator, timeout);
        await (0, test_1.expect)(comboboxLocator).toBeEnabled({ timeout: timeout || this.config.timeout });
        // Ensure the dropdown is not in a loading state
        await this.waitForFunction((selector) => {
            const element = document.querySelector(selector);
            if (!element)
                return false;
            // Check for common loading indicators
            const hasLoadingClass = element.classList.contains('loading') ||
                element.classList.contains('disabled') ||
                element.getAttribute('aria-busy') === 'true';
            return !hasLoadingClass;
        }, comboboxLocator.toString(), timeout || this.config.timeout);
        await this.waitForTimeout(200);
    }
    /**
     * Wait for data generation to complete (simulated delay)
     */
    async waitForDataGeneration(delayMs = 100) {
        await this.waitForTimeout(delayMs);
    }
    /**
     * Wait for element to be stable (not moving/changing)
     */
    async waitForElementStable(locator, stableTime = 500, timeout) {
        await this.waitForElement(locator, timeout);
        let lastPosition = null;
        let stableStart = Date.now();
        const checkStability = async () => {
            try {
                const box = await locator.boundingBox();
                if (!box)
                    return false;
                const currentPosition = { x: box.x, y: box.y };
                if (lastPosition &&
                    Math.abs(currentPosition.x - lastPosition.x) < 1 &&
                    Math.abs(currentPosition.y - lastPosition.y) < 1) {
                    return Date.now() - stableStart >= stableTime;
                }
                else {
                    lastPosition = currentPosition;
                    stableStart = Date.now();
                    return false;
                }
            }
            catch {
                return false;
            }
        };
        const endTime = Date.now() + (timeout || this.config.timeout || 30000);
        while (Date.now() < endTime) {
            if (await checkStability()) {
                return;
            }
            await this.waitForTimeout(50);
        }
        throw new Error('Element did not stabilize within timeout');
    }
    /**
     * Get current timeout setting
     */
    getTimeout() {
        return this.config.timeout || 30000;
    }
}
exports.WaitHelper = WaitHelper;
//# sourceMappingURL=WaitHelper.js.map