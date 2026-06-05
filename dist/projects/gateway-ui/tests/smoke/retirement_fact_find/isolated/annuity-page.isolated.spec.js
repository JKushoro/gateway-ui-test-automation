"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const KycAnnuityPageSteps_1 = require("@steps/kyc/retirement/KycAnnuityPageSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangeAnnuityPage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Annuity');
    return {
        testBase,
        kycPage,
        kycSteps: new KycAnnuityPageSteps_1.KycAnnuityPageSteps(kycPage),
    };
}
async function cleanupAnnuityPage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectAnnuityPage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Annuity').first()).toBeVisible({
        timeout: 15000,
    });
    (0, test_1.expect)(kycPage.url()).toContain('page=personalised-annuity-quotes');
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Retirement Fact Find - Annuity Page (Isolated)', () => {
    let currentSetup;
    test_1.test.afterEach(async () => {
        await cleanupAnnuityPage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Annuity page - validates page heading and URL', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAnnuityPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycPage.waitForLoadState('domcontentloaded');
        // Assert
        await expectAnnuityPage(setup.kycPage);
    });
    (0, test_1.test)('Annuity page - answers personalised annuity quote question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAnnuityPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');
        // Assert
        await expectAnnuityPage(setup.kycPage);
    });
    (0, test_1.test)('Annuity page - fills escalation requirements', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAnnuityPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');
        // Act
        await setup.kycSteps.fillEscalationRequirements('Escalation requirements', 'This is to test Escalation requirements field works');
        // Assert
        await expectAnnuityPage(setup.kycPage);
    });
    (0, test_1.test)('Annuity page - fills income frequency', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAnnuityPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');
        // Act
        await setup.kycSteps.fillIncomeFrequency('Income Frequency', 'This is to test Income Frequency field works');
        // Assert
        await expectAnnuityPage(setup.kycPage);
    });
    (0, test_1.test)('Annuity page - fills advance or arrears with proportion', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAnnuityPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');
        // Act
        await setup.kycSteps.fillAdvanceOrArrearsWithProportion('Advanced/arrears (inc proportion)', 'This is to test Advance Or Arrears With Proportion field works');
        // Assert
        await expectAnnuityPage(setup.kycPage);
    });
    (0, test_1.test)('Annuity page - fills guaranteed period', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAnnuityPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');
        // Act
        await setup.kycSteps.fillGuaranteedPeriod('Guaranteed period', 'This is to test Guaranteed period field works');
        // Assert
        await expectAnnuityPage(setup.kycPage);
    });
    (0, test_1.test)('Annuity page - fills overlap details', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAnnuityPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');
        // Act
        await setup.kycSteps.fillOverlapDetails('Overlap (if relevant)', 'This is to test Overlap Details field works');
        // Assert
        await expectAnnuityPage(setup.kycPage);
    });
    (0, test_1.test)('Annuity page - fills value protection', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAnnuityPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');
        // Act
        await setup.kycSteps.fillValueProtection('Value Protection', 'This is to test Value Protection field works');
        // Assert
        await expectAnnuityPage(setup.kycPage);
    });
    (0, test_1.test)('Annuity page - completes all annuity questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAnnuityPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerAnnuityQuestions();
        // Assert
        await expectAnnuityPage(setup.kycPage);
    });
    (0, test_1.test)('Annuity page - completes page and submits Fact Find', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeAnnuityPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.completeKYCAnnuity();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText(/Fact Find Successfully Completed/i).first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=annuity-page.isolated.spec.js.map