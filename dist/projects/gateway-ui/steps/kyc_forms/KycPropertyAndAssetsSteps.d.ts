import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
export declare class KycPropertyAndAssetsSteps extends BaseKYCSteps {
    private purchaseHomeDatePicker;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /** Verify the Property & Assets heading is visible */
    verifyPropertyAndAssetsHeading(): Promise<void>;
    /** Complete the KYC Property & Assets section */
    completeKYC_PropertyAndAssets(): Promise<void>;
    private answerPropertyAndAssetQuestions;
    private answerOwnOrRentPropertyQuestion;
    /** ---- (2) Answer: Asset owner */
    private answerAssetOwnerQuestion;
    /** ---- (3) Fill the current property value field */
    private fillPropertyValue;
    private fillPurchaseHomeDate;
    private answerOtherPropertiesOrAssets;
}
//# sourceMappingURL=KycPropertyAndAssetsSteps.d.ts.map