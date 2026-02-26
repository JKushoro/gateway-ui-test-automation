import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycCurrentSituationPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    verifyCurrentSituationHeading(): Promise<void>;
    completeKYCCurrentSituation(): Promise<void>;
    private answerCurrentSituationQuestions;
    private selectEmploymentStatus;
    /** (1) Employment contract */
    private selectEmploymentContract;
    /** () Retirement age question */
    private answerRetirementAndAge;
    /** () Retirement age input */
    private fillRetirementAge;
    /** () Occupation */
    private fillOccupation;
    /** () Current employer */
    private fillCurrentEmployer;
    /** (4) Expected employment changes */
    private selectEmploymentChangeExpected;
    /** () Overall health */
    private selectOverallHealth;
    /** (7) Medical conditions */
    private answerMedicalConditions;
    /** (8) Smoking/Vaping in past 12 months */
    private answerSmoking12Months;
    /** (11a) Up-to-date Will */
    private answerWillQuestion;
    /** (11b) Power of Attorney in place */
    private answerPowerOfAttorney;
    selectPowerOfAttorneyType(...values: string[]): Promise<void>;
}
//# sourceMappingURL=KycCurrentSituationPageSteps.d.ts.map