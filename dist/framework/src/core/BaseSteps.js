"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSteps = void 0;
const WaitHelper_1 = require("../helpers/WaitHelper");
const ActionHelper_1 = require("../helpers/ActionHelper");
const AssertionHelper_1 = require("../helpers/AssertionHelper");
const LocatorHelper_1 = require("../helpers/LocatorHelper");
/**
 * Enhanced Base Steps Class
 * Pre-instantiates all helpers to eliminate code duplication across step classes
 * Provides consistent patterns for test scenarios
 */
class BaseSteps {
    constructor(page, config = {}) {
        this.page = page;
        this.config = {
            timeout: 30000,
            ...config
        };
        // Initialize all helpers once - no more duplication in step classes
        this.action = new ActionHelper_1.ActionHelper(page, this.config);
        this.wait = new WaitHelper_1.WaitHelper(page, this.config);
        this.assert = new AssertionHelper_1.AssertionHelper(page, this.config);
        this.locate = new LocatorHelper_1.LocatorHelper(page);
    }
    /**
     * Navigate to a specific page
     */
    async navigateToPage(url) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: this.config.timeout
        });
        await this.wait.waitForDOMContentLoaded();
    }
    /**
     * Fill a form field using ActionHelper
     */
    async fillField(selector, value) {
        await this.action.fill(selector, value);
    }
    /**
     * Click an element using ActionHelper
     */
    async clickElement(selector) {
        await this.action.click(selector);
    }
    /**
     * Wait for element to be visible
     */
    async waitForElementToBeVisible(selector, timeout) {
        await this.wait.waitForVisible(selector, timeout);
    }
    /**
     * Verify text is present on page
     */
    async verifyTextIsPresent(expectedText) {
        const textLocator = this.locate.getByText(expectedText);
        await this.wait.waitForElement(textLocator);
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
                await this.wait.waitForHidden(selector, 1000);
            }
            catch (error) {
                // Loading element might not exist, which is fine
            }
        }
    }
}
exports.BaseSteps = BaseSteps;
//# sourceMappingURL=BaseSteps.js.map