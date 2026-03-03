"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactFindPageLocators = void 0;
// FactFindPageLocators.ts
const src_1 = require("@/framework/src");
class FactFindPageLocators extends src_1.BasePage {
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
    get addNoteButtonFirstRow() {
        return this.factFindHistoryFirstRow.getByRole('button', { name: /Add Note/i });
    }
    get abandonButtonFirstRow() {
        return this.factFindHistoryFirstRow.getByRole('button', { name: /Abandon/i });
    }
    get launchFactFindLinkFirstRow() {
        return this.factFindHistoryFirstRow.getByRole('link', { name: /Launch Fact Find/i });
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
    get chooseFactFindTypeDropdown() {
        // Most reliable: label-based (your ActionHelper uses label anyway)
        // Here we return the select/input container near the label.
        return this.page.locator('label:has-text("Choose Fact Find Type")').first();
    }
    get createFactFindButton() {
        return this.page.getByRole('button', { name: /Create Fact Find/i }).first();
    }
    get confirmAndMigrateLink() {
        return this.page.getByRole('link', { name: /Confirm\s*&\s*Migrate/i }).first();
    }
}
exports.FactFindPageLocators = FactFindPageLocators;
//# sourceMappingURL=FactFindPageLocators.js.map