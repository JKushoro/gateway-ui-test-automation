import { Page } from '@playwright/test';
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
export declare class SimpleHelper {
    private page;
    private clickHelper;
    private formHelper;
    constructor(page: Page);
    /** Click a button by its text (e.g., "Save", "Submit", "Continue") */
    clickButton(buttonText: string): Promise<void>;
    /** Click a button with exact text match */
    clickButtonExact(buttonText: string): Promise<void>;
    /** Click a link by its text */
    clickLink(linkText: string): Promise<void>;
    /** Click any element by its selector */
    clickElement(selector: string): Promise<void>;
    /** Type text into an input field by its label (e.g., "Email", "First Name") */
    typeInField(labelText: string, text: string): Promise<void>;
    /** Type text into an input field by its name attribute */
    typeInFieldByName(fieldName: string, text: string): Promise<void>;
    /** Clear and type new text in a field */
    clearAndType(labelText: string, text: string): Promise<void>;
    /** Select an option from a dropdown by the dropdown's label */
    selectFromDropdown(dropdownLabel: string, optionText: string): Promise<void>;
    /** Select a random option from a dropdown */
    selectRandomFromDropdown(dropdownLabel: string): Promise<string>;
    /** Check a checkbox by its label */
    checkBox(labelText: string): Promise<void>;
    /** Uncheck a checkbox by its label */
    uncheckBox(labelText: string): Promise<void>;
    /** Select a radio button option by the question text and answer */
    selectRadioOption(questionText: string, answerText: string): Promise<void>;
    /** Get the current text in an input field */
    getFieldValue(labelText: string): Promise<string>;
    /** Check if a checkbox is currently checked */
    isBoxChecked(labelText: string): Promise<boolean>;
    /** Go to a specific URL */
    goToPage(url: string): Promise<void>;
    /** Get the current page title */
    getPageTitle(): Promise<string>;
    /** Press a key on the keyboard */
    pressKey(key: string): Promise<void>;
    /** Wait for a specific amount of time (in milliseconds) */
    waitFor(milliseconds: number): Promise<void>;
    /** Wait for an element to appear on the page */
    waitForElement(selector: string): Promise<void>;
    /** Check if an element is visible on the page */
    isElementVisible(selector: string): Promise<boolean>;
    /** Check if an element is enabled (clickable) */
    isElementEnabled(selector: string): Promise<boolean>;
    /** Get text from any element */
    getElementText(selector: string): Promise<string>;
}
//# sourceMappingURL=SimpleHelper.d.ts.map