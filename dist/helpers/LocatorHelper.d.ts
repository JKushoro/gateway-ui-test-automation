import { Page, Locator } from '@playwright/test';
/**
 * Enhanced LocatorHelper with comprehensive locator strategies
 * Provides reusable methods for finding elements using various strategies
 */
export declare class LocatorHelper {
    private page;
    constructor(page: Page);
    /**
     * Get locator by CSS selector
     */
    getLocator(selector: string): Locator;
    /**
     * Get locator by data-testid attribute
     */
    getByTestId(testId: string): Locator;
    /**
     * Get locator by role
     */
    getByRole(role: 'button' | 'link' | 'textbox' | 'checkbox' | 'radio' | 'combobox' | 'listbox' | 'tab' | 'tabpanel' | 'grid' | 'gridcell' | 'article' | 'banner' | 'complementary' | 'contentinfo' | 'form' | 'main' | 'navigation' | 'region' | 'search', options?: {
        name?: string | RegExp;
        exact?: boolean;
    }): Locator;
    /**
     * Get link by text
     */
    getLinkByText(text: string, exact?: boolean): Locator;
    /**
     * Get button by text
     */
    getButtonByText(text: string, exact?: boolean): Locator;
    /**
     * Get input by label
     */
    getInputByLabel(label: string, exact?: boolean): Locator;
    /**
     * Get input by placeholder
     */
    getInputByPlaceholder(placeholder: string, exact?: boolean): Locator;
    /**
     * Get element by text content
     */
    getByText(text: string, exact?: boolean): Locator;
    /**
     * Get element by title attribute
     */
    getByTitle(title: string, exact?: boolean): Locator;
    /**
     * Get element by alt text (for images)
     */
    getByAltText(altText: string, exact?: boolean): Locator;
    /**
     * Get label by text
     */
    getLabelByText(text: string): Locator;
    /**
     * Get element by attribute
     */
    getByAttribute(attribute: string, value: string): Locator;
    /**
     * Get element by class name
     */
    getByClass(className: string): Locator;
    /**
     * Get element by ID
     */
    getById(id: string): Locator;
    /**
     * Get element by tag name
     */
    getByTag(tagName: string): Locator;
    /**
     * Get element by XPath
     */
    getByXPath(xpath: string): Locator;
    /**
     * Get first element matching selector
     */
    getFirst(selector: string): Locator;
    /**
     * Get last element matching selector
     */
    getLast(selector: string): Locator;
    /**
     * Get nth element matching selector
     */
    getNth(selector: string, index: number): Locator;
    /**
     * Get all elements matching selector
     */
    getAll(selector: string): Locator;
    /**
     * Get element containing specific text
     */
    getContainingText(selector: string, text: string): Locator;
    /**
     * Get element that has another element
     */
    getHasElement(selector: string, hasSelector: string): Locator;
    /**
     * Get parent element
     */
    getParent(locator: Locator): Locator;
    /**
     * Get child elements
     */
    getChildren(locator: Locator, childSelector?: string): Locator;
    /**
     * Get sibling elements
     */
    getSiblings(locator: Locator): Locator;
    /**
     * Get next sibling
     */
    getNextSibling(locator: Locator): Locator;
    /**
     * Get element within a frame
     */
    getInFrame(frameSelector: string, elementSelector: string): Locator;
    /**
     * Get table cell by row and column
     */
    getTableCell(tableSelector: string, row: number, column: number): Locator;
    /**
     * Get table row by index
     */
    getTableRow(tableSelector: string, rowIndex: number): Locator;
    /**
     * Get dropdown option
     */
    getDropdownOption(selectSelector: string, optionText: string): Locator;
    /**
     * Get form field by name attribute
     */
    getFormField(name: string): Locator;
    /**
     * Get element by CSS pseudo-selector
     */
    getByPseudoSelector(selector: string, pseudo: string): Locator;
}
//# sourceMappingURL=LocatorHelper.d.ts.map