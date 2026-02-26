import { Locator, Page } from '@playwright/test';
/**
 * Enhanced ActionHelper with comprehensive interaction methods
 * Provides reusable methods for performing actions on web elements
 */
export declare class ActionHelper {
    private page;
    private locatorHelper;
    private waitHelper;
    private readonly slowMo;
    constructor(page: Page);
    /**
     * Click on element by selector
     */
    click(selector: string, options?: {
        force?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Click on locator
     */
    clickLocator(locator: Locator, options?: {
        force?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Double click on element
     */
    doubleClick(selector: string, options?: {
        force?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Right click on element
     */
    rightClick(selector: string, options?: {
        force?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Click link by text
     */
    clickLinkByText(text: string, exact?: boolean): Promise<void>;
    /**
     * Click button by text
     */
    clickButtonByText(text: string, exact?: boolean): Promise<void>;
    /**
     * Fill input field by selector
     */
    fill(selector: string, value: string, options?: {
        clear?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Fill input by label
     */
    fillInputByLabel(label: string, value: string, exact?: boolean, options?: {
        clear?: boolean;
    }): Promise<void>;
    /**
     * Fill input by placeholder
     */
    fillInputByPlaceholder(placeholder: string, value: string, exact?: boolean): Promise<void>;
    /**
     * Type text with delay between keystrokes
     */
    type(selector: string, text: string, delay?: number): Promise<void>;
    /**
     * Clear input field
     */
    clear(selector: string): Promise<void>;
    /**
     * Press key
     */
    pressKey(key: string): Promise<void>;
    /**
     * Press key combination
     */
    pressKeyCombo(keys: string[]): Promise<void>;
    /**
     * Select option from dropdown by label
     */
    selectOptionFromDropdown(selector: string, label: string): Promise<void>;
    /**
     * Select option from dropdown by value
     */
    selectOptionByValue(selector: string, value: string): Promise<void>;
    /**
     * Select option from dropdown by index
     */
    selectOptionByIndex(selector: string, index: number): Promise<void>;
    /**
     * Check checkbox
     */
    checkCheckbox(selector: string, force?: boolean): Promise<void>;
    /**
     * Uncheck checkbox
     */
    uncheckCheckbox(selector: string, force?: boolean): Promise<void>;
    /**
     * Toggle checkbox
     */
    toggleCheckbox(selector: string, force?: boolean): Promise<void>;
    /**
     * Select radio button by label
     */
    selectRadioByLabel(labelText: string, exact?: boolean): Promise<void>;
    /**
     * Select radio button by value
     */
    selectRadioByValue(name: string, value: string): Promise<void>;
    /**
     * Select custom dropdown option
     */
    selectCustomDropdown(selector: string, visibleText: string, exact?: boolean): Promise<void>;
    /**
     * Hover over element
     */
    hover(selector: string): Promise<void>;
    /**
     * Scroll element into view
     */
    scrollIntoView(selector: string): Promise<void>;
    /**
     * Scroll to top of page
     */
    scrollToTop(): Promise<void>;
    /**
     * Scroll to bottom of page
     */
    scrollToBottom(): Promise<void>;
    /**
     * Scroll by pixels
     */
    scrollBy(x: number, y: number): Promise<void>;
    /**
     * Drag and drop
     */
    dragAndDrop(sourceSelector: string, targetSelector: string): Promise<void>;
    /**
     * Upload file
     */
    uploadFile(selector: string, filePath: string | string[]): Promise<void>;
    /**
     * Focus on element
     */
    focus(selector: string): Promise<void>;
    /**
     * Blur (remove focus from) element
     */
    blur(selector: string): Promise<void>;
    /**
     * Get trimmed text content from locator
     */
    getTrimmedText(locator: Locator): Promise<string>;
    /**
     * Get text content from selector
     */
    getText(selector: string): Promise<string>;
    /**
     * Get attribute value
     */
    getAttribute(selector: string, attribute: string): Promise<string | null>;
    /**
     * Get input value
     */
    getInputValue(selector: string): Promise<string>;
    /**
     * Check if element is visible
     */
    isVisible(selector: string): Promise<boolean>;
    /**
     * Check if element is enabled
     */
    isEnabled(selector: string): Promise<boolean>;
    /**
     * Check if checkbox/radio is checked
     */
    isChecked(selector: string): Promise<boolean>;
    /**
     * Get element count
     */
    getElementCount(selector: string): Promise<number>;
    /**
     * Click element by exact text
     */
    clickElementByExactText(elements: Locator, targetText: string): Promise<void>;
    /**
     * Click row by matching text
     */
    clickRowByMatchingText(rows: Locator, getTextFromRow: (row: Locator) => Promise<string>, matchText: string): Promise<void>;
    /**
     * Click multiple checkboxes by label text
     */
    clickCheckboxByText(...labelTexts: string[]): Promise<void>;
    /**
     * Switch to tab by URL part
     */
    switchToTabByUrlPart(partialUrl: string): Promise<Page | null>;
    /**
     * Close current tab and switch to previous
     */
    closeCurrentTab(): Promise<Page | null>;
    /**
     * Accept browser dialog (alert, confirm, prompt)
     */
    acceptDialog(): Promise<void>;
    /**
     * Dismiss browser dialog
     */
    dismissDialog(): Promise<void>;
    /**
     * Handle dialog with custom text
     */
    handleDialog(text: string): Promise<void>;
}
//# sourceMappingURL=ActionHelper.d.ts.map