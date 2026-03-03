import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
/**
 * KYC Protection Page Steps - handles all protection-related questions
 * Refactored to follow DRY principles and standardized patterns
 * Uses the enhanced BaseKYCSteps for consistent behavior
 */
export declare class KycProtectionPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Main method to complete the entire Protection page
     * Uses the standardized KYC page completion flow
     */
    completeKYC_Protection(): Promise<void>;
    /**
     * Answer all protection-related questions
     * Each method handles one specific question using standardized patterns
     */
    private answerAllProtectionQuestions;
    /**
     * Answer: "Do you have any income protection (not provided by an employer)?"
     * Uses the standardized radio question pattern
     */
    private answerIncomeProtectionQuestion;
    /**
     * Answer: "Do you have any life insurance or critical illness cover (not provided by an employer)?"
     * Uses the standardized radio question pattern
     */
    private answerLifeOrCriticalIllnessCoverQuestion;
    /**
     * Answer: "Do you have any Private Medical Insurance (not provided by an employer)?"
     * Uses the standardized radio question pattern
     */
    private answerPrivateMedicalInsuranceQuestion;
}
//# sourceMappingURL=KycProtectionPageSteps.d.ts.map