import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycSavingsAndInvestmentsPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /** Verify the Property & Assets heading is visible */
    verifySavingsAndInvestmentsHeading(): Promise<void>;
    /** Complete the KYC Property & Assets section */
    completeKYC_SavingsAndInvestments(): Promise<void>;
    private answerSavingsAndInvestmentsQuestions;
    private answerCashSavingsOutsideFairstone;
    private answerInvestmentsOutsideFairstone;
    private answerPaidIntoIsaThisTaxYear;
}
//# sourceMappingURL=KycSavingsAndInvestmentsPageSteps.d.ts.map