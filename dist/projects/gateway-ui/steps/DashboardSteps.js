"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSteps = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("@framework/core/BasePage");
/**
 * DashboardSteps - Contains side menu navigation logic and dashboard actions
 * Now extends BaseSteps to eliminate helper duplication
 */
class DashboardSteps extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
    }
    /**
     * Verify dashboard is loaded with URL and title checks
     */
    async verifyDashboard() {
        await this.wait.waitForUrlToMatch('**/dashboard/**');
        await (0, test_1.expect)(this.page).toHaveTitle('Gateway | Development dashboard');
    }
}
exports.DashboardSteps = DashboardSteps;
//# sourceMappingURL=DashboardSteps.js.map