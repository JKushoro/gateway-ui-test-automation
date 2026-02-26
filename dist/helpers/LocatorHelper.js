"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocatorHelper = void 0;
/**
 * Enhanced LocatorHelper with comprehensive locator strategies
 * Provides reusable methods for finding elements using various strategies
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
     * Get dropdown option
     */
    getDropdownOption(selectSelector, optionText) {
        return this.page.locator(`${selectSelector} option:has-text("${optionText}")`);
    }
    /**
     * Get form field by name attribute
     */
    getFormField(name) {
        return this.page.locator(`[name="${name}"]`);
    }
    /**
     * Get element by CSS pseudo-selector
     */
    getByPseudoSelector(selector, pseudo) {
        return this.page.locator(`${selector}:${pseudo}`);
    }
}
exports.LocatorHelper = LocatorHelper;
//# sourceMappingURL=LocatorHelper.js.map