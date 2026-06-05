"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupIsolatedTestClient = setupIsolatedTestClient;
exports.cleanupIsolatedTestClient = cleanupIsolatedTestClient;
exports.setupKycPageTest = setupKycPageTest;
exports.cleanupKycPageTest = cleanupKycPageTest;
exports.configureIsolatedTest = configureIsolatedTest;
const test_1 = require("@playwright/test");
const TestIsolationApiClient_1 = require("@framework/utils/TestIsolationApiClient");
const TestUtils_1 = __importDefault(require("./TestUtils"));
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
/**
 * Sets up test isolation API client and creates a test client
 * Use this in test.beforeAll() hooks
 */
async function setupIsolatedTestClient() {
    const api = new TestIsolationApiClient_1.TestIsolationApiClient('qa');
    const clientEmail = `testuser${Date.now()}@example.com`;
    const response = await api.api.createClient({
        forename: 'Pipeline',
        surname: 'Automation',
        emailAddress: clientEmail,
        migrated: true,
    });
    return {
        clientId: response.id,
        clientEmail,
        api,
    };
}
/**
 * Cleans up the test client
 * Use this in test.afterAll() hooks
 */
async function cleanupIsolatedTestClient(setup) {
    if (setup.clientId && setup.api) {
        await setup.api.cleanupClient(setup.clientId);
    }
}
/**
 * Common test setup that creates BaseTest instance and navigates to the specified KYC page
 * @param browser - Playwright browser instance
 * @param pageName - Name of the KYC page to navigate to (e.g., 'Income', 'Property & Assets')
 * @returns Object containing testBase, kycPage, and actionHelper
 */
async function setupKycPageTest(browser, pageName) {
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
async function cleanupKycPageTest(testBase, kycPage) {
    await kycPage.close();
    await testBase.cleanup();
}
/**
 * Common test configuration for isolated tests
 * Use this to wrap your test.describe() calls
 */
function configureIsolatedTest(testName, testCallback) {
    test_1.test.describe(testName, () => {
        test_1.test.use({ storageState: 'playwright/.auth/user.json' });
        testCallback();
    });
}
//# sourceMappingURL=IsolatedTestHelpers.js.map