import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { SideNavService } from '@steps/components/SideNav';
import { NavBarService } from '@steps/components/NavBar';
import type { RetailClientData, RetailClientFormResult } from '@steps/clients/fact_find/types/RetailClientCreation.types';
/**
 * FactFindCreationSteps - Orchestrates creating a client and moving to Fact Find
 */
export declare class FactFindCreationSteps extends BasePage {
    private readonly clientSteps;
    private readonly factFindLocators;
    private readonly alert;
    private static readonly KYC_TIMEOUT_MS;
    private static readonly POPUP_TIMEOUT_MS;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Returns the first-row cell locator for the given column header name.
     * Logic lives in Steps (not Locators) to keep locator classes selector-only.
     */
    private getFirstRowCellByHeader;
    /**
     * Add a client then navigate to the Fact Find tab
     */
    addClientAndNavigateToFactFindTab(sideNav: SideNavService, navBar: NavBarService, clientData?: RetailClientData): Promise<RetailClientFormResult>;
    private navigateToAddClient;
    private createClientRecord;
    private navigateToFactFindTab;
    private waitForFactFindTable;
    /**
     * Creates a new Fact Find and launches the KYC app.
     * Returns the page that contains KYC (either a new tab or the same tab).
     */
    createAndLaunchNewFactFind(): Promise<Page>;
    /**
     * Start listening for a popup/new tab (resolves to null if none).
     */
    private listenForPopup;
    /**
     * Ensure the "Launch Fact Find" action is available.
     */
    private ensureLaunchFactFindIsVisible;
    /**
     * Click "Launch Fact Find" and resolve the target page (popup or current tab).
     */
    private launchFactFindAndResolveTarget;
    /**
     * Enable new fact find for this client (checkbox)
     */
    selectEnableNewFactFindCheckBox(): Promise<void>;
    /**
     * Click "Confirm & Migrate"
     */
    clickConfirmAndMigrateButton(): Promise<void>;
    /**
     * Confirm enable client for new fact find (modal/alert)
     */
    confirmEnableClientForNewFactFind(): Promise<void>;
    /**
     * Select the fact find type from dropdown
     */
    chooseFactFindType(): Promise<string>;
    /**
     * Click "Create Fact Find"
     */
    clickFactFindButton(): Promise<void>;
    /**
     * Verify the newly created first row shows the expected "Type".
     */
    private verifyLatestFactFindRowType;
    /**
     * Click "Launch Fact Find"
     */
    clickLaunchFactFindButton(): Promise<void>;
    /**
     * Verify KYC page is loaded with URL and title checks.
     */
    verifyKYCPage(kycPage: Page): Promise<Page>;
}
//# sourceMappingURL=FactFindCreationSteps.d.ts.map