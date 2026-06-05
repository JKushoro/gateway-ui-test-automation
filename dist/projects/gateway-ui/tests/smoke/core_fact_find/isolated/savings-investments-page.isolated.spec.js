"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const KycSavingsAndInvestmentsPageSteps_1 = require("@steps/kyc/core/KycSavingsAndInvestmentsPageSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangeSavingsAndInvestmentsPage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Savings & Investments');
    return {
        testBase,
        kycPage,
        kycSteps: new KycSavingsAndInvestmentsPageSteps_1.KycSavingsAndInvestmentsPageSteps(kycPage),
    };
}
async function cleanupSavingsAndInvestmentsPage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectSavingsAndInvestmentsPage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Savings & Investments').first()).toBeVisible({
        timeout: 15000,
    });
    (0, test_1.expect)(kycPage.url()).toContain('page=savings-and-investments');
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Core Fact Find - Savings & Investments Page (Isolated)', () => {
    let currentSetup;
    test_1.test.afterEach(async () => {
        await cleanupSavingsAndInvestmentsPage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Savings & Investments page - validates page heading and URL', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeSavingsAndInvestmentsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycPage.waitForLoadState('domcontentloaded');
        // Assert
        await expectSavingsAndInvestmentsPage(setup.kycPage);
    });
    (0, test_1.test)('Savings & Investments page - answers cash savings outside Fairstone question', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeSavingsAndInvestmentsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerCashSavingsOutsideFairstoneQuestion('No');
        // Assert
        await expectSavingsAndInvestmentsPage(setup.kycPage);
    });
    (0, test_1.test)('Savings & Investments page - answers investments outside Fairstone question', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeSavingsAndInvestmentsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerInvestmentsOutsideFairstoneQuestion('No');
        // Assert
        await expectSavingsAndInvestmentsPage(setup.kycPage);
    });
    (0, test_1.test)('Savings & Investments page - answers ISA contribution question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeSavingsAndInvestmentsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerIsaContributionQuestion('No');
        // Assert
        await expectSavingsAndInvestmentsPage(setup.kycPage);
    });
    (0, test_1.test)('Savings & Investments page - completes all savings and investments questions', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeSavingsAndInvestmentsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerAllSavingsAndInvestmentsQuestions();
        // Assert
        await expectSavingsAndInvestmentsPage(setup.kycPage);
    });
    (0, test_1.test)('Savings & Investments page - completes page and proceeds to Pensions', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeSavingsAndInvestmentsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.completeKYC_SavingsAndInvestments();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Pensions').first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=savings-investments-page.isolated.spec.js.map