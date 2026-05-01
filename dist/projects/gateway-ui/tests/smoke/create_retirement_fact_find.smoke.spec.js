"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const DataStore_1 = require("@framework/utils/DataStore");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
const GatewayManagementSteps_1 = require("@steps/gateway/GatewayManagementSteps");
const TestCleanupHelper_1 = require("@framework/utils/TestCleanupHelper");
const KycPurposePageSteps_1 = require("@steps/kyc_forms/kyc_single_retirement_fact_find_forms/KycPurposePageSteps");
const KycContributionsAndProtectionSteps_1 = require("@steps/kyc_forms/kyc_single_retirement_fact_find_forms/KycContributionsAndProtectionSteps");
const KycFuturePlanningPageSteps_1 = require("@steps/kyc_forms/kyc_single_retirement_fact_find_forms/KycFuturePlanningPageSteps");
const KycLifeEventsAndBenefitsPageSteps_1 = require("@steps/kyc_forms/kyc_single_retirement_fact_find_forms/KycLifeEventsAndBenefitsPageSteps");
const KycAnnuityPageSteps_1 = require("@steps/kyc_forms/kyc_single_retirement_fact_find_forms/KycAnnuityPageSteps");
/**
 * Retirement Fact Find Creation Tests
 *
 * This test suite validates the complete workflow for creating a retirement fact find.
 * It covers the entire journey from client creation to fact find completion.
 *
 * Test Flow:
 * 1. Setup: Clear data store and create test environment
 * 2. Navigation: Add client and navigate to fact find section
 * 3. Creation: Create and launch new retirement fact find
 * 4. KYC Process: Complete all KYC pages in sequence
 * 5. Validation: Verify fact find completion in Gateway
 * 6. Cleanup: Clean up test data and close browser
 */
test_1.test.describe('Create Retirement Fact Find', () => {
    test_1.test.beforeEach(async () => {
        // Clear any shared state before each test to ensure clean test environment
        (0, DataStore_1.clearWorkerDataStore)();
    });
    (0, test_1.test)('Complete Retirement fact find creation workflow', async ({ browser }) => {
        // Test Setup Phase
        const testBase = await TestUtils_1.default.create(browser, 'qa');
        let kycPage;
        try {
            // Initialize Gateway management steps for fact find operations
            const gatewayFactFindSteps = new GatewayManagementSteps_1.GatewayManagementSteps(testBase.page);
            // Phase 1: Navigate to Fact Find section
            await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
            // Phase 2: Create and launch new retirement fact find (opens in new tab)
            kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');
            // Phase 3: Validate KYC page is loaded correctly
            await (0, test_1.expect)(kycPage, 'KYC page should be loaded with correct title').toHaveTitle('KYC');
            // Phase 4: Initialize all KYC step classes for the workflow
            const kycSteps = {
                purpose: new KycPurposePageSteps_1.KycPurposePageSteps(kycPage),
                contributions: new KycContributionsAndProtectionSteps_1.KycContributionsAndProtectionSteps(kycPage),
                futurePlanning: new KycFuturePlanningPageSteps_1.KycFuturePlanningPageSteps(kycPage),
                lifeEvents: new KycLifeEventsAndBenefitsPageSteps_1.KycKycLifeEventsAndBenefitsPageSteps(kycPage),
                annuity: new KycAnnuityPageSteps_1.KycAnnuityPageSteps(kycPage),
            };
            // Phase 5: Complete KYC workflow in sequence
            // Complete Purpose
            await kycSteps.purpose.completeKYCPurpose();
            // Complete Contributions Allowances And Protection
            await kycSteps.contributions.completeKycContributionsAllowancesAndProtection();
            // Complete Future Planning
            await kycSteps.futurePlanning.completeKYCKycFuturePlanning();
            // Complete KycLife Events And Benefits
            await kycSteps.lifeEvents.completeKYCKycLifeEventsAndBenefits();
            // Complete Annuity
            await kycSteps.annuity.completeKYCAnnuity();
            // Phase 6: Validate fact find completion in Gateway
            await gatewayFactFindSteps.verifyFirstFactFindStatusIsComplete();
        }
        finally {
            // Cleanup Phase: Always clean up test data, even if test fails
            await (0, TestCleanupHelper_1.cleanupClient1FactFinds)();
            await testBase.cleanup();
        }
    });
});
//# sourceMappingURL=create_retirement_fact_find.smoke.spec.js.map