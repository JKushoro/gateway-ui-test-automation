"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYCKycFuturePlanningPageLocator = void 0;
const src_1 = require("@/framework/src");
class KYCKycFuturePlanningPageLocator extends src_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
    }
    // ============================
    // Dynamic fields (use methods)
    // ============================
    getRetirementOneOffEventDateInput(rowIndex) {
        return this.page
            .getByTestId(`date-picker-retirement.oneOffEvents.${rowIndex}.retirement.date`)
            .locator('input');
    }
    firstRetirementAmount(rowIndex) {
        return this.page.getByTestId(`input-money-retirement.oneOffEvents.${rowIndex}.retirement.amount`);
    }
}
exports.KYCKycFuturePlanningPageLocator = KYCKycFuturePlanningPageLocator;
//# sourceMappingURL=KYCKycFuturePlanningPageLocator.js.map