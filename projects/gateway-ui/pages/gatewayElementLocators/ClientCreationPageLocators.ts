// projects/gateway-ui/pages/clients/ClientCreationPageLocators.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';

/**
 * ClientCreationPageLocators - Page object for individual client creation
 * Contains locators and methods specific to the create client page
 *
 * Note: This page currently uses shared form components from FormsComponent.
 * Alert handling is centralized in AlertService.
 */

export class ClientCreationPageLocators extends BasePage {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  // Global Select2 popup options (Select2 renders one global listbox)
  public get s2Options(): Locator {
    return this.page.locator('body ul.select2-results__options li.select2-results__option');
  }

  // Adviser Select2
  public get adviserTrigger(): Locator {
    return this.page
      .locator('.form-group:has(label:has-text("Adviser")) .select2-selection, .form-group:has(label:has-text("Adviser")) .select2-choice')
      .first();
  }
  public get adviserRendered(): Locator {
    return this.page
      .locator('.form-group:has(label:has-text("Adviser")) .select2-selection__rendered, .form-group:has(label:has-text("Adviser")) .select2-chosen')
      .first();
  }

  // Title Select2
  public get titleTrigger(): Locator {
    return this.page
      .locator('.form-group:has(label:has-text("Title")) .select2-selection, .form-group:has(label:has-text("Title")) .select2-choice')
      .first();
  }
  public get titleRendered(): Locator {
    return this.page
      .locator('.form-group:has(label:has-text("Title")) .select2-selection__rendered, .form-group:has(label:has-text("Title")) .select2-chosen')
      .first();
  }

  // Source of Enquiry Select2
  public get sourceTrigger(): Locator {
    return this.page
      .locator('.form-group:has(label:has-text("Source of Enquiry")) .select2-selection, .form-group:has(label:has-text("Source of Enquiry")) .select2-choice')
      .first();
  }
  public get sourceRendered(): Locator {
    return this.page
      .locator('.form-group:has(label:has-text("Source of Enquiry")) .select2-selection__rendered, .form-group:has(label:has-text("Source of Enquiry")) .select2-chosen')
      .first();
  }
}
