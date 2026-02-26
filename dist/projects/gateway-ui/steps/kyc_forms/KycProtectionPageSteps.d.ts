import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycProtectionPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /** Verify the Protection heading is visible */
    verifyProtectionHeading(): Promise<void>;
    /** Complete the KYC Protection section */
    completeKYC_Protection(): Promise<void>;
    private answerProtectionQuestions;
    private answerIncomeProtectionOutsideEmployer;
    private answerLifeOrCriticalIllnessCoverOutsideEmployer;
    private answerPrivateMedicalInsuranceOutsideEmployer;
}
//# sourceMappingURL=KycProtectionPageSteps.d.ts.map