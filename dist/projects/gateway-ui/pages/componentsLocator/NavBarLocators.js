"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavBarComponent = void 0;
/**
 * NavBar Component Locators
 * All selectors for the client details navigation bar functionality
 */
class NavBarComponent {
    constructor(page) {
        this.page = page;
    }
    // Root navbar
    get navBarRoot() {
        return this.page.locator('nav.navbar.navbar-default.gatewaynavbar');
    }
    // Navigation list
    get navList() {
        return this.navBarRoot.locator('ul.nav.navbar-nav');
    }
    // --- Navigation Items ---
    /**
     * Get navigation item by text content
     * @param itemText - The text content of the navigation item (e.g., "Fact Find", "Client Details")
     */
    getNavItemByText(itemText) {
        return this.navList.locator(`li a:has-text("${itemText}")`).first();
    }
}
exports.NavBarComponent = NavBarComponent;
//# sourceMappingURL=NavBarLocators.js.map