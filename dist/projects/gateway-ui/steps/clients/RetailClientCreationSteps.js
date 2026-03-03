"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetailClientCreationSteps = void 0;
// projects/gateway-ui/steps/clients/RetailClientCreationSteps.ts
const test_1 = require("@playwright/test");
const BasePage_1 = require("@framework/core/BasePage");
const ClientCreationPageLocators_1 = require("@pages/clients/ClientCreationPageLocators");
const AlertService_1 = require("@steps/components/AlertService");
const DatePicker_1 = require("@steps/components/DatePicker");
const FormsLocators_1 = require("@pages/componentsLocator/FormsLocators");
const TestDataGenerator_1 = require("@framework/utils/TestDataGenerator");
const DataStore_1 = require("@framework/utils/DataStore");
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
        DataStore_1.dataStore.setValue('selected.gatewayClient', selectedGatewayClient);
        return selectedGatewayClient;
    }
    async completeRetailClientForm(data = {}) {
        const names = TestDataGenerator_1.TestDataGenerator.personName(data.forename, data.surname);
        // Select2 / fallback dropdowns
        const adviserLabel = await this.selectAdviser();
        const title = await this.selectTitle();
        const sourceOfEnquiry = await this.selectSourceOfEnquiry();
        // Required fields
        await this.fillForename(names.forename);
        await this.fillSurname(names.surname);
        // Optional fields (each has its own method now)
        await this.fillOptionalContactFields(data);
        // Standard dropdowns (non-select2)
        const gender = await this.selectGender(data.gender);
        const maritalStatus = await this.selectMaritalStatus(data.maritalStatus);
        const activePlan = await this.selectActivePlan(data.activePlan);
        // DOB
        const dob = data.dob ?? this.datePicker.generateRandomDOB();
        await this.selectDOB(dob);
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