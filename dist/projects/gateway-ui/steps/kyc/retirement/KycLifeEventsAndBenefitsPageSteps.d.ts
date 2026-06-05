import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycKycLifeEventsAndBenefitsPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKYCKycLifeEventsAndBenefits(): Promise<void>;
    answerLifeEventsAndBenefitsQuestions(): Promise<void>;
    selectMaximumStatePension(answer?: string): Promise<void>;
    fillProvideFurtherInformation(label: string, value: string): Promise<void>;
    fillShortfallAmount(value: string | number): Promise<void>;
    selectMeansTestedBenefitsReceipt(answer?: string): Promise<void>;
    fillPostStatePensionDetails(label: string, value: string): Promise<void>;
    selectFutureInheritanceOrWindfalls(answer?: string): Promise<void>;
    fillAmountAndTimescaleDetails(label: string, value: string): Promise<void>;
    fillPensionDeathBenefitPlans(label: string, value: string): Promise<void>;
}
//# sourceMappingURL=KycLifeEventsAndBenefitsPageSteps.d.ts.map