import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycKycLifeEventsAndBenefitsPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKYCKycLifeEventsAndBenefits(): Promise<void>;
    private answerLifeEventsAndBenefitsQuestions;
    private selectMaximumStatePension;
    private fillProvideFurtherInformation;
    private fillShortfallAmount;
    private selectMeansTestedBenefitsReceipt;
    private fillPostStatePensionDetails;
    private selectFutureInheritanceOrWindfalls;
    private fillAmountAndTimescaleDetails;
    private fillPensionDeathBenefitPlans;
}
//# sourceMappingURL=KycLifeEventsAndBenefitsPageSteps.d.ts.map