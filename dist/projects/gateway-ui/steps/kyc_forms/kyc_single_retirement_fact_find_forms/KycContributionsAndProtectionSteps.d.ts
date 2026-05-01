import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycContributionsAndProtectionSteps extends BaseKYCSteps {
    private readonly locators;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKycContributionsAllowancesAndProtection(): Promise<void>;
    private answerContributionsAllowancesAndProtectionQuestions;
    private selectPensionContributionIntent;
    private enterContributionDetails;
    private selectAnnualAllowanceExceedance;
    private enterAnnualAllowanceDetails;
    private selectCarryForward;
    private enterCarryForwardDetails;
}
//# sourceMappingURL=KycContributionsAndProtectionSteps.d.ts.map