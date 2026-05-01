import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';
export declare class KycContributionsAndProtectionPageLocators extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    get contributeDetails(): Locator;
    get annualAllowanceDetails(): Locator;
    get carryForwardDetails(): Locator;
}
//# sourceMappingURL=KycContributionsAndProtectionPageLocators.d.ts.map