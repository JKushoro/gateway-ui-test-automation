"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocatorHelper = void 0;
/**
 * Professional LocatorHelper with comprehensive locator strategies
 * Self-contained with no external dependencies
 */
class LocatorHelper {
    constructor(page) {
        this.page = page;
    }
    /**
     * Get locator by CSS selector
     */
    getLocator(selector) {
        return this.page.locator(selector);
    }
    /**
     * Get locator by data-testid attribute
     */
    getByTestId(testId) {
        return this.page.getByTestId(testId);
    }
    /**
     * Get locator by role
     */
    getByRole(role, options) {
        return this.page.getByRole(role, options);
    }
    /**
     * Get link by text
     */
    getLinkByText(text, exact = true) {
        return this.page.getByRole('link', { name: text, exact });
    }
    /**
     * Get button by text
     */
    getButtonByText(text, exact = true) {
        return this.page.getByRole('button', { name: text, exact });
    }
    /**
     * Get input by label
     */
    getInputByLabel(label, exact = true) {
        return this.page.getByLabel(label, { exact });
    }
    /**
     * Get input by placeholder
     */
    getInputByPlaceholder(placeholder, exact = true) {
        return this.page.getByPlaceholder(placeholder, { exact });
    }
    /**
     * Get element by text content
     */
    getByText(text, exact = true) {
        return this.page.getByText(text, { exact });
    }
    /**
     * Get element by title attribute
     */
    getByTitle(title, exact = true) {
        return this.page.getByTitle(title, { exact });
    }
    /**
     * Get element by alt text (for images)
     */
    getByAltText(altText, exact = true) {
        return this.page.getByAltText(altText, { exact });
    }
    /**
     * Get label by text
     */
    getLabelByText(text) {
        return this.page.locator(`label:has-text("${text}")`);
    }
    /**
     * Get element by attribute
     */
    getByAttribute(attribute, value) {
        return this.page.locator(`[${attribute}="${value}"]`);
    }
    /**
     * Get element by class name
     */
    getByClass(className) {
        return this.page.locator(`.${className}`);
    }
    /**
     * Get element by ID
     */
    getById(id) {
        return this.page.locator(`#${id}`);
    }
    /**
     * Get element by tag name
     */
    getByTag(tagName) {
        return this.page.locator(tagName);
    }
    /**
     * Get element by XPath
     */
    getByXPath(xpath) {
        return this.page.locator(`xpath=${xpath}`);
    }
    /**
     * Get first element matching selector
     */
    getFirst(selector) {
        return this.page.locator(selector).first();
    }
    /**
     * Get last element matching selector
     */
    getLast(selector) {
        return this.page.locator(selector).last();
    }
    /**
     * Get nth element matching selector
     */
    getNth(selector, index) {
        return this.page.locator(selector).nth(index);
    }
    /**
     * Get all elements matching selector
     */
    getAll(selector) {
        return this.page.locator(selector);
    }
    /**
     * Get element containing specific text
     */
    getContainingText(selector, text) {
        return this.page.locator(selector, { hasText: text });
    }
    /**
     * Get element that has another element
     */
    getHasElement(selector, hasSelector) {
        return this.page.locator(selector, { has: this.page.locator(hasSelector) });
    }
    /**
     * Get parent element
     */
    getParent(locator) {
        return locator.locator('..');
    }
    /**
     * Get child elements
     */
    getChildren(locator, childSelector) {
        return childSelector ? locator.locator(childSelector) : locator.locator('> *');
    }
    /**
     * Get sibling elements
     */
    getSiblings(locator) {
        return locator.locator('~ *');
    }
    /**
     * Get next sibling
     */
    getNextSibling(locator) {
        return locator.locator('+ *');
    }
    /**
     * Get element within a frame
     */
    getInFrame(frameSelector, elementSelector) {
        return this.page.frameLocator(frameSelector).locator(elementSelector);
    }
    /**
     * Get table cell by row and column
     */
    getTableCell(tableSelector, row, column) {
        return this.page.locator(`${tableSelector} tr:nth-child(${row + 1}) td:nth-child(${column + 1})`);
    }
    /**
     * Get table row by index
     */
    getTableRow(tableSelector, rowIndex) {
        return this.page.locator(`${tableSelector} tr:nth-child(${rowIndex + 1})`);
    }
    /**
     * Get table header by index
     */
    getTableHeader(tableSelector, columnIndex) {
        return this.page.locator(`${tableSelector} th:nth-child(${columnIndex + 1})`);
    }
    /**
     * Get all table rows
     */
    getTableRows(tableSelector) {
        return this.page.locator(`${tableSelector} tr`);
    }
    /**
     * Get all table cells in a row
     */
    getTableCellsInRow(tableSelector, rowIndex) {
        return this.page.locator(`${tableSelector} tr:nth-child(${rowIndex + 1}) td`);
    }
    /**
     * Get dropdown option
     */
    getDropdownOption(selectSelector, optionText) {
        return this.page.locator(`${selectSelector} option:has-text("${optionText}")`);
    }
    /**
     * Get all dropdown options
     */
    getDropdownOptions(selectSelector) {
        return this.page.locator(`${selectSelector} option`);
    }
    /**
     * Get form field by name attribute
     */
    getFormField(name) {
        return this.page.locator(`[name="${name}"]`);
    }
    /**
     * Get form by name or id
     */
    getForm(nameOrId) {
        return this.page.locator(`form[name="${nameOrId}"], form#${nameOrId}`);
    }
    /**
     * Get element by CSS pseudo-selector
     */
    getByPseudoSelector(selector, pseudo) {
        return this.page.locator(`${selector}:${pseudo}`);
    }
    /**
     * Get element by data attribute
     */
    getByDataAttribute(dataName, value) {
        if (value) {
            return this.page.locator(`[data-${dataName}="${value}"]`);
        }
        return this.page.locator(`[data-${dataName}]`);
    }
    /**
     * Get element by aria-label
     */
    getByAriaLabel(label) {
        return this.page.locator(`[aria-label="${label}"]`);
    }
    /**
     * Get element by aria-labelledby
     */
    getByAriaLabelledBy(id) {
        return this.page.locator(`[aria-labelledby="${id}"]`);
    }
    /**
     * Get element by aria-describedby
     */
    getByAriaDescribedBy(id) {
        return this.page.locator(`[aria-describedby="${id}"]`);
    }
    /**
     * Get visible elements only
     */
    getVisible(selector) {
        return this.page.locator(selector).locator('visible=true');
    }
    /**
     * Get enabled elements only
     */
    getEnabled(selector) {
        return this.page.locator(selector).locator(':enabled');
    }
    /**
     * Get disabled elements only
     */
    getDisabled(selector) {
        return this.page.locator(selector).locator(':disabled');
    }
    /**
     * Get checked elements only (checkboxes/radio buttons)
     */
    getChecked(selector) {
        return this.page.locator(selector).locator(':checked');
    }
    /**
     * Get unchecked elements only
     */
    getUnchecked(selector) {
        return this.page.locator(selector).locator(':not(:checked)');
    }
    /**
     * Get focused element
     */
    getFocused() {
        return this.page.locator(':focus');
    }
    /**
     * Get elements with specific text content (exact match)
     */
    getWithExactText(text) {
        return this.page.getByText(text, { exact: true });
    }
    /**
     * Get elements containing specific text (partial match)
     */
    getContainingTextPartial(text) {
        return this.page.getByText(text, { exact: false });
    }
    /**
     * Get elements by regex pattern
     */
    getByTextPattern(pattern) {
        return this.page.getByText(pattern);
    }
    /**
     * Get shadow DOM element
     */
    getShadowElement(hostSelector, shadowSelector) {
        return this.page.locator(hostSelector).locator(shadowSelector);
    }
    /**
     * Get element with specific CSS property
     */
    getByCSSProperty(selector, property, value) {
        return this.page.locator(selector).locator(`css=${property}:${value}`);
    }
    /**
     * Get element by multiple attributes
     */
    getByMultipleAttributes(attributes) {
        const attributeSelectors = Object.entries(attributes)
            .map(([key, value]) => `[${key}="${value}"]`)
            .join('');
        return this.page.locator(attributeSelectors);
    }
    /**
     * Get element by complex selector chain
     */
    getByChain(...selectors) {
        return this.page.locator(selectors.join(' '));
    }
    /**
     * Get element with timeout for dynamic content
     */
    async getWithTimeout(selector, timeout = 30000) {
        await this.page.waitForSelector(selector, { timeout });
        return this.page.locator(selector);
    }
    /**
     * Filter locator by text content
     */
    filterByText(locator, text, exact = true) {
        return locator.filter({ hasText: exact ? new RegExp(`^${text}$`) : text });
    }
    /**
     * Filter locator by another locator
     */
    filterByLocator(locator, filterLocator) {
        return locator.filter({ has: filterLocator });
    }
    /**
     * Get count of matching elements
     */
    async getCount(selector) {
        return await this.page.locator(selector).count();
    }
    /**
     * Check if element exists
     */
    async exists(selector) {
        return await this.page.locator(selector).count() > 0;
    }
    /**
     * Get element with retry logic for dynamic content
     */
    async getWithRetry(selector, maxRetries = 3, retryDelay = 1000) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                const locator = this.page.locator(selector);
                await locator.waitFor({ state: 'attached', timeout: 5000 });
                return locator;
            }
            catch (error) {
                if (i === maxRetries - 1)
                    throw error;
                await this.page.waitForTimeout(retryDelay);
            }
        }
        throw new Error(`Element with selector "${selector}" not found after ${maxRetries} retries`);
    }
}
exports.LocatorHelper = LocatorHelper;
//# sourceMappingURL=LocatorHelper.js.map