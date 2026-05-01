"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycContributionsAndProtectionPageLocators = void 0;
const src_1 = require("@/framework/src");
class KycContributionsAndProtectionPageLocators extends src_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
    }
    // ============================
    // Children / Dependants
    // ============================
    get contributeDetails() {
        return this.page.getByTestId('input-retirement.contributeDetails');
    }
    get annualAllowanceDetails() {
        return this.page.getByTestId('input-retirement.annualAllowanceDetails');
    }
    get carryForwardDetails() {
        return this.page.getByTestId('input-retirement.carryForwardDetails');
    }
}
exports.KycContributionsAndProtectionPageLocators = KycContributionsAndProtectionPageLocators;
//# sourceMappingURL=KycContributionsAndProtectionPageLocators.js.map