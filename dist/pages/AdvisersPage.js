"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvisersPage = void 0;
const BasePage_1 = require("../core/BasePage");
/**
 * AdvisersPage - Page Object Model for Advisers functionality
 * Contains all locators and interactions for managing advisers
 */
class AdvisersPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    // Locators
    get locators() {
        return {
            // Page header
            pageTitle: this.locatorHelper.getByText('Advisers'),
            breadcrumb: this.locatorHelper.getByTestId('breadcrumb') ||
                this.locatorHelper.getLocator('.breadcrumb'),
            // Search and filters
            searchInput: this.locatorHelper.getInputByPlaceholder('Search advisers...') ||
                this.locatorHelper.getByTestId('search-input'),
            filterDropdown: this.locatorHelper.getByTestId('filter-dropdown') ||
                this.locatorHelper.getLocator('.filter-dropdown'),
            statusFilter: this.locatorHelper.getByTestId('status-filter'),
            regionFilter: this.locatorHelper.getByTestId('region-filter'),
            teamFilter: this.locatorHelper.getByTestId('team-filter'),
            licenseFilter: this.locatorHelper.getByTestId('license-filter'),
            // Action buttons
            createAdviserButton: this.locatorHelper.getButtonByText('Create Adviser') ||
                this.locatorHelper.getByTestId('create-adviser-btn'),
            importButton: this.locatorHelper.getButtonByText('Import') ||
                this.locatorHelper.getByTestId('import-btn'),
            exportButton: this.locatorHelper.getButtonByText('Export') ||
                this.locatorHelper.getByTestId('export-btn'),
            refreshButton: this.locatorHelper.getButtonByText('Refresh') ||
                this.locatorHelper.getByTestId('refresh-btn'),
            // View toggles
            listViewButton: this.locatorHelper.getButtonByText('List View') ||
                this.locatorHelper.getByTestId('list-view-btn'),
            cardViewButton: this.locatorHelper.getButtonByText('Card View') ||
                this.locatorHelper.getByTestId('card-view-btn'),
            // Table elements (List View)
            advisersTable: this.locatorHelper.getByTestId('advisers-table') ||
                this.locatorHelper.getLocator('table'),
            tableHeaders: this.locatorHelper.getLocator('thead th'),
            tableRows: this.locatorHelper.getLocator('tbody tr'),
            // Table columns
            adviserIdColumn: this.locatorHelper.getByText('Adviser ID'),
            nameColumn: this.locatorHelper.getByText('Name'),
            emailColumn: this.locatorHelper.getByText('Email'),
            phoneColumn: this.locatorHelper.getByText('Phone'),
            regionColumn: this.locatorHelper.getByText('Region'),
            teamColumn: this.locatorHelper.getByText('Team'),
            licenseColumn: this.locatorHelper.getByText('License'),
            statusColumn: this.locatorHelper.getByText('Status'),
            clientsColumn: this.locatorHelper.getByText('Clients'),
            lastActiveColumn: this.locatorHelper.getByText('Last Active'),
            actionsColumn: this.locatorHelper.getByText('Actions'),
            // Card view elements
            advisersGrid: this.locatorHelper.getByTestId('advisers-grid') ||
                this.locatorHelper.getLocator('.advisers-grid'),
            adviserCards: this.locatorHelper.getLocator('.adviser-card'),
            // Row/Card actions
            viewButton: this.locatorHelper.getButtonByText('View'),
            editButton: this.locatorHelper.getButtonByText('Edit'),
            activateButton: this.locatorHelper.getButtonByText('Activate'),
            deactivateButton: this.locatorHelper.getButtonByText('Deactivate'),
            assignClientsButton: this.locatorHelper.getButtonByText('Assign Clients'),
            viewClientsButton: this.locatorHelper.getButtonByText('View Clients'),
            deleteButton: this.locatorHelper.getButtonByText('Delete'),
            // Status indicators
            activeStatus: this.locatorHelper.getByText('Active'),
            inactiveStatus: this.locatorHelper.getByText('Inactive'),
            suspendedStatus: this.locatorHelper.getByText('Suspended'),
            pendingStatus: this.locatorHelper.getByText('Pending'),
            // License types
            ciiLicense: this.locatorHelper.getByText('CII'),
            cfpLicense: this.locatorHelper.getByText('CFP'),
            charteredLicense: this.locatorHelper.getByText('Chartered'),
            // Modal/Form elements
            adviserModal: this.locatorHelper.getByTestId('adviser-modal') ||
                this.locatorHelper.getLocator('.modal'),
            modalTitle: this.locatorHelper.getByTestId('modal-title'),
            firstNameInput: this.locatorHelper.getInputByLabel('First Name'),
            lastNameInput: this.locatorHelper.getInputByLabel('Last Name'),
            emailInput: this.locatorHelper.getInputByLabel('Email'),
            phoneInput: this.locatorHelper.getInputByLabel('Phone'),
            addressInput: this.locatorHelper.getInputByLabel('Address'),
            regionSelect: this.locatorHelper.getInputByLabel('Region'),
            teamSelect: this.locatorHelper.getInputByLabel('Team'),
            licenseSelect: this.locatorHelper.getInputByLabel('License Type'),
            licenseNumberInput: this.locatorHelper.getInputByLabel('License Number'),
            statusSelect: this.locatorHelper.getInputByLabel('Status'),
            notesTextarea: this.locatorHelper.getInputByLabel('Notes'),
            // Profile picture upload
            profilePictureUpload: this.locatorHelper.getInputByLabel('Profile Picture') ||
                this.locatorHelper.getLocator('input[type="file"]'),
            // Client assignment modal
            clientAssignmentModal: this.locatorHelper.getByTestId('client-assignment-modal'),
            availableClientsList: this.locatorHelper.getByTestId('available-clients'),
            assignedClientsList: this.locatorHelper.getByTestId('assigned-clients'),
            assignClientButton: this.locatorHelper.getButtonByText('Assign'),
            unassignClientButton: this.locatorHelper.getButtonByText('Unassign'),
            // Common form buttons
            saveButton: this.locatorHelper.getButtonByText('Save'),
            cancelButton: this.locatorHelper.getButtonByText('Cancel'),
            closeModalButton: this.locatorHelper.getByTestId('close-modal') ||
                this.locatorHelper.getLocator('.close, .btn-close'),
            // Pagination
            pagination: this.locatorHelper.getByTestId('pagination') ||
                this.locatorHelper.getLocator('.pagination'),
            previousPageButton: this.locatorHelper.getButtonByText('Previous'),
            nextPageButton: this.locatorHelper.getButtonByText('Next'),
            pageInfo: this.locatorHelper.getByTestId('page-info'),
            // Statistics cards
            totalAdvisersCard: this.locatorHelper.getByText('Total Advisers'),
            activeAdvisersCard: this.locatorHelper.getByText('Active Advisers'),
            newAdvisersCard: this.locatorHelper.getByText('New This Month'),
            topPerformersCard: this.locatorHelper.getByText('Top Performers'),
        };
    }
    /**
     * Navigate to Advisers page
     */
    async navigate() {
        await this.navigateToPath('/advisers');
    }
    /**
     * Wait for page to load
     */
    async waitForPageLoad() {
        await this.waitHelper.waitForElement(this.locators.pageTitle);
        // Wait for either table or grid view to load
        try {
            await this.waitHelper.waitForElement(this.locators.advisersTable, 2000);
        }
        catch {
            await this.waitHelper.waitForElement(this.locators.advisersGrid);
        }
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
     * Search for advisers
     */
    async searchAdvisers(searchTerm) {
        await this.actionHelper.fillInputByPlaceholder('Search advisers...', searchTerm);
        await this.page.keyboard.press('Enter');
    }
    /**
     * Filter advisers by status
     */
    async filterByStatus(status) {
        await this.actionHelper.clickLocator(this.locators.statusFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.statusFilter.toString(), status);
    }
    /**
     * Filter advisers by region
     */
    async filterByRegion(region) {
        await this.actionHelper.clickLocator(this.locators.regionFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.regionFilter.toString(), region);
    }
    /**
     * Filter advisers by team
     */
    async filterByTeam(team) {
        await this.actionHelper.clickLocator(this.locators.teamFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.teamFilter.toString(), team);
    }
    /**
     * Switch to list view
     */
    async switchToListView() {
        await this.actionHelper.clickLocator(this.locators.listViewButton);
        await this.waitHelper.waitForElement(this.locators.advisersTable);
    }
    /**
     * Switch to card view
     */
    async switchToCardView() {
        await this.actionHelper.clickLocator(this.locators.cardViewButton);
        await this.waitHelper.waitForElement(this.locators.advisersGrid);
    }
    /**
     * Create new adviser
     */
    async clickCreateAdviser() {
        await this.actionHelper.clickLocator(this.locators.createAdviserButton);
        await this.waitHelper.waitForElement(this.locators.adviserModal);
    }
    /**
     * Fill adviser form
     */
    async fillAdviserForm(adviserData) {
        await this.actionHelper.fillInputByLabel('First Name', adviserData.firstName);
        await this.actionHelper.fillInputByLabel('Last Name', adviserData.lastName);
        await this.actionHelper.fillInputByLabel('Email', adviserData.email);
        await this.actionHelper.fillInputByLabel('Phone', adviserData.phone);
        await this.actionHelper.fillInputByLabel('Address', adviserData.address);
        await this.actionHelper.selectCustomDropdown(this.locators.regionSelect.toString(), adviserData.region);
        await this.actionHelper.selectCustomDropdown(this.locators.teamSelect.toString(), adviserData.team);
        await this.actionHelper.selectCustomDropdown(this.locators.licenseSelect.toString(), adviserData.licenseType);
        await this.actionHelper.fillInputByLabel('License Number', adviserData.licenseNumber);
        await this.actionHelper.selectCustomDropdown(this.locators.statusSelect.toString(), adviserData.status);
        if (adviserData.notes) {
            await this.actionHelper.fillInputByLabel('Notes', adviserData.notes);
        }
    }
    /**
     * Save adviser
     */
    async saveAdviser() {
        await this.actionHelper.clickLocator(this.locators.saveButton);
        await this.waitHelper.waitForElementToBeHidden(this.locators.adviserModal);
    }
    /**
     * Cancel adviser creation/editing
     */
    async cancelAdviser() {
        await this.actionHelper.clickLocator(this.locators.cancelButton);
        await this.waitHelper.waitForElementToBeHidden(this.locators.adviserModal);
    }
    /**
     * View adviser details
     */
    async viewAdviser(adviserId) {
        const row = this.locatorHelper.getContainingText('tr', adviserId);
        const viewButton = row.locator('button:has-text("View")');
        await this.actionHelper.clickLocator(viewButton);
    }
    /**
     * Edit adviser
     */
    async editAdviser(adviserId) {
        const row = this.locatorHelper.getContainingText('tr', adviserId);
        const editButton = row.locator('button:has-text("Edit")');
        await this.actionHelper.clickLocator(editButton);
        await this.waitHelper.waitForElement(this.locators.adviserModal);
    }
    /**
     * Activate adviser
     */
    async activateAdviser(adviserId) {
        const row = this.locatorHelper.getContainingText('tr', adviserId);
        const activateButton = row.locator('button:has-text("Activate")');
        await this.actionHelper.clickLocator(activateButton);
    }
    /**
     * Deactivate adviser
     */
    async deactivateAdviser(adviserId) {
        const row = this.locatorHelper.getContainingText('tr', adviserId);
        const deactivateButton = row.locator('button:has-text("Deactivate")');
        await this.actionHelper.clickLocator(deactivateButton);
    }
    /**
     * Assign clients to adviser
     */
    async assignClients(adviserId) {
        const row = this.locatorHelper.getContainingText('tr', adviserId);
        const assignButton = row.locator('button:has-text("Assign Clients")');
        await this.actionHelper.clickLocator(assignButton);
        await this.waitHelper.waitForElement(this.locators.clientAssignmentModal);
    }
    /**
     * View adviser's clients
     */
    async viewAdviserClients(adviserId) {
        const row = this.locatorHelper.getContainingText('tr', adviserId);
        const viewClientsButton = row.locator('button:has-text("View Clients")');
        await this.actionHelper.clickLocator(viewClientsButton);
    }
    /**
     * Delete adviser
     */
    async deleteAdviser(adviserId) {
        const row = this.locatorHelper.getContainingText('tr', adviserId);
        const deleteButton = row.locator('button:has-text("Delete")');
        await this.actionHelper.clickLocator(deleteButton);
    }
    /**
     * Get adviser count
     */
    async getAdviserCount() {
        return await this.actionHelper.getElementCount('tbody tr');
    }
    /**
     * Get adviser status
     */
    async getAdviserStatus(adviserId) {
        const row = this.locatorHelper.getContainingText('tr', adviserId);
        const statusCell = row.locator('td').nth(7); // Assuming status is 8th column
        return await this.actionHelper.getTrimmedText(statusCell);
    }
    /**
     * Upload profile picture
     */
    async uploadProfilePicture(filePath) {
        await this.actionHelper.uploadFile(this.locators.profilePictureUpload.toString(), filePath);
    }
    /**
     * Import advisers
     */
    async importAdvisers() {
        await this.actionHelper.clickLocator(this.locators.importButton);
    }
    /**
     * Export advisers
     */
    async exportAdvisers() {
        await this.actionHelper.clickLocator(this.locators.exportButton);
    }
    /**
     * Refresh advisers list
     */
    async refreshAdvisers() {
        await this.actionHelper.clickLocator(this.locators.refreshButton);
        await this.waitForLoadingToComplete();
    }
    /**
     * Get total advisers count from statistics
     */
    async getTotalAdvisersCount() {
        const card = this.locatorHelper.getContainingText('.card', 'Total Advisers');
        const countElement = card.locator('.count, .number').first();
        return await this.actionHelper.getTrimmedText(countElement);
    }
    /**
     * Get active advisers count from statistics
     */
    async getActiveAdvisersCount() {
        const card = this.locatorHelper.getContainingText('.card', 'Active Advisers');
        const countElement = card.locator('.count, .number').first();
        return await this.actionHelper.getTrimmedText(countElement);
    }
}
exports.AdvisersPage = AdvisersPage;
//# sourceMappingURL=AdvisersPage.js.map