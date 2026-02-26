"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitHelper = void 0;
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
    async waitForVisible(selector, timeout) {
        await this.page.locator(selector).waitFor({
            state: 'visible',
            timeout: timeout || this.config.timeout,
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
     * Wait for URL to match pattern
     */
    async waitForUrlToMatch(urlPattern, timeout) {
        await this.page.waitForURL(urlPattern, {
            timeout: timeout || this.config.timeout
        });
    }
    /**
     * Wait for element to disappear (alias for hidden)
     */
    async waitForElementToDisappear(locator, timeout) {
        await this.waitForElementToBeHidden(locator, timeout);
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
     * Wait for multiple conditions to be met
     */
    async waitForMultipleConditions(conditions, timeout) {
        const promises = conditions.map(condition => condition());
        await Promise.all(promises);
    }
    /**
     * Wait for any of multiple conditions to be met
     */
    async waitForAnyCondition(conditions, timeout) {
        const promises = conditions.map(condition => condition());
        await Promise.race(promises);
    }
    /**
     * Wait with retry logic
     */
    async waitWithRetry(condition, maxRetries = 3, retryDelay = 1000, timeout) {
        let lastError = null;
        for (let i = 0; i <= maxRetries; i++) {
            try {
                const result = await condition();
                if (result) {
                    return;
                }
                throw new Error('Condition not met');
            }
            catch (error) {
                lastError = error;
                if (i < maxRetries) {
                    await this.waitForTimeout(retryDelay);
                }
            }
        }
        throw lastError || new Error('Wait condition failed after retries');
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
     * Get current timeout setting
     */
    getTimeout() {
        return this.config.timeout || 30000;
    }
}
exports.WaitHelper = WaitHelper;
//# sourceMappingURL=WaitHelper.js.map