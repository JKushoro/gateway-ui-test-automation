import { BaseKYCSteps } from '@steps/kyc/BaseKYCSteps';
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
    /**
     * Main method to complete the entire Fact Find Details page
     * Uses standardized verification with custom button handling
     */
    completeKYCFactFindDetails(): Promise<void>;
    answerFactFindDetailsQuestions(): Promise<void>;
    workCompletedDate(answer?: string): Promise<void>;
    setWorkCompletedDate(labelText: string, minYearsAgo: number, maxYearsAgo: number): Promise<string | undefined>;
    selectVenue(value?: string): Promise<void>;
    requireA3rdPartyToBePresent(answer?: string): Promise<void>;
    clickAddThirdPartyButton(): Promise<void>;
    selectThirdPartyTitle(value?: string): Promise<void>;
    fillFirstAndLastName(): Promise<void>;
    selectRelationship(value?: string): Promise<void>;
    fillContactNumber(): Promise<void>;
    fillThirdPartyAddress(): Promise<void>;
    selectCountry(value?: string): Promise<void>;
    selectPresentAtMeeting(answer?: string): Promise<void>;
    fillNotesIfPresent(): Promise<void>;
    selectIf3rdPartyPowerOfAttorney(answer?: string): Promise<void>;
}
//# sourceMappingURL=KycFactFindDetailsPageSteps.d.ts.map