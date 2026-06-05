"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayManagementSteps = void 0;
// projects/gateway-ui/steps/gateway/GatewayManagementSteps.ts
const test_1 = require("@playwright/test");
const src_1 = require("@/framework/src");
const NavBar_1 = require("@steps/components/NavBar");
const RetailClientCreationSteps_1 = require("@steps/gateway/RetailClientCreationSteps");
const GatewayPageLocators_1 = require("@pages/gatewayElementLocators/GatewayPageLocators");
const ClientDetailsPageLocators_1 = require("@pages/gatewayElementLocators/ClientDetailsPageLocators");
const AlertService_1 = require("@steps/components/AlertService");
const AlertServiceLocator_1 = require("@components/AlertServiceLocator");
const TextHelper_1 = require("@framework/helpers/TextHelper");
const TestCleanupHelper_1 = require("@framework/utils/TestCleanupHelper");
/**
 * GatewayManagementSteps
 *
 * Combines fact find management and gateway fact find validation functionality.
 * Structured to match the page layout:
 * 1. Navigation / page load
 * 2. Fact Find History section
 * 3. Create New Fact Find section
 * 4. Shared history assertions
 * 5. High-level business flows
 * 6. Gateway fact find validation
 */
class GatewayManagementSteps extends src_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.clientSteps = new RetailClientCreationSteps_1.RetailClientCreationSteps(page, config);
        this.factFindLocators = new GatewayPageLocators_1.GatewayPageLocators(page, config);
        this.clientDetailsPageLocators = new ClientDetailsPageLocators_1.ClientDetailsPageLocators(page);
        this.alert = new AlertService_1.AlertService(page, config);
        this.alertServiceLocator = new AlertServiceLocator_1.AlertServiceLocator(page);
        this.navBar = new NavBar_1.NavBarService(page);
    }
    // ==========================================================
    // UTILITY METHODS (from GatewayFactFindSteps)
    // ==========================================================
    normalizeName(value) {
        return String(value ?? '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    async firstExisting(...locators) {
        for (const l of locators) {
            if ((await l.count()) > 0)
                return l;
        }
        // Return first locator if none exist (for consistency)
        if (locators.length === 0) {
            throw new Error('No locators provided to firstExisting method');
        }
        return locators[0]; // Non-null assertion since we checked length above
    }
    async readCellValue(cell) {
        await this.wait.waitForElement(cell);
        const link = this.factFindLocators.getCellLink(cell);
        if ((await link.count()) > 0)
            return TextHelper_1.TextHelper.normalizeWhitespace(await link.innerText());
        const span = this.factFindLocators.getCellSpan(cell);
        if ((await span.count()) > 0)
            return TextHelper_1.TextHelper.normalizeWhitespace(await span.innerText());
        return TextHelper_1.TextHelper.normalizeWhitespace(await cell.innerText());
    }
    async getGatewayValueByLabel(sectionTitle, labelText) {
        const cell = await this.firstExisting(this.clientDetailsPageLocators.gatewayBsCell(sectionTitle, labelText), this.clientDetailsPageLocators.summaryPanelCell(sectionTitle, labelText), this.clientDetailsPageLocators.summaryPanelCellAlt(sectionTitle, labelText));
        return this.readCellValue(cell);
    }
    /* -------------------- Store readers -------------------- */
    getDisplayedKycFullName() {
        const displayedKycClient = src_1.dataStore.getValue('displayed.kycClient') || {};
        const fullName = this.normalizeName(displayedKycClient.fullName);
        if (!fullName) {
            throw new Error('Displayed KYC full name not found (displayed.kycClient.fullName)');
        }
        return fullName;
    }
    getDisplayedKycMobile() {
        const value = String(src_1.dataStore.getValue('displayed.kyc.contact.mobile') ?? '').trim();
        if (!value)
            throw new Error('Displayed KYC mobile not found (displayed.kyc.contact.mobile)');
        return value;
    }
    getDisplayedKycEmail() {
        const value = String(src_1.dataStore.getValue('displayed.kyc.contact.email') ?? '').trim();
        if (!value)
            throw new Error('Displayed KYC email not found (displayed.kyc.contact.email)');
        return value;
    }
    // ==========================================================
    // 1. NAVIGATION / PAGE LOAD
    // ==========================================================
    /**
     * Add a client then navigate to the Fact Find tab.
     */
    async addClientAndNavigateToFactFindTab(sideNav, navBar, clientData) {
        await this.navigateToAddClient(sideNav);
        const usedClientData = await this.createClientRecord(clientData);
        await this.navigateToFactFindTab(navBar);
        await this.waitForFactFindHistoryTable();
        return usedClientData;
    }
    /**
     * Open an existing client by email and navigate to the Fact Find tab.
     * This method does NOT create a new client - it searches for an existing one.
     */
    async openExistingClientAndNavigateToFactFindTab(clientEmail, sideNav, navBar) {
        // Navigate to Clients section
        await sideNav.clickSideMenuItem('Clients');
        await this.wait.waitForDOMContentLoaded();
        // Search for client by email
        const searchInput = this.page.getByRole('textbox', { name: /search/i }).or(this.page.getByPlaceholder(/search/i));
        await (0, test_1.expect)(searchInput).toBeVisible();
        await searchInput.fill(clientEmail);
        await searchInput.press('Enter');
        // Wait for search results to load with longer timeout
        await this.page.waitForTimeout(5000);
        await this.wait.waitForDOMContentLoaded();
        // Try multiple ways to find the client record
        let clientElement = null;
        const searchStrategies = [
            () => this.page.getByText(clientEmail).first(),
            () => this.page.locator(`td:has-text("${clientEmail}")`).first(),
            () => this.page.locator(`tr:has-text("${clientEmail}")`).first(),
            () => this.page.locator(`a:has-text("${clientEmail}")`).first(),
            () => this.page.getByText('Pipeline Automation').first(), // Try by name
            () => this.page.locator('tr').filter({ hasText: clientEmail }).first(),
            () => this.page.locator('[data-testid*="client"]').filter({ hasText: clientEmail }).first()
        ];
        for (const strategy of searchStrategies) {
            try {
                const element = strategy();
                await (0, test_1.expect)(element).toBeVisible({ timeout: 3000 });
                console.log(`Found client using strategy: ${strategy.toString()}`);
                clientElement = element;
                break;
            }
            catch (error) {
                console.log(`Strategy failed: ${strategy.toString()}`);
                continue;
            }
        }
        if (!clientElement) {
            // If still not found, try searching by name instead
            await searchInput.fill('Pipeline Automation');
            await searchInput.press('Enter');
            await this.page.waitForTimeout(3000);
            const nameElement = this.page.getByText('Pipeline Automation').first();
            await (0, test_1.expect)(nameElement).toBeVisible({ timeout: 5000 });
            clientElement = nameElement;
        }
        await this.action.clickLocator(clientElement);
        // Wait for client details page to load
        await this.wait.waitForDOMContentLoaded();
        // Navigate to Fact Find tab
        await this.navigateToFactFindTab(navBar);
        await this.waitForFactFindHistoryTable();
    }
    /**
     * Execute the complete flow to add a client and navigate to the Fact Find tab.
     */
    async executeAddClientAndNavigateToFactFindTab(sideNav, navBar) {
        await this.addClientAndNavigateToFactFindTab(sideNav, navBar);
    }
    /**
     * Wait for the Fact Find History table to be visible.
     */
    async waitForFactFindHistoryTable() {
        await (0, test_1.expect)(this.factFindLocators.factFindHistoryTable).toBeVisible({
            timeout: GatewayManagementSteps.FACT_FIND_HISTORY_TIMEOUT_MS,
        });
    }
    /**
     * Reload the page and wait for the Fact Find History table to be visible.
     */
    async reloadPageAndWait() {
        await this.page.reload({ waitUntil: 'domcontentloaded' });
        await this.waitForFactFindHistoryTable();
    }
    /**
     * Navigate to the Add Client page.
     */
    async navigateToAddClient(sideNav) {
        await this.clientSteps.executeNavigateToAddClient(sideNav);
    }
    /**
     * Create a client record.
     */
    async createClientRecord(clientData) {
        return await this.clientSteps.createClient(clientData);
    }
    /**
     * Navigate to the Fact Find tab from the client page.
     */
    async navigateToFactFindTab(navBar) {
        await navBar.clickNavItem('Fact Find');
    }
    /**
     * Verify the Add Note action is available for the first Fact Find row.
     */
    async verifyFirstRowAddNoteButtonIsVisible() {
        await (0, test_1.expect)(this.factFindLocators.addNoteButtonFirstRow).toBeVisible({ timeout: 15000 });
    }
    /**
     * Verify the Fact Find History table does not contain a Note header.
     */
    async verifyFactFindHistoryHasNoNoteHeader() {
        const headers = await this.factFindLocators.factFindHistoryHeaderCells.allInnerTexts();
        (0, test_1.expect)(headers.map(h => h.trim().toLowerCase())).not.toContain('note');
    }
    // ==========================================================
    // 2. FACT FIND HISTORY SECTION
    // ==========================================================
    // ----------------------------------------------------------
    // 2a. First row cell helpers
    // ----------------------------------------------------------
    /**
     * Get the Status cell for the first Fact Find row.
     */
    getFirstRowStatusCell() {
        return this.factFindLocators.getFirstRowStatusCell();
    }
    /**
     * Get the Name cell for the first Fact Find row.
     */
    getFirstRowNameCell() {
        return this.factFindLocators.getFirstRowNameCell();
    }
    /**
     * Get the Note cell for the specified row.
     */
    async getRowNoteCell(rowIndex) {
        return await this.table.getCellByHeader(this.factFindLocators.factFindHistoryTable, 'Note', rowIndex);
    }
    // ----------------------------------------------------------
    // 2b. First row state / value checks
    // ----------------------------------------------------------
    /**
     * Get the current status of the first Fact Find row.
     */
    async getFirstRowFactFindStatus() {
        return (await this.getFirstRowStatusCell().textContent()) || '';
    }
    /**
     * Verify the first Fact Find row has the expected status.
     */
    async verifyFirstRowFactFindStatus(expectedStatus) {
        await (0, test_1.expect)(this.getFirstRowStatusCell()).toContainText(expectedStatus, { timeout: 15000 });
    }
    /**
     * Verify the first Fact Find row is in Open status.
     */
    async verifyFirstRowFactFindIsOpen() {
        await this.verifyFirstRowFactFindStatus('Open');
    }
    /**
     * Verify the first Fact Find row is in Abandoned status.
     */
    async verifyFirstRowFactFindIsAbandoned() {
        await this.verifyFirstRowFactFindStatus('Abandoned');
    }
    /**
     * Verify the Launch Fact Find link is not available on the first row.
     */
    async verifyFirstRowLaunchFactFindNotAvailable() {
        await (0, test_1.expect)(this.factFindLocators.launchFactFindLinkFirstRow).not.toBeVisible();
    }
    /**
     * Verify the Name column is blank for the first Fact Find row.
     */
    async verifyFirstRowNameIsBlank() {
        await (0, test_1.expect)(this.getFirstRowNameCell()).toHaveText(/^\s*$/, { timeout: 15000 });
    }
    /**
     * Verify the Name column value for the first Fact Find row.
     */
    async verifyFirstRowNameValue(expectedName) {
        await (0, test_1.expect)(this.getFirstRowNameCell()).toContainText(expectedName, { timeout: 15000 });
    }
    /**
     * Verify the Note column is blank for the first Fact Find row.
     */
    async verifyFirstRowNoteIsBlank() {
        const noteCell = await this.getRowNoteCell(0);
        await (0, test_1.expect)(noteCell).not.toHaveText(/^\s*$/, { timeout: 15000 });
    }
    // ----------------------------------------------------------
    // 2c. Abandon Fact Find
    // ----------------------------------------------------------
    /**
     * Click the Abandon button for the first Fact Find row.
     */
    async clickAbandonButtonFirstRow() {
        await this.action.clickLocator(this.factFindLocators.abandonButtonFirstRow);
    }
    /**
     * Confirm the abandon action in the Abandon Fact Find modal.
     */
    async confirmAbandonInPopup() {
        await (0, test_1.expect)(this.alertServiceLocator.abandonModal).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.alertServiceLocator.abandonModalTitle).toContainText('Abandon Fact Find');
        await (0, test_1.expect)(this.alertServiceLocator.abandonModalWarning).toBeVisible();
        await this.action.clickLocator(this.alertServiceLocator.abandonModalButton);
        await (0, test_1.expect)(this.alertServiceLocator.abandonModal).not.toBeVisible({ timeout: 15000 });
    }
    /**
     * Abandon the first Fact Find row.
     */
    async abandonFirstRowFactFind() {
        await this.clickAbandonButtonFirstRow();
        await this.confirmAbandonInPopup();
    }
    // ----------------------------------------------------------
    // 2d. Add / Edit Name
    // ----------------------------------------------------------
    /**
     * Click the Add Name button for the first Fact Find row.
     */
    async clickAddNameButton() {
        await this.action.clickLocator(this.factFindLocators.addNameButtonFirstRow);
    }
    /**
     * Enter a Fact Find name in the Add Name modal input field.
     */
    async enterFactFindNameInAddModal(name) {
        await this.alertServiceLocator.nameModalInput.fill(name);
    }
    /**
     * Enter a Fact Find name in the Add Name modal input field.
     */
    async enterFactFindNameInEditModal(name) {
        await this.alertServiceLocator.nameEditModalInput.fill(name);
    }
    /**
     * Enter a Fact Find note in the Add Note modal input field.
     */
    async enterFactFindNoteInAddModal(name) {
        await this.alertServiceLocator.addNoteModalInput.fill(name);
    }
    /**
     * Click the Edit Name button for the first Fact Find row.
     */
    async clickEditNameButton() {
        await this.action.clickLocator(this.factFindLocators.editNameButtonFirstRow);
    }
    /**
     * Click the gatewaytable-collapse button for the first Fact Find row.
     */
    async clickGatewayTableCollapseButton() {
        await this.action.clickLocator(this.factFindLocators.expandFirstRowDetailsButton);
    }
    /**
     * Click the Add Note button for the first Fact Find row.
     */
    async clickAddNoteButton() {
        await this.action.clickLocator(this.factFindLocators.addNoteButtonFirstRow);
    }
    /**
     * Get the Note cell from the first row of the expanded note history table.
     */
    getFirstRowNoteValueCell() {
        return this.factFindLocators.getFirstRowNoteValueCell();
    }
    /**
     * Verify the saved note value for the first Fact Find row.
     */
    async verifyFirstRowNoteValue(expectedNote) {
        await (0, test_1.expect)(this.factFindLocators.firstRowNoteHistoryTable).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.getFirstRowNoteValueCell()).toContainText(expectedNote, { timeout: 15000 });
    }
    /**
     * Add a name to the abandoned Fact Find and verify the Name column is populated.
     */
    async executeAddNameToAbandonedFactFind() {
        const factFindName = `Fact Find Name ${Date.now()}`;
        await this.clickAddNameButton();
        await (0, test_1.expect)(this.alertServiceLocator.addNameModal).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.alertServiceLocator.addNameModalTitle).toContainText('Add Fact Find Name');
        await this.enterFactFindNameInAddModal(factFindName);
        await this.action.clickLocator(this.alertServiceLocator.addNameModalSaveButton);
        await (0, test_1.expect)(this.alertServiceLocator.addNameModal).not.toBeVisible({ timeout: 15000 });
        await this.verifyFirstRowNameValue(factFindName);
    }
    /**
     * Add a note to the abandoned Fact Find and verify the Note value is displayed.
     */
    async executeAddNoteToAbandonedFactFind() {
        const factFindNote = `Fact Find Note ${Date.now()}`;
        await this.clickAddNoteButton();
        await (0, test_1.expect)(this.alertServiceLocator.addNoteModal).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.alertServiceLocator.addNoteModalTitle).toContainText('Fact Find Notes');
        await this.enterFactFindNoteInAddModal(factFindNote);
        await this.action.clickLocator(this.alertServiceLocator.addNoteModalSaveButton);
        await (0, test_1.expect)(this.alertServiceLocator.addNoteModal).not.toBeVisible({ timeout: 15000 });
        await this.clickGatewayTableCollapseButton();
        await this.verifyFirstRowNoteValue(factFindNote);
    }
    /**
     * Verify the note remains saved against the abandoned Fact Find after page reload.
     */
    async executeVerifyNoteSavedAgainstAbandonedFactFind() {
        await this.reloadPageAndWait();
        await this.clickGatewayTableCollapseButton();
        await (0, test_1.expect)(this.getFirstRowNoteValueCell()).not.toHaveText(/^\s*$/, { timeout: 15000 });
    }
    /**
     * Click the Edit Note button for the first Fact Find row.
     */
    async clickEditNoteButtonFirstRow() {
        await this.action.clickLocator(this.factFindLocators.editNoteButtonFirstRow);
    }
    /**
     * Enter a Fact Find note in the Add Note modal input field.
     */
    async enterFactFindNoteInEditModal(name) {
        await this.alertServiceLocator.editNoteModalInput.fill(name);
    }
    /**
     * Edit the note on the abandoned Fact Find and verify the updated value is displayed.
     */
    async executeEditNoteOnAbandonedFactFind() {
        const currentNote = (await this.getFirstRowNoteValueCell().textContent())?.trim() ?? '';
        const updatedNote = `Updated Fact Find Note ${Date.now() + 1}`;
        await this.clickEditNoteButtonFirstRow();
        await (0, test_1.expect)(this.alertServiceLocator.editNoteModal).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.alertServiceLocator.editNoteModal).toContainText('Edit Fact Find Note');
        await this.alertServiceLocator.editNoteModalInput.clear();
        await this.enterFactFindNoteInEditModal(updatedNote);
        await this.action.clickLocator(this.alertServiceLocator.editNoteModalSaveButton);
        await (0, test_1.expect)(this.alertServiceLocator.editNoteModal).not.toBeVisible({ timeout: 15000 });
        await this.clickGatewayTableCollapseButton();
        await this.verifyFirstRowNoteValue(updatedNote);
        (0, test_1.expect)(currentNote).not.toBe(updatedNote);
        return updatedNote;
    }
    async executeVerifyUpdatedNoteSavedAndPersisted() {
        const updatedNote = await this.executeEditNoteOnAbandonedFactFind();
        await this.reloadPageAndWait();
        await this.clickGatewayTableCollapseButton();
        await this.verifyFirstRowNoteValue(updatedNote);
    }
    /**
     * Verify the name remains saved against the abandoned Fact Find after page reload.
     */
    async executeVerifyNameSavedAgainstAbandonedFactFind() {
        await this.reloadPageAndWait();
        await (0, test_1.expect)(this.getFirstRowNameCell()).not.toHaveText(/^\s*$/, { timeout: 15000 });
    }
    /**
     * Edit the name on the abandoned Fact Find and verify the updated value is displayed.
     */
    async executeEditNameOnAbandonedFactFind() {
        const currentName = (await this.getFirstRowNameCell().textContent())?.trim() ?? '';
        const updatedName = `Updated Fact Find Name ${Date.now()}`;
        await this.clickEditNameButton();
        await (0, test_1.expect)(this.alertServiceLocator.editNameModal).toBeVisible({ timeout: 15000 });
        await (0, test_1.expect)(this.alertServiceLocator.editNameModalTitle).toContainText('Edit Fact Find Name');
        await this.alertServiceLocator.nameEditModalInput.clear();
        await this.enterFactFindNameInEditModal(updatedName);
        await this.action.clickLocator(this.alertServiceLocator.editNameModalSaveButton);
        await (0, test_1.expect)(this.alertServiceLocator.editNameModal).not.toBeVisible({ timeout: 15000 });
        await this.verifyFirstRowNameValue(updatedName);
        (0, test_1.expect)(currentName).not.toBe(updatedName);
        return updatedName;
    }
    async executeVerifyUpdatedNameSavedAndPersisted() {
        const updatedName = await this.executeEditNameOnAbandonedFactFind();
        await this.reloadPageAndWait();
        await this.verifyFirstRowNameValue(updatedName);
    }
    // ----------------------------------------------------------
    // 2e. Launch Fact Find from history
    // ----------------------------------------------------------
    /**
     * Click the Launch Fact Find link.
     */
    async clickLaunchFactFindButton() {
        await this.action.clickLinkByText('Launch Fact Find', false);
    }
    /**
     * Verify the KYC page is loaded successfully.
     */
    async verifyKYCPage(kycPage) {
        const timeout = GatewayManagementSteps.KYC_TIMEOUT_MS;
        await kycPage.waitForLoadState('domcontentloaded', { timeout }).catch(() => { });
        await kycPage.waitForURL('**/kyc-ff/*', { timeout });
        await (0, test_1.expect)(kycPage).toHaveTitle('Fairstone', { timeout });
        return kycPage;
    }
    /**
     * Start listening for a popup or new page.
     */
    async listenForPopup() {
        return this.page
            .context()
            .waitForEvent('page', { timeout: GatewayManagementSteps.POPUP_TIMEOUT_MS })
            .catch(() => null);
    }
    /**
     * Ensure the Launch Fact Find link is visible on the first row.
     */
    async ensureLaunchFactFindIsVisible() {
        await (0, test_1.expect)(this.factFindLocators.launchFactFindLinkFirstRow).toBeVisible();
    }
    /**
     * Click Launch Fact Find and resolve the target page.
     */
    async launchFactFindAndResolveTarget(popupPromise) {
        await this.clickLaunchFactFindButton();
        const popupPage = await popupPromise;
        return popupPage ?? this.page;
    }
    // ==========================================================
    // 3. CREATE NEW FACT FIND SECTION
    // ==========================================================
    /**
     * Select the Enable new fact find for this client checkbox.
     */
    async selectEnableNewFactFindCheckBox() {
        const checkbox = this.factFindLocators.enableNewFactFindCheckbox;
        await checkbox.check();
        await (0, test_1.expect)(checkbox).toBeChecked();
    }
    /**
     * Click the Confirm & Migrate button.
     */
    async clickConfirmAndMigrateButton() {
        await this.action.clickLinkByText('Confirm & Migrate', false);
    }
    /**
     * Confirm the enable client for new fact find alert.
     */
    async confirmEnableClientForNewFactFind() {
        await this.alert.handleEnableClientForNewFactFind('Yes');
    }
    /**
     * Choose the Fact Find type from the dropdown.
     */
    async chooseFactFindType(value) {
        await this.wait.waitForNetworkIdle(GatewayManagementSteps.KYC_TIMEOUT_MS);
        // Select from dropdown using direct locator approach
        const dropdown = this.page.locator('select').filter({ hasText: 'Choose Fact Find Type' }).or(this.page.getByLabel('Choose Fact Find Type'));
        await dropdown.selectOption(value);
        return value;
    }
    /**
     * Click the Create Fact Find button.
     */
    async clickFactFindButton() {
        await this.action.clickButtonByText('Create Fact Find', false);
    }
    async createFactFind(factFindType) {
        await this.selectEnableNewFactFindCheckBox();
        await this.clickConfirmAndMigrateButton();
        await this.confirmEnableClientForNewFactFind();
        const selectedType = await this.chooseFactFindType(factFindType);
        const createClickedAt = new Date();
        await this.clickFactFindButton();
        return { selectedType, createClickedAt };
    }
    /**
     * Create a Fact Find without launching KYC.
     */
    async executeCreateFactFind(factFindType) {
        const { selectedType } = await this.createFactFind(factFindType);
        await this.waitForFactFindHistoryTable();
        return selectedType;
    }
    /**
     * Create and launch a new Fact Find into the KYC page.
     */
    async createAndLaunchNewFactFind(factFindType) {
        const { selectedType, createClickedAt } = await this.createFactFind(factFindType);
        await this.assertFactFindHistoryRow({
            expectedType: selectedType,
            expectedStatus: 'Open',
            createClickedAt,
        });
        const popupPromise = this.listenForPopup();
        await this.ensureLaunchFactFindIsVisible();
        const kycTargetPage = await this.launchFactFindAndResolveTarget(popupPromise);
        return await this.verifyKYCPage(kycTargetPage);
    }
    // ==========================================================
    // 4. FACT FIND HISTORY ASSERTIONS
    // ==========================================================
    /**
     * Find the created Fact Find row index using Type and Status.
     */
    async findCreatedFactFindRowIndex(expectedType, expectedStatus) {
        const table = this.factFindLocators.factFindHistoryTable;
        const rowIndex = await this.table.findRowIndexByHeaderValues(table, {
            Type: expectedType,
            Status: expectedStatus,
        });
        if (rowIndex < 0) {
            throw new Error(`Could not find created Fact Find row (Type="${expectedType}", Status="${expectedStatus}")`);
        }
        return rowIndex;
    }
    /**
     * Assert the Fact Find History row values for the created Fact Find.
     */
    async assertFactFindHistoryRow(args) {
        const expectedStatus = args.expectedStatus ?? 'Open';
        const rowIndex = await this.findCreatedFactFindRowIndex(args.expectedType, expectedStatus);
        await this.assertFactFindHistoryHeadingVisible();
        await this.assertRowCreatedByMatchesImpersonation(rowIndex);
        await this.assertRowStatusIs(expectedStatus, rowIndex);
        await this.assertRowTypeMatches(args.expectedType, rowIndex);
        const createDateText = await this.getRowCreateDateText(rowIndex);
        await this.assertCreateDateFormat(createDateText);
        this.assertCreateDateIsValidAndRecent(createDateText, args.createClickedAt);
    }
    /**
     * Verify the Fact Find History heading is visible.
     */
    async assertFactFindHistoryHeadingVisible() {
        await (0, test_1.expect)(this.factFindLocators.factFindHistoryHeading).toBeVisible({ timeout: 15000 });
    }
    /**
     * Get the impersonation name from the impersonation banner.
     */
    async getImpersonationName() {
        const raw = await this.factFindLocators.impersonationBanner.innerText();
        return TextHelper_1.TextHelper.normalizeWhitespace(raw);
    }
    /**
     * Get the Created By cell for the specified row.
     */
    async getRowCreatedByCell(rowIndex) {
        return await this.table.getCellByHeader(this.factFindLocators.factFindHistoryTable, 'Created By', rowIndex);
    }
    /**
     * Verify the Created By value matches the impersonation name.
     */
    async assertRowCreatedByMatchesImpersonation(rowIndex) {
        const expected = await this.getImpersonationName();
        const cell = await this.getRowCreatedByCell(rowIndex);
        await (0, test_1.expect)(cell).toHaveText(expected);
    }
    /**
     * Get the Status cell for the specified row.
     */
    async getRowStatusCell(rowIndex) {
        return await this.table.getCellByHeader(this.factFindLocators.factFindHistoryTable, 'Status', rowIndex);
    }
    /**
     * Verify the Status value for the specified row.
     */
    async assertRowStatusIs(expectedStatus, rowIndex) {
        const cell = await this.getRowStatusCell(rowIndex);
        const safe = TextHelper_1.TextHelper.escapeRegExp(expectedStatus);
        await (0, test_1.expect)(cell).toHaveText(new RegExp(`^\\s*${safe}\\s*$`, 'i'));
    }
    /**
     * Get the Type cell for the specified row.
     */
    async getRowTypeCell(rowIndex) {
        return await this.table.getCellByHeader(this.factFindLocators.factFindHistoryTable, 'Type', rowIndex);
    }
    /**
     * Verify the Type value for the specified row.
     */
    async assertRowTypeMatches(expectedType, rowIndex) {
        const cell = await this.getRowTypeCell(rowIndex);
        await (0, test_1.expect)(cell).toHaveText(expectedType);
    }
    /**
     * Get the Create Date cell for the specified row.
     */
    async getRowCreateDateCell(rowIndex) {
        return await this.table.getCellByHeader(this.factFindLocators.factFindHistoryTable, 'Create Date', rowIndex);
    }
    /**
     * Get the Create Date text for the specified row.
     */
    async getRowCreateDateText(rowIndex) {
        const cell = await this.getRowCreateDateCell(rowIndex);
        return TextHelper_1.TextHelper.normalizeWhitespace(await cell.innerText());
    }
    /**
     * Verify the Create Date format is valid.
     */
    async assertCreateDateFormat(createDateText) {
        if (!TextHelper_1.TextHelper.isGatewayDateTime(createDateText)) {
            throw new Error(`Create Date format invalid. Expected a valid Gateway date-time format but got: "${createDateText}"`);
        }
    }
    /**
     * Verify the Create Date is within the acceptable tolerance of the click time.
     */
    assertCreateDateIsValidAndRecent(createDateText, createClickedAt, toleranceMs = 90000) {
        const displayed = TextHelper_1.TextHelper.parseGatewayDateTime(createDateText);
        const differenceMs = Math.abs(displayed.getTime() - createClickedAt.getTime());
        if (differenceMs > toleranceMs) {
            throw new Error([
                `Create Date was not within ${toleranceMs / 1000}s of the expected time.`,
                `Displayed: "${createDateText}" -> ${displayed.toISOString()}`,
                `Expected: ${createClickedAt.toISOString()}`,
                `DiffMs: ${differenceMs} (${(differenceMs / 1000).toFixed(1)}s)`,
            ].join('\n'));
        }
    }
    // ==========================================================
    // 5. HIGH-LEVEL BUSINESS FLOWS
    // ==========================================================
    /**
     * Abandon the first row Fact Find and verify the status is updated.
     */
    async executeAbandonFirstRowFactFind() {
        await this.verifyFirstRowFactFindIsOpen();
        await this.abandonFirstRowFactFind();
        await this.verifyFirstRowFactFindIsAbandoned();
    }
    /**
     * Verify the first row abandoned Fact Find status remains after page reload.
     */
    async executeVerifyFirstRowAbandonmentStatusMaintained() {
        await this.reloadPageAndWait();
        await this.verifyFirstRowFactFindIsAbandoned();
        await this.verifyFirstRowLaunchFactFindNotAvailable();
    }
    /**
     * Verify the overall system response for the first row abandoned Fact Find.
     */
    async executeVerifySystemResponseForFirstRowAbandonedFactFind() {
        const status = await this.getFirstRowFactFindStatus();
        (0, test_1.expect)(status.toLowerCase()).toContain('abandoned');
        await this.verifyFirstRowLaunchFactFindNotAvailable();
    }
    async refreshAfterFactFindCleanup() {
        await (0, TestCleanupHelper_1.cleanupClient1FactFinds)();
        await this.page.reload({ waitUntil: 'domcontentloaded' });
    }
    /**
     * Create a client, create a Fact Find, and abandon the first row Fact Find.
     */
    async createAndAbandonFactFind(sideNav, navBar, factFindType) {
        await this.executeAddClientAndNavigateToFactFindTab(sideNav, navBar);
        await this.createFactFind(factFindType);
        await this.refreshAfterFactFindCleanup();
    }
    // ==========================================================
    // 6. GATEWAY FACT FIND VALIDATION (from GatewayFactFindSteps)
    // ==========================================================
    /* -------------------- Main Flow -------------------- */
    async validateGatewayFactFindData() {
        await this.page.bringToFront();
        await this.page.reload({ waitUntil: 'domcontentloaded' });
        await this.verifyLatestFactFindClientNameMatchesKyc();
        await this.verifyLatestFactFindStatusIsCompleteForKycClient();
        await this.navigateToClientDetailsPage();
        // clear method for contact comparison
        await this.verifyGatewayContactDetailsMatchKyc();
    }
    /**
     * Verifies that the first fact find row has 'Complete' status
     * This is a specific validation for completed fact finds
     */
    async verifyFirstFactFindStatusIsComplete() {
        await this.page.bringToFront();
        await this.page.reload({ waitUntil: 'domcontentloaded' });
        const table = this.factFindLocators.factFindHistoryTable;
        await (0, test_1.expect)(table).toBeVisible({ timeout: 30000 });
        const status = await this.table.getCellTextByHeader(table, 0, 'Status');
        (0, test_1.expect)(status).toBe('Complete');
    }
    /* -------------------- Checks -------------------- */
    async verifyLatestFactFindClientNameMatchesKyc() {
        const kycName = this.getDisplayedKycFullName();
        const table = this.factFindLocators.factFindHistoryTable;
        await (0, test_1.expect)(table).toBeVisible({ timeout: 30000 });
        const rows = await this.table.getRows(table);
        const rowIndex = await this.table.findRowIndex(rows, { containsText: kycName });
        if (rowIndex < 0) {
            throw new Error(`Client "${kycName}" not found in Fact Find History`);
        }
        const clientNameOnTable = this.normalizeName(await this.table.getCellTextByHeader(table, rowIndex, 'Client Names'));
        (0, test_1.expect)(clientNameOnTable).toBe(this.normalizeName(kycName));
    }
    async verifyLatestFactFindStatusIsCompleteForKycClient() {
        const kycName = this.getDisplayedKycFullName();
        const table = this.factFindLocators.factFindHistoryTable;
        await (0, test_1.expect)(table).toBeVisible({ timeout: 30000 });
        const status = await this.table.getCellTextForRowByHeader(table, kycName, 'Status');
        (0, test_1.expect)(TextHelper_1.TextHelper.normalizeWhitespace(status)).toBe('Complete');
    }
    async navigateToClientDetailsPage() {
        await this.navBar.clickNavItem('Client Details');
    }
    /* -------------------- Contact comparison (Gateway UI vs KYC UI) -------------------- */
    async verifyGatewayContactDetailsMatchKyc() {
        // KYC values (already stored earlier from KYC screen)
        const displayedKycMobile = this.getDisplayedKycMobile();
        const displayedKycEmail = this.getDisplayedKycEmail();
        // Gateway values (read directly from Gateway screen)
        const displayedGatewayMobile = await this.getGatewayValueByLabel('Contact Details', 'Mobile Phone');
        const displayedGatewayEmail = await this.getGatewayValueByLabel('Contact Details', 'Email');
        src_1.dataStore.setValue('displayed.gateway.contact.mobile', displayedGatewayMobile);
        src_1.dataStore.setValue('displayed.gateway.contact.email', displayedGatewayEmail);
        this.logger.info?.(`Gateway vs KYC Mobile → Gateway: "${displayedGatewayMobile}", KYC: "${displayedKycMobile}"`);
        this.logger.info?.(`Gateway vs KYC Email  → Gateway: "${displayedGatewayEmail}", KYC: "${displayedKycEmail}"`);
        (0, test_1.expect)(displayedGatewayMobile).toBe(displayedKycMobile);
        (0, test_1.expect)(displayedGatewayEmail).toBe(displayedKycEmail);
    }
}
exports.GatewayManagementSteps = GatewayManagementSteps;
GatewayManagementSteps.KYC_TIMEOUT_MS = 180000;
GatewayManagementSteps.POPUP_TIMEOUT_MS = 10000;
GatewayManagementSteps.FACT_FIND_HISTORY_TIMEOUT_MS = 60000;
//# sourceMappingURL=GatewayManagementSteps.js.map