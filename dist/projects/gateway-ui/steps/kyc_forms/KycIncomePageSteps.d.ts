import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycIncomePageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /** Verify the Income heading is visible */
    verifyIncomeHeading(): Promise<void>;
    /** Complete the KYC Income section */
    completeKYC_Income(): Promise<void>;
    private answerIncomeQuestions;
    private answerOtherIncomeSource;
    private answerEarner;
    private selectIncomeSource;
    private fillGrossAnnualIncomeValue;
}
//# sourceMappingURL=KycIncomePageSteps.d.ts.map