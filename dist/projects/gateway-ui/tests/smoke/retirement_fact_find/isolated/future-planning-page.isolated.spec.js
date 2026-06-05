"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const KycFuturePlanningPageSteps_1 = require("@steps/kyc/retirement/KycFuturePlanningPageSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangeFuturePlanningPage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Future Planning');
    return {
        testBase,
        kycPage,
        kycSteps: new KycFuturePlanningPageSteps_1.KycFuturePlanningPageSteps(kycPage),
    };
}
async function cleanupFuturePlanningPage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectFuturePlanningPage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Future Planning').first()).toBeVisible({
        timeout: 15000,
    });
    (0, test_1.expect)(kycPage.url()).toContain('page=futureplanning');
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Retirement Fact Find - Future Planning Page (Isolated)', () => {
    let currentSetup;
    test_1.test.afterEach(async () => {
        await cleanupFuturePlanningPage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Future Planning page - validates page heading and URL', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFuturePlanningPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycPage.waitForLoadState('domcontentloaded');
        // Assert
        await expectFuturePlanningPage(setup.kycPage);
    });
    (0, test_1.test)('Future Planning page - fills retirement plans', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFuturePlanningPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.fillRetirementPlans('What are your retirement plans? Please provide details of short and longer term plans', 'This is to test Retirement Plans field works');
        // Assert
        await expectFuturePlanningPage(setup.kycPage);
    });
    (0, test_1.test)('Future Planning page - answers retirement move intent', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFuturePlanningPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.selectRetirementMoveIntent('Yes');
        // Assert
        await expectFuturePlanningPage(setup.kycPage);
    });
    (0, test_1.test)('Future Planning page - fills further information', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFuturePlanningPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.selectRetirementMoveIntent('Yes');
        // Act
        await setup.kycSteps.fillFurtherInformation('Please provide further information', 'This is to test Further Information field works');
        // Assert
        await expectFuturePlanningPage(setup.kycPage);
    });
    (0, test_1.test)('Future Planning page - fills expenditure changes', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFuturePlanningPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.fillEssentialExpenditureChanges('What changes do you expect to your Essential Expenditure? Please provide details', 'This is to test Essential Expenditure Changes field works');
        await setup.kycSteps.fillDiscretionaryExpenditureChanges('What changes do you expect to your Discretionary Expenditure? Please provide details', 'This is to test Discretionary Expenditure Changes field works');
        // Assert
        await expectFuturePlanningPage(setup.kycPage);
    });
    (0, test_1.test)('Future Planning page - answers one-off events planning', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFuturePlanningPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.selectOneOffEventsPlanning('Yes');
        // Assert
        await expectFuturePlanningPage(setup.kycPage);
    });
    (0, test_1.test)('Future Planning page - sets one-off event date and amount', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFuturePlanningPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.selectOneOffEventsPlanning('Yes');
        // Act
        const date = await setup.kycSteps.setRetirementOneOffEventDate(0, 1, 1);
        await setup.kycSteps.fillFirstRetirementAmount(200000);
        // Assert
        (0, test_1.expect)(date).toBeTruthy();
        await expectFuturePlanningPage(setup.kycPage);
    });
    (0, test_1.test)('Future Planning page - fills retirement income sources details', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFuturePlanningPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.fillRetirementIncomeSourcesDetails('What sources of income and/ or capital do you wish to designate for your retirement? Please provide details', 'This is to test Retirement IncomeSources field works');
        // Assert
        await expectFuturePlanningPage(setup.kycPage);
    });
    (0, test_1.test)('Future Planning page - fills guaranteed income details', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFuturePlanningPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.fillGuaranteedIncomeEssentialExpenditureDetails('How do you feel about securing a guaranteed income to meet your Essential expenditure in retirement? Please provide details', 'This is to test Guaranteed Income Essential Expenditure field works');
        await setup.kycSteps.fillGuaranteedIncomeForOtherExpenditureDetails('How do you feel about securing guaranteed income to meet other expenditure in retirement? Please provide details', 'This is to test Guaranteed Income For Other Expenditure field works');
        // Assert
        await expectFuturePlanningPage(setup.kycPage);
    });
    (0, test_1.test)('Future Planning page - completes all future planning questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFuturePlanningPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerFuturePlanningQuestions();
        // Assert
        await expectFuturePlanningPage(setup.kycPage);
    });
    (0, test_1.test)('Future Planning page - completes page and proceeds to Contributions & Protection', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeFuturePlanningPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.completeKYCKycFuturePlanning();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Contributions & Protection').first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=future-planning-page.isolated.spec.js.map