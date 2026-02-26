import { Page } from '@playwright/test';
import { FrameworkConfig } from '@framework/types';
import { BaseKYCSteps } from './BaseKYCSteps';
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
 * Notes for junior testers:
 * - Each method does ONE job
 * - Assertions live next to the action they validate
 * - If something is optional, we skip safely and log why
 */
export declare class KycPersonalDetailsPageSteps extends BaseKYCSteps {
    private readonly postcodeLookup;
    private readonly datePicker;
    private readonly locators;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    completeKYCPersonalDetails(): Promise<void>;
    verifyPersonalDetailsHeading(): Promise<void>;
    private getSelectedGatewayClient;
    private readAndStoreDisplayedKycClient;
    private readAndAssertTitle;
    private readAndAssertNames;
    private readAndAssertDateOfBirth;
    private readAndAssertSexAtBirth;
    private compareSelectedGatewayVsDisplayedKyc;
    private generateAndStoreKycContactDetails;
    private fillKycContactAndStoreDisplayed;
    private fillMobileNumberAndAssert;
    private fillEmailAndAssert;
    private selectPreferredContact;
    private fillCurrentAddress_Address1;
    addPreviousAddress_Address2(): Promise<void>;
    private fillPreviousAddress_Address2;
    private setSecondAddressLine1;
    private setSecondAddressLine2;
    private setSecondAddressCity;
    private setSecondAddressCounty;
    private setSecondAddressPostcode;
    private selectSecondAddressCountry;
    private setSecondAddressMoveInDate;
    private answerPersonalDetailsQuestions;
    private answerUkNationality;
    /** Nationality dropdown shown when UK national = "Yes/No" */
    private selectNonUkNationality;
    private answerUkResidency;
    /** Residency dropdown shown when UK resident = "Yes/No" */
    private selectNonUkResidency;
    private answerTaxOutsideUk;
    /** Country dropdown shown when Tax outside UK = "Yes/No" */
    private selectTaxPaidCountryOutsideUk;
    private answerChildrenOrDependants;
    private completeChildrenOrDependantsDetails;
    private fillDependantsFullName;
    private selectDependantOneSexAtBirth;
    setDependantOneDateOfBirth(minYearsAgo: number, maxYearsAgo: number): Promise<string | undefined>;
    private answerFinanciallyDependant;
    private selectDependantOneRelationship;
    setDependantOneDependantUntil(minYearsAhead: number, maxYearsAhead: number): Promise<string | undefined>;
    private fillTextByLabelAndAssert;
    private setAddressMoveInDate;
    private mapGender;
    fillKYC_AddressField(labelText: string, postcode?: string): Promise<string>;
}
//# sourceMappingURL=KycPersonalDetailsPageSteps.d.ts.map