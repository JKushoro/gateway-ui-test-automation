"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsPage = void 0;
const BasePage_1 = require("../core/BasePage");
/**
 * ClientsPage - Page Object Model for Clients functionality
 * Contains all locators and interactions for managing clients
 */
class ClientsPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    // Locators
    get locators() {
        return {
            // Page header
            pageTitle: this.locatorHelper.getByText('Clients'),
            breadcrumb: this.locatorHelper.getByTestId('breadcrumb') ||
                this.locatorHelper.getLocator('.breadcrumb'),
            // Search and filters
            searchInput: this.locatorHelper.getInputByPlaceholder('Search clients...') ||
                this.locatorHelper.getByTestId('search-input'),
            filterDropdown: this.locatorHelper.getByTestId('filter-dropdown') ||
                this.locatorHelper.getLocator('.filter-dropdown'),
            statusFilter: this.locatorHelper.getByTestId('status-filter'),
            advisorFilter: this.locatorHelper.getByTestId('advisor-filter'),
            regionFilter: this.locatorHelper.getByTestId('region-filter'),
            riskProfileFilter: this.locatorHelper.getByTestId('risk-profile-filter'),
            clientTypeFilter: this.locatorHelper.getByTestId('client-type-filter'),
            // Action buttons
            createClientButton: this.locatorHelper.getButtonByText('Create Client') ||
                this.locatorHelper.getByTestId('create-client-btn'),
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
            clientsTable: this.locatorHelper.getByTestId('clients-table') ||
                this.locatorHelper.getLocator('table'),
            tableHeaders: this.locatorHelper.getLocator('thead th'),
            tableRows: this.locatorHelper.getLocator('tbody tr'),
            // Table columns
            clientIdColumn: this.locatorHelper.getByText('Client ID'),
            nameColumn: this.locatorHelper.getByText('Name'),
            emailColumn: this.locatorHelper.getByText('Email'),
            phoneColumn: this.locatorHelper.getByText('Phone'),
            advisorColumn: this.locatorHelper.getByText('Advisor'),
            statusColumn: this.locatorHelper.getByText('Status'),
            riskProfileColumn: this.locatorHelper.getByText('Risk Profile'),
            portfolioValueColumn: this.locatorHelper.getByText('Portfolio Value'),
            lastContactColumn: this.locatorHelper.getByText('Last Contact'),
            actionsColumn: this.locatorHelper.getByText('Actions'),
            // Card view elements
            clientsGrid: this.locatorHelper.getByTestId('clients-grid') ||
                this.locatorHelper.getLocator('.clients-grid'),
            clientCards: this.locatorHelper.getLocator('.client-card'),
            // Row/Card actions
            viewButton: this.locatorHelper.getButtonByText('View'),
            editButton: this.locatorHelper.getButtonByText('Edit'),
            contactButton: this.locatorHelper.getButtonByText('Contact'),
            portfolioButton: this.locatorHelper.getButtonByText('Portfolio'),
            documentsButton: this.locatorHelper.getButtonByText('Documents'),
            notesButton: this.locatorHelper.getButtonByText('Notes'),
            deleteButton: this.locatorHelper.getButtonByText('Delete'),
            // Status indicators
            activeStatus: this.locatorHelper.getByText('Active'),
            inactiveStatus: this.locatorHelper.getByText('Inactive'),
            prospectStatus: this.locatorHelper.getByText('Prospect'),
            formerClientStatus: this.locatorHelper.getByText('Former Client'),
            // Risk profile indicators
            conservativeRisk: this.locatorHelper.getByText('Conservative'),
            moderateRisk: this.locatorHelper.getByText('Moderate'),
            aggressiveRisk: this.locatorHelper.getByText('Aggressive'),
            balancedRisk: this.locatorHelper.getByText('Balanced'),
            // Client types
            individualType: this.locatorHelper.getByText('Individual'),
            corporateType: this.locatorHelper.getByText('Corporate'),
            trustType: this.locatorHelper.getByText('Trust'),
            pensionType: this.locatorHelper.getByText('Pension'),
            // Modal/Form elements
            clientModal: this.locatorHelper.getByTestId('client-modal') ||
                this.locatorHelper.getLocator('.modal'),
            modalTitle: this.locatorHelper.getByTestId('modal-title'),
            // Personal information
            titleSelect: this.locatorHelper.getInputByLabel('Title'),
            firstNameInput: this.locatorHelper.getInputByLabel('First Name'),
            lastNameInput: this.locatorHelper.getInputByLabel('Last Name'),
            dateOfBirthInput: this.locatorHelper.getInputByLabel('Date of Birth'),
            genderSelect: this.locatorHelper.getInputByLabel('Gender'),
            nationalitySelect: this.locatorHelper.getInputByLabel('Nationality'),
            // Contact information
            emailInput: this.locatorHelper.getInputByLabel('Email'),
            phoneInput: this.locatorHelper.getInputByLabel('Phone'),
            mobileInput: this.locatorHelper.getInputByLabel('Mobile'),
            addressInput: this.locatorHelper.getInputByLabel('Address'),
            cityInput: this.locatorHelper.getInputByLabel('City'),
            postcodeInput: this.locatorHelper.getInputByLabel('Postcode'),
            countrySelect: this.locatorHelper.getInputByLabel('Country'),
            // Professional information
            occupationInput: this.locatorHelper.getInputByLabel('Occupation'),
            employerInput: this.locatorHelper.getInputByLabel('Employer'),
            annualIncomeInput: this.locatorHelper.getInputByLabel('Annual Income'),
            // Client details
            clientTypeSelect: this.locatorHelper.getInputByLabel('Client Type'),
            statusSelect: this.locatorHelper.getInputByLabel('Status'),
            advisorSelect: this.locatorHelper.getInputByLabel('Advisor'),
            riskProfileSelect: this.locatorHelper.getInputByLabel('Risk Profile'),
            investmentObjectivesTextarea: this.locatorHelper.getInputByLabel('Investment Objectives'),
            notesTextarea: this.locatorHelper.getInputByLabel('Notes'),
            // Emergency contact
            emergencyContactSection: this.locatorHelper.getByTestId('emergency-contact'),
            emergencyNameInput: this.locatorHelper.getInputByLabel('Emergency Contact Name'),
            emergencyPhoneInput: this.locatorHelper.getInputByLabel('Emergency Contact Phone'),
            emergencyRelationshipInput: this.locatorHelper.getInputByLabel('Relationship'),
            // Documents section
            documentsSection: this.locatorHelper.getByTestId('documents-section'),
            uploadDocumentButton: this.locatorHelper.getButtonByText('Upload Document'),
            documentsList: this.locatorHelper.getByTestId('documents-list'),
            // Portfolio section
            portfolioSection: this.locatorHelper.getByTestId('portfolio-section'),
            portfolioSummary: this.locatorHelper.getByTestId('portfolio-summary'),
            totalValueDisplay: this.locatorHelper.getByTestId('total-value'),
            assetAllocation: this.locatorHelper.getByTestId('asset-allocation'),
            // Contact history
            contactHistorySection: this.locatorHelper.getByTestId('contact-history'),
            addContactButton: this.locatorHelper.getButtonByText('Add Contact'),
            contactTypeSelect: this.locatorHelper.getInputByLabel('Contact Type'),
            contactDateInput: this.locatorHelper.getInputByLabel('Contact Date'),
            contactNotesTextarea: this.locatorHelper.getInputByLabel('Contact Notes'),
            // KYC/AML section
            kycSection: this.locatorHelper.getByTestId('kyc-section'),
            kycStatusSelect: this.locatorHelper.getInputByLabel('KYC Status'),
            amlStatusSelect: this.locatorHelper.getInputByLabel('AML Status'),
            lastKycDateInput: this.locatorHelper.getInputByLabel('Last KYC Date'),
            nextReviewDateInput: this.locatorHelper.getInputByLabel('Next Review Date'),
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
            totalClientsCard: this.locatorHelper.getByText('Total Clients'),
            activeClientsCard: this.locatorHelper.getByText('Active Clients'),
            newClientsCard: this.locatorHelper.getByText('New This Month'),
            totalAumCard: this.locatorHelper.getByText('Total AUM'),
        };
    }
    /**
     * Navigate to Clients page
     */
    async navigate() {
        await this.navigateToPath('/clients');
    }
    /**
     * Wait for page to load
     */
    async waitForPageLoad() {
        await this.waitHelper.waitForElement(this.locators.pageTitle);
        // Wait for either table or grid view to load
        try {
            await this.waitHelper.waitForElement(this.locators.clientsTable, 2000);
        }
        catch {
            await this.waitHelper.waitForElement(this.locators.clientsGrid);
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
     * Search for clients
     */
    async searchClients(searchTerm) {
        await this.actionHelper.fillInputByPlaceholder('Search clients...', searchTerm);
        await this.page.keyboard.press('Enter');
    }
    /**
     * Filter clients by status
     */
    async filterByStatus(status) {
        await this.actionHelper.clickLocator(this.locators.statusFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.statusFilter.toString(), status);
    }
    /**
     * Filter clients by advisor
     */
    async filterByAdvisor(advisor) {
        await this.actionHelper.clickLocator(this.locators.advisorFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.advisorFilter.toString(), advisor);
    }
    /**
     * Filter clients by risk profile
     */
    async filterByRiskProfile(riskProfile) {
        await this.actionHelper.clickLocator(this.locators.riskProfileFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.riskProfileFilter.toString(), riskProfile);
    }
    /**
     * Switch to list view
     */
    async switchToListView() {
        await this.actionHelper.clickLocator(this.locators.listViewButton);
        await this.waitHelper.waitForElement(this.locators.clientsTable);
    }
    /**
     * Switch to card view
     */
    async switchToCardView() {
        await this.actionHelper.clickLocator(this.locators.cardViewButton);
        await this.waitHelper.waitForElement(this.locators.clientsGrid);
    }
    /**
     * Create new client
     */
    async clickCreateClient() {
        await this.actionHelper.clickLocator(this.locators.createClientButton);
        await this.waitHelper.waitForElement(this.locators.clientModal);
    }
    /**
     * Fill client personal information
     */
    async fillPersonalInformation(personalData) {
        await this.actionHelper.selectCustomDropdown(this.locators.titleSelect.toString(), personalData.title);
        await this.actionHelper.fillInputByLabel('First Name', personalData.firstName);
        await this.actionHelper.fillInputByLabel('Last Name', personalData.lastName);
        await this.actionHelper.fillInputByLabel('Date of Birth', personalData.dateOfBirth);
        await this.actionHelper.selectCustomDropdown(this.locators.genderSelect.toString(), personalData.gender);
        await this.actionHelper.selectCustomDropdown(this.locators.nationalitySelect.toString(), personalData.nationality);
    }
    /**
     * Fill client contact information
     */
    async fillContactInformation(contactData) {
        await this.actionHelper.fillInputByLabel('Email', contactData.email);
        await this.actionHelper.fillInputByLabel('Phone', contactData.phone);
        if (contactData.mobile) {
            await this.actionHelper.fillInputByLabel('Mobile', contactData.mobile);
        }
        await this.actionHelper.fillInputByLabel('Address', contactData.address);
        await this.actionHelper.fillInputByLabel('City', contactData.city);
        await this.actionHelper.fillInputByLabel('Postcode', contactData.postcode);
        await this.actionHelper.selectCustomDropdown(this.locators.countrySelect.toString(), contactData.country);
    }
    /**
     * Fill client professional information
     */
    async fillProfessionalInformation(professionalData) {
        await this.actionHelper.fillInputByLabel('Occupation', professionalData.occupation);
        await this.actionHelper.fillInputByLabel('Employer', professionalData.employer);
        await this.actionHelper.fillInputByLabel('Annual Income', professionalData.annualIncome);
    }
    /**
     * Fill client details
     */
    async fillClientDetails(clientData) {
        await this.actionHelper.selectCustomDropdown(this.locators.clientTypeSelect.toString(), clientData.clientType);
        await this.actionHelper.selectCustomDropdown(this.locators.statusSelect.toString(), clientData.status);
        await this.actionHelper.selectCustomDropdown(this.locators.advisorSelect.toString(), clientData.advisor);
        await this.actionHelper.selectCustomDropdown(this.locators.riskProfileSelect.toString(), clientData.riskProfile);
        if (clientData.investmentObjectives) {
            await this.actionHelper.fillInputByLabel('Investment Objectives', clientData.investmentObjectives);
        }
        if (clientData.notes) {
            await this.actionHelper.fillInputByLabel('Notes', clientData.notes);
        }
    }
    /**
     * Fill emergency contact information
     */
    async fillEmergencyContact(emergencyData) {
        await this.actionHelper.fillInputByLabel('Emergency Contact Name', emergencyData.name);
        await this.actionHelper.fillInputByLabel('Emergency Contact Phone', emergencyData.phone);
        await this.actionHelper.fillInputByLabel('Relationship', emergencyData.relationship);
    }
    /**
     * Save client
     */
    async saveClient() {
        await this.actionHelper.clickLocator(this.locators.saveButton);
        await this.waitHelper.waitForElementToBeHidden(this.locators.clientModal);
    }
    /**
     * Cancel client creation/editing
     */
    async cancelClient() {
        await this.actionHelper.clickLocator(this.locators.cancelButton);
        await this.waitHelper.waitForElementToBeHidden(this.locators.clientModal);
    }
    /**
     * View client details
     */
    async viewClient(clientId) {
        const row = this.locatorHelper.getContainingText('tr', clientId);
        const viewButton = row.locator('button:has-text("View")');
        await this.actionHelper.clickLocator(viewButton);
    }
    /**
     * Edit client
     */
    async editClient(clientId) {
        const row = this.locatorHelper.getContainingText('tr', clientId);
        const editButton = row.locator('button:has-text("Edit")');
        await this.actionHelper.clickLocator(editButton);
        await this.waitHelper.waitForElement(this.locators.clientModal);
    }
    /**
     * Contact client
     */
    async contactClient(clientId) {
        const row = this.locatorHelper.getContainingText('tr', clientId);
        const contactButton = row.locator('button:has-text("Contact")');
        await this.actionHelper.clickLocator(contactButton);
    }
    /**
     * View client portfolio
     */
    async viewClientPortfolio(clientId) {
        const row = this.locatorHelper.getContainingText('tr', clientId);
        const portfolioButton = row.locator('button:has-text("Portfolio")');
        await this.actionHelper.clickLocator(portfolioButton);
    }
    /**
     * View client documents
     */
    async viewClientDocuments(clientId) {
        const row = this.locatorHelper.getContainingText('tr', clientId);
        const documentsButton = row.locator('button:has-text("Documents")');
        await this.actionHelper.clickLocator(documentsButton);
    }
    /**
     * Delete client
     */
    async deleteClient(clientId) {
        const row = this.locatorHelper.getContainingText('tr', clientId);
        const deleteButton = row.locator('button:has-text("Delete")');
        await this.actionHelper.clickLocator(deleteButton);
    }
    /**
     * Add contact record
     */
    async addContactRecord(contactData) {
        await this.actionHelper.clickLocator(this.locators.addContactButton);
        await this.actionHelper.selectCustomDropdown(this.locators.contactTypeSelect.toString(), contactData.type);
        await this.actionHelper.fillInputByLabel('Contact Date', contactData.date);
        await this.actionHelper.fillInputByLabel('Contact Notes', contactData.notes);
        await this.actionHelper.clickLocator(this.locators.saveButton);
    }
    /**
     * Upload document
     */
    async uploadDocument(filePath) {
        await this.actionHelper.clickLocator(this.locators.uploadDocumentButton);
        await this.actionHelper.uploadFile('input[type="file"]', filePath);
    }
    /**
     * Get client count
     */
    async getClientCount() {
        return await this.actionHelper.getElementCount('tbody tr');
    }
    /**
     * Get client status
     */
    async getClientStatus(clientId) {
        const row = this.locatorHelper.getContainingText('tr', clientId);
        const statusCell = row.locator('td').nth(5); // Assuming status is 6th column
        return await this.actionHelper.getTrimmedText(statusCell);
    }
    /**
     * Import clients
     */
    async importClients() {
        await this.actionHelper.clickLocator(this.locators.importButton);
    }
    /**
     * Export clients
     */
    async exportClients() {
        await this.actionHelper.clickLocator(this.locators.exportButton);
    }
    /**
     * Refresh clients list
     */
    async refreshClients() {
        await this.actionHelper.clickLocator(this.locators.refreshButton);
        await this.waitForLoadingToComplete();
    }
    /**
     * Get total clients count from statistics
     */
    async getTotalClientsCount() {
        const card = this.locatorHelper.getContainingText('.card', 'Total Clients');
        const countElement = card.locator('.count, .number').first();
        return await this.actionHelper.getTrimmedText(countElement);
    }
    /**
     * Get total AUM from statistics
     */
    async getTotalAUM() {
        const card = this.locatorHelper.getContainingText('.card', 'Total AUM');
        const valueElement = card.locator('.value, .amount').first();
        return await this.actionHelper.getTrimmedText(valueElement);
    }
}
exports.ClientsPage = ClientsPage;
//# sourceMappingURL=ClientsPage.js.map