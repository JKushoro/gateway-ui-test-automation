import { Locator, Page } from '@playwright/test';


/**
 * Professional LocatorHelper with comprehensive locator strategies
 * Self-contained with no external dependencies
 */
export class LocatorHelper {
  constructor(private page: Page) {}

  /**
   * Get locator by CSS selector
   */
  public getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Get locator by data-testid attribute
   */
  public getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  /**
   * Get locator by role
   */
  public getByRole(
    role:
      | 'button'
      | 'link'
      | 'textbox'
      | 'checkbox'
      | 'radio'
      | 'table'
      | 'row'
      | 'cell'
      | 'heading'
      | 'form',
    options?: { name?: string | RegExp; exact?: boolean }
  ): Locator {
    return this.page.getByRole(role, options);
  }

  /**
   * Get link by text
   */
  public getLinkByText(text: string, exact: boolean = true): Locator {
    return this.page.getByRole('link', { name: text, exact });
  }

  /**
   * Get button by text
   */
  public getButtonByText(text: string, exact: boolean = true): Locator {
    return this.page.getByRole('button', { name: text, exact });
  }

  /**
   * Get input by label
   */
  public getInputByLabel(label: string, exact: boolean = true): Locator {
    return this.page.getByLabel(label, { exact });
  }

  /**
   * Get input by placeholder
   */
  public getInputByPlaceholder(placeholder: string, exact: boolean = true): Locator {
    return this.page.getByPlaceholder(placeholder, { exact });
  }

  /**
   * Get element by text content
   */
  public getByText(text: string, exact: boolean = true): Locator {
    return this.page.getByText(text, { exact });
  }

  /**
   * Get element by title attribute
   */
  public getByTitle(title: string, exact: boolean = true): Locator {
    return this.page.getByTitle(title, { exact });
  }

  /**
   * Get element by alt text (for images)
   */
  public getByAltText(altText: string, exact: boolean = true): Locator {
    return this.page.getByAltText(altText, { exact });
  }

  /**
   * Get label by text
   */
  public getLabelByText(text: string): Locator {
    return this.page.locator(`label:has-text("${text}")`);
  }

  /**
   * Get element by attribute
   */
  public getByAttribute(attribute: string, value: string): Locator {
    return this.page.locator(`[${attribute}="${value}"]`);
  }

  /**
   * Get element by class name
   */
  public getByClass(className: string): Locator {
    return this.page.locator(`.${className}`);
  }

  /**
   * Get element by ID
   */
  public getById(id: string): Locator {
    return this.page.locator(`#${id}`);
  }

  /**
   * Get element by tag name
   */
  public getByTag(tagName: string): Locator {
    return this.page.locator(tagName);
  }

  /**
   * Get element by XPath
   */
  public getByXPath(xpath: string): Locator {
    return this.page.locator(`xpath=${xpath}`);
  }

  /**
   * Get first element matching selector
   */
  public getFirst(selector: string): Locator {
    return this.page.locator(selector).first();
  }

  /**
   * Get last element matching selector
   */
  public getLast(selector: string): Locator {
    return this.page.locator(selector).last();
  }

  /**
   * Get nth element matching selector
   */
  public getNth(selector: string, index: number): Locator {
    return this.page.locator(selector).nth(index);
  }

  /**
   * Get all elements matching selector
   */
  public getAll(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Get element containing specific text
   */
  public getContainingText(selector: string, text: string): Locator {
    return this.page.locator(selector, { hasText: text });
  }

  /**
   * Get element that has another element
   */
  public getHasElement(selector: string, hasSelector: string): Locator {
    return this.page.locator(selector, { has: this.page.locator(hasSelector) });
  }

  /**
   * Get parent element
   */
  public getParent(locator: Locator): Locator {
    return locator.locator('..');
  }

  /**
   * Get child elements
   */
  public getChildren(locator: Locator, childSelector?: string): Locator {
    return childSelector ? locator.locator(childSelector) : locator.locator('> *');
  }

  /**
   * Get sibling elements
   */
  public getSiblings(locator: Locator): Locator {
    return locator.locator('~ *');
  }

  /**
   * Get next sibling
   */
  public getNextSibling(locator: Locator): Locator {
    return locator.locator('+ *');
  }

  /**
   * Get element within a frame
   */
  public getInFrame(frameSelector: string, elementSelector: string): Locator {
    return this.page.frameLocator(frameSelector).locator(elementSelector);
  }

  /**
   * Get table cell by row and column
   */
  public getTableCell(tableSelector: string, row: number, column: number): Locator {
    return this.page.locator(
      `${tableSelector} tr:nth-child(${row + 1}) td:nth-child(${column + 1})`
    );
  }

  /**
   * Get table row by index
   */
  public getTableRow(tableSelector: string, rowIndex: number): Locator {
    return this.page.locator(`${tableSelector} tr:nth-child(${rowIndex + 1})`);
  }

  /**
   * Get table header by index
   */
  public getTableHeader(tableSelector: string, columnIndex: number): Locator {
    return this.page.locator(`${tableSelector} th:nth-child(${columnIndex + 1})`);
  }

  /**
   * Get all table rows
   */
  public getTableRows(tableSelector: string): Locator {
    return this.page.locator(`${tableSelector} tr`);
  }

  /**
   * Get all table cells in a row
   */
  public getTableCellsInRow(tableSelector: string, rowIndex: number): Locator {
    return this.page.locator(`${tableSelector} tr:nth-child(${rowIndex + 1}) td`);
  }

  /**
   * Get dropdown option
   */
  public getDropdownOption(selectSelector: string, optionText: string): Locator {
    return this.page.locator(`${selectSelector} option:has-text("${optionText}")`);
  }

  /**
   * Get all dropdown options
   */
  public getDropdownOptions(selectSelector: string): Locator {
    return this.page.locator(`${selectSelector} option`);
  }

  /**
   * Get form field by name attribute
   */
  public getFormField(name: string): Locator {
    return this.page.locator(`[name="${name}"]`);
  }

  /**
   * Get form by name or id
   */
  public getForm(nameOrId: string): Locator {
    return this.page.locator(`form[name="${nameOrId}"], form#${nameOrId}`);
  }

  /**
   * Get element by CSS pseudo-selector
   */
  public getByPseudoSelector(selector: string, pseudo: string): Locator {
    return this.page.locator(`${selector}:${pseudo}`);
  }

  /**
   * Get element by data attribute
   */
  public getByDataAttribute(dataName: string, value?: string): Locator {
    if (value) {
      return this.page.locator(`[data-${dataName}="${value}"]`);
    }
    return this.page.locator(`[data-${dataName}]`);
  }

  /**
   * Get element by aria-label
   */
  public getByAriaLabel(label: string): Locator {
    return this.page.locator(`[aria-label="${label}"]`);
  }

  /**
   * Get element by aria-labelledby
   */
  public getByAriaLabelledBy(id: string): Locator {
    return this.page.locator(`[aria-labelledby="${id}"]`);
  }

  /**
   * Get element by aria-describedby
   */
  public getByAriaDescribedBy(id: string): Locator {
    return this.page.locator(`[aria-describedby="${id}"]`);
  }

  /**
   * Get visible elements only
   */
  public getVisible(selector: string): Locator {
    return this.page.locator(selector).locator('visible=true');
  }

  /**
   * Get enabled elements only
   */
  public getEnabled(selector: string): Locator {
    return this.page.locator(selector).locator(':enabled');
  }

  /**
   * Get disabled elements only
   */
  public getDisabled(selector: string): Locator {
    return this.page.locator(selector).locator(':disabled');
  }

  /**
   * Get checked elements only (checkboxes/radio buttons)
   */
  public getChecked(selector: string): Locator {
    return this.page.locator(selector).locator(':checked');
  }

  /**
   * Get unchecked elements only
   */
  public getUnchecked(selector: string): Locator {
    return this.page.locator(selector).locator(':not(:checked)');
  }

  /**
   * Get focused element
   */
  public getFocused(): Locator {
    return this.page.locator(':focus');
  }

  /**
   * Get elements with specific text content (exact match)
   */
  public getWithExactText(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }

  /**
   * Get elements containing specific text (partial match)
   */
  public getContainingTextPartial(text: string): Locator {
    return this.page.getByText(text, { exact: false });
  }

}