"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycInvestmentKnowledgeAndPreferencesPageLocators = void 0;
const src_1 = require("@/framework/src");
class KycInvestmentKnowledgeAndPreferencesPageLocators extends src_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
    }
    /* =========================
       Responsible Investment Framework
    ========================= */
    get responsibleInvestmentFrameworkBox() {
        return this.page
            .locator('div.bg-blue-50')
            .filter({
            hasText: /Responsible Investment Framework/i,
        })
            .first();
    }
    get responsibleInvestmentFrameworkTitle() {
        return this.responsibleInvestmentFrameworkBox.getByText("Fairstone's Responsible Investment Framework", { exact: true });
    }
    get negativeScreensHeading() {
        return this.responsibleInvestmentFrameworkBox.getByText(/^Negative Screens\b/i);
    }
    get carbonReductionHeading() {
        return this.responsibleInvestmentFrameworkBox.getByText(/^Carbon Reduction\b/i);
    }
    get positiveOutcomesHeading() {
        return this.responsibleInvestmentFrameworkBox.getByText(/^Positive Outcomes\b/i);
    }
    /* =========================
     Negative Screens (Checkbox Group)
  ========================= */
    get negativeScreensFieldset() {
        return this.page.locator('fieldset[aria-labelledby="person.negativeScreens"]');
    }
    get negativeScreensCheckboxLabels() {
        return this.negativeScreensFieldset.locator('label');
    }
    get negativeScreensCheckboxInputs() {
        return this.negativeScreensFieldset.locator('input[type="checkbox"]');
    }
}
exports.KycInvestmentKnowledgeAndPreferencesPageLocators = KycInvestmentKnowledgeAndPreferencesPageLocators;
//# sourceMappingURL=KycInvestmentKnowledgeAndPreferencesPageLocators.js.map