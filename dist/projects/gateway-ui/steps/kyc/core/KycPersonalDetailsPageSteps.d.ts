import { Page } from '@playwright/test';
import { FrameworkConfig } from '@framework/types';
import { BaseKYCSteps } from '../BaseKYCSteps';
/**
 * =====================================================
 * KYC - Personal Details (Steps)
 * =====================================================
 *
 * Responsibilities:
 * - Verify page heading
 * - Read + assert displayed client details in KYC
 * - Compare Gateway selected client vs KYC displayed client
 * - Fill Contact details (with inline assertions)
 * - Fill Current Address (Address 1)
 * - Add & fill Previous Address (Address 2)
 * - Answer Personal Details questions (explicitly)
 * - Fill Children/Dependants details (if shown)
 *
 * Notes:
 * - Each method does ONE job
 * - Assertions live next to the action they validate
 * - REQUIRED fields: never swallow errors, never return empty silently
 * - OPTIONAL fields: skip safely and log why
 */
type DisplayedKycClient = {
    title: string;
    firstName: string;
    surname: string;
    fullName: string;
    dob: string;
    sexAtBirth: string;
};
export declare class KycPersonalDetailsPageSteps extends BaseKYCSteps {
    private readonly postcodeLookup;
    private readonly datePicker;
    private readonly locators;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKYCPersonalDetails(): Promise<void>;
    verifyPersonalDetailsHeading(): Promise<void>;
    getSelectedGatewayClient(): any;
    readAndStoreDisplayedKycClient(): Promise<DisplayedKycClient>;
    private readAndAssertTitle;
    private readAndAssertNames;
    private readAndAssertDateOfBirth;
    private readAndAssertSexAtBirth;
    compareSelectedGatewayVsDisplayedKyc(gatewayClient: any, displayedKycClient: DisplayedKycClient): Promise<void>;
    generateAndStoreKycContactDetails(): {
        mobile: string;
        email: string;
    };
    fillKycContactAndStoreDisplayed(data: {
        mobile: string;
        email: string;
    }): Promise<void>;
    private fillMobileNumberAndAssert;
    private fillEmailAndAssert;
    private selectPreferredContact;
    fillCurrentAddress_Address1(): Promise<void>;
    addPreviousAddress_Address2(): Promise<void>;
    fillPreviousAddress_Address2(): Promise<string>;
    private setSecondAddressLine1;
    private setSecondAddressLine2;
    private setSecondAddressCity;
    private setSecondAddressCounty;
    private setSecondAddressPostcode;
    private selectSecondAddressCountry;
    private setSecondAddressMoveInDate;
    answerPersonalDetailsQuestions(): Promise<void>;
    answerUkNationality(answer?: string): Promise<void>;
    /** Nationality dropdown shown when UK national = "Yes/No" */
    selectNonUkNationality(value?: string): Promise<void>;
    answerUkResidency(answer?: string): Promise<void>;
    /** Residency dropdown shown when UK resident = "Yes/No" */
    selectNonUkResidency(value?: string): Promise<void>;
    answerTaxOutsideUk(answer?: string): Promise<void>;
    /** Country dropdown shown when Tax outside UK = "Yes/No" */
    selectTaxPaidCountryOutsideUk(value?: string): Promise<void>;
    answerChildrenOrDependants(answer?: string): Promise<void>;
    completeChildrenOrDependantsDetails(): Promise<void>;
    fillDependantsFullName(forename?: string, surname?: string): Promise<void>;
    selectDependantOneSexAtBirth(value?: string): Promise<void>;
    setDependantOneDateOfBirth(minYearsAgo: number, maxYearsAgo: number): Promise<string | undefined>;
    answerFinanciallyDependant(answer?: string): Promise<void>;
    selectDependantOneRelationship(value?: string): Promise<void>;
    setDependantOneDependantUntil(minYearsAhead: number, maxYearsAhead: number): Promise<string | undefined>;
    private setAddressMoveInDate;
    private mapGender;
    fillKYC_AddressField(labelText: string, postcode?: string): Promise<string>;
}
export {};
//# sourceMappingURL=KycPersonalDetailsPageSteps.d.ts.map