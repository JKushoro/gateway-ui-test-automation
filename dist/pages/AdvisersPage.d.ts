import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * AdvisersPage - Page Object Model for Advisers functionality
 * Contains all locators and interactions for managing advisers
 */
export declare class AdvisersPage extends BasePage {
    constructor(page: Page);
    get locators(): {
        pageTitle: import("playwright-core").Locator;
        breadcrumb: import("playwright-core").Locator;
        searchInput: import("playwright-core").Locator;
        filterDropdown: import("playwright-core").Locator;
        statusFilter: import("playwright-core").Locator;
        regionFilter: import("playwright-core").Locator;
        teamFilter: import("playwright-core").Locator;
        licenseFilter: import("playwright-core").Locator;
        createAdviserButton: import("playwright-core").Locator;
        importButton: import("playwright-core").Locator;
        exportButton: import("playwright-core").Locator;
        refreshButton: import("playwright-core").Locator;
        listViewButton: import("playwright-core").Locator;
        cardViewButton: import("playwright-core").Locator;
        advisersTable: import("playwright-core").Locator;
        tableHeaders: import("playwright-core").Locator;
        tableRows: import("playwright-core").Locator;
        adviserIdColumn: import("playwright-core").Locator;
        nameColumn: import("playwright-core").Locator;
        emailColumn: import("playwright-core").Locator;
        phoneColumn: import("playwright-core").Locator;
        regionColumn: import("playwright-core").Locator;
        teamColumn: import("playwright-core").Locator;
        licenseColumn: import("playwright-core").Locator;
        statusColumn: import("playwright-core").Locator;
        clientsColumn: import("playwright-core").Locator;
        lastActiveColumn: import("playwright-core").Locator;
        actionsColumn: import("playwright-core").Locator;
        advisersGrid: import("playwright-core").Locator;
        adviserCards: import("playwright-core").Locator;
        viewButton: import("playwright-core").Locator;
        editButton: import("playwright-core").Locator;
        activateButton: import("playwright-core").Locator;
        deactivateButton: import("playwright-core").Locator;
        assignClientsButton: import("playwright-core").Locator;
        viewClientsButton: import("playwright-core").Locator;
        deleteButton: import("playwright-core").Locator;
        activeStatus: import("playwright-core").Locator;
        inactiveStatus: import("playwright-core").Locator;
        suspendedStatus: import("playwright-core").Locator;
        pendingStatus: import("playwright-core").Locator;
        ciiLicense: import("playwright-core").Locator;
        cfpLicense: import("playwright-core").Locator;
        charteredLicense: import("playwright-core").Locator;
        adviserModal: import("playwright-core").Locator;
        modalTitle: import("playwright-core").Locator;
        firstNameInput: import("playwright-core").Locator;
        lastNameInput: import("playwright-core").Locator;
        emailInput: import("playwright-core").Locator;
        phoneInput: import("playwright-core").Locator;
        addressInput: import("playwright-core").Locator;
        regionSelect: import("playwright-core").Locator;
        teamSelect: import("playwright-core").Locator;
        licenseSelect: import("playwright-core").Locator;
        licenseNumberInput: import("playwright-core").Locator;
        statusSelect: import("playwright-core").Locator;
        notesTextarea: import("playwright-core").Locator;
        profilePictureUpload: import("playwright-core").Locator;
        clientAssignmentModal: import("playwright-core").Locator;
        availableClientsList: import("playwright-core").Locator;
        assignedClientsList: import("playwright-core").Locator;
        assignClientButton: import("playwright-core").Locator;
        unassignClientButton: import("playwright-core").Locator;
        saveButton: import("playwright-core").Locator;
        cancelButton: import("playwright-core").Locator;
        closeModalButton: import("playwright-core").Locator;
        pagination: import("playwright-core").Locator;
        previousPageButton: import("playwright-core").Locator;
        nextPageButton: import("playwright-core").Locator;
        pageInfo: import("playwright-core").Locator;
        totalAdvisersCard: import("playwright-core").Locator;
        activeAdvisersCard: import("playwright-core").Locator;
        newAdvisersCard: import("playwright-core").Locator;
        topPerformersCard: import("playwright-core").Locator;
    };
    /**
     * Navigate to Advisers page
     */
    navigate(): Promise<void>;
    /**
     * Wait for page to load
     */
    waitForPageLoad(): Promise<void>;
    /**
     * Check if we're on the correct page
     */
    isPageLoaded(): Promise<boolean>;
    /**
     * Search for advisers
     */
    searchAdvisers(searchTerm: string): Promise<void>;
    /**
     * Filter advisers by status
     */
    filterByStatus(status: string): Promise<void>;
    /**
     * Filter advisers by region
     */
    filterByRegion(region: string): Promise<void>;
    /**
     * Filter advisers by team
     */
    filterByTeam(team: string): Promise<void>;
    /**
     * Switch to list view
     */
    switchToListView(): Promise<void>;
    /**
     * Switch to card view
     */
    switchToCardView(): Promise<void>;
    /**
     * Create new adviser
     */
    clickCreateAdviser(): Promise<void>;
    /**
     * Fill adviser form
     */
    fillAdviserForm(adviserData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        region: string;
        team: string;
        licenseType: string;
        licenseNumber: string;
        status: string;
        notes?: string;
    }): Promise<void>;
    /**
     * Save adviser
     */
    saveAdviser(): Promise<void>;
    /**
     * Cancel adviser creation/editing
     */
    cancelAdviser(): Promise<void>;
    /**
     * View adviser details
     */
    viewAdviser(adviserId: string): Promise<void>;
    /**
     * Edit adviser
     */
    editAdviser(adviserId: string): Promise<void>;
    /**
     * Activate adviser
     */
    activateAdviser(adviserId: string): Promise<void>;
    /**
     * Deactivate adviser
     */
    deactivateAdviser(adviserId: string): Promise<void>;
    /**
     * Assign clients to adviser
     */
    assignClients(adviserId: string): Promise<void>;
    /**
     * View adviser's clients
     */
    viewAdviserClients(adviserId: string): Promise<void>;
    /**
     * Delete adviser
     */
    deleteAdviser(adviserId: string): Promise<void>;
    /**
     * Get adviser count
     */
    getAdviserCount(): Promise<number>;
    /**
     * Get adviser status
     */
    getAdviserStatus(adviserId: string): Promise<string>;
    /**
     * Upload profile picture
     */
    uploadProfilePicture(filePath: string): Promise<void>;
    /**
     * Import advisers
     */
    importAdvisers(): Promise<void>;
    /**
     * Export advisers
     */
    exportAdvisers(): Promise<void>;
    /**
     * Refresh advisers list
     */
    refreshAdvisers(): Promise<void>;
    /**
     * Get total advisers count from statistics
     */
    getTotalAdvisersCount(): Promise<string>;
    /**
     * Get active advisers count from statistics
     */
    getActiveAdvisersCount(): Promise<string>;
}
//# sourceMappingURL=AdvisersPage.d.ts.map