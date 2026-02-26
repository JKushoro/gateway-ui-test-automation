import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { IndividualClientData, IndividualClientFormResult } from '@steps/components/Forms';
import { SideNavService } from '@steps/components/SideNav';
/**
 * AddClientSteps - Contains individual client creation actions
 * Extends BasePage to eliminate helper duplication and follow OOP principles
 *
 * This class handles the creation of individual clients with fields like:
 * - Adviser, Title, Forename, Middlename, Surname
 * - Gender, DOB, Marital Status, Active Plan
 * - Source of Enquiry, Specific Source, NI Number
 * - Contact details (Email, Home Phone, Mobile Phone)
 */
export declare class AddClientSteps extends BasePage {
    private readonly forms;
    private readonly clientPage;
    private readonly alert;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Verify Client page is loaded with URL and title checks
     */
    verifyClientPage(): Promise<void>;
    /**
     * Main method: Navigate to Add Corporate Client page and verify
     */
    executeNavigateToAddClientPage(): Promise<void>;
    /**
     * Main method: Navigate to Add Corporate Client page including side nav click
     * @param sideNav - SideNavService instance for navigation
     */
    executeNavigateToAddClient(sideNav: SideNavService): Promise<void>;
    /**
     * Create a complete individual client - fills form and submits
     * @param clientData - Optional client data, will use smart defaults if not provided
     * @returns Object containing the client data used
     */
    createClient(clientData?: IndividualClientData): Promise<IndividualClientFormResult>;
    /**
     * Assert that the success alert is displayed after client creation
     * @deprecated Use alert.assertClientCreationSuccessAlert() instead
     */
    assertClientCreationSuccessAlert(): Promise<void>;
    /**
     * Click the OK button on the success alert
     * @deprecated Use alert.clickSuccessAlertOkButton() instead
     */
    clickSuccessAlertOkButton(): Promise<void>;
    /**
     * Main method: Complete individual client creation workflow with validation
     */
    executeCompleteClientCreation(): Promise<void>;
}
//# sourceMappingURL=CreateClientSteps.d.ts.map