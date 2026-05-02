// BaseKYCPageLocators.ts
import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';

/**
 * Base KYC Page Locators
 * Contains common locators used across all KYC pages
 */
export class BaseKYCPageLocators extends BasePage {
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  // ----------------------------------------------------------
  // Common KYC Page Elements
  // ----------------------------------------------------------

  /**
   * Common heading locator for KYC pages
   */
  public get pageHeading(): Locator {
    return this.page
      .locator('h1, h2, .heading, [data-testid="page-heading"]')
      .first();
  }

  /**
   * Get dropdown element by label text
   */
  public getDropdownByLabel(labelText: string): Locator {
    return this.page
      .locator('select')
      .filter({ hasText: labelText })
      .or(this.page.locator('[role="combobox"]').filter({ hasText: labelText }));
  }

  /**
   * Get select dropdown element
   */
  public get selectDropdown(): Locator {
    return this.page.locator('select');
  }

  /**
   * Get combobox element
   */
  public get comboboxDropdown(): Locator {
    return this.page.locator('[role="combobox"]');
  }
}