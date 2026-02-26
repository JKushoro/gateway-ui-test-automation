"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkAllocationRequestsPage = void 0;
const BasePage_1 = require("../core/BasePage");
/**
 * WorkAllocationRequestsPage - Page Object Model for Work Allocation Requests functionality
 * Contains all locators and interactions for managing work allocation requests
 */
class WorkAllocationRequestsPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    // Locators
    get locators() {
        return {
            // Page header
            pageTitle: this.locatorHelper.getByText('Work Allocation Requests'),
            breadcrumb: this.locatorHelper.getByTestId('breadcrumb') ||
                this.locatorHelper.getLocator('.breadcrumb'),
            // Search and filters
            searchInput: this.locatorHelper.getInputByPlaceholder('Search requests...') ||
                this.locatorHelper.getByTestId('search-input'),
            filterDropdown: this.locatorHelper.getByTestId('filter-dropdown') ||
                this.locatorHelper.getLocator('.filter-dropdown'),
            statusFilter: this.locatorHelper.getByTestId('status-filter'),
            dateFilter: this.locatorHelper.getByTestId('date-filter'),
            // Action buttons
            createRequestButton: this.locatorHelper.getButtonByText('Create Request') ||
                this.locatorHelper.getByTestId('create-request-btn'),
            exportButton: this.locatorHelper.getButtonByText('Export') ||
                this.locatorHelper.getByTestId('export-btn'),
            refreshButton: this.locatorHelper.getButtonByText('Refresh') ||
                this.locatorHelper.getByTestId('refresh-btn'),
            // Table elements
            requestsTable: this.locatorHelper.getByTestId('requests-table') ||
                this.locatorHelper.getLocator('table'),
            tableHeaders: this.locatorHelper.getLocator('thead th'),
            tableRows: this.locatorHelper.getLocator('tbody tr'),
            // Table columns
            requestIdColumn: this.locatorHelper.getByText('Request ID'),
            clientNameColumn: this.locatorHelper.getByText('Client Name'),
            advisorColumn: this.locatorHelper.getByText('Advisor'),
            statusColumn: this.locatorHelper.getByText('Status'),
            dateCreatedColumn: this.locatorHelper.getByText('Date Created'),
            priorityColumn: this.locatorHelper.getByText('Priority'),
            actionsColumn: this.locatorHelper.getByText('Actions'),
            // Row actions
            viewButton: this.locatorHelper.getButtonByText('View'),
            editButton: this.locatorHelper.getButtonByText('Edit'),
            assignButton: this.locatorHelper.getButtonByText('Assign'),
            deleteButton: this.locatorHelper.getButtonByText('Delete'),
            // Pagination
            pagination: this.locatorHelper.getByTestId('pagination') ||
                this.locatorHelper.getLocator('.pagination'),
            previousPageButton: this.locatorHelper.getButtonByText('Previous'),
            nextPageButton: this.locatorHelper.getButtonByText('Next'),
            pageInfo: this.locatorHelper.getByTestId('page-info'),
            // Status indicators
            pendingStatus: this.locatorHelper.getByText('Pending'),
            inProgressStatus: this.locatorHelper.getByText('In Progress'),
            completedStatus: this.locatorHelper.getByText('Completed'),
            cancelledStatus: this.locatorHelper.getByText('Cancelled'),
            // Modal/Form elements
            requestModal: this.locatorHelper.getByTestId('request-modal') ||
                this.locatorHelper.getLocator('.modal'),
            modalTitle: this.locatorHelper.getByTestId('modal-title'),
            clientNameInput: this.locatorHelper.getInputByLabel('Client Name'),
            advisorSelect: this.locatorHelper.getInputByLabel('Advisor'),
            prioritySelect: this.locatorHelper.getInputByLabel('Priority'),
            descriptionTextarea: this.locatorHelper.getInputByLabel('Description'),
            saveButton: this.locatorHelper.getButtonByText('Save'),
            cancelButton: this.locatorHelper.getButtonByText('Cancel'),
            closeModalButton: this.locatorHelper.getByTestId('close-modal') ||
                this.locatorHelper.getLocator('.close, .btn-close'),
        };
    }
    /**
     * Navigate to Work Allocation Requests page
     */
    async navigate() {
        await this.navigateToPath('/work-allocation-requests');
    }
    /**
     * Wait for page to load
     */
    async waitForPageLoad() {
        await this.waitHelper.waitForElement(this.locators.pageTitle);
        await this.waitHelper.waitForElement(this.locators.requestsTable);
    }
    /**
     * Check if we're on the correct page
     */
    async isPageLoaded() {
        try {
            await this.waitForPageLoad();
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Search for requests
     */
    async searchRequests(searchTerm) {
        await this.actionHelper.fillInputByPlaceholder('Search requests...', searchTerm);
        await this.page.keyboard.press('Enter');
    }
    /**
     * Filter requests by status
     */
    async filterByStatus(status) {
        await this.actionHelper.clickLocator(this.locators.statusFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.statusFilter.toString(), status);
    }
    /**
     * Create new request
     */
    async clickCreateRequest() {
        await this.actionHelper.clickLocator(this.locators.createRequestButton);
        await this.waitHelper.waitForElement(this.locators.requestModal);
    }
    /**
     * Fill request form
     */
    async fillRequestForm(requestData) {
        await this.actionHelper.fillInputByLabel('Client Name', requestData.clientName);
        await this.actionHelper.selectCustomDropdown(this.locators.advisorSelect.toString(), requestData.advisor);
        await this.actionHelper.selectCustomDropdown(this.locators.prioritySelect.toString(), requestData.priority);
        await this.actionHelper.fillInputByLabel('Description', requestData.description);
    }
    /**
     * Save request
     */
    async saveRequest() {
        await this.actionHelper.clickLocator(this.locators.saveButton);
        await this.waitHelper.waitForElementToBeHidden(this.locators.requestModal);
    }
    /**
     * Cancel request creation/editing
     */
    async cancelRequest() {
        await this.actionHelper.clickLocator(this.locators.cancelButton);
        await this.waitHelper.waitForElementToBeHidden(this.locators.requestModal);
    }
    /**
     * View request details
     */
    async viewRequest(requestId) {
        const row = this.locatorHelper.getContainingText('tr', requestId);
        const viewButton = row.locator('button:has-text("View")');
        await this.actionHelper.clickLocator(viewButton);
    }
    /**
     * Edit request
     */
    async editRequest(requestId) {
        const row = this.locatorHelper.getContainingText('tr', requestId);
        const editButton = row.locator('button:has-text("Edit")');
        await this.actionHelper.clickLocator(editButton);
        await this.waitHelper.waitForElement(this.locators.requestModal);
    }
    /**
     * Assign request to advisor
     */
    async assignRequest(requestId) {
        const row = this.locatorHelper.getContainingText('tr', requestId);
        const assignButton = row.locator('button:has-text("Assign")');
        await this.actionHelper.clickLocator(assignButton);
    }
    /**
     * Delete request
     */
    async deleteRequest(requestId) {
        const row = this.locatorHelper.getContainingText('tr', requestId);
        const deleteButton = row.locator('button:has-text("Delete")');
        await this.actionHelper.clickLocator(deleteButton);
    }
    /**
     * Get request count
     */
    async getRequestCount() {
        return await this.actionHelper.getElementCount('tbody tr');
    }
    /**
     * Get request status
     */
    async getRequestStatus(requestId) {
        const row = this.locatorHelper.getContainingText('tr', requestId);
        const statusCell = row.locator('td').nth(3); // Assuming status is 4th column
        return await this.actionHelper.getTrimmedText(statusCell);
    }
    /**
     * Navigate to next page
     */
    async goToNextPage() {
        await this.actionHelper.clickLocator(this.locators.nextPageButton);
        await this.waitForLoadingToComplete();
    }
    /**
     * Navigate to previous page
     */
    async goToPreviousPage() {
        await this.actionHelper.clickLocator(this.locators.previousPageButton);
        await this.waitForLoadingToComplete();
    }
    /**
     * Export requests
     */
    async exportRequests() {
        await this.actionHelper.clickLocator(this.locators.exportButton);
    }
    /**
     * Refresh requests list
     */
    async refreshRequests() {
        await this.actionHelper.clickLocator(this.locators.refreshButton);
        await this.waitForLoadingToComplete();
    }
}
exports.WorkAllocationRequestsPage = WorkAllocationRequestsPage;
//# sourceMappingURL=WorkAllocationRequestsPage.js.map