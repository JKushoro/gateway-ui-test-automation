"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//projects/gateway-ui/tests/smoke/create_client.smoke.spec.ts
const test_1 = require("@playwright/test");
const GatewaySetup_1 = require("@setup/GatewaySetup");
const SideNav_1 = require("@steps/components/SideNav");
const CreateClientSteps_1 = require("@steps/clients/CreateClientSteps");
const SearchClientsSteps_1 = require("@steps/clients/SearchClientsSteps");
test_1.test.describe('Create a Client', () => {
    let page;
    let sideNav;
    let clientSteps;
    let searchSteps;
    test_1.test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await GatewaySetup_1.GatewaySetup.setupForEnvironment(page, 'qa');
        // Initialize services once - eliminates duplication
        sideNav = new SideNav_1.SideNavService(page);
        clientSteps = new CreateClientSteps_1.AddClientSteps(page);
        searchSteps = new SearchClientsSteps_1.SearchClientsSteps(page);
    });
    (0, test_1.test)('Navigate to Add Client page', async () => {
        await clientSteps.executeNavigateToAddClient(sideNav);
    });
    (0, test_1.test)('Create complete Client', async () => {
        await clientSteps.createClient();
    });
    (0, test_1.test)('Search for created client and verify Forename and Surname matches', async () => {
        await searchSteps.executeSearchAndVerifyStoredIndividualClient();
    });
});
//# sourceMappingURL=create_client.smoke.spec.js.map