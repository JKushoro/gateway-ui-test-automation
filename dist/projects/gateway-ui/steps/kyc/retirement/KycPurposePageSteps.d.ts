import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycPurposePageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKYCPurpose(): Promise<void>;
    answerPurposeQuestions(): Promise<void>;
    fillPensionDiscussionPurpose(label: string, value: string): Promise<void>;
}
//# sourceMappingURL=KycPurposePageSteps.d.ts.map