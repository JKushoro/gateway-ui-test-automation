// projects/gateway-ui/tests/smoke/create_core_fact_find.smoke.spec.ts
import { test, expect } from '@/framework/src';
import BaseTest from '@tests/shared/TestUtils';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';
import { clearWorkerDataStore } from '@framework/utils/DataStore';

import { KycFactFindDetailsPageSteps } from '@steps/kyc/core/KycFactFindDetailsPageSteps';
import { KycPersonalDetailsPageSteps } from '@steps/kyc/core/KycPersonalDetailsPageSteps';
import { KycCurrentSituationPageSteps } from '@steps/kyc/core/KycCurrentSituationPageSteps';
import { KycPropertyAndAssetsSteps } from '@steps/kyc/core/KycPropertyAndAssetsSteps';
import { KycSavingsAndInvestmentsPageSteps } from '@steps/kyc/core/KycSavingsAndInvestmentsPageSteps';
import { KycPensionsPageSteps } from '@steps/kyc/core/KycPensionsPageSteps';
import { KycProtectionPageSteps } from '@steps/kyc/core/KycProtectionPageSteps';
import { KycIncomePageSteps } from '@steps/kyc/core/KycIncomePageSteps';
import { KycLiabilitiesAndExpendituresPageSteps } from '@steps/kyc/core/KycLiabilitiesAndExpendituresPageSteps';
import {
  KycInvestmentKnowledgeAndPreferencesPageSteps
} from '@steps/kyc/core/KycInvestmentKnowledgeAndPreferencesPageSteps';
import { GatewayManagementSteps } from '@steps/gateway/GatewayManagementSteps';

test.describe('Create core Fact Find', () => {
  test.beforeEach(async () => {
    // Clear any shared state before each test
    clearWorkerDataStore();
  });

  test('Complete core fact find creation workflow', async ({ browser }) => {
    const testBase = await BaseTest.create(browser, 'qa');
    const gatewayFactFindSteps = new GatewayManagementSteps(testBase.page);

    // Get to Fact Find then launch KYC (KYC opens in a new tab)
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
      testBase.sideNav,
      testBase.navBar
    );
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

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

    // Complete Fact Find Details
    await kycFactFindDetailsPageSteps.completeKYCFactFindDetails();

    // Complete Personal Details
    await kycPersonalDetailsPageSteps.completeKYCPersonalDetails();

    // Complete Current Situation
    await kycCurrentSituationPageSteps.completeKYCCurrentSituation();

    // Complete Property & Assets
    await kycPropertyAndAssetsSteps.completeKYC_PropertyAndAssets();

    // Complete Savings & Investments
    await kycSavingsAndInvestmentsPageSteps.completeKYC_SavingsAndInvestments();

    // Complete Pensions Details
    await kycPensionsPageSteps.completeKYC_Pensions();

    // Complete Protection Details
    await kycProtectionPageSteps.completeKYC_Protection();

    // Complete Income Details
    await kycIncomePageSteps.completeKYC_Income();

    // Complete Liabilities & Expenditures
    await kycLiabilitiesAndExpendituresPageSteps.completeKYC_LiabilitiesAndExpenditures();

    // Complete Investment Knowledge & Preferences
    await kycInvestmentKnowledgeAndPreferencesPageSteps.completeKYC_InvestmentKnowledgeAndPreferences();

    // Validate Gateway fact find data
    await gatewayFactFindSteps.validateGatewayFactFindData();
    await kycPage.waitForLoadState('networkidle');

    // Cleanup with improved error handling
    await cleanupClient1FactFinds({
      skipCleanup: false,
      maxRetries: 2,
      timeoutMs: 15000
    });
    await kycPage.close();
    await testBase.cleanup();
  });
});
