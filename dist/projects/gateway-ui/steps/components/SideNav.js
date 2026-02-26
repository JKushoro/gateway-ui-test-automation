"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideNavService = void 0;
const SideNavLocators_1 = require("@pages/componentsLocator/SideNavLocators");
const BasePage_1 = require("@framework/core/BasePage");
/**
 * SideNav Service - Business logic for side navigation interactions
 * Uses SideNavComponent for locators and BaseSteps for actions
 */
class SideNavService extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.component = new SideNavLocators_1.SideNavComponent(page);
    }
    /**
     * Click on side menu item by text with optional submenu item
     * @param menuText - Main menu item text (e.g., "Clients", "Administration")
     * @param submenuText - Optional submenu item text (e.g., "Search Clients", "Users")
     */
    async clickSideMenuItem(menuText, submenuText) {
        // Click main menu item
        const mainMenuItem = this.component.getSideMenuItemByText(menuText);
        await this.action.clickLocator(mainMenuItem);
        // If submenu item is specified, click it
        if (submenuText) {
            // Wait for submenu to expand and become visible
            const submenuItem = this.component.getSubmenuItemByText(submenuText);
            // Wait for the submenu item to be visible (up to 5 seconds)
            await this.wait.waitForElement(submenuItem, 5000);
            // Click submenu item
            await this.action.clickLocator(submenuItem);
        }
    }
}
exports.SideNavService = SideNavService;
//# sourceMappingURL=SideNav.js.map