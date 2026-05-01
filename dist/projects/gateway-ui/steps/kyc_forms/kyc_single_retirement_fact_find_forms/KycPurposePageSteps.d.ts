import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
export declare class KycPurposePageSteps extends BaseKYCSteps {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKYCPurpose(): Promise<void>;
    private answerPurposeQuestions;
    private fillPensionDiscussionPurpose;
}
//# sourceMappingURL=KycPurposePageSteps.d.ts.map