import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page, FrameworkConfig } from '@/framework/src';
/**
 * KYC Income Page Steps - handles all income-related questions
 * Simple, clean implementation with no code duplication
 */
export declare class KycIncomePageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Main method to complete the entire Income page
     * Uses the standardized KYC page completion flow
     */
    completeIncomeSection(): Promise<void>;
    /**
     * Answer all income-related questions
     * Each method handles one specific question
     */
    private answerAllIncomeQuestions;
    /**
     * Answer: "Do you have any other income source?"
     * Can specify 'Yes', 'No', or leave blank for random selection
     */
    private answerOtherIncomeSourceQuestion;
    /**
     * Answer the earner type question (Single/Joint)
     * Uses the helper method to avoid duplication
     */
    private answerEarnerTypeQuestion;
    /**
     * Select income source from dropdown
     * Uses the helper method to avoid duplication
     */
    private selectIncomeSourceOption;
    /**
     * Fill the gross annual income field
     * Uses the helper method to avoid duplication
     */
    private fillGrossAnnualIncomeField;
}
//# sourceMappingURL=KycIncomePageSteps.refactored.d.ts.map