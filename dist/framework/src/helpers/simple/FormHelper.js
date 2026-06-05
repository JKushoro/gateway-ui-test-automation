"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormHelper = void 0;
const WaitHelper_1 = require("../WaitHelper");
const Logger_1 = require("../../utils/Logger");
/**
 * 📝 Simple Form Helper
 * Easy-to-understand methods for filling out forms
 */
class FormHelper {
    constructor(page) {
        this.page = page;
        this.logger = (0, Logger_1.createLogger)('FormHelper');
        this.wait = new WaitHelper_1.WaitHelper(page);
    }
    // ===== FILL TEXT INPUTS =====
    /** Type text into an input field by its label (e.g., "Email", "First Name") */
    async typeInField(labelText, text) {
        const input = this.page.getByLabel(labelText, { exact: false });
        await this.wait.waitForElement(input);
        await input.fill(text);
        this.logger.info?.(`✓ Typed "${text}" in field: ${labelText}`);
    }
    /** Type text into an input field by its name attribute */
    async typeInFieldByName(fieldName, text) {
        const input = this.page.locator(`input[name="${fieldName}"]`);
        await this.wait.waitForElement(input);
        await input.fill(text);
        this.logger.info?.(`✓ Typed "${text}" in field: ${fieldName}`);
    }
    /** Clear and type new text in a field */
    async clearAndType(labelText, text) {
        const input = this.page.getByLabel(labelText, { exact: false });
        await this.wait.waitForElement(input);
        await input.clear();
        await input.fill(text);
        this.logger.info?.(`✓ Cleared and typed "${text}" in field: ${labelText}`);
    }
    // ===== DROPDOWNS =====
    /** Select an option from a dropdown by the dropdown's label */
    async selectFromDropdown(dropdownLabel, optionText) {
        const dropdown = this.page.getByLabel(dropdownLabel, { exact: false });
        await this.wait.waitForElement(dropdown);
        await dropdown.selectOption({ label: optionText });
        this.logger.info?.(`✓ Selected "${optionText}" from dropdown: ${dropdownLabel}`);
    }
    /** Select a random option from a dropdown */
    async selectRandomFromDropdown(dropdownLabel) {
        const dropdown = this.page.getByLabel(dropdownLabel, { exact: false });
        await this.wait.waitForElement(dropdown);
        const options = await dropdown.locator('option').all();
        const validOptions = [];
        for (const option of options) {
            const value = await option.getAttribute('value');
            const text = await option.textContent();
            if (value && value.trim() !== '' && text && text.trim() !== '') {
                validOptions.push({ value, text: text.trim() });
            }
        }
        if (validOptions.length === 0) {
            throw new Error(`No valid options found in dropdown: ${dropdownLabel}`);
        }
        const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)];
        await dropdown.selectOption({ value: randomOption.value });
        this.logger.info?.(`✓ Selected random option "${randomOption.text}" from dropdown: ${dropdownLabel}`);
        return randomOption.text;
    }
    // ===== CHECKBOXES =====
    /** Check a checkbox by its label */
    async checkBox(labelText) {
        const checkbox = this.page.getByLabel(labelText, { exact: false });
        await this.wait.waitForElement(checkbox);
        await checkbox.check();
        this.logger.info?.(`✓ Checked checkbox: ${labelText}`);
    }
    /** Uncheck a checkbox by its label */
    async uncheckBox(labelText) {
        const checkbox = this.page.getByLabel(labelText, { exact: false });
        await this.wait.waitForElement(checkbox);
        await checkbox.uncheck();
        this.logger.info?.(`✓ Unchecked checkbox: ${labelText}`);
    }
    // ===== RADIO BUTTONS =====
    /** Select a radio button option by the question text and answer */
    async selectRadioOption(questionText, answerText) {
        // Find the question text first
        const question = this.page.getByText(questionText, { exact: false });
        await this.wait.waitForElement(question);
        // Find the radio button with the answer text
        const radioButton = this.page.getByRole('radio', { name: new RegExp(answerText, 'i') });
        await this.wait.waitForElement(radioButton);
        await radioButton.check();
        this.logger.info?.(`✓ Selected "${answerText}" for question: ${questionText}`);
    }
    // ===== GET VALUES =====
    /** Get the current text in an input field */
    async getFieldValue(labelText) {
        const input = this.page.getByLabel(labelText, { exact: false });
        await this.wait.waitForElement(input);
        const value = await input.inputValue();
        this.logger.info?.(`✓ Got value "${value}" from field: ${labelText}`);
        return value;
    }
    /** Check if a checkbox is currently checked */
    async isBoxChecked(labelText) {
        const checkbox = this.page.getByLabel(labelText, { exact: false });
        await this.wait.waitForElement(checkbox);
        const isChecked = await checkbox.isChecked();
        this.logger.info?.(`✓ Checkbox "${labelText}" is ${isChecked ? 'checked' : 'unchecked'}`);
        return isChecked;
    }
}
exports.FormHelper = FormHelper;
//# sourceMappingURL=FormHelper.js.map