"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsSearchSteps = void 0;
// projects/gateway-ui/steps/clients/ClientsSearchSteps.ts
const BasePage_1 = require("@framework/core/BasePage");
const test_1 = require("@playwright/test");
const Forms_1 = require("@steps/components/Forms");
const SideNav_1 = require("@steps/components/SideNav");
const SearchClientsPageLocators_1 = require("@pages/clients/SearchClientsPageLocators");
const DataStore_1 = require("@framework/utils/DataStore");
const TextHelper_1 = require("@framework/helpers/TextHelper");
class ClientsSearchSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.forms = new Forms_1.FormsService(page);
        this.searchClientPage = new SearchClientsPageLocators_1.SearchClientPage(page);
        this.sideNav = new SideNav_1.SideNavService(page);
    }
    async verifySearchClientPage() {
        await this.wait.waitForUrlToMatch('**/clientfiles/searchclients');
        await (0, test_1.expect)(this.page).toHaveTitle('Gateway | Search Clients');
    }
    async searchClients() {
        //await this.action.clickLocator(this.searchClientPage.searchClientButton);
        await this.action.clickButtonByText('Search clients', false);
    }
    async searchForStoredClient(searchData = {}, dataPrefix = 'gateway.formData') {
        await this.sideNav.clickSideMenuItem('Clients', 'Search Clients');
        await this.verifySearchClientPage();
        const used = await this.forms.searchMinimalForm(searchData, dataPrefix);
        await this.searchClients();
        return used;
    }
    // --- Generic result row clickers using TableHelper ---
    async clickCompanyRowByExactName(dataPrefix = 'formData') {
        const expected = DataStore_1.dataStore.getValue(`${dataPrefix}.companyName`);
        if (!expected)
            throw new Error(`No companyName in DataStore at ${dataPrefix}.companyName`);
        const rows = await this.table.getRows(this.searchClientPage.clientsTable);
        const idx = await this.table.findRowIndex(rows, {
            getCell: (row) => this.searchClientPage.getCompanyNameFromRow(row),
            textEquals: expected
        });
        if (idx < 0)
            return false;
        await this.table.clickInRow(rows, idx, (row) => this.searchClientPage.getViewClientButtonFromRow(row));
        await this.wait.waitForUrlToMatch('**/clientfiles/details/**');
        return true;
    }
    async clickIndividualRowByName(dataPrefix = 'clientData.complete') {
        const client = DataStore_1.dataStore.getValue(dataPrefix);
        if (!client?.forename || !client?.surname) {
            throw new Error(`No forename/surname in DataStore at ${dataPrefix}`);
        }
        const rows = await this.table.getRows(this.searchClientPage.clientsTable);
        const idx = await this.table.findRowIndex(rows, {
            predicate: async (row) => {
                const cell = this.searchClientPage.getCompanyNameFromRow(row);
                const full = await cell.textContent() ?? '';
                return TextHelper_1.TextHelper.nameContains(full, client.forename, client.surname);
            }
        });
        if (idx < 0)
            return false;
        await this.table.clickInRow(rows, idx, (row) => this.searchClientPage.getViewClientButtonFromRow(row));
        await this.wait.waitForUrlToMatch('**/clientfiles/details/**');
        return true;
    }
    // --- High-level flows (unchanged signatures, simplified internals) ---
    async searchAndVerifyStoredClient(searchData = {}, dataPrefix = 'gateway.formData') {
        const used = await this.searchForStoredClient(searchData, dataPrefix);
        const found = await this.clickCompanyRowByExactName(dataPrefix);
        return { searchData: used, clientFound: found };
    }
    async searchAndVerifyStoredIndividualClient(searchData = {}, dataPrefix = 'gateway.clientData.complete') {
        const stored = DataStore_1.dataStore.getValue(dataPrefix);
        if (!stored?.forename || !stored?.surname) {
            throw new Error(`No individual client data found at ${dataPrefix}`);
        }
        // If currently on details page, bounce to dashboard (kept from your original)
        if (this.page.url().includes('/clientfiles/details/')) {
            const baseUrl = this.page.url().split('/clientfiles')[0];
            await this.page.goto(`${baseUrl}/dashboard/developmentdash`);
            await this.wait.waitForTimeout(500); // shorter & consistent
        }
        await this.sideNav.clickSideMenuItem('Clients', 'Search Clients');
        await this.verifySearchClientPage();
        const used = await this.forms.searchMinimalForm({
            forename: stored.forename,
            surname: stored.surname,
            ...searchData
        });
        await this.searchClients();
        const found = await this.clickIndividualRowByName(dataPrefix);
        return { searchData: used, clientFound: found };
    }
    async executeSearchAndVerifyStoredClient() {
        const result = await this.searchAndVerifyStoredClient();
        if (!result.clientFound) {
            throw new Error('Client verification failed - stored company name not found in results');
        }
    }
    async executeSearchAndVerifyStoredIndividualClient() {
        const result = await this.searchAndVerifyStoredIndividualClient();
        if (!result.clientFound) {
            throw new Error('Individual client verification failed - stored name not found in results');
        }
    }
}
exports.ClientsSearchSteps = ClientsSearchSteps;
//# sourceMappingURL=ClientsSearchSteps.js.map