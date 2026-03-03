"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideNavComponent = void 0;
/**
 * Side Navigation Component Locators
 * All selectors for the side navigation menu functionality
 */
class SideNavComponent {
    constructor(page) {
        this.page = page;
    }
    // Root side menu
    get sideMenuRoot() {
        return this.page.locator('#side-menu');
    }
    // --- Main Menu Items ---
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
exports.SideNavComponent = SideNavComponent;
//# sourceMappingURL=SideNavLocators.js.map