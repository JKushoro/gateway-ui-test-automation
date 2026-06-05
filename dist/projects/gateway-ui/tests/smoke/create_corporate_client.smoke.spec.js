"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// projects/gateway-ui/tests/smoke/create_corporate_client.smoke.spec.ts
const test_1 = require("@playwright/test");
const DataStore_1 = require("@framework/utils/DataStore");
const CorporateClientCreationSteps_1 = require("@steps/clients/CorporateClientCreationSteps");
const ClientFilesSteps_1 = require("@steps/clients/ClientFilesSteps");
const ClientsSearchSteps_1 = require("@steps/clients/ClientsSearchSteps");
const TestUtils_1 = __importDefault(require("../shared/TestUtils"));
async function arrangeCorporateClientServices(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    return {
        testBase,
        clientSteps: new CorporateClientCreationSteps_1.AddCorporateClientSteps(testBase.page),
        searchSteps: new ClientsSearchSteps_1.ClientsSearchSteps(testBase.page),
        clientFilesSteps: new ClientFilesSteps_1.ClientFilesSteps(testBase.page),
    };
}
async function arrangeCorporateClientPage(browser) {
    const setup = await arrangeCorporateClientServices(browser);
    await setup.clientSteps.executeNavigateToAddCorporateClient(setup.testBase.sideNav);
    return setup;
}
async function arrangeCreatedCorporateClient(browser) {
    const setup = await arrangeCorporateClientPage(browser);
    const result = await setup.clientSteps.createCorporateClient();
    (0, test_1.expect)(result.formData.companyName).toBeTruthy();
    return setup;
}
async function arrangeCreatedCorporateClientDetailsPage(browser) {
    const setup = await arrangeCreatedCorporateClient(browser);
    const result = await setup.searchSteps.searchAndVerifyStoredClient();
    (0, test_1.expect)(result.clientFound).toBe(true);
    return setup;
}
test_1.test.describe('Create Corporate Client', () => {
    let currentSetup;
    test_1.test.beforeEach(async () => {
        (0, DataStore_1.clearWorkerDataStore)();
    });
    test_1.test.afterEach(async () => {
        await currentSetup?.testBase.cleanup();
        currentSetup = undefined;
    });
    (0, test_1.test)('Corporate Client - navigates to Add Corporate Client page', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeCorporateClientServices(browser);
        const setup = currentSetup;
        // Act
        await setup.clientSteps.executeNavigateToAddCorporateClient(setup.testBase.sideNav);
        // Assert
        await setup.clientSteps.verifyCorporateClientPage();
    });
    (0, test_1.test)('Corporate Client - creates corporate client', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeCorporateClientPage(browser);
        const setup = currentSetup;
        // Act
        const result = await setup.clientSteps.createCorporateClient();
        // Assert
        (0, test_1.expect)(result.formData.companyName).toBeTruthy();
        (0, test_1.expect)(result.selectedAddress).toBeTruthy();
    });
    (0, test_1.test)('Corporate Client - searches for created client', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeCreatedCorporateClient(browser);
        const setup = currentSetup;
        // Act
        const result = await setup.searchSteps.searchAndVerifyStoredClient();
        // Assert
        (0, test_1.expect)(result.clientFound).toBe(true);
    });
    (0, test_1.test)('Corporate Client - verifies stored client data matches client details page', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeCreatedCorporateClientDetailsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.clientFilesSteps.verifyClientFilesPage();
        // Assert
        await setup.clientFilesSteps.assertStoredClientDataMatches();
    });
});
//# sourceMappingURL=create_corporate_client.smoke.spec.js.map