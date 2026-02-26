import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycPensionsPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /** Verify the Pensions heading is visible */
    verifyPensionsHeading(): Promise<void>;
    /** Complete the KYC Pensions section */
    completeKYC_Pensions(): Promise<void>;
    private answerPensionQuestions;
    private answerPensionsFromPreviousEmployment;
    private answerOtherPensions;
    private answerRequestedStatePensionForecast;
}
//# sourceMappingURL=KycPensionsPageSteps.d.ts.map