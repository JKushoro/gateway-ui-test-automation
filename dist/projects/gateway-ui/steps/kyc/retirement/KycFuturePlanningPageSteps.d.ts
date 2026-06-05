import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycFuturePlanningPageSteps extends BaseKYCSteps {
    private readonly locators;
    private readonly datePicker;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKYCKycFuturePlanning(): Promise<void>;
    answerFuturePlanningQuestions(): Promise<void>;
    fillRetirementPlans(label: string, value: string): Promise<void>;
    selectRetirementMoveIntent(answer?: string): Promise<void>;
    fillFurtherInformation(label: string, value: string): Promise<void>;
    fillEssentialExpenditureChanges(label: string, value: string): Promise<void>;
    fillDiscretionaryExpenditureChanges(label: string, value: string): Promise<void>;
    selectOneOffEventsPlanning(answer?: string): Promise<void>;
    setRetirementOneOffEventDate(rowIndex: number, minYearsAgo: number, maxYearsAgo: number): Promise<string | undefined>;
    fillFirstRetirementAmount(value: string | number): Promise<void>;
    fillRetirementIncomeSourcesDetails(label: string, value: string): Promise<void>;
    fillGuaranteedIncomeEssentialExpenditureDetails(label: string, value: string): Promise<void>;
    fillGuaranteedIncomeForOtherExpenditureDetails(label: string, value: string): Promise<void>;
}
//# sourceMappingURL=KycFuturePlanningPageSteps.d.ts.map