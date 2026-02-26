import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * WorkAllocationRequestsPage - Page Object Model for Work Allocation Requests functionality
 * Contains all locators and interactions for managing work allocation requests
 */
export declare class WorkAllocationRequestsPage extends BasePage {
    constructor(page: Page);
    get locators(): {
        pageTitle: import("playwright-core").Locator;
        breadcrumb: import("playwright-core").Locator;
        searchInput: import("playwright-core").Locator;
        filterDropdown: import("playwright-core").Locator;
        statusFilter: import("playwright-core").Locator;
        dateFilter: import("playwright-core").Locator;
        createRequestButton: import("playwright-core").Locator;
        exportButton: import("playwright-core").Locator;
        refreshButton: import("playwright-core").Locator;
        requestsTable: import("playwright-core").Locator;
        tableHeaders: import("playwright-core").Locator;
        tableRows: import("playwright-core").Locator;
        requestIdColumn: import("playwright-core").Locator;
        clientNameColumn: import("playwright-core").Locator;
        advisorColumn: import("playwright-core").Locator;
        statusColumn: import("playwright-core").Locator;
        dateCreatedColumn: import("playwright-core").Locator;
        priorityColumn: import("playwright-core").Locator;
        actionsColumn: import("playwright-core").Locator;
        viewButton: import("playwright-core").Locator;
        editButton: import("playwright-core").Locator;
        assignButton: import("playwright-core").Locator;
        deleteButton: import("playwright-core").Locator;
        pagination: import("playwright-core").Locator;
        previousPageButton: import("playwright-core").Locator;
        nextPageButton: import("playwright-core").Locator;
        pageInfo: import("playwright-core").Locator;
        pendingStatus: import("playwright-core").Locator;
        inProgressStatus: import("playwright-core").Locator;
        completedStatus: import("playwright-core").Locator;
        cancelledStatus: import("playwright-core").Locator;
        requestModal: import("playwright-core").Locator;
        modalTitle: import("playwright-core").Locator;
        clientNameInput: import("playwright-core").Locator;
        advisorSelect: import("playwright-core").Locator;
        prioritySelect: import("playwright-core").Locator;
        descriptionTextarea: import("playwright-core").Locator;
        saveButton: import("playwright-core").Locator;
        cancelButton: import("playwright-core").Locator;
        closeModalButton: import("playwright-core").Locator;
    };
    /**
     * Navigate to Work Allocation Requests page
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
     * Search for requests
     */
    searchRequests(searchTerm: string): Promise<void>;
    /**
     * Filter requests by status
     */
    filterByStatus(status: string): Promise<void>;
    /**
     * Create new request
     */
    clickCreateRequest(): Promise<void>;
    /**
     * Fill request form
     */
    fillRequestForm(requestData: {
        clientName: string;
        advisor: string;
        priority: string;
        description: string;
    }): Promise<void>;
    /**
     * Save request
     */
    saveRequest(): Promise<void>;
    /**
     * Cancel request creation/editing
     */
    cancelRequest(): Promise<void>;
    /**
     * View request details
     */
    viewRequest(requestId: string): Promise<void>;
    /**
     * Edit request
     */
    editRequest(requestId: string): Promise<void>;
    /**
     * Assign request to advisor
     */
    assignRequest(requestId: string): Promise<void>;
    /**
     * Delete request
     */
    deleteRequest(requestId: string): Promise<void>;
    /**
     * Get request count
     */
    getRequestCount(): Promise<number>;
    /**
     * Get request status
     */
    getRequestStatus(requestId: string): Promise<string>;
    /**
     * Navigate to next page
     */
    goToNextPage(): Promise<void>;
    /**
     * Navigate to previous page
     */
    goToPreviousPage(): Promise<void>;
    /**
     * Export requests
     */
    exportRequests(): Promise<void>;
    /**
     * Refresh requests list
     */
    refreshRequests(): Promise<void>;
}
//# sourceMappingURL=WorkAllocationRequestsPage.d.ts.map