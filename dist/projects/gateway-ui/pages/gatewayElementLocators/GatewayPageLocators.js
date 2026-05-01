"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayPageLocators = void 0;
// GatewayPageLocators.ts
const src_1 = require("@/framework/src");
class GatewayPageLocators extends src_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
    }
    // ----------------------------------------------------------
    // Global / shared areas
    // ----------------------------------------------------------
    /**
     * Impersonation banner (top-right user display)
     * Example: <div class="divImpersonation ...">John Kushoro <b class="caret"></b></div>
     */
    get impersonationBanner() {
        return this.page.locator('div.divImpersonation').first();
    }
    /**
     * Gateway section container by title (ibox-based layout)
     */
    gatewaySectionByTitle(title) {
        return this.page
            .locator('div.ibox.float-e-margins')
            .filter({ has: this.page.locator('.ibox-title h5', { hasText: title }) })
            .first();
    }
    // ----------------------------------------------------------
    // Fact Find History section
    // ----------------------------------------------------------
    get factFindHistorySection() {
        return this.gatewaySectionByTitle('Fact Find History');
    }
    get factFindHistoryHeading() {
        return this.factFindHistorySection.locator('.ibox-title h5', { hasText: 'Fact Find History' });
    }
    /**
     * Table inside Fact Find History section
     */
    get factFindHistoryTable() {
        return this.factFindHistorySection.locator('table.gatewaytable').first();
    }
    get factFindHistoryHeaderCells() {
        return this.factFindHistoryTable.locator('thead th');
    }
    get factFindHistoryFirstRow() {
        return this.factFindHistoryTable.locator('tbody tr').first();
    }
    get factFindHistoryFirstRowCells() {
        return this.factFindHistoryFirstRow.locator('td');
    }
    // First-row action buttons/links
    get addNameButtonFirstRow() {
        return this.factFindHistoryFirstRow.getByRole('button', { name: /Add Name/i });
    }
    get editNameButtonFirstRow() {
        return this.factFindHistoryFirstRow.getByRole('button', { name: /Edit Name/i });
    }
    get addNoteButtonFirstRow() {
        return this.factFindHistoryFirstRow.getByRole('button', { name: /Add Note/i });
    }
    get abandonButtonFirstRow() {
        return this.factFindHistoryFirstRow.getByRole('button', { name: /Abandon/i });
    }
    get launchFactFindLinkFirstRow() {
        return this.factFindHistoryFirstRow.getByRole('link', { name: /Launch Fact Find/i });
    }
    get editNoteButtonFirstRow() {
        return this.firstRowNoteHistoryFirstRow.getByRole('button', { name: /Edit Note/i });
    }
    /**
     * Expanded detail row shown under the first Fact Find row.
     */
    get factFindHistoryFirstRowDetail() {
        return this.factFindHistoryTable.locator('tbody tr.footable-row-detail').first();
    }
    /**
     * Note history table inside the expanded first Fact Find row.
     */
    get firstRowNoteHistoryTable() {
        return this.factFindHistoryFirstRowDetail.locator('table.gatewaytable').first();
    }
    /**
     * First row in the inner note history table.
     */
    get firstRowNoteHistoryFirstRow() {
        return this.firstRowNoteHistoryTable.locator('tbody tr').first();
    }
    /**
     * Cells for the first row in the inner note history table.
     */
    get firstRowNoteHistoryFirstRowCells() {
        return this.firstRowNoteHistoryFirstRow.locator('td');
    }
    // ----------------------------------------------------------
    // Create Fact Find controls (page-level)
    // ----------------------------------------------------------
    checkboxByLabel(labelText) {
        return this.page
            .locator(`label:has-text("${labelText}")`)
            .first()
            .locator('xpath=following::input[@type="checkbox"][1]')
            .first();
    }
    get enableNewFactFindCheckbox() {
        return this.checkboxByLabel('Enable new fact find for this client');
    }
    get expandFirstRowDetailsButton() {
        return this.factFindHistoryFirstRow.locator('i.gatewaytable-collapse');
    }
    // ----------------------------------------------------------
    // Cell content locators
    // ----------------------------------------------------------
    /**
     * Get link element within a cell
     */
    getCellLink(cell) {
        return cell.locator('a').first();
    }
    /**
     * Get span element within a cell
     */
    getCellSpan(cell) {
        return cell.locator('span').first();
    }
    /**
     * Get the Status cell for the first Fact Find row (column 1)
     */
    getFirstRowStatusCell() {
        return this.factFindHistoryFirstRowCells.nth(1);
    }
    /**
     * Get the Name cell for the first Fact Find row (column 2)
     */
    getFirstRowNameCell() {
        return this.factFindHistoryFirstRowCells.nth(2);
    }
    /**
     * Get the Note cell from the first row of the expanded note history table
     */
    getFirstRowNoteValueCell() {
        return this.firstRowNoteHistoryFirstRowCells.nth(1);
    }
}
exports.GatewayPageLocators = GatewayPageLocators;
//# sourceMappingURL=GatewayPageLocators.js.map