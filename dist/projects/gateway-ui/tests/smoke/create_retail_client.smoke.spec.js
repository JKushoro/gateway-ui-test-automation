"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//projects/gateway-ui/tests/smoke/create_retail_client.smoke.spec.ts
const test_1 = require("@playwright/test");
const TestUtils_1 = __importDefault(require("../shared/TestUtils"));
const RetailClientCreationSteps_1 = require("@steps/gateway/RetailClientCreationSteps");
const ClientsSearchSteps_1 = require("@steps/gateway/ClientsSearchSteps");
const DataStore_1 = require("@framework/utils/DataStore");
test_1.test.describe('Create a Retail Client', () => {
    test_1.test.beforeEach(async () => {
        // Clear any shared state before each test
        (0, DataStore_1.clearWorkerDataStore)();
    });
    (0, test_1.test)('Complete retail client creation workflow', async ({ browser }) => {
        const testBase = await TestUtils_1.default.create(browser, 'qa');
        try {
            // Initialize services
            const clientSteps = new RetailClientCreationSteps_1.RetailClientCreationSteps(testBase.page);
            const searchSteps = new ClientsSearchSteps_1.ClientsSearchSteps(testBase.page);
            // Navigate to Add Client page
            await clientSteps.executeNavigateToAddClient(testBase.sideNav);
            // Create complete Client
            await clientSteps.createClient();
            // Search for created client and verify Forename and Surname matches
            await searchSteps.executeSearchAndVerifyStoredIndividualClient();
        }
        finally {
            await testBase.cleanup();
        }
    });
});
//# sourceMappingURL=create_retail_client.smoke.spec.js.map