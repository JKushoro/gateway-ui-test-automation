import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
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
    answerAllIncomeQuestions(): Promise<void>;
    /**
     * Answer: "Do you have any other income source?"
     * Uses the standardized radio question pattern
     */
    answerOtherIncomeSourceQuestion(answer?: string): Promise<void>;
    /**
     * Answer: "Earner" question
     * Uses the standardized radio question pattern
     */
    answerEarnerTypeQuestion(answer?: string): Promise<void>;
    /**
     * Select income source from dropdown
     * Uses the standardized dropdown selection pattern
     */
    selectIncomeSourceOption(value?: string): Promise<string>;
    /**
     * Fill gross annual income field
     * Uses the standardized input filling pattern
     */
    fillGrossAnnualIncomeField(value: string): Promise<void>;
}
//# sourceMappingURL=KycIncomePageSteps.d.ts.map