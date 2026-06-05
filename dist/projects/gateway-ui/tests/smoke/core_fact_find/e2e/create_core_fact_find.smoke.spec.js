"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// projects/gateway-ui/tests/smoke/create_core_fact_find.smoke.spec.ts
const src_1 = require("@/framework/src");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
const TestCleanupHelper_1 = require("@framework/utils/TestCleanupHelper");
const DataStore_1 = require("@framework/utils/DataStore");
const KycFactFindDetailsPageSteps_1 = require("@steps/kyc/core/KycFactFindDetailsPageSteps");
const KycPersonalDetailsPageSteps_1 = require("@steps/kyc/core/KycPersonalDetailsPageSteps");
const KycCurrentSituationPageSteps_1 = require("@steps/kyc/core/KycCurrentSituationPageSteps");
const KycPropertyAndAssetsSteps_1 = require("@steps/kyc/core/KycPropertyAndAssetsSteps");
const KycSavingsAndInvestmentsPageSteps_1 = require("@steps/kyc/core/KycSavingsAndInvestmentsPageSteps");
const KycPensionsPageSteps_1 = require("@steps/kyc/core/KycPensionsPageSteps");
const KycProtectionPageSteps_1 = require("@steps/kyc/core/KycProtectionPageSteps");
const KycIncomePageSteps_1 = require("@steps/kyc/core/KycIncomePageSteps");
const KycLiabilitiesAndExpendituresPageSteps_1 = require("@steps/kyc/core/KycLiabilitiesAndExpendituresPageSteps");
const KycInvestmentKnowledgeAndPreferencesPageSteps_1 = require("@steps/kyc/core/KycInvestmentKnowledgeAndPreferencesPageSteps");
const GatewayManagementSteps_1 = require("@steps/gateway/GatewayManagementSteps");
src_1.test.describe('Create core Fact Find', () => {
    src_1.test.beforeEach(async () => {
        // Clear any shared state before each test
        (0, DataStore_1.clearWorkerDataStore)();
    });
    (0, src_1.test)('Complete core fact find creation workflow', async ({ browser }) => {
        const testBase = await TestUtils_1.default.create(browser, 'qa');
        const gatewayFactFindSteps = new GatewayManagementSteps_1.GatewayManagementSteps(testBase.page);
        // Get to Fact Find then launch KYC (KYC opens in a new tab)
        await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
        const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
        // Initialize all KYC step classes
        const kycFactFindDetailsPageSteps = new KycFactFindDetailsPageSteps_1.KycFactFindDetailsPageSteps(kycPage);
        const kycPersonalDetailsPageSteps = new KycPersonalDetailsPageSteps_1.KycPersonalDetailsPageSteps(kycPage);
        const kycCurrentSituationPageSteps = new KycCurrentSituationPageSteps_1.KycCurrentSituationPageSteps(kycPage);
        const kycPropertyAndAssetsSteps = new KycPropertyAndAssetsSteps_1.KycPropertyAndAssetsSteps(kycPage);
        const kycSavingsAndInvestmentsPageSteps = new KycSavingsAndInvestmentsPageSteps_1.KycSavingsAndInvestmentsPageSteps(kycPage);
        const kycPensionsPageSteps = new KycPensionsPageSteps_1.KycPensionsPageSteps(kycPage);
        const kycProtectionPageSteps = new KycProtectionPageSteps_1.KycProtectionPageSteps(kycPage);
        const kycIncomePageSteps = new KycIncomePageSteps_1.KycIncomePageSteps(kycPage);
        const kycLiabilitiesAndExpendituresPageSteps = new KycLiabilitiesAndExpendituresPageSteps_1.KycLiabilitiesAndExpendituresPageSteps(kycPage);
        const kycInvestmentKnowledgeAndPreferencesPageSteps = new KycInvestmentKnowledgeAndPreferencesPageSteps_1.KycInvestmentKnowledgeAndPreferencesPageSteps(kycPage);
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
        await (0, TestCleanupHelper_1.cleanupClient1FactFinds)({
            skipCleanup: false,
            maxRetries: 2,
            timeoutMs: 15000
        });
        await kycPage.close();
        await testBase.cleanup();
    });
});
//# sourceMappingURL=create_core_fact_find.smoke.spec.js.map