import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';

export class KycContributionsAndProtectionPageLocators extends BasePage {
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  // ============================
  // Children / Dependants
  // ============================

  get contributeDetails(): Locator {
    return this.page.getByTestId('input-retirement.contributeDetails');
  }

  get annualAllowanceDetails(): Locator {
    return this.page.getByTestId('input-retirement.annualAllowanceDetails');
  }

  get carryForwardDetails(): Locator {
    return this.page.getByTestId('input-retirement.carryForwardDetails');
  }
}