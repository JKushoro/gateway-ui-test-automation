"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const DataStore_1 = require("@framework/utils/DataStore");
const TestCleanupHelper_1 = require("@framework/utils/TestCleanupHelper");
const GatewayManagementSteps_1 = require("@steps/gateway/GatewayManagementSteps");
const KycAnnuityPageSteps_1 = require("@steps/kyc/retirement/KycAnnuityPageSteps");
const KycContributionsAndProtectionSteps_1 = require("@steps/kyc/retirement/KycContributionsAndProtectionSteps");
const KycFuturePlanningPageSteps_1 = require("@steps/kyc/retirement/KycFuturePlanningPageSteps");
const KycLifeEventsAndBenefitsPageSteps_1 = require("@steps/kyc/retirement/KycLifeEventsAndBenefitsPageSteps");
const KycPurposePageSteps_1 = require("@steps/kyc/retirement/KycPurposePageSteps");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangeRetirementFactFind(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    return {
        testBase,
        gatewayFactFindSteps: new GatewayManagementSteps_1.GatewayManagementSteps(testBase.page),
    };
}
async function launchRetirementFactFind(setup) {
    const kycPage = await setup.testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');
    setup.kycPage = kycPage;
    await (0, test_1.expect)(kycPage, 'KYC page should be loaded with correct title').toHaveTitle('Fairstone');
    return kycPage;
}
function createRetirementKycSteps(kycPage) {
    return {
        purpose: new KycPurposePageSteps_1.KycPurposePageSteps(kycPage),
        contributions: new KycContributionsAndProtectionSteps_1.KycContributionsAndProtectionSteps(kycPage),
        futurePlanning: new KycFuturePlanningPageSteps_1.KycFuturePlanningPageSteps(kycPage),
        lifeEvents: new KycLifeEventsAndBenefitsPageSteps_1.KycKycLifeEventsAndBenefitsPageSteps(kycPage),
        annuity: new KycAnnuityPageSteps_1.KycAnnuityPageSteps(kycPage),
    };
}
async function completeRetirementKycWorkflow(kycSteps) {
    await kycSteps.purpose.completeKYCPurpose();
    await kycSteps.contributions.completeKycContributionsAllowancesAndProtection();
    await kycSteps.futurePlanning.completeKYCKycFuturePlanning();
    await kycSteps.lifeEvents.completeKYCKycLifeEventsAndBenefits();
    await kycSteps.annuity.completeKYCAnnuity();
}
async function cleanupRetirementFactFind(setup) {
    await setup?.kycPage?.close();
    await (0, TestCleanupHelper_1.cleanupClient1FactFinds)();
    await setup?.testBase.cleanup();
}
test_1.test.describe('Create Retirement Fact Find', () => {
    let currentSetup;
    test_1.test.beforeEach(async () => {
        (0, DataStore_1.clearWorkerDataStore)();
    });
    test_1.test.afterEach(async () => {
        await cleanupRetirementFactFind(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Complete Retirement fact find creation workflow', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeRetirementFactFind(browser);
        const kycPage = await launchRetirementFactFind(currentSetup);
        const kycSteps = createRetirementKycSteps(kycPage);
        // Act
        await completeRetirementKycWorkflow(kycSteps);
        // Assert
        await currentSetup.gatewayFactFindSteps.verifyFirstFactFindStatusIsComplete();
    });
});
//# sourceMappingURL=create_retirement_fact_find.smoke.spec.js.map