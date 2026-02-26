"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionHelper = void 0;
const LocatorHelper_1 = require("./LocatorHelper");
const WaitHelper_1 = require("./WaitHelper");
const EnvManager_1 = require("../config/EnvManager");
/**
 * Enhanced ActionHelper with comprehensive interaction methods
 * Provides reusable methods for performing actions on web elements
 */
class ActionHelper {
    constructor(page) {
        this.page = page;
        this.locatorHelper = new LocatorHelper_1.LocatorHelper(page);
        this.waitHelper = new WaitHelper_1.WaitHelper(page);
        this.slowMo = EnvManager_1.envManager.getSlowMo();
    }
    /**
     * Click on element by selector
     */
    async click(selector, options) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options?.timeout);
        await locator.click({ force: options?.force });
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Click on locator
     */
    async clickLocator(locator, options) {
        await this.waitHelper.waitForElement(locator, options?.timeout);
        await locator.click({ force: options?.force });
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Double click on element
     */
    async doubleClick(selector, options) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options?.timeout);
        await locator.dblclick({ force: options?.force });
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Right click on element
     */
    async rightClick(selector, options) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options?.timeout);
        await locator.click({ button: 'right', force: options?.force });
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Click link by text
     */
    async clickLinkByText(text, exact = true) {
        const link = this.locatorHelper.getLinkByText(text, exact);
        await this.waitHelper.waitForElement(link);
        await link.click();
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Click button by text
     */
    async clickButtonByText(text, exact = true) {
        const button = this.locatorHelper.getButtonByText(text, exact);
        await this.waitHelper.waitForElement(button);
        await button.click();
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Fill input field by selector
     */
    async fill(selector, value, options) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator, options?.timeout);
        if (options?.clear) {
            await locator.clear();
        }
        await locator.fill(value);
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Fill input by label
     */
    async fillInputByLabel(label, value, exact = true, options) {
        const input = this.locatorHelper.getInputByLabel(label, exact);
        await input.scrollIntoViewIfNeeded();
        await this.waitHelper.waitForElement(input);
        if (options?.clear) {
            await input.clear();
        }
        await input.fill(value);
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Fill input by placeholder
     */
    async fillInputByPlaceholder(placeholder, value, exact = true) {
        const input = this.locatorHelper.getInputByPlaceholder(placeholder, exact);
        await this.waitHelper.waitForElement(input);
        await input.fill(value);
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Type text with delay between keystrokes
     */
    async type(selector, text, delay) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator);
        await locator.type(text, { delay: delay || 50 });
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Clear input field
     */
    async clear(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator);
        await locator.clear();
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Press key
     */
    async pressKey(key) {
        await this.page.keyboard.press(key);
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Press key combination
     */
    async pressKeyCombo(keys) {
        for (const key of keys) {
            await this.page.keyboard.down(key);
        }
        for (const key of keys.reverse()) {
            await this.page.keyboard.up(key);
        }
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Select option from dropdown by label
     */
    async selectOptionFromDropdown(selector, label) {
        const dropdown = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(dropdown);
        await dropdown.selectOption({ label });
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Select option from dropdown by value
     */
    async selectOptionByValue(selector, value) {
        const dropdown = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(dropdown);
        await dropdown.selectOption({ value });
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Select option from dropdown by index
     */
    async selectOptionByIndex(selector, index) {
        const dropdown = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(dropdown);
        await dropdown.selectOption({ index });
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Check checkbox
     */
    async checkCheckbox(selector, force) {
        const checkbox = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(checkbox);
        if (!(await checkbox.isChecked())) {
            await checkbox.check({ force });
        }
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Uncheck checkbox
     */
    async uncheckCheckbox(selector, force) {
        const checkbox = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(checkbox);
        if (await checkbox.isChecked()) {
            await checkbox.uncheck({ force });
        }
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Toggle checkbox
     */
    async toggleCheckbox(selector, force) {
        const checkbox = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(checkbox);
        if (await checkbox.isChecked()) {
            await checkbox.uncheck({ force });
        }
        else {
            await checkbox.check({ force });
        }
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Select radio button by label
     */
    async selectRadioByLabel(labelText, exact = true) {
        const radio = this.locatorHelper.getInputByLabel(labelText, exact);
        await this.waitHelper.waitForElement(radio);
        if (!(await radio.isChecked())) {
            await radio.check({ force: true });
        }
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Select radio button by value
     */
    async selectRadioByValue(name, value) {
        const radio = this.locatorHelper.getLocator(`input[name="${name}"][value="${value}"]`);
        await this.waitHelper.waitForElement(radio);
        await radio.check({ force: true });
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Select custom dropdown option
     */
    async selectCustomDropdown(selector, visibleText, exact = true) {
        const dropdown = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(dropdown);
        await dropdown.click();
        const option = this.locatorHelper.getByText(visibleText, exact);
        await this.waitHelper.waitForElement(option);
        await option.click();
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Hover over element
     */
    async hover(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator);
        await locator.hover();
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Scroll element into view
     */
    async scrollIntoView(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        await locator.scrollIntoViewIfNeeded();
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Scroll to top of page
     */
    async scrollToTop() {
        await this.page.evaluate(() => window.scrollTo(0, 0));
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Scroll to bottom of page
     */
    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Scroll by pixels
     */
    async scrollBy(x, y) {
        await this.page.evaluate(({ x, y }) => window.scrollBy(x, y), { x, y });
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Drag and drop
     */
    async dragAndDrop(sourceSelector, targetSelector) {
        const source = this.locatorHelper.getLocator(sourceSelector);
        const target = this.locatorHelper.getLocator(targetSelector);
        await this.waitHelper.waitForElement(source);
        await this.waitHelper.waitForElement(target);
        await source.dragTo(target);
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Upload file
     */
    async uploadFile(selector, filePath) {
        const fileInput = this.locatorHelper.getLocator(selector);
        await fileInput.setInputFiles(filePath);
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Focus on element
     */
    async focus(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator);
        await locator.focus();
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Blur (remove focus from) element
     */
    async blur(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        await locator.blur();
        if (this.slowMo > 0)
            await this.page.waitForTimeout(this.slowMo);
    }
    /**
     * Get trimmed text content from locator
     */
    async getTrimmedText(locator) {
        return (await locator.textContent())?.trim() || '';
    }
    /**
     * Get text content from selector
     */
    async getText(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator);
        return await this.getTrimmedText(locator);
    }
    /**
     * Get attribute value
     */
    async getAttribute(selector, attribute) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator);
        return await locator.getAttribute(attribute);
    }
    /**
     * Get input value
     */
    async getInputValue(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        await this.waitHelper.waitForElement(locator);
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
     * Check if checkbox/radio is checked
     */
    async isChecked(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        return await locator.isChecked();
    }
    /**
     * Get element count
     */
    async getElementCount(selector) {
        const locator = this.locatorHelper.getLocator(selector);
        return await locator.count();
    }
    /**
     * Click element by exact text
     */
    async clickElementByExactText(elements, targetText) {
        const count = await elements.count();
        for (let i = 0; i < count; i++) {
            const element = elements.nth(i);
            const text = (await element.innerText()).trim();
            if (text === targetText) {
                await this.waitHelper.waitForElement(element);
                await element.click();
                if (this.slowMo > 0)
                    await this.page.waitForTimeout(this.slowMo);
                return;
            }
            if (text.startsWith(targetText)) {
                await this.waitHelper.waitForElement(element);
                await element.click();
                if (this.slowMo > 0)
                    await this.page.waitForTimeout(this.slowMo);
                return;
            }
        }
        throw new Error(`Element with text "${targetText}" not found (even with fuzzy matching).`);
    }
    /**
     * Click row by matching text
     */
    async clickRowByMatchingText(rows, getTextFromRow, matchText) {
        const count = await rows.count();
        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const text = await getTextFromRow(row);
            if (text.trim() === matchText.trim()) {
                await row.click();
                if (this.slowMo > 0)
                    await this.page.waitForTimeout(this.slowMo);
                return;
            }
        }
        throw new Error(`Row with text "${matchText}" not found.`);
    }
    /**
     * Click multiple checkboxes by label text
     */
    async clickCheckboxByText(...labelTexts) {
        if (labelTexts.length === 0 || labelTexts.length > 6) {
            throw new Error('You must provide between 1 and 6 checkbox labels.');
        }
        for (const labelText of labelTexts) {
            const checkbox = this.locatorHelper.getInputByLabel(labelText, true);
            await this.waitHelper.waitForElement(checkbox);
            if (!(await checkbox.isChecked())) {
                await checkbox.check({ force: true });
            }
            if (this.slowMo > 0)
                await this.page.waitForTimeout(this.slowMo);
        }
    }
    /**
     * Switch to tab by URL part
     */
    async switchToTabByUrlPart(partialUrl) {
        const pages = this.page.context().pages();
        for (const p of pages) {
            if (p.url().includes(partialUrl)) {
                await p.bringToFront();
                return p;
            }
        }
        return null;
    }
    /**
     * Close current tab and switch to previous
     */
    async closeCurrentTab() {
        const pages = this.page.context().pages();
        if (pages.length > 1) {
            await this.page.close();
            return pages[pages.length - 2]; // Return previous page
        }
        return null;
    }
    /**
     * Accept browser dialog (alert, confirm, prompt)
     */
    async acceptDialog() {
        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });
    }
    /**
     * Dismiss browser dialog
     */
    async dismissDialog() {
        this.page.once('dialog', async (dialog) => {
            await dialog.dismiss();
        });
    }
    /**
     * Handle dialog with custom text
     */
    async handleDialog(text) {
        this.page.once('dialog', async (dialog) => {
            await dialog.accept(text);
        });
    }
}
exports.ActionHelper = ActionHelper;
//# sourceMappingURL=ActionHelper.js.map