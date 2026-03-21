import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';

export class KYCKycFuturePlanningPageLocator extends BasePage {
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  // ============================
  // Dynamic fields (use methods)
  // ============================

  public getRetirementOneOffEventDateInput(rowIndex: number): Locator {
    return this.page
      .getByTestId(`date-picker-retirement.oneOffEvents.${rowIndex}.retirement.date`)
      .locator('input');
  }

  public firstRetirementAmount(rowIndex: number): Locator {
    return this.page.getByTestId(
      `input-money-retirement.oneOffEvents.${rowIndex}.retirement.amount`
    );
  }

}