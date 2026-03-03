import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
/**
 * KycInvestmentKnowledgeAndPreferencesPageSteps
 * - Completes the "Investment Knowledge & Preferences" KYC page
 * - Avoids any class-level state (no sustainabilityAwarenessIsYes flag)
 * - Avoids custom union types (no TriBool)
 * - Uses returned boolean | undefined to drive conditional assertions
 */
export declare class KycInvestmentKnowledgeAndPreferencesPageSteps extends BaseKYCSteps {
    private locators;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Complete the entire Investment Knowledge & Preferences page
     * Uses the standardized KYC page completion flow with custom submit button
     */
    completeKYC_InvestmentKnowledgeAndPreferences(): Promise<void>;
    /**
     * Answers all questions on the page, safely skipping those not shown.
     */
    private answerInvestmentKnowledgeAndPreferencesQuestions;
    /**
     * Q: Do you need to provide or update Investment Knowledge & Preference?
     */
    private answerInvestmentKnowledgeAndPreference;
    /**
     * Q: What is the client's classification?
     */
    private answerClientClassification;
    /**
     * Q: What's the client's level of investment experience?
     */
    private answerInvestmentExperience;
    /**
     * Q: Do you have sustainability linked requirements...?
     */
    private answerSustainabilityRequirements;
    /**
     * Q: Is the client aware that in applying sustainability preferences...?
     *
     * If the question is displayed, selects the provided value.
     * If not displayed, logs and safely skips.
     */
    private answerSustainabilityAwareness;
    /**
     * Assert Responsible Investment Framework section
     * - Skips if section is not displayed
     * - Fails clearly if text changes
     */
    private assertResponsibleInvestmentFramework;
    /**
     * Q: Does Fairstone's Responsible Investment Framework align...?
     */
    private answerResponsibleInvestmentFramework;
    /**
     * Q: Are the client's requirements faith based?
     */
    private answerFaithBasedRequirements;
    /**
     * Q: Does the client have specific negative screens...?
     */
    private answerNegativeScreens;
    /**
     * Select negative screens checkboxes if the aria-group is shown.
     */
    private selectNegativeScreens;
    /**
     * Q: Which statement aligns with the client's sustainable investment requirements?
     */
    private answerSustainableInvestmentStatement;
    /**
     * Verify KYC completes successfully and we land on the success page.
     */
    private verifyFactFindCompleted;
}
//# sourceMappingURL=KycInvestmentKnowledgeAndPreferencesPageSteps.d.ts.map