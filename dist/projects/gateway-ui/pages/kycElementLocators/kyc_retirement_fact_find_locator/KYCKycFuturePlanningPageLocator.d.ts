import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';
export declare class KYCKycFuturePlanningPageLocator extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    getRetirementOneOffEventDateInput(rowIndex: number): Locator;
    firstRetirementAmount(rowIndex: number): Locator;
}
//# sourceMappingURL=KYCKycFuturePlanningPageLocator.d.ts.map