"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayFactFindSteps = void 0;
const src_1 = require("@/framework/src");
const test_1 = require("@playwright/test");
const ClientDetailsPageLocators_1 = require("@pages/clients/clientFiles/ClientDetailsPageLocators");
const NavBar_1 = require("@steps/components/NavBar");
const FactFindPageLocators_1 = require("@pages/clients/clientFiles/FactFindPageLocators");
class GatewayFactFindSteps extends src_1.BasePage {
    constructor(page) {
        super(page);
        this.clientDetailsPageLocators = new ClientDetailsPageLocators_1.ClientDetailsPageLocators(page);
        this.factFindLocators = new FactFindPageLocators_1.FactFindPageLocators(page);
        this.navBar = new NavBar_1.NavBarService(page);
    }
    normalizeName(value) {
        return String(value ?? '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    normalizeText(text) {
        return text.replace(/\s+/g, ' ').trim().replace(/^"|"$/g, '');
    }
    async firstExisting(...locators) {
        for (const l of locators) {
            if ((await l.count()) > 0)
                return l;
        }
        return locators[0];
    }
    async readCellValue(cell) {
        await this.wait.waitForElement(cell);
        const link = cell.locator('a').first();
        if ((await link.count()) > 0)
            return this.normalizeText(await link.innerText());
        const span = cell.locator('span').first();
        if ((await span.count()) > 0)
            return this.normalizeText(await span.innerText());
        return this.normalizeText(await cell.innerText());
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
    /* -------------------- Checks -------------------- */
    async verifyLatestFactFindClientNameMatchesKyc() {
        const kycName = this.getDisplayedKycFullName();
        const section = this.factFindLocators.gatewaySectionByTitle('Fact Find History');
        const table = this.factFindLocators.factFindTableInSection(section);
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
        const section = this.factFindLocators.gatewaySectionByTitle('Fact Find History');
        const table = this.factFindLocators.factFindTableInSection(section);
        await (0, test_1.expect)(table).toBeVisible({ timeout: 30000 });
        const status = await this.table.getCellTextForRowByHeader(table, kycName, 'Status');
        (0, test_1.expect)(this.normalizeText(status)).toBe('Complete');
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
exports.GatewayFactFindSteps = GatewayFactFindSteps;
//# sourceMappingURL=GatewayFactFindSteps.js.map