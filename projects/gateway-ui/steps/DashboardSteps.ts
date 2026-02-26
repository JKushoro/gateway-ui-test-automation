import { Page, expect } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';

/**
 * DashboardSteps - Contains side menu navigation logic and dashboard actions
 * Now extends BaseSteps to eliminate helper duplication
 */
export class DashboardSteps extends BasePage {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  /**
   * Verify dashboard is loaded with URL and title checks
   */
  public async verifyDashboard(): Promise<void> {
    await this.wait.waitForUrlToMatch('**/dashboard/**');
    await expect(this.page).toHaveTitle('Gateway | Development dashboard');
  }
}
