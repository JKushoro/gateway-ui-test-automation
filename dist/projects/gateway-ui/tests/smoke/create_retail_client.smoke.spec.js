"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// projects/gateway-ui/tests/smoke/create_retail_client.smoke.spec.ts
const test_1 = require("@playwright/test");
const DataStore_1 = require("@framework/utils/DataStore");
const ClientsSearchSteps_1 = require("@steps/gateway/ClientsSearchSteps");
const RetailClientCreationSteps_1 = require("@steps/gateway/RetailClientCreationSteps");
const TestUtils_1 = __importDefault(require("../shared/TestUtils"));
async function arrangeRetailClientServices(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    return {
        testBase,
        clientSteps: new RetailClientCreationSteps_1.RetailClientCreationSteps(testBase.page),
        searchSteps: new ClientsSearchSteps_1.ClientsSearchSteps(testBase.page),
    };
}
async function arrangeAddRetailClientPage(browser) {
    const setup = await arrangeRetailClientServices(browser);
    await setup.clientSteps.executeNavigateToAddClient(setup.testBase.sideNav);
    return setup;
}
async function arrangeCreatedRetailClient(browser) {
    const setup = await arrangeAddRetailClientPage(browser);
    const client = await setup.clientSteps.createClient();
    (0, test_1.expect)(client.forename).toBeTruthy();
    (0, test_1.expect)(client.surname).toBeTruthy();
    return setup;
}
test_1.test.describe('Create a Retail Client', () => {
    let currentSetup;
    test_1.test.beforeEach(async () => {
        (0, DataStore_1.clearWorkerDataStore)();
    });
    test_1.test.afterEach(async () => {
        await currentSetup?.testBase.cleanup();
        currentSetup = undefined;
    });
    (0, test_1.test)('Retail Client - navigates to Add Client page', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeRetailClientServices(browser);
        const setup = currentSetup;
        // Act
        await setup.clientSteps.executeNavigateToAddClient(setup.testBase.sideNav);
        // Assert
        await setup.clientSteps.verifyClientPage();
    });
    (0, test_1.test)('Retail Client - creates client', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAddRetailClientPage(browser);
        const setup = currentSetup;
        // Act
        const client = await setup.clientSteps.createClient();
        // Assert
        (0, test_1.expect)(client.forename).toBeTruthy();
        (0, test_1.expect)(client.surname).toBeTruthy();
    });
    (0, test_1.test)('Retail Client - searches for created client', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeCreatedRetailClient(browser);
        const setup = currentSetup;
        // Act
        const result = await setup.searchSteps.searchAndVerifyStoredIndividualClient();
        // Assert
        (0, test_1.expect)(result.clientFound).toBe(true);
    });
});
//# sourceMappingURL=create_retail_client.smoke.spec.js.map