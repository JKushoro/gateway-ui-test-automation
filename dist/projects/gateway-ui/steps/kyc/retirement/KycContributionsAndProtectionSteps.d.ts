import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycContributionsAndProtectionSteps extends BaseKYCSteps {
    private readonly locators;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKycContributionsAllowancesAndProtection(): Promise<void>;
    answerContributionsAllowancesAndProtectionQuestions(): Promise<void>;
    selectPensionContributionIntent(answer?: string): Promise<void>;
    enterContributionDetails(value: string): Promise<void>;
    selectAnnualAllowanceExceedance(answer?: string): Promise<void>;
    enterAnnualAllowanceDetails(value: string): Promise<void>;
    selectCarryForward(answer?: string): Promise<void>;
    enterCarryForwardDetails(value: string): Promise<void>;
}
//# sourceMappingURL=KycContributionsAndProtectionSteps.d.ts.map