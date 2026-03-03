"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFilesSteps = void 0;
// projects/gateway-ui/steps/clients/ClientFilesSteps.ts
const BasePage_1 = require("@framework/core/BasePage");
const test_1 = require("@playwright/test");
const ClientDetailsPageLocators_1 = require("@pages/clients/clientFiles/ClientDetailsPageLocators");
const DataStore_1 = require("@framework/utils/DataStore");
class ClientFilesSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.clientFilePage = new ClientDetailsPageLocators_1.ClientDetailsPageLocators(page, config);
    }
    // ---------------- Page checks ----------------
    async verifyClientFilesPage() {
        await this.wait.waitForUrlToMatch('**/clientfiles/details/**');
        await this.wait.waitForVisible('label:has-text("Company Name")');
        await (0, test_1.expect)(this.page).toHaveTitle(/Gateway \| Client Details/);
    }
    async clickNavigationLink(linkText) {
        const navLink = this.clientFilePage.getNavLinkByText(linkText);
        await this.wait.waitForElement(navLink);
        await this.action.clickLocator(navLink);
    }
    // ---------------- Public flow ----------------
    async executeStoredClientDataVerification(dataPrefix = 'formData') {
        await this.verifyClientFilesPage();
        const matches = await this.verifyStoredClientDataMatches(dataPrefix);
        (0, test_1.expect)(matches).toBe(true);
    }
    // ---------------- Core verification ----------------
    async verifyStoredClientDataMatches(dataPrefix) {
        const expected = this.getExpectedFromStore(dataPrefix);
        const actual = await this.getDisplayedClientData();
        return (this.same(expected.companyName, actual.companyName) &&
            this.same(expected.contactForename, actual.contactForename) &&
            this.same(expected.contactSurname, actual.contactSurname) &&
            this.samePhone(expected.phone, actual.phone) &&
            this.sameEmail(expected.emailAddress, actual.emailAddress) &&
            this.same(expected.addressLine1, actual.addressLine1));
    }
    // ---------------- Data readers ----------------
    async getDisplayedClientData() {
        await this.wait.waitForVisible('label:has-text("Company Name")');
        return {
            companyName: await this.action.getTextByLabel('Company Name'),
            contactForename: await this.action.getTextByLabel('Contact Forename'),
            contactSurname: await this.action.getTextByLabel('Contact Surname'),
            phone: await this.action.getTextByLabel('Phone'),
            emailAddress: await this.action.getTextByLabel('Email Address', 'a'),
            addressLine1: await this.action.getTextByLabel('Line 1'),
        };
    }
    getExpectedFromStore(dataPrefix) {
        return {
            companyName: DataStore_1.dataStore.getValue(`${dataPrefix}.companyName`) ?? '',
            contactForename: DataStore_1.dataStore.getValue(`${dataPrefix}.contactForename`) ?? '',
            contactSurname: DataStore_1.dataStore.getValue(`${dataPrefix}.contactSurname`) ?? '',
            phone: DataStore_1.dataStore.getValue(`${dataPrefix}.phone`) ?? '',
            emailAddress: DataStore_1.dataStore.getValue(`${dataPrefix}.email`) ?? '',
            addressLine1: DataStore_1.dataStore.getValue(`${dataPrefix}.selectedAddress`) ?? '',
        };
    }
    // ---------------- Comparison helpers ----------------
    same(a, b) {
        return a.trim() === b.trim();
    }
    sameEmail(a, b) {
        return a.trim().toLowerCase() === b.trim().toLowerCase();
    }
    samePhone(a, b) {
        const digits = (s) => s.replace(/\D+/g, '');
        return digits(a) === digits(b);
    }
}
exports.ClientFilesSteps = ClientFilesSteps;
//# sourceMappingURL=ClientFilesSteps.js.map