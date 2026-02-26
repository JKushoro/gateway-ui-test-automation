// projects/gateway-ui/tests/smoke/create_fact_find.smoke.spec.ts
import { test, Page, expect } from '@playwright/test';

import { GatewaySetup } from '@setup/GatewaySetup';
import { FactFindCreationSteps } from '@steps/clients/fact_find/FactFindCreationSteps';
import { SideNavService } from '@steps/components/SideNav';
import { NavBarService } from '@steps/components/NavBar';

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
import { GatewayFactFindSteps } from '@steps/clients/fact_find/GatewayFactFindSteps';

test.describe.serial('Create Fact Find', () => {
  let page: Page;
  let kycPage: Page;

  let factFindCreationSteps: FactFindCreationSteps;
  let sideNav: SideNavService;
  let navBar: NavBarService;

  let kycFactFindDetailsPageSteps: KycFactFindDetailsPageSteps;
  let kycPersonalDetailsPageSteps: KycPersonalDetailsPageSteps;
  let kycCurrentSituationPageSteps: KycCurrentSituationPageSteps;
  let kycPropertyAndAssetsSteps: KycPropertyAndAssetsSteps;
  let kycSavingsAndInvestmentsPageSteps: KycSavingsAndInvestmentsPageSteps;
  let kycPensionsPageSteps: KycPensionsPageSteps;
  let kycProtectionPageSteps: KycProtectionPageSteps;
  let kycIncomePageSteps: KycIncomePageSteps;
  let kycLiabilitiesAndExpendituresPageSteps: KycLiabilitiesAndExpendituresPageSteps;
  let kycInvestmentKnowledgeAndPreferencesPageSteps: KycInvestmentKnowledgeAndPreferencesPageSteps;
  let gatewayFactFindSteps: GatewayFactFindSteps;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await GatewaySetup.setupForEnvironment(page, 'qa');

    factFindCreationSteps = new FactFindCreationSteps(page);
    sideNav = new SideNavService(page);
    navBar = new NavBarService(page);
    gatewayFactFindSteps = new GatewayFactFindSteps(page);

    // Get to Fact Find then launch KYC (KYC opens in a new tab)
    await factFindCreationSteps.addClientAndNavigateToFactFindTab(sideNav, navBar);
    kycPage = await factFindCreationSteps.createAndLaunchNewFactFind();

    // Sanity check that we really are on KYC
    await expect(kycPage).toHaveTitle('KYC');

    // Initialise KYC step classes once (outside tests)
    kycFactFindDetailsPageSteps = new KycFactFindDetailsPageSteps(kycPage);
    kycPersonalDetailsPageSteps = new KycPersonalDetailsPageSteps(kycPage);
    kycCurrentSituationPageSteps = new KycCurrentSituationPageSteps(kycPage);
    kycPropertyAndAssetsSteps = new KycPropertyAndAssetsSteps(kycPage);
    kycSavingsAndInvestmentsPageSteps = new KycSavingsAndInvestmentsPageSteps(kycPage);
    kycPensionsPageSteps = new KycPensionsPageSteps(kycPage);
    kycProtectionPageSteps = new KycProtectionPageSteps(kycPage);
    kycIncomePageSteps = new KycIncomePageSteps(kycPage);
    kycLiabilitiesAndExpendituresPageSteps = new KycLiabilitiesAndExpendituresPageSteps(kycPage);
    kycInvestmentKnowledgeAndPreferencesPageSteps = new KycInvestmentKnowledgeAndPreferencesPageSteps(kycPage);
  });

  test('Fill in Fact Find Details section of the KYC application form', async () => {
    await kycFactFindDetailsPageSteps.completeKYCFactFindDetails();
  });

  test('Fill in Personal Details section of the KYC application form', async () => {
    await kycPersonalDetailsPageSteps.completeKYCPersonalDetails();
  });

  test('Fill in Current Situation section of the KYC application form', async () => {
    await kycCurrentSituationPageSteps.completeKYCCurrentSituation();
  });

  test('Fill in Property and Assets section of the KYC application form', async () => {
    await kycPropertyAndAssetsSteps.completeKYC_PropertyAndAssets();
  });

  test('Fill in Savings and Investments section of the KYC application form', async () => {
    await kycSavingsAndInvestmentsPageSteps.completeKYC_SavingsAndInvestments();
  });

  test('Fill in Pensions section of the KYC application form', async () => {
    await kycPensionsPageSteps.completeKYC_Pensions();
  });

  test('Fill in Protection section of the KYC application form', async () => {
    await kycProtectionPageSteps.completeKYC_Protection();
  });

  test('Fill in Income section of the KYC application form', async () => {
    await kycIncomePageSteps.completeKYC_Income();
  });

  test('Fill in Liabilities And Expenditures section of the KYC application form', async () => {
    await kycLiabilitiesAndExpendituresPageSteps.completeKYC_LiabilitiesAndExpenditures();
  });

  test('Fill in Investment Knowledge And Preferences section of the KYC application form', async () => {
    await kycInvestmentKnowledgeAndPreferencesPageSteps.completeKYC_InvestmentKnowledgeAndPreferences();
  });

  test('Should validate Gateway fact find data', async () => {
    await gatewayFactFindSteps.validateGatewayFactFindData();
    await kycPage.waitForTimeout(2000);
  });

  test.afterAll(async () => {
    await kycPage?.close().catch(() => {});
    if (page && page !== kycPage) await page.close().catch(() => {});
  });
});
