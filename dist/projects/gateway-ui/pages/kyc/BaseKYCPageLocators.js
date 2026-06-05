"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseKYCPageLocators = void 0;
// BaseKYCPageLocators.ts
const src_1 = require("@/framework/src");
/**
 * Base KYC Page Locators
 * Contains common locators used across all KYC pages
 */
class BaseKYCPageLocators extends src_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
    }
    // ----------------------------------------------------------
    // Common KYC Page Elements
    // ----------------------------------------------------------
    /**
     * Common heading locator for KYC pages
     */
    get pageHeading() {
        return this.page
            .locator('h1, h2, .heading, [data-testid="page-heading"]')
            .first();
    }
    /**
     * Get dropdown element by label text
     */
    getDropdownByLabel(labelText) {
        return this.page
            .locator('select')
            .filter({ hasText: labelText })
            .or(this.page.locator('[role="combobox"]').filter({ hasText: labelText }));
    }
    /**
     * Get select dropdown element
     */
    get selectDropdown() {
        return this.page.locator('select');
    }
    /**
     * Get combobox element
     */
    get comboboxDropdown() {
        return this.page.locator('[role="combobox"]');
    }
}
exports.BaseKYCPageLocators = BaseKYCPageLocators;
//# sourceMappingURL=BaseKYCPageLocators.js.map