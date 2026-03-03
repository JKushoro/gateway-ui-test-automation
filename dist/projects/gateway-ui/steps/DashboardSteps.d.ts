import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
/**
 * DashboardSteps - Contains side menu navigation logic and dashboard actions
 * Now extends BaseSteps to eliminate helper duplication
 */
export declare class DashboardSteps extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Verify dashboard is loaded with URL and title checks
     */
    verifyDashboard(): Promise<void>;
}
//# sourceMappingURL=DashboardSteps.d.ts.map