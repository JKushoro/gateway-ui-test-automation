import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycCurrentSituationPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKYCCurrentSituation(): Promise<void>;
    private answerCurrentSituationQuestions;
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