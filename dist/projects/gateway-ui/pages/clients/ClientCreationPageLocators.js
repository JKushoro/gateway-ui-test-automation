"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientCreationPageLocators = void 0;
const BasePage_1 = require("@framework/core/BasePage");
/**
 * ClientCreationPageLocators - Page object for individual client creation
 * Contains locators and methods specific to the create client page
 *
 * Note: This page currently uses shared form components from FormsComponent.
 * Alert handling is centralized in AlertService.
 */
class ClientCreationPageLocators extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
    }
    // Global Select2 popup options (Select2 renders one global listbox)
    get s2Options() {
        return this.page.locator('body ul.select2-results__options li.select2-results__option');
    }
    // Adviser Select2
    get adviserTrigger() {
        return this.page
            .locator('.form-group:has(label:has-text("Adviser")) .select2-selection, .form-group:has(label:has-text("Adviser")) .select2-choice')
            .first();
    }
    get adviserRendered() {
        return this.page
            .locator('.form-group:has(label:has-text("Adviser")) .select2-selection__rendered, .form-group:has(label:has-text("Adviser")) .select2-chosen')
            .first();
    }
    // Title Select2
    get titleTrigger() {
        return this.page
            .locator('.form-group:has(label:has-text("Title")) .select2-selection, .form-group:has(label:has-text("Title")) .select2-choice')
            .first();
    }
    get titleRendered() {
        return this.page
            .locator('.form-group:has(label:has-text("Title")) .select2-selection__rendered, .form-group:has(label:has-text("Title")) .select2-chosen')
            .first();
    }
    // Source of Enquiry Select2
    get sourceTrigger() {
        return this.page
            .locator('.form-group:has(label:has-text("Source of Enquiry")) .select2-selection, .form-group:has(label:has-text("Source of Enquiry")) .select2-choice')
            .first();
    }
    get sourceRendered() {
        return this.page
            .locator('.form-group:has(label:has-text("Source of Enquiry")) .select2-selection__rendered, .form-group:has(label:has-text("Source of Enquiry")) .select2-chosen')
            .first();
    }
}
exports.ClientCreationPageLocators = ClientCreationPageLocators;
//# sourceMappingURL=ClientCreationPageLocators.js.map