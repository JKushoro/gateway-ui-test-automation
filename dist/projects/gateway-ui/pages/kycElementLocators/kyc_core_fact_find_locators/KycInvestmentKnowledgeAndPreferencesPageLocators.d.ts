import { BasePage, FrameworkConfig } from '@/framework/src';
import { Page, Locator } from '@playwright/test';
export declare class KycInvestmentKnowledgeAndPreferencesPageLocators extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    get responsibleInvestmentFrameworkBox(): Locator;
    get responsibleInvestmentFrameworkTitle(): Locator;
    get negativeScreensHeading(): Locator;
    get carbonReductionHeading(): Locator;
    get positiveOutcomesHeading(): Locator;
    get negativeScreensFieldset(): Locator;
    get negativeScreensCheckboxLabels(): Locator;
    get negativeScreensCheckboxInputs(): Locator;
}
//# sourceMappingURL=KycInvestmentKnowledgeAndPreferencesPageLocators.d.ts.map