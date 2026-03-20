import { expect, Page, test } from '@playwright/test';
import { clearWorkerDataStore } from '@framework/utils/DataStore';
import BaseTest from '@tests/shared/TestUtils';
import { GatewayFactFindSteps } from '@steps/gateway/GatewayFactFindSteps';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';
import {
  KycFactFindDetailsPageSteps
} from '@steps/kyc_forms/kyc_single_core_fact_find_forms/KycFactFindDetailsPageSteps';
import { KycPurposePageSteps } from '@steps/kyc_forms/kyc_single_retirement_fact_find_forms/KycPurposePageSteps';
import {
  KycContributionsAndProtectionSteps
} from '@steps/kyc_forms/kyc_single_retirement_fact_find_forms/KycContributionsAndProtectionSteps';

test.describe('Create Retirement Fact Find', () => {
  test.beforeEach(async () => {
    // Clear any shared state before each test
    clearWorkerDataStore();
  });

  test('Complete Retirement fact find creation workflow', async ({ browser }) => {
    const testBase = await BaseTest.create(browser, 'qa');
    let kycPage: Page;

    try {
      const gatewayFactFindSteps = new GatewayFactFindSteps(testBase.page);

      // Get to Fact Find then launch KYC (KYC opens in a new tab)
      await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
        testBase.sideNav,
        testBase.navBar
      );
      kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');

      // Sanity check that we really are on KYC
      await expect(kycPage).toHaveTitle('KYC');

      // Initialize all KYC step classes
      const kycPurposePageSteps = new KycPurposePageSteps(kycPage);
      const kycContributionsAndProtectionSteps = new KycContributionsAndProtectionSteps(kycPage);

      // Complete Purpose
      await kycPurposePageSteps.completeKYCPurpose();

      // Complete Contributions Allowances And Protection
      await kycContributionsAndProtectionSteps.completeKycContributionsAllowancesAndProtection();
    } finally {
      await cleanupClient1FactFinds();
      await testBase.cleanup();
    }
  });
});
