"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCorporateClientSteps = void 0;
//projects/gateway-ui/steps/clients/CreateCorporateClientSteps.ts
const test_1 = require("@playwright/test");
const CreateCorporateClientPage_1 = require("@pages/clients/CreateCorporateClientPage");
const BasePage_1 = require("@framework/core/BasePage");
const Forms_1 = require("@steps/components/Forms");
const PostcodeLookup_1 = require("@steps/components/PostcodeLookup");
const AlertComponent_1 = require("@framework/components/AlertComponent");
const DataStore_1 = require("@framework/utils/DataStore");
/**
 * AddCorporateClientSteps - Contains corporate client actions
 * Now extends BaseSteps to eliminate helper duplication and follow OOP principles
 */
class AddCorporateClientSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.clientPage = new CreateCorporateClientPage_1.CreateCorporateClientPage(page, config);
        this.forms = new Forms_1.FormsService(page);
        this.postcode = new PostcodeLookup_1.PostcodeLookupService(page);
        this.alert = new AlertComponent_1.AlertComponent(page, config);
    }
    /**
     * Verify CorporateClient page is loaded with URL and title checks
     */
    async verifyCorporateClientPage() {
        await this.wait.waitForUrlToMatch('**/clientfiles/createcorporateclient');
        await (0, test_1.expect)(this.page).toHaveTitle('Gateway | Create Corporate Client');
    }
    /**
     * Submit the form using the enhanced action helper
     */
    async submitForm() {
        await this.action.clickLocator(this.clientPage.createButton);
    }
    /**
     * Create a complete corporate client - fills form, adds address, and submits
     * @param formData - Optional form data, will use smart defaults if not provided
     * @param postcode - Optional postcode, will use random UK postcode if not provided
     * @returns Object containing the form data used and selected address
     */
    async createCorporateClient(formData, postcode) {
        // Fill the form with smart data generation
        const usedFormData = await this.forms.fillMinimalForm(formData);
        // Perform postcode lookup and select address
        const selectedAddress = await this.postcode.performPostcodeLookup(postcode);
        // Store the selected address in DataStore for later verification
        DataStore_1.dataStore.setValue('formData.selectedAddress', selectedAddress);
        // Submit the form
        await this.submitForm();
        // Handle success alert using shared component (legacy SweetAlert type)
        await this.alert.handleClientCreationSuccessAlert('Client Created', 'The client record was created successfully', 'legacySweetAlert');
        return {
            formData: usedFormData,
            selectedAddress,
        };
    }
    /**
     * Assert that the success alert is displayed after client creation
     * @deprecated Use alert.assertClientCreationSuccessAlert() instead
     */
    async assertClientCreationSuccessAlert() {
        await this.alert.assertClientCreationSuccessAlert('Client Created', 'The client record was created successfully', 'legacySweetAlert');
    }
    /**
     * Click the OK button on the success alert
     * @deprecated Use alert.clickSuccessAlertOkButton() instead
     */
    async clickSuccessAlertOkButton() {
        await this.alert.clickSuccessAlertOkButton('legacySweetAlert');
    }
    /**
     * Main method: Navigate to Add Corporate Client page and verify
     */
    async executeNavigateToAddCorporateClientPage() {
        await this.verifyCorporateClientPage();
    }
    /**
     * Main method: Complete corporate client creation workflow with validation
     */
    async executeCompleteClientCreation() {
        const result = await this.createCorporateClient();
        // Validate that company name was created successfully
        if (!result.formData.companyName) {
            throw new Error('Corporate client creation failed - no company name generated');
        }
    }
    /**
     * Main method: Navigate to Add Corporate Client page including side nav click
     * @param sideNav - SideNavService instance for navigation
     */
    async executeNavigateToAddCorporateClient(sideNav) {
        await sideNav.clickSideMenuItem('Clients', 'Add Corporate Client');
        await this.executeNavigateToAddCorporateClientPage();
    }
}
exports.AddCorporateClientSteps = AddCorporateClientSteps;
//# sourceMappingURL=CreateCorporateClientSteps.js.map