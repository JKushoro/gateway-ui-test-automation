// framework/src/helpers/simple/FormHelper.ts
import { Locator, Page } from '@playwright/test';
import { WaitHelper } from '../WaitHelper';
import { createLogger } from '../../utils/Logger';

/**
 * 📝 Simple Form Helper
 * Easy-to-understand methods for filling out forms
 */
export class FormHelper {
  private wait: WaitHelper;
  private logger = createLogger('FormHelper');

  constructor(private page: Page) {
    this.wait = new WaitHelper(page);
  }

  // ===== FILL TEXT INPUTS =====
  
  /** Type text into an input field by its label (e.g., "Email", "First Name") */
  async typeInField(labelText: string, text: string): Promise<void> {
    const input = this.page.getByLabel(labelText, { exact: false });
    await this.wait.waitForElement(input);
    await input.fill(text);
    this.logger.info?.(`✓ Typed "${text}" in field: ${labelText}`);
  }

  /** Type text into an input field by its name attribute */
  async typeInFieldByName(fieldName: string, text: string): Promise<void> {
    const input = this.page.locator(`input[name="${fieldName}"]`);
    await this.wait.waitForElement(input);
    await input.fill(text);
    this.logger.info?.(`✓ Typed "${text}" in field: ${fieldName}`);
  }

  /** Clear and type new text in a field */
  async clearAndType(labelText: string, text: string): Promise<void> {
    const input = this.page.getByLabel(labelText, { exact: false });
    await this.wait.waitForElement(input);
    await input.clear();
    await input.fill(text);
    this.logger.info?.(`✓ Cleared and typed "${text}" in field: ${labelText}`);
  }

  // ===== DROPDOWNS =====
  
  /** Select an option from a dropdown by the dropdown's label */
  async selectFromDropdown(dropdownLabel: string, optionText: string): Promise<void> {
    const dropdown = this.page.getByLabel(dropdownLabel, { exact: false });
    await this.wait.waitForElement(dropdown);
    await dropdown.selectOption({ label: optionText });
    this.logger.info?.(`✓ Selected "${optionText}" from dropdown: ${dropdownLabel}`);
  }

  /** Select a random option from a dropdown */
  async selectRandomFromDropdown(dropdownLabel: string): Promise<string> {
    const dropdown = this.page.getByLabel(dropdownLabel, { exact: false });
    await this.wait.waitForElement(dropdown);
    
    const options = await dropdown.locator('option').all();
    const validOptions: Array<{ value: string; text: string }> = [];
    
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
  async checkBox(labelText: string): Promise<void> {
    const checkbox = this.page.getByLabel(labelText, { exact: false });
    await this.wait.waitForElement(checkbox);
    await checkbox.check();
    this.logger.info?.(`✓ Checked checkbox: ${labelText}`);
  }

  /** Uncheck a checkbox by its label */
  async uncheckBox(labelText: string): Promise<void> {
    const checkbox = this.page.getByLabel(labelText, { exact: false });
    await this.wait.waitForElement(checkbox);
    await checkbox.uncheck();
    this.logger.info?.(`✓ Unchecked checkbox: ${labelText}`);
  }

  // ===== RADIO BUTTONS =====
  
  /** Select a radio button option by the question text and answer */
  async selectRadioOption(questionText: string, answerText: string): Promise<void> {
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
  async getFieldValue(labelText: string): Promise<string> {
    const input = this.page.getByLabel(labelText, { exact: false });
    await this.wait.waitForElement(input);
    const value = await input.inputValue();
    this.logger.info?.(`✓ Got value "${value}" from field: ${labelText}`);
    return value;
  }

  /** Check if a checkbox is currently checked */
  async isBoxChecked(labelText: string): Promise<boolean> {
    const checkbox = this.page.getByLabel(labelText, { exact: false });
    await this.wait.waitForElement(checkbox);
    const isChecked = await checkbox.isChecked();
    this.logger.info?.(`✓ Checkbox "${labelText}" is ${isChecked ? 'checked' : 'unchecked'}`);
    return isChecked;
  }
}