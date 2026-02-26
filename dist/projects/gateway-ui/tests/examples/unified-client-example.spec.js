"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Example test showing how to use the unified CreateClientSteps with parameters
const test_1 = require("@playwright/test");
const GatewaySetup_1 = require("@setup/GatewaySetup");
const SideNav_1 = require("@steps/components/SideNav");
const CreateClientSteps_1 = require("@steps/clients/CreateClientSteps");
test_1.test.describe('Unified Client Creation Example', () => {
    let page;
    let sideNav;
    let clientSteps;
    test_1.test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await GatewaySetup_1.GatewaySetup.setupForEnvironment(page, 'qa');
        // Initialize services
        sideNav = new SideNav_1.SideNavService(page);
        clientSteps = new CreateClientSteps_1.CreateClientSteps(page);
    });
    (0, test_1.test)('Create Individual Client using parameter', async () => {
        // Navigate to individual client page
        await clientSteps.executeNavigateToAddClient(sideNav, 'individual');
        // Create individual client
        await clientSteps.executeCompleteClientCreation('individual');
    });
    (0, test_1.test)('Create Corporate Client using parameter', async () => {
        // Navigate to corporate client page
        await clientSteps.executeNavigateToAddClient(sideNav, 'corporate');
        // Create corporate client
        await clientSteps.executeCompleteClientCreation('corporate');
    });
    (0, test_1.test)('Create clients using unified method with different parameters', async () => {
        // Individual client
        await clientSteps.executeNavigateToAddClient(sideNav, 'individual');
        const individualResult = await clientSteps.createClient('individual');
        console.log('Individual client created:', individualResult);
        // Corporate client
        await clientSteps.executeNavigateToAddClient(sideNav, 'corporate');
        const corporateResult = await clientSteps.createClient('corporate');
        console.log('Corporate client created:', corporateResult);
    });
});
//# sourceMappingURL=unified-client-example.spec.js.map