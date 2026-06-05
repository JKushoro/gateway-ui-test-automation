"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsolatedTestBase = void 0;
const test_1 = require("@playwright/test");
const TestIsolationApiClient_1 = require("@framework/utils/TestIsolationApiClient");
const TestUtils_1 = __importDefault(require("./TestUtils"));
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
/**
 * Base class for isolated KYC form tests that eliminates code duplication
 * Handles common setup patterns:
 * - Storage state configuration
 * - TestIsolationApiClient setup
 * - Client creation and cleanup
 * - Common test structure
 */
class IsolatedTestBase {
    /**
     * Sets up the test describe block with common configuration
     * @param testName - Name for the test describe block
     * @param testCallback - Callback containing the actual test implementation
     */
    static setupTest(testName, testCallback) {
        test_1.test.describe(testName, () => {
            test_1.test.use({ storageState: 'playwright/.auth/user.json' });
            test_1.test.beforeAll(async () => {
                this.api = new TestIsolationApiClient_1.TestIsolationApiClient('qa');
                this.clientEmail = `testuser${Date.now()}@example.com`;
                const response = await this.api.api.createClient({
                    forename: 'Pipeline',
                    surname: 'Automation',
                    emailAddress: this.clientEmail,
                    migrated: true,
                });
                this.clientId = response.id;
            });
            test_1.test.afterAll(async () => {
                if (this.clientId && this.api) {
                    await this.api.cleanupClient(this.clientId);
                }
            });
            testCallback();
        });
    }
    /**
     * Common test setup that creates BaseTest instance and navigates to the specified KYC page
     * @param browser - Playwright browser instance
     * @param pageName - Name of the KYC page to navigate to (e.g., 'Income', 'Property & Assets')
     * @returns Object containing testBase, kycPage, and actionHelper
     */
    static async setupKycPageTest(browser, pageName) {
        const testBase = await TestUtils_1.default.create(browser, 'qa');
        await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
        const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
        // Navigate to the specified page
        const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
        await actionHelper.selectCustomRadioOptionByLabel(pageName);
        return { testBase, kycPage, actionHelper };
    }
    /**
     * Common test cleanup
     * @param testBase - BaseTest instance to cleanup
     * @param kycPage - KYC page to close
     */
    static async cleanup(testBase, kycPage) {
        await kycPage.close();
        await testBase.cleanup();
    }
}
exports.IsolatedTestBase = IsolatedTestBase;
//# sourceMappingURL=IsolatedTestBase.js.map