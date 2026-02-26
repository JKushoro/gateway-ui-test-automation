"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPage = void 0;
//projects/gateway-ui/pages/DashboardPage.ts
const BasePage_1 = require("@framework/core/BasePage");
/**
 * DashboardPage - Page Object Model for the main dashboard
 * Implements proper OOP principles with clear encapsulation and abstraction
 */
class DashboardPage extends BasePage_1.BasePage {
    constructor(page, config = {}) {
        super(page, config);
        // Private locators
        this.sideMenuRoot = this.page.locator('#side-menu');
    }
    // Public methods
    getSideMenuItemByText(menuText) {
        return this.sideMenuRoot
            .locator(`> li > a.gw-navmenu:has(span.nav-label:has-text("${menuText}"))`)
            .first();
    }
    getSubmenuItemByText(submenuText) {
        return this.sideMenuRoot
            .locator(`ul.nav-second-level a.gw-navmenu:has-text("${submenuText}")`)
            .first();
    }
}
exports.DashboardPage = DashboardPage;
//# sourceMappingURL=DashboardPage.js.map