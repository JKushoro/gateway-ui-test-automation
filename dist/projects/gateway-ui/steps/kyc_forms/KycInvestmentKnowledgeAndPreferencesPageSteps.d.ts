import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycInvestmentKnowledgeAndPreferencesPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    private sustainabilityAwarenessIsYes;
    verifyInvestmentKnowledgeAndPreferencesHeading(): Promise<void>;
    completeKYC_InvestmentKnowledgeAndPreferences(): Promise<void>;
    private answerInvestmentKnowledgeAndPreferencesQuestions;
    private answerInvestmentKnowledgeAndPreference;
    private answerClientClassification;
    private answerInvestmentExperience;
    private answerSustainabilityRequirements;
    private answerSustainabilityAwareness;
    private assertResponsibleInvestmentFramework;
    private answerResponsibleInvestmentFramework;
    private answerFaithBasedRequirements;
    private answerNegativeScreens;
    private selectNegativeScreens;
    private answerSustainableInvestmentStatement;
    private verifyFactFindCompleted;
}
//# sourceMappingURL=KycInvestmentKnowledgeAndPreferencesPageSteps.d.ts.map