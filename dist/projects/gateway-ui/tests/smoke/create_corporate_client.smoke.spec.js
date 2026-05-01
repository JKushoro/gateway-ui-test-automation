"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//projects/gateway-ui/tests/smoke/create_corporate_client.smoke.spec.ts
const test_1 = require("@playwright/test");
const TestUtils_1 = __importDefault(require("../shared/TestUtils"));
const CorporateClientCreationSteps_1 = require("@steps/clients/CorporateClientCreationSteps");
const ClientsSearchSteps_1 = require("@steps/clients/ClientsSearchSteps");
const ClientFilesSteps_1 = require("@steps/clients/ClientFilesSteps");
const DataStore_1 = require("@framework/utils/DataStore");
test_1.test.describe('Create Corporate Client', () => {
    test_1.test.beforeEach(async () => {
        // Clear any shared state before each test
        (0, DataStore_1.clearWorkerDataStore)();
    });
    (0, test_1.test)('Complete corporate client creation workflow', async ({ browser }) => {
        const testBase = await TestUtils_1.default.create(browser, 'qa');
        try {
            // Initialize services
            const clientSteps = new CorporateClientCreationSteps_1.AddCorporateClientSteps(testBase.page);
            const searchSteps = new ClientsSearchSteps_1.ClientsSearchSteps(testBase.page);
            const clientFilesSteps = new ClientFilesSteps_1.ClientFilesSteps(testBase.page);
            // Navigate to Add Corporate Client page
            await clientSteps.executeNavigateToAddCorporateClient(testBase.sideNav);
            // Create complete Corporate Client
            await clientSteps.executeCompleteClientCreation();
            // Search for created client and verify company name matches
            await searchSteps.executeSearchAndVerifyStoredClient();
            // Verify all stored client data matches client details page
            await clientFilesSteps.executeStoredClientDataVerification();
        }
        finally {
            await testBase.cleanup();
        }
    });
});
//# sourceMappingURL=create_corporate_client.smoke.spec.js.map