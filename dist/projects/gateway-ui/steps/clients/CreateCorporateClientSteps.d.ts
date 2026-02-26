import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { SideNavService } from '@steps/components/SideNav';
/**
 * AddCorporateClientSteps - Contains corporate client actions
 * Now extends BaseSteps to eliminate helper duplication and follow OOP principles
 */
export declare class AddCorporateClientSteps extends BasePage {
    private readonly clientPage;
    private readonly forms;
    private readonly postcode;
    private readonly alert;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Verify CorporateClient page is loaded with URL and title checks
     */
    verifyCorporateClientPage(): Promise<void>;
    /**
     * Submit the form using the enhanced action helper
     */
    submitForm(): Promise<void>;
    /**
     * Create a complete corporate client - fills form, adds address, and submits
     * @param formData - Optional form data, will use smart defaults if not provided
     * @param postcode - Optional postcode, will use random UK postcode if not provided
     * @returns Object containing the form data used and selected address
     */
    createCorporateClient(formData?: any, postcode?: string): Promise<{
        formData: any;
        selectedAddress: string;
    }>;
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
     * Main method: Navigate to Add Corporate Client page and verify
     */
    executeNavigateToAddCorporateClientPage(): Promise<void>;
    /**
     * Main method: Complete corporate client creation workflow with validation
     */
    executeCompleteClientCreation(): Promise<void>;
    /**
     * Main method: Navigate to Add Corporate Client page including side nav click
     * @param sideNav - SideNavService instance for navigation
     */
    executeNavigateToAddCorporateClient(sideNav: SideNavService): Promise<void>;
}
//# sourceMappingURL=CreateCorporateClientSteps.d.ts.map