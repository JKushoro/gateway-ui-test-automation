import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
/**
 * 🎯 KYC Current Situation Page Steps
 *
 * This class handles all interactions with the KYC Current Situation page.
 * It follows a simple pattern: validate page → answer questions → save data → continue.
 *
 * Key Features:
 * - Clear method names that describe what they do
 * - Proper error handling and validation
 * - Data persistence for later use
 * - Junior developer friendly structure
 *
 * @example Basic usage
 * ```typescript
 * const currentSituationSteps = new KycCurrentSituationPageSteps(page);
 * await currentSituationSteps.completeKYCCurrentSituation();
 * ```
 */
export declare class KycCurrentSituationPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * 🎯 Complete the entire KYC Current Situation page
     *
     * This is the main method that orchestrates the entire page completion.
     * It follows a clear sequence: validate → answer → save → continue.
     */
    completeKYCCurrentSituation(): Promise<void>;
    /**
     * 🎯 Validate that we're on the Current Situation page
     *
     * This ensures we're on the right page before proceeding with form filling.
     */
    private validateCurrentSituationPage;
    /**
     * 🎯 Answer all questions on the Current Situation page
     *
     * This method breaks down the complex form into logical sections.
     * Each section is handled by a separate method for better readability.
     */
    private answerAllCurrentSituationQuestions;
    /**
     * 🎯 Handle employment-related questions
     */
    private handleEmploymentQuestions;
    /**
     * 🎯 Handle retirement-related questions
     */
    private handleRetirementQuestions;
    /**
     * 🎯 Handle health-related questions
     */
    private handleHealthQuestions;
    /**
     * 🎯 Handle personal details questions and save the data
     */
    private handlePersonalDetailsQuestions;
    /**
     * 🎯 Handle legal document questions
     */
    private handleLegalDocumentQuestions;
    /**
     * 🎯 Save personal details data to the data store
     *
     * @param occupation - The occupation value to save
     * @param currentEmployer - The current employer value to save
     */
    private savePersonalDetailsData;
    /**
     * 🎯 Save the form and continue to the next page
     */
    private saveAndContinue;
    private selectEmploymentStatus;
    private selectEmploymentContract;
    private answerRetirementAndAge;
    private fillRetirementAge;
    private fillOccupation;
    private fillCurrentEmployer;
    private selectEmploymentChangeExpected;
    private selectOverallHealth;
    private answerMedicalConditions;
    private answerSmoking12Months;
    private answerWillQuestion;
    private answerPowerOfAttorney;
    selectPowerOfAttorneyType(...values: string[]): Promise<void>;
}
//# sourceMappingURL=KycCurrentSituationPageSteps.d.ts.map