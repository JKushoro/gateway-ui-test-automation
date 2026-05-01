import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
/**
 * KYC Savings and Investments Page Steps - handles all savings and investment-related questions
 * Refactored to follow DRY principles and standardized patterns
 * Uses the enhanced BaseKYCSteps for consistent behavior
 */
export declare class KycSavingsAndInvestmentsPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Main method to complete the entire Savings & Investments page
     * Uses the standardized KYC page completion flow
     */
    completeKYC_SavingsAndInvestments(): Promise<void>;
    /**
     * Answer all savings and investments-related questions
     * Each method handles one specific question using standardized patterns
     */
    private answerAllSavingsAndInvestmentsQuestions;
    /**
     * Answer: "Do you have any cash savings outside of Fairstone?"
     * Uses the standardized radio question pattern
     */
    private answerCashSavingsOutsideFairstoneQuestion;
    /**
     * Answer: "Do you have any investments outside of Fairstone?"
     * Uses the standardized radio question pattern
     */
    private answerInvestmentsOutsideFairstoneQuestion;
    /**
     * Answer: "Have you paid into an ISA in the current tax year?"
     * Uses the standardized radio question pattern
     */
    private answerIsaContributionQuestion;
}
//# sourceMappingURL=KycSavingsAndInvestmentsPageSteps.d.ts.map