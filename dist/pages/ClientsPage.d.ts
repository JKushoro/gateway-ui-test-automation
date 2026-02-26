import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * ClientsPage - Page Object Model for Clients functionality
 * Contains all locators and interactions for managing clients
 */
export declare class ClientsPage extends BasePage {
    constructor(page: Page);
    get locators(): {
        pageTitle: import("playwright-core").Locator;
        breadcrumb: import("playwright-core").Locator;
        searchInput: import("playwright-core").Locator;
        filterDropdown: import("playwright-core").Locator;
        statusFilter: import("playwright-core").Locator;
        advisorFilter: import("playwright-core").Locator;
        regionFilter: import("playwright-core").Locator;
        riskProfileFilter: import("playwright-core").Locator;
        clientTypeFilter: import("playwright-core").Locator;
        createClientButton: import("playwright-core").Locator;
        importButton: import("playwright-core").Locator;
        exportButton: import("playwright-core").Locator;
        refreshButton: import("playwright-core").Locator;
        listViewButton: import("playwright-core").Locator;
        cardViewButton: import("playwright-core").Locator;
        clientsTable: import("playwright-core").Locator;
        tableHeaders: import("playwright-core").Locator;
        tableRows: import("playwright-core").Locator;
        clientIdColumn: import("playwright-core").Locator;
        nameColumn: import("playwright-core").Locator;
        emailColumn: import("playwright-core").Locator;
        phoneColumn: import("playwright-core").Locator;
        advisorColumn: import("playwright-core").Locator;
        statusColumn: import("playwright-core").Locator;
        riskProfileColumn: import("playwright-core").Locator;
        portfolioValueColumn: import("playwright-core").Locator;
        lastContactColumn: import("playwright-core").Locator;
        actionsColumn: import("playwright-core").Locator;
        clientsGrid: import("playwright-core").Locator;
        clientCards: import("playwright-core").Locator;
        viewButton: import("playwright-core").Locator;
        editButton: import("playwright-core").Locator;
        contactButton: import("playwright-core").Locator;
        portfolioButton: import("playwright-core").Locator;
        documentsButton: import("playwright-core").Locator;
        notesButton: import("playwright-core").Locator;
        deleteButton: import("playwright-core").Locator;
        activeStatus: import("playwright-core").Locator;
        inactiveStatus: import("playwright-core").Locator;
        prospectStatus: import("playwright-core").Locator;
        formerClientStatus: import("playwright-core").Locator;
        conservativeRisk: import("playwright-core").Locator;
        moderateRisk: import("playwright-core").Locator;
        aggressiveRisk: import("playwright-core").Locator;
        balancedRisk: import("playwright-core").Locator;
        individualType: import("playwright-core").Locator;
        corporateType: import("playwright-core").Locator;
        trustType: import("playwright-core").Locator;
        pensionType: import("playwright-core").Locator;
        clientModal: import("playwright-core").Locator;
        modalTitle: import("playwright-core").Locator;
        titleSelect: import("playwright-core").Locator;
        firstNameInput: import("playwright-core").Locator;
        lastNameInput: import("playwright-core").Locator;
        dateOfBirthInput: import("playwright-core").Locator;
        genderSelect: import("playwright-core").Locator;
        nationalitySelect: import("playwright-core").Locator;
        emailInput: import("playwright-core").Locator;
        phoneInput: import("playwright-core").Locator;
        mobileInput: import("playwright-core").Locator;
        addressInput: import("playwright-core").Locator;
        cityInput: import("playwright-core").Locator;
        postcodeInput: import("playwright-core").Locator;
        countrySelect: import("playwright-core").Locator;
        occupationInput: import("playwright-core").Locator;
        employerInput: import("playwright-core").Locator;
        annualIncomeInput: import("playwright-core").Locator;
        clientTypeSelect: import("playwright-core").Locator;
        statusSelect: import("playwright-core").Locator;
        advisorSelect: import("playwright-core").Locator;
        riskProfileSelect: import("playwright-core").Locator;
        investmentObjectivesTextarea: import("playwright-core").Locator;
        notesTextarea: import("playwright-core").Locator;
        emergencyContactSection: import("playwright-core").Locator;
        emergencyNameInput: import("playwright-core").Locator;
        emergencyPhoneInput: import("playwright-core").Locator;
        emergencyRelationshipInput: import("playwright-core").Locator;
        documentsSection: import("playwright-core").Locator;
        uploadDocumentButton: import("playwright-core").Locator;
        documentsList: import("playwright-core").Locator;
        portfolioSection: import("playwright-core").Locator;
        portfolioSummary: import("playwright-core").Locator;
        totalValueDisplay: import("playwright-core").Locator;
        assetAllocation: import("playwright-core").Locator;
        contactHistorySection: import("playwright-core").Locator;
        addContactButton: import("playwright-core").Locator;
        contactTypeSelect: import("playwright-core").Locator;
        contactDateInput: import("playwright-core").Locator;
        contactNotesTextarea: import("playwright-core").Locator;
        kycSection: import("playwright-core").Locator;
        kycStatusSelect: import("playwright-core").Locator;
        amlStatusSelect: import("playwright-core").Locator;
        lastKycDateInput: import("playwright-core").Locator;
        nextReviewDateInput: import("playwright-core").Locator;
        saveButton: import("playwright-core").Locator;
        cancelButton: import("playwright-core").Locator;
        closeModalButton: import("playwright-core").Locator;
        pagination: import("playwright-core").Locator;
        previousPageButton: import("playwright-core").Locator;
        nextPageButton: import("playwright-core").Locator;
        pageInfo: import("playwright-core").Locator;
        totalClientsCard: import("playwright-core").Locator;
        activeClientsCard: import("playwright-core").Locator;
        newClientsCard: import("playwright-core").Locator;
        totalAumCard: import("playwright-core").Locator;
    };
    /**
     * Navigate to Clients page
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
     * Search for clients
     */
    searchClients(searchTerm: string): Promise<void>;
    /**
     * Filter clients by status
     */
    filterByStatus(status: string): Promise<void>;
    /**
     * Filter clients by advisor
     */
    filterByAdvisor(advisor: string): Promise<void>;
    /**
     * Filter clients by risk profile
     */
    filterByRiskProfile(riskProfile: string): Promise<void>;
    /**
     * Switch to list view
     */
    switchToListView(): Promise<void>;
    /**
     * Switch to card view
     */
    switchToCardView(): Promise<void>;
    /**
     * Create new client
     */
    clickCreateClient(): Promise<void>;
    /**
     * Fill client personal information
     */
    fillPersonalInformation(personalData: {
        title: string;
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        gender: string;
        nationality: string;
    }): Promise<void>;
    /**
     * Fill client contact information
     */
    fillContactInformation(contactData: {
        email: string;
        phone: string;
        mobile?: string;
        address: string;
        city: string;
        postcode: string;
        country: string;
    }): Promise<void>;
    /**
     * Fill client professional information
     */
    fillProfessionalInformation(professionalData: {
        occupation: string;
        employer: string;
        annualIncome: string;
    }): Promise<void>;
    /**
     * Fill client details
     */
    fillClientDetails(clientData: {
        clientType: string;
        status: string;
        advisor: string;
        riskProfile: string;
        investmentObjectives?: string;
        notes?: string;
    }): Promise<void>;
    /**
     * Fill emergency contact information
     */
    fillEmergencyContact(emergencyData: {
        name: string;
        phone: string;
        relationship: string;
    }): Promise<void>;
    /**
     * Save client
     */
    saveClient(): Promise<void>;
    /**
     * Cancel client creation/editing
     */
    cancelClient(): Promise<void>;
    /**
     * View client details
     */
    viewClient(clientId: string): Promise<void>;
    /**
     * Edit client
     */
    editClient(clientId: string): Promise<void>;
    /**
     * Contact client
     */
    contactClient(clientId: string): Promise<void>;
    /**
     * View client portfolio
     */
    viewClientPortfolio(clientId: string): Promise<void>;
    /**
     * View client documents
     */
    viewClientDocuments(clientId: string): Promise<void>;
    /**
     * Delete client
     */
    deleteClient(clientId: string): Promise<void>;
    /**
     * Add contact record
     */
    addContactRecord(contactData: {
        type: string;
        date: string;
        notes: string;
    }): Promise<void>;
    /**
     * Upload document
     */
    uploadDocument(filePath: string): Promise<void>;
    /**
     * Get client count
     */
    getClientCount(): Promise<number>;
    /**
     * Get client status
     */
    getClientStatus(clientId: string): Promise<string>;
    /**
     * Import clients
     */
    importClients(): Promise<void>;
    /**
     * Export clients
     */
    exportClients(): Promise<void>;
    /**
     * Refresh clients list
     */
    refreshClients(): Promise<void>;
    /**
     * Get total clients count from statistics
     */
    getTotalClientsCount(): Promise<string>;
    /**
     * Get total AUM from statistics
     */
    getTotalAUM(): Promise<string>;
}
//# sourceMappingURL=ClientsPage.d.ts.map