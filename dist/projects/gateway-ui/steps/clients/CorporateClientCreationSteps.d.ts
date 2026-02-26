import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { SideNavService } from '@steps/components/SideNav';
/** Corporate Client Creation Form Data (UI shown in screenshot) */
export type CorporateClientData = {
    companyName?: string;
    dateEstablished?: string;
    emailAddress?: string;
    phone?: string;
    activePlanLabel?: string;
    adviserLabel?: string;
    contactForename?: string;
    contactSurname?: string;
};
export type CorporateClientFormResult = {
    companyName: string;
    dateEstablished: string | undefined;
    emailAddress: string;
    phone: string;
    activePlanLabel: string | undefined;
    adviserLabel: string | undefined;
    contactForename: string;
    contactSurname: string;
};
/**
 * AddCorporateClientSteps – all corporate-specific behaviour lives here.
 */
export declare class AddCorporateClientSteps extends BasePage {
    private readonly clientPage;
    private readonly postcode;
    private readonly alert;
    private readonly formsComponent;
    private readonly datePicker;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /** Navigate via side nav */
    executeNavigateToAddCorporateClient(sideNav: SideNavService): Promise<void>;
    /** Verify page URL + title */
    verifyCorporateClientPage(): Promise<void>;
    /** Main happy path: fill, postcode lookup, submit, alert handling */
    createCorporateClient(formData?: CorporateClientData, postcode?: string): Promise<{
        formData: CorporateClientFormResult;
        selectedAddress: string;
    }>;
    /** Just submits the page */
    submitForm(): Promise<void>;
    /** One-call flow with a sanity check */
    executeCompleteClientCreation(): Promise<void>;
    fillCorporateClientForm(data?: CorporateClientData): Promise<CorporateClientFormResult>;
    /** Confirm the “Corporate Client Created” success alert (clicks OK) */
    confirmCorporateClientCreation(): Promise<void>;
    private makeContactNames;
    private persist;
    private handleDateEstablished;
}
//# sourceMappingURL=CorporateClientCreationSteps.d.ts.map