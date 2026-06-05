import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
export declare class KycPropertyAndAssetsSteps extends BaseKYCSteps {
    private purchaseHomeDatePicker;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Main method to complete the entire Property & Assets page
     * Uses the standardized KYC page completion flow
     */
    completeKYC_PropertyAndAssets(): Promise<void>;
    answerPropertyAndAssetQuestions(): Promise<void>;
    answerOwnOrRentPropertyQuestion(answer?: string): Promise<void>;
    /** ---- (2) Answer: Asset owner */
    answerAssetOwnerQuestion(answer?: string): Promise<void>;
    /** ---- (3) Fill the current property value field */
    fillPropertyValue(value: string): Promise<void>;
    fillPurchaseHomeDate(minYears: number, maxYears: number): Promise<void>;
    answerOtherPropertiesOrAssets(answer?: string): Promise<void>;
}
//# sourceMappingURL=KycPropertyAndAssetsSteps.d.ts.map