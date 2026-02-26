"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//projects/gateway-ui/tests/smoke/create_corporate_client.smoke.spec.ts
const test_1 = require("@playwright/test");
const GatewaySetup_1 = require("@setup/GatewaySetup");
const SideNav_1 = require("@steps/components/SideNav");
const CorporateClientCreationSteps_1 = require("@steps/clients/CorporateClientCreationSteps");
const ClientsSearchSteps_1 = require("@steps/clients/ClientsSearchSteps");
const ClientFilesSteps_1 = require("@steps/clients/ClientFilesSteps");
test_1.test.describe('Create Corporate Client', () => {
    let page;
    let sideNav;
    let clientSteps;
    let searchSteps;
    let clientFilesSteps;
    test_1.test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await GatewaySetup_1.GatewaySetup.setupForEnvironment(page, 'qa');
        // Initialize services once - eliminates duplication
        sideNav = new SideNav_1.SideNavService(page);
        clientSteps = new CorporateClientCreationSteps_1.AddCorporateClientSteps(page);
        searchSteps = new ClientsSearchSteps_1.ClientsSearchSteps(page);
        clientFilesSteps = new ClientFilesSteps_1.ClientFilesSteps(page);
    });
    (0, test_1.test)('Navigate to Add Corporate Client page', async () => {
        await clientSteps.executeNavigateToAddCorporateClient(sideNav);
    });
    (0, test_1.test)('Create complete Corporate Client', async () => {
        await clientSteps.executeCompleteClientCreation();
    });
    (0, test_1.test)('Search for created client and verify company name matches', async () => {
        await searchSteps.executeSearchAndVerifyStoredClient();
    });
    (0, test_1.test)('Verify all stored client data matches client details page', async () => {
        await clientFilesSteps.executeStoredClientDataVerification();
    });
    test_1.test.afterAll(async () => {
        await page?.close();
    });
});
//# sourceMappingURL=create_corporate_client.smoke.spec.js.map