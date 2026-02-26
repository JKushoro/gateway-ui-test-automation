"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Example test showing how to use the NavBar component
const test_1 = require("@playwright/test");
const GatewaySetup_1 = require("@setup/GatewaySetup");
const SideNav_1 = require("@steps/components/SideNav");
const NavBar_1 = require("@steps/components/NavBar");
const SearchClientsSteps_1 = require("@steps/clients/SearchClientsSteps");
test_1.test.describe('NavBar Component Example', () => {
    let page;
    let sideNav;
    let navBar;
    let searchSteps;
    test_1.test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await GatewaySetup_1.GatewaySetup.setupForEnvironment(page, 'qa');
        // Initialize services
        sideNav = new SideNav_1.SideNavService(page);
        navBar = new NavBar_1.NavBarService(page);
        searchSteps = new SearchClientsSteps_1.SearchClientsSteps(page);
    });
    (0, test_1.test)('Navigate to client and use NavBar to go to Fact Find', async () => {
        // First, search for any client to get to client details page
        await sideNav.clickSideMenuItem('Clients', 'Search Clients');
        await searchSteps.searchClients(); // Search without criteria to get any client
        // Click on first client in results (assuming there are results)
        const firstClientLink = page.locator('table.gatewaytable tbody tr:first-child a[href*="/clientfiles/details/"]').first();
        await firstClientLink.click();
        // Now use NavBar to navigate to Fact Find
        await navBar.clickNavItem('Fact Find');
        // Verify we're on the Fact Find page
        await page.waitForURL('**/clientfiles/factfind/**');
    });
    (0, test_1.test)('Navigate using NavBar with parameter (Fact Find)', async () => {
        // Assuming we're already on a client details page from previous test
        // Use the generic method with parameter
        await navBar.clickNavItem('Fact Find');
        // Verify we're on the Fact Find page
        await page.waitForURL('**/clientfiles/factfind/**');
    });
    (0, test_1.test)('Navigate to multiple sections using NavBar', async () => {
        // Navigate to different sections using the generic method
        await navBar.clickNavItem('Client Details');
        await navBar.clickNavItem('AML');
        await navBar.clickNavItem('Notes');
        await navBar.clickNavItem('Activities');
    });
});
//# sourceMappingURL=navbar-example.spec.js.map