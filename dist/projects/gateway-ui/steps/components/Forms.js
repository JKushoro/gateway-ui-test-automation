"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsService = void 0;
const FormsLocators_1 = require("@pages/componentsLocator/FormsLocators");
const DatePicker_1 = require("@steps/components/DatePicker");
const DataStore_1 = require("@framework/utils/DataStore");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
/**
 * FormsService – UI interaction service for filling gateway forms
 * All data stored with 'gateway.' prefix for clear tracking and comparison with KYC data
 */
class FormsService {
    constructor(page) {
        this.page = page;
        this.formsComponent = new FormsLocators_1.FormsComponent(page);
        this.datePicker = new DatePicker_1.DatePickerService(page);
        this.action = new ActionHelper_1.ActionHelper(page);
    }
    /**
     * Generic search form filler for gateway forms
     * Stores data with 'gateway.' prefix for clear identification
     */
    async searchMinimalForm(data = {}, dataPrefix = 'gateway.formData') {
        const searchData = {
            forename: data.forename ?? DataStore_1.dataStore.getValue(`${dataPrefix}.contactForename`),
            surname: data.surname ?? DataStore_1.dataStore.getValue(`${dataPrefix}.contactSurname`),
            company: data.company ?? DataStore_1.dataStore.getValue(`${dataPrefix}.companyName`),
            email: data.email ?? DataStore_1.dataStore.getValue(`${dataPrefix}.email`),
        };
        if (searchData.forename)
            await this.action.fillInputByLabel('Forename', searchData.forename);
        if (searchData.surname)
            await this.action.fillInputByLabel('Surname', searchData.surname);
        if (searchData.company)
            await this.action.fillInputByLabel('Company/Trust Name', searchData.company);
        if (searchData.email)
            await this.action.fillInputByLabel('Email', searchData.email);
        // Store with gateway prefix for clear tracking
        DataStore_1.dataStore.setValue(`${dataPrefix}.searchData`, searchData);
        DataStore_1.dataStore.setValue('gateway.searchData.complete', searchData);
        return searchData;
    }
    /** Set date field to today using DatePicker service */
    async setDateToday(locatorGetter) {
        return this.datePicker.setToday(locatorGetter);
    }
}
exports.FormsService = FormsService;
//# sourceMappingURL=Forms.js.map