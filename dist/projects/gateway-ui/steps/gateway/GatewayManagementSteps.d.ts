import { Page } from '@playwright/test';
import { BasePage } from '@/framework/src';
import { FrameworkConfig } from '@framework/types';
import { SideNavService } from '@steps/components/SideNav';
import { NavBarService } from '@steps/components/NavBar';
import type { RetailClientData, RetailClientFormResult } from '@steps/gateway/fact_find/types/RetailClientCreation.types';
/**
 * GatewayManagementSteps
 *
 * Combines fact find management and gateway fact find validation functionality.
 * Structured to match the page layout:
 * 1. Navigation / page load
 * 2. Fact Find History section
 * 3. Create New Fact Find section
 * 4. Shared history assertions
 * 5. High-level business flows
 * 6. Gateway fact find validation
 */
export declare class GatewayManagementSteps extends BasePage {
    private readonly clientSteps;
    private readonly factFindLocators;
    private readonly clientDetailsPageLocators;
    private readonly alertServiceLocator;
    private readonly alert;
    private readonly navBar;
    private static readonly KYC_TIMEOUT_MS;
    private static readonly POPUP_TIMEOUT_MS;
    private static readonly FACT_FIND_HISTORY_TIMEOUT_MS;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    private normalizeName;
    private firstExisting;
    private readCellValue;
    private getGatewayValueByLabel;
    private getDisplayedKycFullName;
    private getDisplayedKycMobile;
    private getDisplayedKycEmail;
    /**
     * Add a client then navigate to the Fact Find tab.
     */
    addClientAndNavigateToFactFindTab(sideNav: SideNavService, navBar: NavBarService, clientData?: RetailClientData): Promise<RetailClientFormResult>;
    /**
     * Open an existing client by email and navigate to the Fact Find tab.
     * This method does NOT create a new client - it searches for an existing one.
     */
    openExistingClientAndNavigateToFactFindTab(clientEmail: string, sideNav: SideNavService, navBar: NavBarService): Promise<void>;
    /**
     * Execute the complete flow to add a client and navigate to the Fact Find tab.
     */
    executeAddClientAndNavigateToFactFindTab(sideNav: SideNavService, navBar: NavBarService): Promise<void>;
    /**
     * Wait for the Fact Find History table to be visible.
     */
    waitForFactFindHistoryTable(): Promise<void>;
    /**
     * Reload the page and wait for the Fact Find History table to be visible.
     */
    reloadPageAndWait(): Promise<void>;
    /**
     * Navigate to the Add Client page.
     */
    private navigateToAddClient;
    /**
     * Create a client record.
     */
    private createClientRecord;
    /**
     * Navigate to the Fact Find tab from the client page.
     */
    private navigateToFactFindTab;
    /**
     * Verify the Add Note action is available for the first Fact Find row.
     */
    verifyFirstRowAddNoteButtonIsVisible(): Promise<void>;
    /**
     * Verify the Fact Find History table does not contain a Note header.
     */
    verifyFactFindHistoryHasNoNoteHeader(): Promise<void>;
    /**
     * Get the Status cell for the first Fact Find row.
     */
    private getFirstRowStatusCell;
    /**
     * Get the Name cell for the first Fact Find row.
     */
    private getFirstRowNameCell;
    /**
     * Get the Note cell for the specified row.
     */
    private getRowNoteCell;
    /**
     * Get the current status of the first Fact Find row.
     */
    getFirstRowFactFindStatus(): Promise<string>;
    /**
     * Verify the first Fact Find row has the expected status.
     */
    private verifyFirstRowFactFindStatus;
    /**
     * Verify the first Fact Find row is in Open status.
     */
    verifyFirstRowFactFindIsOpen(): Promise<void>;
    /**
     * Verify the first Fact Find row is in Abandoned status.
     */
    verifyFirstRowFactFindIsAbandoned(): Promise<void>;
    /**
     * Verify the Launch Fact Find link is not available on the first row.
     */
    verifyFirstRowLaunchFactFindNotAvailable(): Promise<void>;
    /**
     * Verify the Name column is blank for the first Fact Find row.
     */
    verifyFirstRowNameIsBlank(): Promise<void>;
    /**
     * Verify the Name column value for the first Fact Find row.
     */
    verifyFirstRowNameValue(expectedName: string): Promise<void>;
    /**
     * Verify the Note column is blank for the first Fact Find row.
     */
    verifyFirstRowNoteIsBlank(): Promise<void>;
    /**
     * Click the Abandon button for the first Fact Find row.
     */
    clickAbandonButtonFirstRow(): Promise<void>;
    /**
     * Confirm the abandon action in the Abandon Fact Find modal.
     */
    confirmAbandonInPopup(): Promise<void>;
    /**
     * Abandon the first Fact Find row.
     */
    abandonFirstRowFactFind(): Promise<void>;
    /**
     * Click the Add Name button for the first Fact Find row.
     */
    clickAddNameButton(): Promise<void>;
    /**
     * Enter a Fact Find name in the Add Name modal input field.
     */
    enterFactFindNameInAddModal(name: string): Promise<void>;
    /**
     * Enter a Fact Find name in the Add Name modal input field.
     */
    enterFactFindNameInEditModal(name: string): Promise<void>;
    /**
     * Enter a Fact Find note in the Add Note modal input field.
     */
    enterFactFindNoteInAddModal(name: string): Promise<void>;
    /**
     * Click the Edit Name button for the first Fact Find row.
     */
    clickEditNameButton(): Promise<void>;
    /**
     * Click the gatewaytable-collapse button for the first Fact Find row.
     */
    clickGatewayTableCollapseButton(): Promise<void>;
    /**
     * Click the Add Note button for the first Fact Find row.
     */
    clickAddNoteButton(): Promise<void>;
    /**
     * Get the Note cell from the first row of the expanded note history table.
     */
    private getFirstRowNoteValueCell;
    /**
     * Verify the saved note value for the first Fact Find row.
     */
    verifyFirstRowNoteValue(expectedNote: string): Promise<void>;
    /**
     * Add a name to the abandoned Fact Find and verify the Name column is populated.
     */
    executeAddNameToAbandonedFactFind(): Promise<void>;
    /**
     * Add a note to the abandoned Fact Find and verify the Note value is displayed.
     */
    executeAddNoteToAbandonedFactFind(): Promise<void>;
    /**
     * Verify the note remains saved against the abandoned Fact Find after page reload.
     */
    executeVerifyNoteSavedAgainstAbandonedFactFind(): Promise<void>;
    /**
     * Click the Edit Note button for the first Fact Find row.
     */
    clickEditNoteButtonFirstRow(): Promise<void>;
    /**
     * Enter a Fact Find note in the Add Note modal input field.
     */
    enterFactFindNoteInEditModal(name: string): Promise<void>;
    /**
     * Edit the note on the abandoned Fact Find and verify the updated value is displayed.
     */
    executeEditNoteOnAbandonedFactFind(): Promise<string>;
    executeVerifyUpdatedNoteSavedAndPersisted(): Promise<void>;
    /**
     * Verify the name remains saved against the abandoned Fact Find after page reload.
     */
    executeVerifyNameSavedAgainstAbandonedFactFind(): Promise<void>;
    /**
     * Edit the name on the abandoned Fact Find and verify the updated value is displayed.
     */
    executeEditNameOnAbandonedFactFind(): Promise<string>;
    executeVerifyUpdatedNameSavedAndPersisted(): Promise<void>;
    /**
     * Click the Launch Fact Find link.
     */
    clickLaunchFactFindButton(): Promise<void>;
    /**
     * Verify the KYC page is loaded successfully.
     */
    verifyKYCPage(kycPage: Page): Promise<Page>;
    /**
     * Start listening for a popup or new page.
     */
    private listenForPopup;
    /**
     * Ensure the Launch Fact Find link is visible on the first row.
     */
    private ensureLaunchFactFindIsVisible;
    /**
     * Click Launch Fact Find and resolve the target page.
     */
    private launchFactFindAndResolveTarget;
    /**
     * Select the Enable new fact find for this client checkbox.
     */
    selectEnableNewFactFindCheckBox(): Promise<void>;
    /**
     * Click the Confirm & Migrate button.
     */
    clickConfirmAndMigrateButton(): Promise<void>;
    /**
     * Confirm the enable client for new fact find alert.
     */
    confirmEnableClientForNewFactFind(): Promise<void>;
    /**
     * Choose the Fact Find type from the dropdown.
     */
    chooseFactFindType(value: string): Promise<string>;
    /**
     * Click the Create Fact Find button.
     */
    clickFactFindButton(): Promise<void>;
    private createFactFind;
    /**
     * Create a Fact Find without launching KYC.
     */
    executeCreateFactFind(factFindType: string): Promise<string>;
    /**
     * Create and launch a new Fact Find into the KYC page.
     */
    createAndLaunchNewFactFind(factFindType: string): Promise<Page>;
    /**
     * Find the created Fact Find row index using Type and Status.
     */
    private findCreatedFactFindRowIndex;
    /**
     * Assert the Fact Find History row values for the created Fact Find.
     */
    assertFactFindHistoryRow(args: {
        expectedType: string;
        createClickedAt: Date;
        expectedStatus?: string;
    }): Promise<void>;
    /**
     * Verify the Fact Find History heading is visible.
     */
    private assertFactFindHistoryHeadingVisible;
    /**
     * Get the impersonation name from the impersonation banner.
     */
    private getImpersonationName;
    /**
     * Get the Created By cell for the specified row.
     */
    private getRowCreatedByCell;
    /**
     * Verify the Created By value matches the impersonation name.
     */
    private assertRowCreatedByMatchesImpersonation;
    /**
     * Get the Status cell for the specified row.
     */
    private getRowStatusCell;
    /**
     * Verify the Status value for the specified row.
     */
    private assertRowStatusIs;
    /**
     * Get the Type cell for the specified row.
     */
    private getRowTypeCell;
    /**
     * Verify the Type value for the specified row.
     */
    private assertRowTypeMatches;
    /**
     * Get the Create Date cell for the specified row.
     */
    private getRowCreateDateCell;
    /**
     * Get the Create Date text for the specified row.
     */
    private getRowCreateDateText;
    /**
     * Verify the Create Date format is valid.
     */
    private assertCreateDateFormat;
    /**
     * Verify the Create Date is within the acceptable tolerance of the click time.
     */
    private assertCreateDateIsValidAndRecent;
    /**
     * Abandon the first row Fact Find and verify the status is updated.
     */
    executeAbandonFirstRowFactFind(): Promise<void>;
    /**
     * Verify the first row abandoned Fact Find status remains after page reload.
     */
    executeVerifyFirstRowAbandonmentStatusMaintained(): Promise<void>;
    /**
     * Verify the overall system response for the first row abandoned Fact Find.
     */
    executeVerifySystemResponseForFirstRowAbandonedFactFind(): Promise<void>;
    refreshAfterFactFindCleanup(): Promise<void>;
    /**
     * Create a client, create a Fact Find, and abandon the first row Fact Find.
     */
    createAndAbandonFactFind(sideNav: SideNavService, navBar: NavBarService, factFindType: string): Promise<void>;
    validateGatewayFactFindData(): Promise<void>;
    /**
     * Verifies that the first fact find row has 'Complete' status
     * This is a specific validation for completed fact finds
     */
    verifyFirstFactFindStatusIsComplete(): Promise<void>;
    private verifyLatestFactFindClientNameMatchesKyc;
    private verifyLatestFactFindStatusIsCompleteForKycClient;
    private navigateToClientDetailsPage;
    private verifyGatewayContactDetailsMatchKyc;
}
//# sourceMappingURL=GatewayManagementSteps.d.ts.map