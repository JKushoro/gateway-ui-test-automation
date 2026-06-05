import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycAnnuityPageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKYCAnnuity(): Promise<void>;
    answerAnnuityQuestions(): Promise<void>;
    selectPersonalisedAnnuityQuote(answer?: string): Promise<void>;
    fillEscalationRequirements(label: string, value: string): Promise<void>;
    fillIncomeFrequency(label: string, value: string): Promise<void>;
    fillAdvanceOrArrearsWithProportion(label: string, value: string): Promise<void>;
    fillGuaranteedPeriod(label: string, value: string): Promise<void>;
    fillOverlapDetails(label: string, value: string): Promise<void>;
    fillValueProtection(label: string, value: string): Promise<void>;
}
//# sourceMappingURL=KycAnnuityPageSteps.d.ts.map