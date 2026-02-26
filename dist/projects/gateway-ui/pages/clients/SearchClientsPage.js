"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchClientPage = void 0;
const BasePage_1 = require("@framework/core/BasePage");
class SearchClientPage extends BasePage_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
        // Private locators
        this.searchClientButtonLocator = this.page.getByRole('button', {
            name: 'Search clients',
        });
        this.clientsTableLocator = this.page.locator('table.gatewaytable');
        this.tableRowsLocator = this.clientsTableLocator.locator('tbody tr');
    }
    // Public getters
    get searchClientButton() {
        return this.searchClientButtonLocator;
    }
    get clientsTable() {
        return this.clientsTableLocator;
    }
    get tableRows() {
        return this.tableRowsLocator;
    }
    /**
     * Get company name from a specific table row
     */
    getCompanyNameFromRow(row) {
        return row.locator('td:first-child .gateway-icontext span');
    }
    /**
     * Get view client button from a specific table row
     */
    getViewClientButtonFromRow(row) {
        return row.locator('a[href*="/clientfiles/details/"]');
    }
}
exports.SearchClientPage = SearchClientPage;
//# sourceMappingURL=SearchClientsPage.js.map