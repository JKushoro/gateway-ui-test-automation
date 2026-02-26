"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//projects/gateway-ui/tests/smoke/create_retail_client.smoke.spec.ts
const test_1 = require("@playwright/test");
const GatewaySetup_1 = require("@setup/GatewaySetup");
const SideNav_1 = require("@steps/components/SideNav");
const RetailClientCreationSteps_1 = require("@steps/clients/RetailClientCreationSteps");
const ClientsSearchSteps_1 = require("@steps/clients/ClientsSearchSteps");
test_1.test.describe('Create a Retail Client', () => {
    let page;
    let sideNav;
    let clientSteps;
    let searchSteps;
    test_1.test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await GatewaySetup_1.GatewaySetup.setupForEnvironment(page, 'qa');
        // Initialize services once - eliminates duplication
        sideNav = new SideNav_1.SideNavService(page);
        clientSteps = new RetailClientCreationSteps_1.RetailClientCreationSteps(page);
        searchSteps = new ClientsSearchSteps_1.ClientsSearchSteps(page);
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
    test_1.test.afterAll(async () => {
        await page?.close();
    });
});
//# sourceMappingURL=create_retail_client.smoke.spec.js.map