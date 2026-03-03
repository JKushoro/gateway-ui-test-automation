import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { SideNavService } from '@steps/components/SideNav';
import type { RetailClientData, RetailClientFormResult } from './fact_find/types/RetailClientCreation.types';
export declare class RetailClientCreationSteps extends BasePage {
    private readonly clientPage;
    private readonly alert;
    private readonly datePicker;
    private readonly formsComponent;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    verifyClientPage(): Promise<void>;
    executeNavigateToAddClient(sideNav: SideNavService): Promise<void>;
    createClient(clientData?: RetailClientData): Promise<RetailClientFormResult>;
    completeRetailClientForm(data?: RetailClientData): Promise<RetailClientFormResult>;
    private selectAdviser;
    private selectTitle;
    private selectSourceOfEnquiry;
    private selectGender;
    private selectMaritalStatus;
    private selectActivePlan;
    private fillForename;
    private fillSurname;
    private fillKnownAs;
    private fillNINumber;
    private fillSpecificSource;
    private fillEmailAddress;
    private fillHomePhone;
    private fillMobilePhone;
    /**
     * Thin orchestrator to keep the main flow clean,
     * while still giving each field its own method (easy reuse + debugging).
     */
    private fillOptionalContactFields;
    private selectDOB;
}
//# sourceMappingURL=RetailClientCreationSteps.d.ts.map