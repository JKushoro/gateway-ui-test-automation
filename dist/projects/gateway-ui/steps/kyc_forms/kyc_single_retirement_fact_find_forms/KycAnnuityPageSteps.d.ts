import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycAnnuityPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKYCAnnuity(): Promise<void>;
    private answerAnnuityQuestions;
    private selectPersonalisedAnnuityQuote;
    private fillEscalationRequirements;
    private fillIncomeFrequency;
    private fillAdvanceOrArrearsWithProportion;
    private fillGuaranteedPeriod;
    private fillOverlapDetails;
    private fillValueProtection;
}
//# sourceMappingURL=KycAnnuityPageSteps.d.ts.map