// projects/gateway-ui/tests/smoke/create_fact_find.smoke.spec.ts
import { test, Page, expect } from '@playwright/test';
import BaseTest from '../shared/TestUtils';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';
import { clearWorkerDataStore } from '@framework/utils/DataStore';

import { KycFactFindDetailsPageSteps } from '@steps/kyc_forms/KycFactFindDetailsPageSteps';
import { KycPersonalDetailsPageSteps } from '@steps/kyc_forms/KycPersonalDetailsPageSteps';
import { KycCurrentSituationPageSteps } from '@steps/kyc_forms/KycCurrentSituationPageSteps';
import { KycPropertyAndAssetsSteps } from '@steps/kyc_forms/KycPropertyAndAssetsSteps';
import { KycSavingsAndInvestmentsPageSteps } from '@steps/kyc_forms/KycSavingsAndInvestmentsPageSteps';
import { KycPensionsPageSteps } from '@steps/kyc_forms/KycPensionsPageSteps';
import { KycProtectionPageSteps } from '@steps/kyc_forms/KycProtectionPageSteps';
import { KycIncomePageSteps } from '@steps/kyc_forms/KycIncomePageSteps';
import { KycLiabilitiesAndExpendituresPageSteps } from '@steps/kyc_forms/KycLiabilitiesAndExpendituresPageSteps';
import {
  KycInvestmentKnowledgeAndPreferencesPageSteps
} from '@steps/kyc_forms/KycInvestmentKnowledgeAndPreferencesPageSteps';
import { GatewayFactFindSteps } from '@steps/gateway/GatewayFactFindSteps';

test.describe('Create Fact Find', () => {
  test.beforeEach(async () => {
    // Clear any shared state before each test
    clearWorkerDataStore();
  });

  test('Complete fact find creation workflow', async ({ browser }) => {
    const testBase = await BaseTest.create(browser, 'qa');
    let kycPage: Page;
    
    try {
      const gatewayFactFindSteps = new GatewayFactFindSteps(testBase.page);

      // Get to Fact Find then launch KYC (KYC opens in a new tab)
      await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
      kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind();

      // Sanity check that we really are on KYC
      await expect(kycPage).toHaveTitle('KYC');

      // Initialize all KYC step classes
      const kycFactFindDetailsPageSteps = new KycFactFindDetailsPageSteps(kycPage);
      const kycPersonalDetailsPageSteps = new KycPersonalDetailsPageSteps(kycPage);
      const kycCurrentSituationPageSteps = new KycCurrentSituationPageSteps(kycPage);
      const kycPropertyAndAssetsSteps = new KycPropertyAndAssetsSteps(kycPage);
      const kycSavingsAndInvestmentsPageSteps = new KycSavingsAndInvestmentsPageSteps(kycPage);
      const kycPensionsPageSteps = new KycPensionsPageSteps(kycPage);
      const kycProtectionPageSteps = new KycProtectionPageSteps(kycPage);
      const kycIncomePageSteps = new KycIncomePageSteps(kycPage);
      const kycLiabilitiesAndExpendituresPageSteps = new KycLiabilitiesAndExpendituresPageSteps(kycPage);
      const kycInvestmentKnowledgeAndPreferencesPageSteps = new KycInvestmentKnowledgeAndPreferencesPageSteps(kycPage);

      // Complete all KYC sections sequentially
      await kycFactFindDetailsPageSteps.completeKYCFactFindDetails();
      await kycPersonalDetailsPageSteps.completeKYCPersonalDetails();
      await kycCurrentSituationPageSteps.completeKYCCurrentSituation();
      await kycPropertyAndAssetsSteps.completeKYC_PropertyAndAssets();
      await kycSavingsAndInvestmentsPageSteps.completeKYC_SavingsAndInvestments();
      await kycPensionsPageSteps.completeKYC_Pensions();
      await kycProtectionPageSteps.completeKYC_Protection();
      await kycIncomePageSteps.completeKYC_Income();
      await kycLiabilitiesAndExpendituresPageSteps.completeKYC_LiabilitiesAndExpenditures();
      await kycInvestmentKnowledgeAndPreferencesPageSteps.completeKYC_InvestmentKnowledgeAndPreferences();

      // Validate Gateway fact find data
      await gatewayFactFindSteps.validateGatewayFactFindData();
      await kycPage.waitForLoadState('networkidle');

    } finally {
      await cleanupClient1FactFinds();
      await kycPage?.close().catch(() => {});
      await testBase.cleanup();
    }
  });
});