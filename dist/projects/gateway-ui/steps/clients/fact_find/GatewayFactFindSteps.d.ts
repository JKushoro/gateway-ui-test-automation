import { BasePage } from '@/framework/src';
import { Page } from '@playwright/test';
export declare class GatewayFactFindSteps extends BasePage {
    private readonly clientDetailsPageLocators;
    private readonly factFindLocators;
    private readonly navBar;
    constructor(page: Page);
    private normalizeName;
    private normalizeText;
    private firstExisting;
    private readCellValue;
    private getGatewayValueByLabel;
    private getDisplayedKycFullName;
    private getDisplayedKycMobile;
    private getDisplayedKycEmail;
    validateGatewayFactFindData(): Promise<void>;
    private verifyLatestFactFindClientNameMatchesKyc;
    private verifyLatestFactFindStatusIsCompleteForKycClient;
    private navigateToClientDetailsPage;
    private verifyGatewayContactDetailsMatchKyc;
}
//# sourceMappingURL=GatewayFactFindSteps.d.ts.map