"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchClientsSteps = void 0;
const BasePage_1 = require("@framework/core/BasePage");
const test_1 = require("@playwright/test");
const Forms_1 = require("@steps/components/Forms");
const SideNav_1 = require("@steps/components/SideNav");
const SearchClientsPage_1 = require("@pages/clients/SearchClientsPage");
const DataStore_1 = require("@framework/utils/DataStore");
class SearchClientsSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.forms = new Forms_1.FormsService(page);
        this.searchClientPage = new SearchClientsPage_1.SearchClientPage(page);
        this.sideNav = new SideNav_1.SideNavService(page);
    }
    /**
     * Verify Search Client page is loaded with URL and title checks
     */
    async verifySearchClientPage() {
        await this.wait.waitForUrlToMatch('**/clientfiles/searchclients');
        await (0, test_1.expect)(this.page).toHaveTitle('Gateway | Search Clients');
    }
    /**
     * Submit the search form using the enhanced action helper
     */
    async searchClients() {
        await this.action.clickLocator(this.searchClientPage.searchClientButton);
    }
    /**
     * Main method to navigate to search clients page and perform search using stored data
     * @param searchData - Optional search data overrides
     * @param dataPrefix - DataStore prefix to retrieve data from (default: 'formData')
     * @returns The search data that was used
     */
    async searchForStoredClient(searchData = {}, dataPrefix = 'formData') {
        // Navigate to Search Clients page via side menu
        await this.sideNav.clickSideMenuItem('Clients', 'Search Clients');
        // Verify we're on the correct page
        await this.verifySearchClientPage();
        // Fill search form using stored data from DataStore
        const usedSearchData = await this.forms.searchMinimalForm(searchData, dataPrefix);
        // Submit the search
        await this.searchClients();
        return usedSearchData;
    }
    /**
     * Verify that the stored company name matches the name in the table and click view client button
     * @param dataPrefix - DataStore prefix to retrieve company name from (default: 'formData')
     * @returns Promise<boolean> - true if company found and clicked, false otherwise
     */
    async verifyAndClickMatchingClient(dataPrefix = 'formData') {
        // Get the stored company name from DataStore
        const storedCompanyName = DataStore_1.dataStore.getValue(`${dataPrefix}.companyName`);
        if (!storedCompanyName) {
            throw new Error(`No company name found in DataStore with prefix: ${dataPrefix}`);
        }
        // Wait for the table to be visible
        await this.wait.waitForElement(this.searchClientPage.clientsTable);
        // Get all table rows
        const rows = this.searchClientPage.tableRows;
        const rowCount = await rows.count();
        // Iterate through each row to find matching company name
        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const companyNameElement = this.searchClientPage.getCompanyNameFromRow(row);
            // Get the text content of the company name
            const displayedCompanyName = await companyNameElement.textContent();
            // Check if the displayed name matches the stored name
            if (displayedCompanyName?.trim() === storedCompanyName.trim()) {
                // Found matching company, click the view client button in the same row
                const viewClientButton = this.searchClientPage.getViewClientButtonFromRow(row);
                await this.action.clickLocator(viewClientButton);
                // Wait for navigation to client details page
                await this.wait.waitForUrlToMatch('**/clientfiles/details/**');
                return true;
            }
        }
        // No matching company found
        return false;
    }
    /**
     * Verify that the stored forename and surname match a client in the search results table
     * @param dataPrefix - DataStore prefix to retrieve individual client data from
     * @returns Promise<boolean> - true if individual client found and clicked, false otherwise
     */
    async verifyAndClickMatchingIndividualClient(dataPrefix = 'clientData.complete') {
        // Get the stored individual client data from DataStore
        const storedClientData = DataStore_1.dataStore.getValue(dataPrefix);
        if (!storedClientData || !storedClientData.forename || !storedClientData.surname) {
            throw new Error(`No individual client data (forename/surname) found in DataStore with prefix: ${dataPrefix}`);
        }
        // Wait for the table to be visible
        await this.wait.waitForElement(this.searchClientPage.clientsTable);
        // Get all table rows
        const rows = this.searchClientPage.tableRows;
        const rowCount = await rows.count();
        // Iterate through each row to find matching client name
        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            // Use the same locator as company name but for individual client names
            const clientNameElement = this.searchClientPage.getCompanyNameFromRow(row);
            // Get the text content of the client name
            const displayedClientName = await clientNameElement.textContent();
            if (displayedClientName) {
                // Check if the displayed name contains both forename and surname
                const nameText = displayedClientName.trim().toLowerCase();
                const expectedForename = storedClientData.forename.toLowerCase();
                const expectedSurname = storedClientData.surname.toLowerCase();
                if (nameText.includes(expectedForename) && nameText.includes(expectedSurname)) {
                    // Found matching client, click the view client button in the same row
                    const viewClientButton = this.searchClientPage.getViewClientButtonFromRow(row);
                    await this.action.clickLocator(viewClientButton);
                    // Wait for navigation to client details page
                    await this.wait.waitForUrlToMatch('**/clientfiles/details/**');
                    return true;
                }
            }
        }
        // No matching client found
        return false;
    }
    /**
     * Complete search and verification flow - searches for stored client and verifies company name match
     * @param searchData - Optional search data overrides
     * @param dataPrefix - DataStore prefix to retrieve data from (default: 'formData')
     * @returns Object containing search data and verification result
     */
    async searchAndVerifyStoredClient(searchData = {}, dataPrefix = 'formData') {
        // Perform the search
        const usedSearchData = await this.searchForStoredClient(searchData, dataPrefix);
        // Verify company name and click view client button
        const clientFound = await this.verifyAndClickMatchingClient(dataPrefix);
        return {
            searchData: usedSearchData,
            clientFound,
        };
    }
    /**
     * Search for and verify an individual client using stored forename and surname
     * @param searchData - Optional search data overrides
     * @param dataPrefix - DataStore prefix to retrieve data from (default: 'clientData.complete')
     * @returns Object containing search data and verification result
     */
    async searchAndVerifyStoredIndividualClient(searchData = {}, dataPrefix = 'clientData.complete') {
        // Get stored client data
        const storedClientData = DataStore_1.dataStore.getValue(dataPrefix);
        if (!storedClientData || !storedClientData.forename || !storedClientData.surname) {
            throw new Error(`No individual client data found in DataStore with prefix: ${dataPrefix}`);
        }
        // Navigate to Search Clients page via side menu
        await this.sideNav.clickSideMenuItem('Clients', 'Search Clients');
        await this.verifySearchClientPage();
        // Prepare search data with stored forename and surname
        const searchFormData = {
            forename: storedClientData.forename,
            surname: storedClientData.surname,
            ...searchData // Allow overrides
        };
        // Fill search form
        const usedSearchData = await this.forms.searchMinimalForm(searchFormData);
        // Submit the search
        await this.searchClients();
        // Verify individual client in results
        const clientFound = await this.verifyAndClickMatchingIndividualClient(dataPrefix);
        return {
            searchData: usedSearchData,
            clientFound
        };
    }
    /**
     * Main method: Execute complete search and verification workflow
     */
    async executeSearchAndVerifyStoredClient() {
        // Execute search and verification workflow
        const result = await this.searchAndVerifyStoredClient();
        // Validate that search data was used and client was found
        if (!result.searchData) {
            throw new Error('Search execution failed - no search data returned');
        }
        if (!result.clientFound) {
            throw new Error('Client verification failed - stored company name not found in search results');
        }
    }
    /**
     * Main method: Execute complete individual client search and verification workflow
     * This follows the same pattern as executeSearchAndVerifyStoredClient() but for individual clients
     */
    async executeSearchAndVerifyStoredIndividualClient() {
        // Execute search and verification workflow for individual client
        const result = await this.searchAndVerifyStoredIndividualClient();
        // Validate that search data was used and client was found
        if (!result.searchData) {
            throw new Error('Individual client search execution failed - no search data returned');
        }
        if (!result.clientFound) {
            throw new Error('Individual client verification failed - stored forename and surname not found in search results');
        }
    }
}
exports.SearchClientsSteps = SearchClientsSteps;
//# sourceMappingURL=SearchClientsSteps.js.map