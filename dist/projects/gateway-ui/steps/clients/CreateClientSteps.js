"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddClientSteps = void 0;
//projects/gateway-ui/steps/clients/CreateClientSteps.ts
const test_1 = require("@playwright/test");
const BasePage_1 = require("@framework/core/BasePage");
const Forms_1 = require("@steps/components/Forms");
const CreateClientPage_1 = require("@pages/clients/CreateClientPage");
const AlertComponent_1 = require("@framework/components/AlertComponent");
const DataStore_1 = require("@framework/utils/DataStore");
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
class AddClientSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.forms = new Forms_1.FormsService(page);
        this.clientPage = new CreateClientPage_1.CreateClientPage(page, config);
        this.alert = new AlertComponent_1.AlertComponent(page, config);
    }
    /**
     * Verify Client page is loaded with URL and title checks
     */
    async verifyClientPage() {
        await this.wait.waitForUrlToMatch('**/clientfiles/createclient');
        await (0, test_1.expect)(this.page).toHaveTitle('Gateway | Create Client Record(s)');
    }
    /**
     * Main method: Navigate to Add Corporate Client page and verify
     */
    async executeNavigateToAddClientPage() {
        await this.verifyClientPage();
    }
    /**
     * Main method: Navigate to Add Corporate Client page including side nav click
     * @param sideNav - SideNavService instance for navigation
     */
    async executeNavigateToAddClient(sideNav) {
        await sideNav.clickSideMenuItem('Clients', 'Add Client');
        await this.executeNavigateToAddClientPage();
    }
    /**
     * Create a complete individual client - fills form and submits
     * @param clientData - Optional client data, will use smart defaults if not provided
     * @returns Object containing the client data used
     */
    async createClient(clientData) {
        // Fill the form with smart data generation
        const usedClientData = await this.forms.fillIndividualClientForm(clientData);
        // Submit the form
        await this.forms.submitIndividualClientForm();
        // Handle success alert using shared component
        await this.alert.handleClientCreationSuccessAlert();
        // Store the client data in DataStore for later verification
        DataStore_1.dataStore.setValue('clientData.complete', usedClientData);
        return usedClientData;
    }
    /**
     * Assert that the success alert is displayed after client creation
     * @deprecated Use alert.assertClientCreationSuccessAlert() instead
     */
    async assertClientCreationSuccessAlert() {
        await this.alert.assertClientCreationSuccessAlert();
    }
    /**
     * Click the OK button on the success alert
     * @deprecated Use alert.clickSuccessAlertOkButton() instead
     */
    async clickSuccessAlertOkButton() {
        await this.alert.clickSuccessAlertOkButton();
    }
    /**
     * Main method: Complete individual client creation workflow with validation
     */
    async executeCompleteClientCreation() {
        const result = await this.createClient();
        // Validate that client was created successfully
        if (!result.forename || !result.surname) {
            throw new Error('Individual client creation failed - missing required name fields');
        }
    }
}
exports.AddClientSteps = AddClientSteps;
//# sourceMappingURL=CreateClientSteps.js.map