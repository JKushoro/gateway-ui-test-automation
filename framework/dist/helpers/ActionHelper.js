"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionHelper = void 0;
const LocatorHelper_1 = require("./LocatorHelper");
const WaitHelper_1 = require("./WaitHelper");
const TextHelper_1 = require("./TextHelper");
/**
 * Simplified ActionHelper with essential interaction methods
 * Removed unnecessary complexity and kept only commonly used functions
 */
class ActionHelper {
    constructor(page, config = {}) {
        this.page = page;
        this.config = {
            slowMo: 0,
            timeout: 30000,
            ...config
        };
        this.locatorHelper = new LocatorHelper_1.LocatorHelper(page);
        this.waitHelper = new WaitHelper_1.WaitHelper(page, this.config);
    }
    /**
     * Click on element by selector
     */
    async click(selector, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        await locator.click({
            force: options.force,
            button: options.button,
            clickCount: options.clickCount,
            delay: options.delay
        });
        await this.applySlowMo();
    }
    /**
     * Click on locator
     */
    async clickLocator(locator, options = {}) {
        await this.waitHelper.waitForElement(locator, options.timeout);
        await locator.click({
            force: options.force,
            button: options.button,
            clickCount: options.clickCount,
            delay: options.delay
        });
        await this.applySlowMo();
    }
    /**
     * Click button by text
     */
    async clickButtonByText(text, exact = true, options = {}) {
        const button = this.locatorHelper.getButtonByText(text, exact);
        await this.waitHelper.waitForElement(button, options.timeout);
        await button.click({ force: options.force });
        await this.applySlowMo();
    }
    /**
     * Fill input field by selector
     */
    async fill(selector, value, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        if (options.clear) {
            await locator.clear();
        }
        await locator.fill(value);
        await this.applySlowMo();
    }
    /**
     * Fill input by label
     */
    async fillInputByLabel(label, value, exact = true, options = {}) {
        const input = this.locatorHelper.getInputByLabel(label, exact);
        await input.scrollIntoViewIfNeeded();
        await this.waitHelper.waitForElement(input, options.timeout);
        if (options.clear) {
            await input.clear();
        }
        await input.fill(value);
        await this.applySlowMo();
    }
    /**
     * Press key
     */
    async pressKey(key) {
        await this.page.keyboard.press(key);
        await this.applySlowMo();
    }
    /**
     * Select option from dropdown by label
     */
    async selectOptionFromDropdown(selector, label, options = {}) {
        const dropdown = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(dropdown, options.timeout);
        await dropdown.selectOption({ label });
        await this.applySlowMo();
    }
    /**
     * Select option from dropdown by index
     */
    async selectOptionByIndex(selector, index, options = {}) {
        const dropdown = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(dropdown, options.timeout);
        await dropdown.selectOption({ index });
        await this.applySlowMo();
    }
    /**
     * Check checkbox
     */
    async checkCheckbox(selector, options = {}) {
        const checkbox = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(checkbox, options.timeout);
        if (!(await checkbox.isChecked())) {
            await checkbox.check({ force: options.force });
        }
        await this.applySlowMo();
    }
    /**
     * Uncheck checkbox
     */
    async uncheckCheckbox(selector, options = {}) {
        const checkbox = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(checkbox, options.timeout);
        if (await checkbox.isChecked()) {
            await checkbox.uncheck({ force: options.force });
        }
        await this.applySlowMo();
    }
    /**
     * Select radio button by value
     */
    async selectRadioByValue(name, value, options = {}) {
        const radio = this.locatorHelper.getLocator(`input[name="${name}"][value="${value}"]`);
        await this.waitHelper.waitForElement(radio, options.timeout);
        await radio.check({ force: options.force });
        await this.applySlowMo();
    }
    /**
     * Hover over element
     */
    async hover(selector, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        await locator.hover();
        await this.applySlowMo();
    }
    /**
     * Get text content from selector
     */
    async getText(selector, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        return await TextHelper_1.TextHelper.getTrimmedText(locator);
    }
    /**
     * Get attribute value
     */
    async getAttribute(selector, attribute, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        return await locator.getAttribute(attribute);
    }
    /**
     * Get input value
     */
    async getInputValue(selector, options = {}) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options.timeout);
        return await locator.inputValue();
    }
    /**
     * Check if element is visible
     */
    async isVisible(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        return await locator.isVisible();
    }
    /**
     * Check if element is enabled
     */
    async isEnabled(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        return await locator.isEnabled();
    }
    /**
     * Navigate to a specific URL
     */
    async navigateToUrl(url) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }
    /**
     * Navigate to a specific page with timeout and DOM content loaded wait
     */
    async navigateToPage(url, timeout) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: timeout || this.config.timeout
        });
        await this.waitHelper.waitForDOMContentLoaded();
    }
    /**
     * Get the page instance
     */
    getPage() {
        return this.page;
    }
    /**
     * Get current URL
     */
    getCurrentUrl() {
        return this.page.url();
    }
    /**
     * Get page title
     */
    async getPageTitle() {
        return await this.page.title();
    }
    /**
     * Apply slow motion delay if configured
     */
    async applySlowMo() {
        const slowMo = this.config.slowMo || 0;
        if (slowMo > 0) {
            await this.page.waitForTimeout(slowMo);
        }
    }
    /**
     * Update configuration at runtime
     */
    updateConfig(updates) {
        Object.assign(this.config, updates);
        this.waitHelper.updateConfig(updates);
    }
}
exports.ActionHelper = ActionHelper;
//# sourceMappingURL=ActionHelper.js.map