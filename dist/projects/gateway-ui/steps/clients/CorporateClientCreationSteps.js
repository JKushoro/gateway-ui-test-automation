"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCorporateClientSteps = void 0;
// projects/gateway-ui/steps/clients/CorporateClientCreationSteps.ts
const test_1 = require("@playwright/test");
const BasePage_1 = require("@framework/core/BasePage");
const ClientCreationPageLocators_1 = require("@pages/clients/ClientCreationPageLocators");
const PostcodeLookup_1 = require("@steps/components/PostcodeLookup");
const AlertService_1 = require("@steps/components/AlertService");
const FormsLocators_1 = require("@pages/componentsLocator/FormsLocators");
const DatePicker_1 = require("@steps/components/DatePicker");
const TestDataGenerator_1 = require("@framework/utils/TestDataGenerator");
const DataStore_1 = require("@framework/utils/DataStore");
/**
 * AddCorporateClientSteps – all corporate-specific behaviour lives here.
 */
class AddCorporateClientSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.clientPage = new ClientCreationPageLocators_1.ClientCreationPageLocators(page, config);
        this.postcode = new PostcodeLookup_1.PostcodeLookupService(page);
        this.alert = new AlertService_1.AlertService(page, config);
        this.formsComponent = new FormsLocators_1.FormsComponent(page);
        this.datePicker = new DatePicker_1.DatePickerService(page);
    }
    /** Navigate via side nav */
    async executeNavigateToAddCorporateClient(sideNav) {
        await sideNav.clickSideMenuItem('Clients', 'Add Corporate Client');
        await this.verifyCorporateClientPage();
    }
    /** Verify page URL + title */
    async verifyCorporateClientPage() {
        await this.wait.waitForUrlToMatch('**/clientfiles/createcorporateclient');
        await (0, test_1.expect)(this.page).toHaveTitle('Gateway | Create Corporate Client');
    }
    /** Main happy path: fill, postcode lookup, submit, alert handling */
    async createCorporateClient(formData, postcode) {
        const usedFormData = await this.fillCorporateClientForm(formData);
        // postcode lookup + store for later assertions
        const selectedAddress = await this.postcode.performPostcodeLookup(postcode);
        DataStore_1.dataStore.setValue('formData.selectedAddress', selectedAddress);
        await this.submitForm();
        await this.confirmCorporateClientCreation();
        return { formData: usedFormData, selectedAddress };
    }
    /** Just submits the page */
    async submitForm() {
        await this.action.clickButtonByText('Create Corporate Client', false);
    }
    /** One-call flow with a sanity check */
    async executeCompleteClientCreation() {
        const result = await this.createCorporateClient();
        if (!result.formData.companyName) {
            throw new Error('Corporate client creation failed - no company name generated');
        }
    }
    // ------------------------------------------------------------------
    // Corporate-specific form fill
    // ------------------------------------------------------------------
    async fillCorporateClientForm(data = {}) {
        const contact = this.makeContactNames(data.contactForename, data.contactSurname);
        const generated = {
            contactForename: contact.forename,
            contactSurname: contact.surname,
            companyName: data.companyName ?? TestDataGenerator_1.TestDataGenerator.companyName(),
            email: data.emailAddress ?? TestDataGenerator_1.TestDataGenerator.email({ first: contact.forename, last: contact.surname }),
            phone: data.phone ?? TestDataGenerator_1.TestDataGenerator.phone(),
        };
        // Persist commonly re-used values with gateway prefix for consistency
        this.persist('gateway.formData', generated);
        // Also persist without prefix for backward compatibility
        this.persist('formData', generated);
        // Basic text inputs
        await this.action.fillInputByLabel('Company Name', generated.companyName);
        await this.action.fillInputByLabel('Email Address', generated.email);
        await this.action.fillInputByLabel('Phone', generated.phone);
        await this.action.fillInputByLabel('Contact Forename', generated.contactForename);
        await this.action.fillInputByLabel('Contact Surname', generated.contactSurname);
        // Date Established (either provided or "today" via datepicker)
        const dateEstablished = await this.handleDateEstablished(data.dateEstablished);
        DataStore_1.dataStore.setValue('gateway.formData.dateEstablished', dateEstablished);
        DataStore_1.dataStore.setValue('formData.dateEstablished', dateEstablished);
        // Adviser
        let adviserLabel;
        try {
            adviserLabel = await this.action.selectDropdownByLabel('Adviser');
        }
        catch {
            adviserLabel = await this.action.selectSelect2(this.clientPage.adviserTrigger, this.clientPage.s2Options, this.clientPage.adviserRendered);
        }
        // Active Plan (native select; several label variants exist)
        const activePlanLabel = await this.action
            .selectDropdownByAnyLabel(['Active Plan', 'Active Plan *', 'ActivePlan'], data.activePlanLabel)
            .catch(() => undefined);
        const result = {
            companyName: generated.companyName,
            dateEstablished,
            emailAddress: generated.email,
            phone: generated.phone,
            activePlanLabel,
            adviserLabel,
            contactForename: generated.contactForename,
            contactSurname: generated.contactSurname,
        };
        DataStore_1.dataStore.setValue('gateway.formData.complete', result);
        DataStore_1.dataStore.setValue('formData.complete', result);
        return result;
    }
    /** Confirm the “Corporate Client Created” success alert (clicks OK) */
    async confirmCorporateClientCreation() {
        await this.alert.handleClientCreationSuccessAlert('OK');
    }
    // --------------------- private helpers ---------------------
    makeContactNames(forename, surname) {
        return {
            forename: forename ?? TestDataGenerator_1.TestDataGenerator.firstName(),
            surname: surname ?? TestDataGenerator_1.TestDataGenerator.lastName(),
        };
    }
    persist(prefix, obj) {
        for (const [k, v] of Object.entries(obj))
            DataStore_1.dataStore.setValue(`${prefix}.${k}`, v);
    }
    async handleDateEstablished(date) {
        if (date) {
            await this.formsComponent.dateEstablished.fill(date);
            return date;
        }
        return this.datePicker.setToday(() => this.formsComponent.dateEstablished);
    }
}
exports.AddCorporateClientSteps = AddCorporateClientSteps;
//# sourceMappingURL=CorporateClientCreationSteps.js.map