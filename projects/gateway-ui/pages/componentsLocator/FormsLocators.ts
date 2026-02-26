// projects/gateway-ui/pages/componentsLocator/FormsLocators.ts
import { Locator, Page } from '@playwright/test';

/**
 * FormsComponent - Essential locators for Forms-related pages/components
 *
 * Notes:
 * - Retail dropdowns are handled via ActionHelper.selectDropdownByLabel/ByAnyLabel
 * - Select2 handling is encapsulated in ActionHelper, with this component exposing only special cases.
 */
export class FormsComponent {
  constructor(private readonly page: Page) {}

  // =================================================
  // CORPORATE / CLIENT FIELDS
  // =================================================

  // Date Established (prefers label, falls back to id)
  get dateEstablished(): Locator {
    return this.page
      .getByLabel('Date Established', { exact: true })
      .or(this.page.locator('#DateEstablished'));
  }

  // Client DOB (explicit id)
  get clientDOB(): Locator {
    return this.page.locator('#ClientOneDOB');
  }

  // =================================================
  // FORM INPUT SELECTORS
  // =================================================

  // Generic form input selectors
  get checkboxInput(): string {
    return 'input[type="checkbox"]';
  }

  get radioInput(): string {
    return 'input[type="radio"]';
  }

  get textInput(): string {
    return 'input[type="text"]';
  }

  get emailInput(): string {
    return 'input[type="email"]';
  }

  get numberInput(): string {
    return 'input[type="number"]';
  }

  get selectDropdown(): string {
    return 'select';
  }

  get textareaInput(): string {
    return 'textarea';
  }

}
