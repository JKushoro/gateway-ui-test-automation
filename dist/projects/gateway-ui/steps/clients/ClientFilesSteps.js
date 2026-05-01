"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFilesSteps = void 0;
// projects/gateway-ui/steps/clients/ClientFilesSteps.ts
const BasePage_1 = require("@framework/core/BasePage");
const test_1 = require("@playwright/test");
const ClientDetailsPageLocators_1 = require("@pages/gatewayElementLocators/ClientDetailsPageLocators");
const DataStore_1 = require("@framework/utils/DataStore");
class ClientFilesSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.clientFilePage = new ClientDetailsPageLocators_1.ClientDetailsPageLocators(page, config);
    }
    /**
     * Ensure we are on the Client Files (Client Details) page.
     */
    async verifyClientFilesPage() {
        await this.wait.waitForUrlToMatch('**/clientfiles/details/**');
        await this.wait.waitForVisible('label:has-text("Company Name")');
        await (0, test_1.expect)(this.page).toHaveTitle(/Gateway \| Client Details/);
    }
    /**
     * Click a navigation link in the client file by its text.
     */
    async clickNavigationLink(linkText) {
        const navLink = this.clientFilePage.getNavLinkByText(linkText);
        await this.wait.waitForElement(navLink);
        await this.action.clickLocator(navLink);
    }
    /**
     * Main workflow: verify page, then assert all stored data matches what is displayed.
     */
    async executeStoredClientDataVerification(dataPrefix = 'formData') {
        await this.verifyClientFilesPage();
        await this.assertStoredClientDataMatches(dataPrefix);
    }
    /**
     * Assert that stored data matches displayed data (field-by-field).
     */
    /**
     * 🎯 Assert that stored data matches displayed data (field-by-field)
     *
     * This method verifies that all client data fields match between what was stored
     * during form submission and what is currently displayed on the page.
     *
     * @param dataPrefix - The prefix used to store data in the data store (default: 'formData')
     *
     * @example
     * ```typescript
     * // Verify all client data matches what was stored
     * await clientSteps.assertStoredClientDataMatches();
     *
     * // Verify with custom data prefix
     * await clientSteps.assertStoredClientDataMatches('customPrefix');
     * ```
     */
    async assertStoredClientDataMatches(dataPrefix = 'formData') {
        const result = await this.verifyStoredClientDataMatches(dataPrefix);
        // Use descriptive error messages for better debugging
        (0, test_1.expect)(result.companyName, 'Company name should match stored data').toBe(true);
        (0, test_1.expect)(result.contactForename, 'Contact forename should match stored data').toBe(true);
        (0, test_1.expect)(result.contactSurname, 'Contact surname should match stored data').toBe(true);
        (0, test_1.expect)(result.phone, 'Phone number should match stored data').toBe(true);
        (0, test_1.expect)(result.emailAddress, 'Email address should match stored data').toBe(true);
        (0, test_1.expect)(result.addressMatches, 'Address should match stored data').toBe(true);
        (0, test_1.expect)(result.allFieldsMatch, 'All client data fields should match stored data').toBe(true);
    }
    /**
     * Compare stored vs displayed and return a per-field result.
     */
    async verifyStoredClientDataMatches(dataPrefix = 'formData') {
        const expected = this.getExpectedFromStore(dataPrefix);
        const actual = await this.getDisplayedClientData();
        const companyNameMatches = this.same(expected.companyName, actual.companyName);
        const contactForenameMatches = this.same(expected.contactForename, actual.contactForename);
        const contactSurnameMatches = this.same(expected.contactSurname, actual.contactSurname);
        const phoneMatches = this.samePhone(expected.phone, actual.phone);
        const emailAddressMatches = this.sameEmail(expected.emailAddress, actual.emailAddress);
        const addressMatches = this.same(expected.addressLine1, actual.addressLine1);
        const allFieldsMatch = companyNameMatches &&
            contactForenameMatches &&
            contactSurnameMatches &&
            phoneMatches &&
            emailAddressMatches &&
            addressMatches;
        return {
            companyName: companyNameMatches,
            contactForename: contactForenameMatches,
            contactSurname: contactSurnameMatches,
            phone: phoneMatches,
            emailAddress: emailAddressMatches,
            addressMatches,
            allFieldsMatch,
        };
    }
    /**
     * Read all client data displayed on the page (single pass).
     */
    async getDisplayedClientData() {
        await this.wait.waitForVisible('label:has-text("Company Name")');
        return {
            companyName: await this.action.getTextByLabel('Company Name'),
            contactForename: await this.action.getTextByLabel('Contact Forename'),
            contactSurname: await this.action.getTextByLabel('Contact Surname'),
            phone: await this.action.getTextByLabel('Phone'),
            emailAddress: await this.action.getTextByLabel('Email Address', 'a'),
            addressLine1: await this.action.getTextByLabel('Line 1'),
            townCity: await this.action.getTextByLabel('Town/City'),
            postcode: await this.action.getTextByLabel('Postcode'),
        };
    }
    /**
     * Pull expected values from the DataStore.
     */
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
    // -------- simple comparison helpers (clear & readable) --------
    /**
     * Trim-only comparison for plain text fields.
     */
    same(a, b) {
        return a.trim() === b.trim();
    }
    /**
     * Email comparison: trim and lower-case.
     */
    sameEmail(a, b) {
        return a.trim().toLowerCase() === b.trim().toLowerCase();
    }
    /**
     * Phone comparison: compare only digits (ignores spaces, dashes, brackets).
     * If you want strict comparison instead, replace with `return this.same(a, b)`.
     */
    samePhone(a, b) {
        const digits = (s) => s.replace(/\D+/g, '');
        return digits(a) === digits(b);
    }
}
exports.ClientFilesSteps = ClientFilesSteps;
//# sourceMappingURL=ClientFilesSteps.js.map