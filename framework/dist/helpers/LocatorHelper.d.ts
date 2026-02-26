import { Page, Locator } from '../types/PlaywrightTypes';
/**
 * Professional LocatorHelper with comprehensive locator strategies
 * Self-contained with no external dependencies
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
    getByRole(role: 'button' | 'link' | 'textbox' | 'checkbox' | 'radio' | 'combobox' | 'listbox' | 'tab' | 'tabpanel' | 'grid' | 'gridcell' | 'article' | 'banner' | 'complementary' | 'contentinfo' | 'form' | 'main' | 'navigation' | 'region' | 'search' | 'img' | 'list' | 'listitem' | 'table' | 'row' | 'cell' | 'columnheader' | 'rowheader' | 'heading' | 'group' | 'dialog' | 'alertdialog' | 'alert' | 'log' | 'marquee' | 'status' | 'timer' | 'progressbar' | 'slider' | 'spinbutton' | 'switch' | 'menubar' | 'menu' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'option' | 'tree' | 'treeitem' | 'application' | 'document' | 'note' | 'tooltip' | 'presentation' | 'none', options?: {
        name?: string | RegExp;
        exact?: boolean;
        level?: number;
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
     * Get table header by index
     */
    getTableHeader(tableSelector: string, columnIndex: number): Locator;
    /**
     * Get all table rows
     */
    getTableRows(tableSelector: string): Locator;
    /**
     * Get all table cells in a row
     */
    getTableCellsInRow(tableSelector: string, rowIndex: number): Locator;
    /**
     * Get dropdown option
     */
    getDropdownOption(selectSelector: string, optionText: string): Locator;
    /**
     * Get all dropdown options
     */
    getDropdownOptions(selectSelector: string): Locator;
    /**
     * Get form field by name attribute
     */
    getFormField(name: string): Locator;
    /**
     * Get form by name or id
     */
    getForm(nameOrId: string): Locator;
    /**
     * Get element by CSS pseudo-selector
     */
    getByPseudoSelector(selector: string, pseudo: string): Locator;
    /**
     * Get element by data attribute
     */
    getByDataAttribute(dataName: string, value?: string): Locator;
    /**
     * Get element by aria-label
     */
    getByAriaLabel(label: string): Locator;
    /**
     * Get element by aria-labelledby
     */
    getByAriaLabelledBy(id: string): Locator;
    /**
     * Get element by aria-describedby
     */
    getByAriaDescribedBy(id: string): Locator;
    /**
     * Get visible elements only
     */
    getVisible(selector: string): Locator;
    /**
     * Get enabled elements only
     */
    getEnabled(selector: string): Locator;
    /**
     * Get disabled elements only
     */
    getDisabled(selector: string): Locator;
    /**
     * Get checked elements only (checkboxes/radio buttons)
     */
    getChecked(selector: string): Locator;
    /**
     * Get unchecked elements only
     */
    getUnchecked(selector: string): Locator;
    /**
     * Get focused element
     */
    getFocused(): Locator;
    /**
     * Get elements with specific text content (exact match)
     */
    getWithExactText(text: string): Locator;
    /**
     * Get elements containing specific text (partial match)
     */
    getContainingTextPartial(text: string): Locator;
    /**
     * Get elements by regex pattern
     */
    getByTextPattern(pattern: RegExp): Locator;
    /**
     * Get shadow DOM element
     */
    getShadowElement(hostSelector: string, shadowSelector: string): Locator;
    /**
     * Get element with specific CSS property
     */
    getByCSSProperty(selector: string, property: string, value: string): Locator;
    /**
     * Get element by multiple attributes
     */
    getByMultipleAttributes(attributes: Record<string, string>): Locator;
    /**
     * Get element by complex selector chain
     */
    getByChain(...selectors: string[]): Locator;
    /**
     * Get element with timeout for dynamic content
     */
    getWithTimeout(selector: string, timeout?: number): Promise<Locator>;
    /**
     * Filter locator by text content
     */
    filterByText(locator: Locator, text: string, exact?: boolean): Locator;
    /**
     * Filter locator by another locator
     */
    filterByLocator(locator: Locator, filterLocator: Locator): Locator;
    /**
     * Get count of matching elements
     */
    getCount(selector: string): Promise<number>;
    /**
     * Check if element exists
     */
    exists(selector: string): Promise<boolean>;
    /**
     * Get element with retry logic for dynamic content
     */
    getWithRetry(selector: string, maxRetries?: number, retryDelay?: number): Promise<Locator>;
}
//# sourceMappingURL=LocatorHelper.d.ts.map