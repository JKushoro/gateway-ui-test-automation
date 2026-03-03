import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
/**
 * KYC Income Page Steps - handles all income-related questions
 * Refactored to follow DRY principles and standardized patterns
 * Uses the enhanced BaseKYCSteps for consistent behavior
 */
export declare class KycIncomePageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Main method to complete the entire Income page
     * Uses the standardized KYC page completion flow
     */
    completeKYC_Income(): Promise<void>;
    /**
     * Answer all income-related questions
     * Each method handles one specific question using standardized patterns
     */
    private answerAllIncomeQuestions;
    /**
     * Answer: "Do you have any other income source?"
     * Uses the standardized radio question pattern
     */
    private answerOtherIncomeSourceQuestion;
    /**
     * Answer: "Earner" question
     * Uses the standardized radio question pattern
     */
    private answerEarnerTypeQuestion;
    /**
     * Select income source from dropdown
     * Uses the standardized dropdown selection pattern
     */
    private selectIncomeSourceOption;
    /**
     * Fill gross annual income field
     * Uses the standardized input filling pattern
     */
    private fillGrossAnnualIncomeField;
}
//# sourceMappingURL=KycIncomePageSteps.d.ts.map