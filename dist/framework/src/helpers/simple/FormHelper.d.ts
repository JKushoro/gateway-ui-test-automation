import { Page } from '@playwright/test';
/**
 * 📝 Simple Form Helper
 * Easy-to-understand methods for filling out forms
 */
export declare class FormHelper {
    private page;
    private wait;
    private logger;
    constructor(page: Page);
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
}
//# sourceMappingURL=FormHelper.d.ts.map