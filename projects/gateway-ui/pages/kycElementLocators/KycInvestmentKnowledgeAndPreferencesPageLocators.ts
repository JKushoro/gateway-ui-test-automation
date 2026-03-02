import { BasePage, FrameworkConfig } from '@/framework/src';
import { Page, Locator } from '@playwright/test';

export class KycInvestmentKnowledgeAndPreferencesPageLocators extends BasePage {
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  /* =========================
     Responsible Investment Framework
  ========================= */

  get responsibleInvestmentFrameworkBox(): Locator {
    return this.page
      .locator('div.bg-blue-50')
      .filter({
        hasText: /Responsible Investment Framework/i,
      })
      .first();
  }

  get responsibleInvestmentFrameworkTitle(): Locator {
    return this.responsibleInvestmentFrameworkBox.getByText(
      "Fairstone's Responsible Investment Framework",
      { exact: true }
    );
  }

  get negativeScreensHeading(): Locator {
    return this.responsibleInvestmentFrameworkBox.getByText(/^Negative Screens\b/i);
  }

  get carbonReductionHeading(): Locator {
    return this.responsibleInvestmentFrameworkBox.getByText(/^Carbon Reduction\b/i);
  }

  get positiveOutcomesHeading(): Locator {
    return this.responsibleInvestmentFrameworkBox.getByText(/^Positive Outcomes\b/i);
  }

  /* =========================
   Negative Screens (Checkbox Group)
========================= */

  get negativeScreensFieldset(): Locator {
    return this.page.locator('fieldset[aria-labelledby="person.negativeScreens"]');
  }

  get negativeScreensCheckboxLabels(): Locator {
    return this.negativeScreensFieldset.locator('label');
  }

  get negativeScreensCheckboxInputs(): Locator {
    return this.negativeScreensFieldset.locator('input[type="checkbox"]');
  }
}