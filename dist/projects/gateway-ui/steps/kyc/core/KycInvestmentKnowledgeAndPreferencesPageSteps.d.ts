import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
import { Page, FrameworkConfig } from '@/framework/src';
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
    answerInvestmentKnowledgeAndPreferencesQuestions(): Promise<void>;
    /**
     * Q: Do you need to provide or update Investment Knowledge & Preference?
     */
    answerInvestmentKnowledgeAndPreference(value?: string): Promise<void>;
    /**
     * Q: What is the client's classification?
     */
    answerClientClassification(answer?: string): Promise<void>;
    /**
     * Q: What's the client's level of investment experience?
     */
    answerInvestmentExperience(value?: string): Promise<void>;
    /**
     * Q: Do you have sustainability linked requirements...?
     */
    answerSustainabilityRequirements(value?: string): Promise<void>;
    /**
     * Q: Is the client aware that in applying sustainability preferences...?
     *
     * If the question is displayed, selects the provided value.
     * If not displayed, logs and safely skips.
     */
    answerSustainabilityAwareness(value?: string): Promise<void>;
    /**
     * Assert Responsible Investment Framework section
     * - Skips if section is not displayed
     * - Fails clearly if text changes
     */
    assertResponsibleInvestmentFramework(): Promise<void>;
    /**
     * Q: Does Fairstone's Responsible Investment Framework align...?
     */
    answerResponsibleInvestmentFramework(value?: string): Promise<void>;
    /**
     * Q: Are the client's requirements faith based?
     */
    answerFaithBasedRequirements(value?: string): Promise<void>;
    /**
     * Q: Does the client have specific negative screens...?
     */
    answerNegativeScreens(value?: string): Promise<void>;
    /**
     * Select negative screens checkboxes if the aria-group is shown.
     */
    selectNegativeScreens(...values: string[]): Promise<string[]>;
    /**
     * Q: Which statement aligns with the client's sustainable investment requirements?
     */
    answerSustainableInvestmentStatement(value?: string): Promise<void>;
}
//# sourceMappingURL=KycInvestmentKnowledgeAndPreferencesPageSteps.d.ts.map