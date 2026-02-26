"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// projects/gateway-ui/tests/smoke/create_fact_find.smoke.spec.ts
const test_1 = require("@playwright/test");
const GatewaySetup_1 = require("@setup/GatewaySetup");
const FactFindCreationSteps_1 = require("@steps/clients/fact_find/FactFindCreationSteps");
const SideNav_1 = require("@steps/components/SideNav");
const NavBar_1 = require("@steps/components/NavBar");
const KycFactFindDetailsPageSteps_1 = require("@steps/kyc_forms/KycFactFindDetailsPageSteps");
const KycPersonalDetailsPageSteps_1 = require("@steps/kyc_forms/KycPersonalDetailsPageSteps");
const KycCurrentSituationPageSteps_1 = require("@steps/kyc_forms/KycCurrentSituationPageSteps");
const KycPropertyAndAssetsSteps_1 = require("@steps/kyc_forms/KycPropertyAndAssetsSteps");
const KycSavingsAndInvestmentsPageSteps_1 = require("@steps/kyc_forms/KycSavingsAndInvestmentsPageSteps");
const KycPensionsPageSteps_1 = require("@steps/kyc_forms/KycPensionsPageSteps");
const KycProtectionPageSteps_1 = require("@steps/kyc_forms/KycProtectionPageSteps");
const KycIncomePageSteps_1 = require("@steps/kyc_forms/KycIncomePageSteps");
const KycLiabilitiesAndExpendituresPageSteps_1 = require("@steps/kyc_forms/KycLiabilitiesAndExpendituresPageSteps");
const KycInvestmentKnowledgeAndPreferencesPageSteps_1 = require("@steps/kyc_forms/KycInvestmentKnowledgeAndPreferencesPageSteps");
const GatewayFactFindSteps_1 = require("@steps/clients/fact_find/GatewayFactFindSteps");
test_1.test.describe.serial('Create Fact Find', () => {
    let page;
    let kycPage;
    let factFindCreationSteps;
    let sideNav;
    let navBar;
    let kycFactFindDetailsPageSteps;
    let kycPersonalDetailsPageSteps;
    let kycCurrentSituationPageSteps;
    let kycPropertyAndAssetsSteps;
    let kycSavingsAndInvestmentsPageSteps;
    let kycPensionsPageSteps;
    let kycProtectionPageSteps;
    let kycIncomePageSteps;
    let kycLiabilitiesAndExpendituresPageSteps;
    let kycInvestmentKnowledgeAndPreferencesPageSteps;
    let gatewayFactFindSteps;
    test_1.test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await GatewaySetup_1.GatewaySetup.setupForEnvironment(page, 'qa');
        factFindCreationSteps = new FactFindCreationSteps_1.FactFindCreationSteps(page);
        sideNav = new SideNav_1.SideNavService(page);
        navBar = new NavBar_1.NavBarService(page);
        gatewayFactFindSteps = new GatewayFactFindSteps_1.GatewayFactFindSteps(page);
        // Get to Fact Find then launch KYC (KYC opens in a new tab)
        await factFindCreationSteps.addClientAndNavigateToFactFindTab(sideNav, navBar);
        kycPage = await factFindCreationSteps.createAndLaunchNewFactFind();
        // Sanity check that we really are on KYC
        await (0, test_1.expect)(kycPage).toHaveTitle('KYC');
        // Initialise KYC step classes once (outside tests)
        kycFactFindDetailsPageSteps = new KycFactFindDetailsPageSteps_1.KycFactFindDetailsPageSteps(kycPage);
        kycPersonalDetailsPageSteps = new KycPersonalDetailsPageSteps_1.KycPersonalDetailsPageSteps(kycPage);
        kycCurrentSituationPageSteps = new KycCurrentSituationPageSteps_1.KycCurrentSituationPageSteps(kycPage);
        kycPropertyAndAssetsSteps = new KycPropertyAndAssetsSteps_1.KycPropertyAndAssetsSteps(kycPage);
        kycSavingsAndInvestmentsPageSteps = new KycSavingsAndInvestmentsPageSteps_1.KycSavingsAndInvestmentsPageSteps(kycPage);
        kycPensionsPageSteps = new KycPensionsPageSteps_1.KycPensionsPageSteps(kycPage);
        kycProtectionPageSteps = new KycProtectionPageSteps_1.KycProtectionPageSteps(kycPage);
        kycIncomePageSteps = new KycIncomePageSteps_1.KycIncomePageSteps(kycPage);
        kycLiabilitiesAndExpendituresPageSteps = new KycLiabilitiesAndExpendituresPageSteps_1.KycLiabilitiesAndExpendituresPageSteps(kycPage);
        kycInvestmentKnowledgeAndPreferencesPageSteps = new KycInvestmentKnowledgeAndPreferencesPageSteps_1.KycInvestmentKnowledgeAndPreferencesPageSteps(kycPage);
    });
    (0, test_1.test)('Fill in Fact Find Details section of the KYC application form', async () => {
        await kycFactFindDetailsPageSteps.completeKYCFactFindDetails();
    });
    (0, test_1.test)('Fill in Personal Details section of the KYC application form', async () => {
        await kycPersonalDetailsPageSteps.completeKYCPersonalDetails();
    });
    (0, test_1.test)('Fill in Current Situation section of the KYC application form', async () => {
        await kycCurrentSituationPageSteps.completeKYCCurrentSituation();
    });
    (0, test_1.test)('Fill in Property and Assets section of the KYC application form', async () => {
        await kycPropertyAndAssetsSteps.completeKYC_PropertyAndAssets();
    });
    (0, test_1.test)('Fill in Savings and Investments section of the KYC application form', async () => {
        await kycSavingsAndInvestmentsPageSteps.completeKYC_SavingsAndInvestments();
    });
    (0, test_1.test)('Fill in Pensions section of the KYC application form', async () => {
        await kycPensionsPageSteps.completeKYC_Pensions();
    });
    (0, test_1.test)('Fill in Protection section of the KYC application form', async () => {
        await kycProtectionPageSteps.completeKYC_Protection();
    });
    (0, test_1.test)('Fill in Income section of the KYC application form', async () => {
        await kycIncomePageSteps.completeKYC_Income();
    });
    (0, test_1.test)('Fill in Liabilities And Expenditures section of the KYC application form', async () => {
        await kycLiabilitiesAndExpendituresPageSteps.completeKYC_LiabilitiesAndExpenditures();
    });
    (0, test_1.test)('Fill in Investment Knowledge And Preferences section of the KYC application form', async () => {
        await kycInvestmentKnowledgeAndPreferencesPageSteps.completeKYC_InvestmentKnowledgeAndPreferences();
    });
    (0, test_1.test)('Should validate Gateway fact find data', async () => {
        await gatewayFactFindSteps.validateGatewayFactFindData();
        await kycPage.waitForTimeout(2000);
    });
    test_1.test.afterAll(async () => {
        await kycPage?.close().catch(() => { });
        if (page && page !== kycPage)
            await page.close().catch(() => { });
    });
});
//# sourceMappingURL=create_fact_find.smoke.spec.js.map