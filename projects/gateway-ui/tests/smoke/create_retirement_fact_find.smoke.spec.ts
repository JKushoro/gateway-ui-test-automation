import { expect, Page, test } from '@playwright/test';
import { clearWorkerDataStore } from '@framework/utils/DataStore';
import BaseTest from '@tests/shared/TestUtils';
import { GatewayManagementSteps } from '@steps/gateway/GatewayManagementSteps';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';
import { KycPurposePageSteps } from '@steps/kyc_forms/kyc_single_retirement_fact_find_forms/KycPurposePageSteps';
import {
  KycContributionsAndProtectionSteps
} from '@steps/kyc_forms/kyc_single_retirement_fact_find_forms/KycContributionsAndProtectionSteps';
import {
  KycFuturePlanningPageSteps
} from '@steps/kyc_forms/kyc_single_retirement_fact_find_forms/KycFuturePlanningPageSteps';
import {
  KycKycLifeEventsAndBenefitsPageSteps
} from '@steps/kyc_forms/kyc_single_retirement_fact_find_forms/KycLifeEventsAndBenefitsPageSteps';
import { KycAnnuityPageSteps } from '@steps/kyc_forms/kyc_single_retirement_fact_find_forms/KycAnnuityPageSteps';

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
test.describe('Create Retirement Fact Find', () => {
  test.beforeEach(async () => {
    // Clear any shared state before each test to ensure clean test environment
    clearWorkerDataStore();
  });

  test('Complete Retirement fact find creation workflow', async ({ browser }) => {
    // Test Setup Phase
    const testBase = await BaseTest.create(browser, 'qa');
    let kycPage: Page;

    try {
      // Initialize Gateway management steps for fact find operations
      const gatewayFactFindSteps = new GatewayManagementSteps(testBase.page);

      // Phase 1: Navigate to Fact Find section
      await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
        testBase.sideNav,
        testBase.navBar
      );

      // Phase 2: Create and launch new retirement fact find (opens in new tab)
      kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');

      // Phase 3: Validate KYC page is loaded correctly
      await expect(kycPage, 'KYC page should be loaded with correct title').toHaveTitle('KYC');

      // Phase 4: Initialize all KYC step classes for the workflow
      const kycSteps = {
        purpose: new KycPurposePageSteps(kycPage),
        contributions: new KycContributionsAndProtectionSteps(kycPage),
        futurePlanning: new KycFuturePlanningPageSteps(kycPage),
        lifeEvents: new KycKycLifeEventsAndBenefitsPageSteps(kycPage),
        annuity: new KycAnnuityPageSteps(kycPage)
      };

      // Phase 5: Complete KYC workflow in sequence
      await kycSteps.purpose.completeKYCPurpose();
      await kycSteps.contributions.completeKycContributionsAllowancesAndProtection();
      await kycSteps.futurePlanning.completeKYCKycFuturePlanning();
      await kycSteps.lifeEvents.completeKYCKycLifeEventsAndBenefits();
      await kycSteps.annuity.completeKYCAnnuity();

      // Phase 6: Validate fact find completion in Gateway
      await gatewayFactFindSteps.verifyFirstFactFindStatusIsComplete();

    } finally {
      // Cleanup Phase: Always clean up test data, even if test fails
      await cleanupClient1FactFinds();
      await testBase.cleanup();
    }
  });
});
