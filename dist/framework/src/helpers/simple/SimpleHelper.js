"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleHelper = void 0;
const ClickHelper_1 = require("./ClickHelper");
const FormHelper_1 = require("./FormHelper");
/**
 * 🎯 Simple Helper - All-in-One Easy Helper
 *
 * This is your main helper with super easy method names!
 * No more confusing technical terms - just simple, clear actions.
 *
 * Usage Examples:
 * ```typescript
 * const helper = new SimpleHelper(page);
 *
 * // Click things
 * await helper.clickButton('Save');
 * await helper.clickLink('Continue');
 *
 * // Fill forms
 * await helper.typeInField('Email', 'test@example.com');
 * await helper.selectFromDropdown('Country', 'United Kingdom');
 * await helper.checkBox('I agree to terms');
 *
 * // Get information
 * const email = await helper.getFieldValue('Email');
 * const isChecked = await helper.isBoxChecked('Newsletter');
 * ```
 */
class SimpleHelper {
    constructor(page) {
        this.page = page;
        this.clickHelper = new ClickHelper_1.ClickHelper(page);
        this.formHelper = new FormHelper_1.FormHelper(page);
    }
    // ===== CLICKING THINGS =====
    /** Click a button by its text (e.g., "Save", "Submit", "Continue") */
    async clickButton(buttonText) {
        return this.clickHelper.clickButton(buttonText);
    }
    /** Click a button with exact text match */
    async clickButtonExact(buttonText) {
        return this.clickHelper.clickButtonExact(buttonText);
    }
    /** Click a link by its text */
    async clickLink(linkText) {
        return this.clickHelper.clickLink(linkText);
    }
    /** Click any element by its selector */
    async clickElement(selector) {
        return this.clickHelper.clickElement(selector);
    }
    // ===== FILLING FORMS =====
    /** Type text into an input field by its label (e.g., "Email", "First Name") */
    async typeInField(labelText, text) {
        return this.formHelper.typeInField(labelText, text);
    }
    /** Type text into an input field by its name attribute */
    async typeInFieldByName(fieldName, text) {
        return this.formHelper.typeInFieldByName(fieldName, text);
    }
    /** Clear and type new text in a field */
    async clearAndType(labelText, text) {
        return this.formHelper.clearAndType(labelText, text);
    }
    /** Select an option from a dropdown by the dropdown's label */
    async selectFromDropdown(dropdownLabel, optionText) {
        return this.formHelper.selectFromDropdown(dropdownLabel, optionText);
    }
    /** Select a random option from a dropdown */
    async selectRandomFromDropdown(dropdownLabel) {
        return this.formHelper.selectRandomFromDropdown(dropdownLabel);
    }
    /** Check a checkbox by its label */
    async checkBox(labelText) {
        return this.formHelper.checkBox(labelText);
    }
    /** Uncheck a checkbox by its label */
    async uncheckBox(labelText) {
        return this.formHelper.uncheckBox(labelText);
    }
    /** Select a radio button option by the question text and answer */
    async selectRadioOption(questionText, answerText) {
        return this.formHelper.selectRadioOption(questionText, answerText);
    }
    // ===== GETTING INFORMATION =====
    /** Get the current text in an input field */
    async getFieldValue(labelText) {
        return this.formHelper.getFieldValue(labelText);
    }
    /** Check if a checkbox is currently checked */
    async isBoxChecked(labelText) {
        return this.formHelper.isBoxChecked(labelText);
    }
    // ===== NAVIGATION =====
    /** Go to a specific URL */
    async goToPage(url) {
        await this.page.goto(url);
    }
    /** Get the current page title */
    async getPageTitle() {
        return this.page.title();
    }
    /** Press a key on the keyboard */
    async pressKey(key) {
        await this.page.keyboard.press(key);
    }
    // ===== WAITING =====
    /** Wait for a specific amount of time (in milliseconds) */
    async waitFor(milliseconds) {
        await this.page.waitForTimeout(milliseconds);
    }
    /** Wait for an element to appear on the page */
    async waitForElement(selector) {
        await this.page.locator(selector).waitFor({ state: 'visible' });
    }
    // ===== CHECKING THINGS =====
    /** Check if an element is visible on the page */
    async isElementVisible(selector) {
        return this.page.locator(selector).isVisible();
    }
    /** Check if an element is enabled (clickable) */
    async isElementEnabled(selector) {
        return this.page.locator(selector).isEnabled();
    }
    /** Get text from any element */
    async getElementText(selector) {
        const text = await this.page.locator(selector).textContent();
        return text || '';
    }
}
exports.SimpleHelper = SimpleHelper;
//# sourceMappingURL=SimpleHelper.js.map