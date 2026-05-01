import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycFuturePlanningPageSteps extends BaseKYCSteps {
    private readonly locators;
    private readonly datePicker;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKYCKycFuturePlanning(): Promise<void>;
    private answerFuturePlanningQuestions;
    private fillRetirementPlans;
    private selectRetirementMoveIntent;
    private fillFurtherInformation;
    private fillEssentialExpenditureChanges;
    private fillDiscretionaryExpenditureChanges;
    private selectOneOffEventsPlanning;
    setRetirementOneOffEventDate(rowIndex: number, minYearsAgo: number, maxYearsAgo: number): Promise<string | undefined>;
    private fillFirstRetirementAmount;
    private fillRetirementIncomeSourcesDetails;
    private fillGuaranteedIncomeEssentialExpenditureDetails;
    private fillGuaranteedIncomeForOtherExpenditureDetails;
}
//# sourceMappingURL=KycFuturePlanningPageSteps.d.ts.map