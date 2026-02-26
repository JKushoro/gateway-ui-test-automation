"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavBarService = void 0;
const NavBarLocators_1 = require("@pages/componentsLocator/NavBarLocators");
const BasePage_1 = require("@framework/core/BasePage");
/**
 * NavBar Service - Business logic for client details navigation bar interactions
 * Uses NavBarComponent for locators and BasePage for actions
 */
class NavBarService extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.component = new NavBarLocators_1.NavBarComponent(page);
    }
    /**
     * Click on navigation item by text
     * @param itemText - Navigation item text (e.g., "Fact Find", "Client Details", "AML")
     */
    async clickNavItem(itemText) {
        const navItem = this.component.getNavItemByText(itemText);
        await this.action.clickLocator(navItem);
        // Wait for page navigation to complete
        await this.wait.waitForTimeout(1000);
    }
}
exports.NavBarService = NavBarService;
//# sourceMappingURL=NavBar.js.map