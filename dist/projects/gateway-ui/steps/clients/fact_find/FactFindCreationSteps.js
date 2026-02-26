"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactFindCreationSteps = void 0;
//projects/gateway-ui/steps/clients/fact_find/FactFindCreationSteps.ts
const test_1 = require("@playwright/test");
const BasePage_1 = require("@framework/core/BasePage");
const RetailClientCreationSteps_1 = require("@steps/clients/RetailClientCreationSteps");
const FactFindPageLocators_1 = require("@pages/clients/clientFiles/FactFindPageLocators");
const AlertService_1 = require("@steps/components/AlertService");
/**
 * FactFindCreationSteps - Orchestrates creating a client and moving to Fact Find
 */
class FactFindCreationSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.clientSteps = new RetailClientCreationSteps_1.RetailClientCreationSteps(page, config);
        this.factFindLocators = new FactFindPageLocators_1.FactFindPageLocators(page, config);
        this.alert = new AlertService_1.AlertService(page, config);
    }
    /**
     * Returns the first-row cell locator for the given column header name.
     * Logic lives in Steps (not Locators) to keep locator classes selector-only.
     */
    async getFirstRowCellByHeader(headerName) {
        await (0, test_1.expect)(this.factFindLocators.factFindTable).toBeVisible({ timeout: 60000 });
        const headers = (await this.factFindLocators.factFindHeaderCells.allTextContents()).map(h => h.replace(/\s+/g, ' ').trim().toLowerCase());
        const idx = headers.findIndex(h => h === headerName.trim().toLowerCase());
        if (idx === -1) {
            throw new Error(`Fact Find table: "${headerName}" header not found. Headers: ${headers.join(' | ')}`);
        }
        return this.factFindLocators.factFindFirstRowCells.nth(idx);
    }
    /**
     * Add a client then navigate to the Fact Find tab
     */
    async addClientAndNavigateToFactFindTab(sideNav, navBar, clientData) {
        await this.navigateToAddClient(sideNav);
        const usedClientData = await this.createClientRecord(clientData);
        await this.navigateToFactFindTab(navBar);
        await this.waitForFactFindTable();
        return usedClientData;
    }
    async navigateToAddClient(sideNav) {
        await this.clientSteps.executeNavigateToAddClient(sideNav);
    }
    async createClientRecord(clientData) {
        return await this.clientSteps.createClient(clientData);
    }
    async navigateToFactFindTab(navBar) {
        await navBar.clickNavItem('Fact Find');
    }
    async waitForFactFindTable() {
        await (0, test_1.expect)(this.factFindLocators.factFindTable).toBeVisible({ timeout: 60000 });
    }
    /**
     * Creates a new Fact Find and launches the KYC app.
     * Returns the page that contains KYC (either a new tab or the same tab).
     */
    async createAndLaunchNewFactFind() {
        await this.selectEnableNewFactFindCheckBox();
        await this.clickConfirmAndMigrateButton();
        await this.confirmEnableClientForNewFactFind();
        const selectedType = await this.chooseFactFindType();
        await this.clickFactFindButton();
        await this.verifyLatestFactFindRowType(selectedType);
        const popupPromise = this.listenForPopup();
        await this.ensureLaunchFactFindIsVisible();
        const kycTargetPage = await this.launchFactFindAndResolveTarget(popupPromise);
        return await this.verifyKYCPage(kycTargetPage);
    }
    // ----------------------------------------------------------
    // New helper methods (extracted from inline logic)
    // ----------------------------------------------------------
    /**
     * Start listening for a popup/new tab (resolves to null if none).
     */
    async listenForPopup() {
        return this.page
            .context()
            .waitForEvent('page', { timeout: FactFindCreationSteps.POPUP_TIMEOUT_MS })
            .catch(() => null);
    }
    /**
     * Ensure the "Launch Fact Find" action is available.
     */
    async ensureLaunchFactFindIsVisible() {
        await (0, test_1.expect)(this.factFindLocators.launchFactFindButton).toBeVisible();
    }
    /**
     * Click "Launch Fact Find" and resolve the target page (popup or current tab).
     */
    async launchFactFindAndResolveTarget(popupPromise) {
        await this.clickLaunchFactFindButton();
        const popupPage = await popupPromise;
        return popupPage ?? this.page;
    }
    // ----------------------------------------------------------
    // Existing helpers (unchanged)
    // ----------------------------------------------------------
    /**
     * Enable new fact find for this client (checkbox)
     */
    async selectEnableNewFactFindCheckBox() {
        const checkbox = this.factFindLocators.checkboxByLabel('Enable new fact find for this client');
        await this.action.checkCheckbox(checkbox);
        await (0, test_1.expect)(checkbox).toBeChecked();
    }
    /**
     * Click "Confirm & Migrate"
     */
    async clickConfirmAndMigrateButton() {
        await this.action.clickLinkByText('Confirm & Migrate', false);
    }
    /**
     * Confirm enable client for new fact find (modal/alert)
     */
    async confirmEnableClientForNewFactFind() {
        await this.alert.handleEnableClientForNewFactFind('Yes');
    }
    /**
     * Select the fact find type from dropdown
     */
    async chooseFactFindType() {
        // Wait for dropdown to become available (QA can be slow)
        await this.wait.waitForNetworkIdle(FactFindCreationSteps.KYC_TIMEOUT_MS);
        return await this.action.selectDropdownByLabel('Choose Fact Find Type', 'Core Fact Find');
    }
    /**
     * Click "Create Fact Find"
     */
    async clickFactFindButton() {
        await this.action.clickButtonByText('Create Fact Find', false);
    }
    /**
     * Verify the newly created first row shows the expected "Type".
     */
    async verifyLatestFactFindRowType(expectedType) {
        const typeCell = await this.getFirstRowCellByHeader('Type');
        await (0, test_1.expect)(typeCell).toBeVisible();
        await (0, test_1.expect)(typeCell).toHaveText(expectedType, { timeout: 60000 });
    }
    /**
     * Click "Launch Fact Find"
     */
    async clickLaunchFactFindButton() {
        await this.action.clickLinkByText('Launch Fact Find', false);
    }
    /**
     * Verify KYC page is loaded with URL and title checks.
     */
    async verifyKYCPage(kycPage) {
        const timeout = FactFindCreationSteps.KYC_TIMEOUT_MS;
        await kycPage.waitForLoadState('domcontentloaded', { timeout }).catch(() => { });
        await kycPage.waitForURL('**/kyc-ff/*', { timeout });
        await (0, test_1.expect)(kycPage).toHaveTitle('KYC', { timeout });
        return kycPage;
    }
}
exports.FactFindCreationSteps = FactFindCreationSteps;
FactFindCreationSteps.KYC_TIMEOUT_MS = 180000;
FactFindCreationSteps.POPUP_TIMEOUT_MS = 10000;
//# sourceMappingURL=FactFindCreationSteps.js.map