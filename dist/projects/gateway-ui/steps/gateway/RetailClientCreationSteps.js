"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetailClientCreationSteps = void 0;
// projects/gateway-ui/steps/gateway/RetailClientCreationSteps.ts
const test_1 = require("@playwright/test");
const BasePage_1 = require("@framework/core/BasePage");
const ClientCreationPageLocators_1 = require("@pages/gatewayElementLocators/ClientCreationPageLocators");
const AlertService_1 = require("@steps/components/AlertService");
const DatePicker_1 = require("@steps/components/DatePicker");
const FormsLocators_1 = require("@pages/componentsLocator/FormsLocators");
const TestDataGenerator_1 = require("@framework/utils/TestDataGenerator");
const DataStore_1 = require("@framework/utils/DataStore");
const clientData_1 = require("@framework/data/clientData");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class RetailClientCreationSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.clientPage = new ClientCreationPageLocators_1.ClientCreationPageLocators(page, config);
        this.alert = new AlertService_1.AlertService(page, config);
        this.datePicker = new DatePicker_1.DatePickerService(page);
        this.formsComponent = new FormsLocators_1.FormsComponent(page);
    }
    /* -------------------- Verification -------------------- */
    async verifyClientPage() {
        await this.wait.waitForUrlToMatch('**/clientfiles/createclient');
        await (0, test_1.expect)(this.page).toHaveTitle('Gateway | Create Client Record(s)');
    }
    async executeNavigateToAddClient(sideNav) {
        await sideNav.clickSideMenuItem('Clients', 'Add Client');
        await this.verifyClientPage();
    }
    /* -------------------- Main Flow -------------------- */
    async createClient(clientData = {}) {
        const selectedGatewayClient = await this.completeRetailClientForm(clientData);
        await this.action.clickButtonByText('Save Details', false);
        await this.alert.handleClientCreationSuccessAlert('OK');
        // Wait for navigation to client details page and extract clientId
        await this.wait.waitForUrlToMatch('**/clientfiles/details/**');
        const url = this.page.url();
        this.logger.info?.('Current URL after client creation:', url);
        const clientIdMatch = url.match(/\/clientfiles\/details\/([^/?]+)/);
        if (clientIdMatch) {
            selectedGatewayClient.clientId = clientIdMatch[1];
            this.logger.info?.('Extracted new clientId from URL:', selectedGatewayClient.clientId);
            // Save clientId to JSON file
            const clientJsonPath = path_1.default.resolve('playwright/currentClient1.json');
            try {
                fs_1.default.writeFileSync(clientJsonPath, JSON.stringify({ clientId: selectedGatewayClient.clientId }, null, 2));
                this.logger.info?.('Saved clientId to JSON file:', clientJsonPath);
            }
            catch (error) {
                console.warn('Failed to save clientId to JSON file:', error);
            }
        }
        else {
            console.warn('Could not extract clientId from URL:', url);
        }
        // Store client data in the expected location for search operations
        DataStore_1.dataStore.setValue('gateway.clientData.complete', selectedGatewayClient);
        DataStore_1.dataStore.setValue('selected.gatewayClient', selectedGatewayClient);
        return selectedGatewayClient;
    }
    async completeRetailClientForm(data = {}, useClient1Defaults = true) {
        const names = useClient1Defaults
            ? TestDataGenerator_1.TestDataGenerator.personName((data.forename ?? clientData_1.client1.forename).trim(), (data.surname ?? clientData_1.client1.surname).trim())
            : TestDataGenerator_1.TestDataGenerator.personName(data.forename, data.surname);
        const adviserLabel = await this.selectAdviser();
        const title = await this.selectTitle();
        const sourceOfEnquiry = await this.selectSourceOfEnquiry();
        await this.fillForename(names.forename);
        await this.fillSurname(names.surname);
        await this.fillOptionalContactFields(data);
        const gender = await this.selectGender(data.gender);
        const maritalStatus = await this.selectMaritalStatus(data.maritalStatus);
        const activePlan = await this.selectActivePlan(data.activePlan);
        const dob = data.dob ?? this.datePicker.generateRandomDOB();
        await this.selectDOB(dob);
        // Load clientId from JSON file if it exists
        let clientId;
        const clientJsonPath = path_1.default.resolve('playwright/currentClient1.json');
        if (fs_1.default.existsSync(clientJsonPath)) {
            try {
                const clientData = JSON.parse(fs_1.default.readFileSync(clientJsonPath, 'utf-8'));
                clientId = clientData.clientId;
                this.logger.info?.('Loaded clientId from JSON:', clientId);
            }
            catch (error) {
                console.warn('Failed to load clientId from JSON file:', error);
            }
        }
        else {
            this.logger.info?.('No existing clientId JSON file found');
        }
        return {
            adviserLabel,
            title,
            forename: names.forename,
            surname: names.surname,
            knownAs: data.knownAs,
            gender,
            dob,
            maritalStatus,
            activePlan,
            sourceOfEnquiry,
            specificSource: data.specificSource,
            niNumber: data.niNumber,
            clientId,
        };
    }
    /* -------------------- Dropdown Selections (Select2 / Fallback) -------------------- */
    async selectAdviser(value) {
        return this.action.selectSelect2AndVerify('Adviser', this.clientPage.adviserTrigger, this.clientPage.s2Options, this.clientPage.adviserRendered, value);
    }
    async selectTitle(value) {
        return this.action.selectSelect2AndVerify('Title', this.clientPage.titleTrigger, this.clientPage.s2Options, this.clientPage.titleRendered, value);
    }
    async selectSourceOfEnquiry(value) {
        return this.action.selectSelect2AndVerify('Source of Enquiry', this.clientPage.sourceTrigger, this.clientPage.s2Options, this.clientPage.sourceRendered, value);
    }
    /* -------------------- Standard Dropdowns -------------------- */
    async selectGender(gender) {
        return this.action.selectDropdownByLabel('Gender', gender).catch(() => undefined);
    }
    async selectMaritalStatus(maritalStatus) {
        return this.action
            .selectDropdownByLabel('Marital Status', maritalStatus)
            .catch(() => undefined);
    }
    async selectActivePlan(activePlan) {
        return this.action.selectDropdownByLabel('Active Plan', activePlan).catch(() => undefined);
    }
    /* -------------------- Required Input Fields -------------------- */
    async fillForename(forename) {
        await this.action.fillInputByLabel('Forename', forename);
    }
    async fillSurname(surname) {
        await this.action.fillInputByLabel('Surname', surname);
    }
    /* -------------------- Optional Input Fields (Individual Methods) -------------------- */
    async fillKnownAs(knownAs) {
        if (!knownAs)
            return;
        await this.action.fillInputByLabel('Known As', knownAs);
    }
    async fillNINumber(niNumber) {
        if (!niNumber)
            return;
        await this.action.fillInputByLabel('NI Number', niNumber);
    }
    async fillSpecificSource(specificSource) {
        if (!specificSource)
            return;
        await this.action.fillInputByLabel('Specific Source', specificSource);
    }
    async fillEmailAddress(email) {
        if (!email)
            return;
        await this.action.fillInputByLabel('Email Address', email);
    }
    async fillHomePhone(homePhone) {
        if (!homePhone)
            return;
        await this.action.fillInputByLabel('Home Phone', homePhone);
    }
    async fillMobilePhone(mobilePhone) {
        if (!mobilePhone)
            return;
        await this.action.fillInputByLabel('Mobile Phone', mobilePhone);
    }
    /**
     * Thin orchestrator to keep the main flow clean,
     * while still giving each field its own method (easy reuse + debugging).
     */
    async fillOptionalContactFields(data) {
        await this.fillKnownAs(data.knownAs);
        await this.fillNINumber(data.niNumber);
        await this.fillSpecificSource(data.specificSource);
        await this.fillEmailAddress(data.email);
        await this.fillHomePhone(data.homePhone);
        await this.fillMobilePhone(data.mobilePhone);
    }
    /* -------------------- Date Handling -------------------- */
    async selectDOB(dob) {
        await this.datePicker.selectDOB(() => this.formsComponent.clientDOB, dob);
    }
}
exports.RetailClientCreationSteps = RetailClientCreationSteps;
//# sourceMappingURL=RetailClientCreationSteps.js.map