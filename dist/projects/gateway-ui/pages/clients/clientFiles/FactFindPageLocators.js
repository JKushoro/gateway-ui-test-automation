"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactFindPageLocators = void 0;
// FactFindPageLocators.ts
const src_1 = require("@/framework/src");
class FactFindPageLocators extends src_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
    }
    /**
     * Main Fact Find table (page-level)
     */
    get factFindTable() {
        return this.page.locator('table.gatewaytable');
    }
    /**
     * Fact Find table scoped to a given Gateway section
     * (e.g. "Fact Find History", "Latest Fact Finds")
     */
    factFindTableInSection(section) {
        return section.locator('table.gatewaytable');
    }
    get factFindHeaderCells() {
        return this.factFindTable.locator('thead th');
    }
    get factFindFirstRowCells() {
        return this.factFindTable.locator('tbody tr').first().locator('td');
    }
    get launchFactFindButton() {
        return this.factFindTable
            .locator('tbody tr')
            .first()
            .getByRole('link', { name: /Launch Fact Find/i });
    }
    checkboxByLabel(labelText) {
        return this.page
            .locator(`label:has-text("${labelText}")`)
            .first()
            .locator('xpath=following::input[@type="checkbox"][1]')
            .first();
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
}
exports.FactFindPageLocators = FactFindPageLocators;
//# sourceMappingURL=FactFindPageLocators.js.map