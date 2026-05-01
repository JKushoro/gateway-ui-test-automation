"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// projects/gateway-ui/tests/smoke/abandoned_fact_find_name.smoke.spec.ts
const test_1 = require("@playwright/test");
const TestUtils_1 = __importDefault(require("../shared/TestUtils"));
const TestCleanupHelper_1 = require("@framework/utils/TestCleanupHelper");
const DataStore_1 = require("@framework/utils/DataStore");
/**
 * Abandoned Fact Find Name Test Suite
 *
 * Validates that a name can be added and edited against an abandoned KYC Fact Find:
 * - Creates an active KYC Fact Find
 * - Abandons the Fact Find
 * - Adds a name to the abandoned Fact Find
 * - Verifies the name is saved successfully
 * - Edits the name on the abandoned Fact Find
 * - Verifies the updated name is saved and persisted
 *
 * CI-CD Pipeline Ready: Robust assertions and reliable persistence checks
 */
test_1.test.describe('Verify a name can be added to an abandoned KYC Fact Find', () => {
    test_1.test.beforeEach(async () => {
        // Clear any shared state before each test
        (0, DataStore_1.clearWorkerDataStore)();
    });
    (0, test_1.test)('Complete abandoned fact find name workflow', async ({ browser }) => {
        const testBase = await TestUtils_1.default.create(browser, 'qa');
        try {
            // Create and Abandon Create Core Fact Find
            await testBase.factFindSteps.createAndAbandonFactFind(testBase.sideNav, testBase.navBar, 'Core Fact Find');
            // Verify the Name column is blank after abandoning the Fact Find
            await testBase.factFindSteps.verifyFirstRowNameIsBlank();
            // Verify a name can be added to an abandoned Fact Find and the Name column is populated
            await testBase.factFindSteps.executeAddNameToAbandonedFactFind();
            // Verify name remains saved after page reload
            await testBase.factFindSteps.executeVerifyNameSavedAgainstAbandonedFactFind();
            // Edit name on abandoned Fact Find
            await testBase.factFindSteps.executeEditNameOnAbandonedFactFind();
            // Verify updated name is saved and persisted
            await testBase.factFindSteps.executeVerifyUpdatedNameSavedAndPersisted();
        }
        finally {
            await (0, TestCleanupHelper_1.cleanupClient1FactFinds)();
            await testBase.cleanup();
        }
    });
});
//# sourceMappingURL=abandoned_fact_find_name.smoke.spec.js.map