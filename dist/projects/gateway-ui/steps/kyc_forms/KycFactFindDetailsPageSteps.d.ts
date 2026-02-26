import { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@/framework/src';
/**
 * KYC - Fact Find Details (Steps)
 *
 * Purpose:
 * - Confirm we are on the "Fact Find Details" page
 * - Complete the form in the same order a user would
 * - Assert values only when fields are present
 * - Proceed to "Personal Details"
 *
 * Junior tester notes:
 * - If a field does not exist, the test skips it safely
 * - Every fill has a matching expect
 */
export declare class KycFactFindDetailsPageSteps extends BaseKYCSteps {
    private readonly datePicker;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    verifyFactFindDetailsHeading(): Promise<void>;
    completeKYCFactFindDetails(): Promise<void>;
    private answerFactFindDetailsQuestions;
    private workCompletedDate;
    setWorkCompletedDate(labelText: string, minYearsAgo: number, maxYearsAgo: number): Promise<string | undefined>;
    private selectVenue;
    private requireA3rdPartyToBePresent;
    clickAddThirdPartyButton(): Promise<void>;
    private selectThirdPartyTitle;
    private fillFirstAndLastName;
    private selectRelationship;
    private fillContactNumber;
    private fillThirdPartyAddress;
    private selectCountry;
    private selectPresentAtMeeting;
    private fillNotesIfPresent;
    private selectIf3rdPartyPowerOfAttorney;
}
//# sourceMappingURL=KycFactFindDetailsPageSteps.d.ts.map