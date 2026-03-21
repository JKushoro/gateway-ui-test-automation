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

test.describe('Create Retirement Fact Find', () => {
  test.beforeEach(async () => {
    // Clear any shared state before each test
    clearWorkerDataStore();
  });

  test('Complete Retirement fact find creation workflow', async ({ browser }) => {
    const testBase = await BaseTest.create(browser, 'qa');
    let kycPage: Page;

    try {
      const gatewayFactFindSteps = new GatewayManagementSteps(testBase.page);

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
      const kycFuturePlanningPageSteps = new KycFuturePlanningPageSteps(kycPage);
      const kycKycLifeEventsAndBenefitsPageSteps = new KycKycLifeEventsAndBenefitsPageSteps(
        kycPage
      );
      const kycAnnuityPageSteps = new KycAnnuityPageSteps(kycPage);

      // Complete Purpose
      await kycPurposePageSteps.completeKYCPurpose();

      // Complete Contributions Allowances And Protection
      await kycContributionsAndProtectionSteps.completeKycContributionsAllowancesAndProtection();

      // Complete Future Planning
      await kycFuturePlanningPageSteps.completeKYCKycFuturePlanning();

      //Complete LifeEvents And Benefits
      await kycKycLifeEventsAndBenefitsPageSteps.completeKYCKycLifeEventsAndBenefits();

      //Complete Annuity
      await kycAnnuityPageSteps.completeKYCAnnuity();

      // Validate Gateway fact find data
      await gatewayFactFindSteps.validateGatewayFactFindTableData();
    } finally {
      await cleanupClient1FactFinds();
      await testBase.cleanup();
    }
  });
});
