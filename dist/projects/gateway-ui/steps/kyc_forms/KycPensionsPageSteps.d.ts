import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
/**
 * KYC Pensions Page Steps - handles all pension-related questions
 * Refactored to follow DRY principles and standardized patterns
 * Uses the enhanced BaseKYCSteps for consistent behavior
 */
export declare class KycPensionsPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Main method to complete the entire Pensions page
     * Uses the standardized KYC page completion flow
     */
    completeKYC_Pensions(): Promise<void>;
    /**
     * Answer all pension-related questions
     * Each method handles one specific question using standardized patterns
     */
    private answerAllPensionQuestions;
    /**
     * Answer: "Are you an active member of a workplace pension scheme?"
     * Uses the standardized radio question pattern with verification
     */
    private answerWorkplacePensionQuestion;
    /**
     * Answer: "Do you have any pensions from previous employment?"
     * Uses the standardized radio question pattern with verification
     */
    private answerPreviousEmploymentPensionsQuestion;
    /**
     * Answer: "Do you have any other pensions?"
     * Uses the standardized radio question pattern with verification
     */
    private answerOtherPensionsQuestion;
    /**
     * Answer: "Have you requested a state pension forecast?"
     * Uses the standardized radio question pattern with verification
     */
    private answerStatePensionForecastQuestion;
}
//# sourceMappingURL=KycPensionsPageSteps.d.ts.map