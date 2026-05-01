"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// projects/gateway-ui/tests/smoke/abandon_fact_find.smoke.spec.ts
const test_1 = require("@playwright/test");
const TestUtils_1 = __importDefault(require("../shared/TestUtils"));
const TestCleanupHelper_1 = require("@framework/utils/TestCleanupHelper");
const DataStore_1 = require("@framework/utils/DataStore");
/**
 * Abandon Fact Find Test Suite
 *
 * Validates the complete abandonment behavior of a KYC Fact Find:
 * - Creates an active KYC Fact Find
 * - Performs abandon action with modal confirmation
 * - Verifies system prevents launching abandoned fact finds
 * - Confirms abandoned status persistence
 *
 * CI-CD Pipeline Ready: Robust error handling and reliable assertions
 */
test_1.test.describe('Abandon Fact Find', () => {
    test_1.test.beforeEach(async () => {
        // Clear any shared state before each test
        (0, DataStore_1.clearWorkerDataStore)();
    });
    (0, test_1.test)('Complete abandon fact find workflow', async ({ browser }) => {
        const testBase = await TestUtils_1.default.create(browser, 'qa');
        try {
            // Create retail client and navigate to Fact Find tab
            await testBase.factFindSteps.executeAddClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
            // Create Core Fact Find
            await testBase.factFindSteps.executeCreateFactFind('Core Fact Find');
            // Abandon Fact Find with status verification
            await testBase.factFindSteps.executeAbandonFirstRowFactFind();
            // Verify abandoned Fact Find cannot be launched
            await testBase.factFindSteps.executeVerifyFirstRowAbandonedFactFindCannotBeLaunched();
            // Verify abandonment status persists after page reload
            await testBase.factFindSteps.executeVerifyFirstRowAbandonmentStatusMaintained();
            // Verify system response for abandoned Fact Find
            await testBase.factFindSteps.executeVerifySystemResponseForFirstRowAbandonedFactFind();
        }
        finally {
            await (0, TestCleanupHelper_1.cleanupClient1FactFinds)();
            await testBase.cleanup();
        }
    });
});
//# sourceMappingURL=abandon_fact_find.smoke.spec.js.map