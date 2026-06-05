"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const KycContributionsAndProtectionSteps_1 = require("@steps/kyc/retirement/KycContributionsAndProtectionSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangeContributionsPage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Contributions & Protection');
    return {
        testBase,
        kycPage,
        kycSteps: new KycContributionsAndProtectionSteps_1.KycContributionsAndProtectionSteps(kycPage),
    };
}
async function cleanupContributionsPage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectContributionsPage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Contributions & Protection').first()).toBeVisible({
        timeout: 15000,
    });
    (0, test_1.expect)(kycPage.url()).toContain('page=contributions-allowances-protection');
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Retirement Fact Find - Contributions Page (Isolated)', () => {
    let currentSetup;
    test_1.test.afterEach(async () => {
        await cleanupContributionsPage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Contributions page - validates page heading and URL', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeContributionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycPage.waitForLoadState('domcontentloaded');
        // Assert
        await expectContributionsPage(setup.kycPage);
    });
    (0, test_1.test)('Contributions page - answers pension contribution intent', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeContributionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.selectPensionContributionIntent('Yes');
        // Assert
        await expectContributionsPage(setup.kycPage);
    });
    (0, test_1.test)('Contributions page - enters contribution details', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeContributionsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.selectPensionContributionIntent('Yes');
        // Act
        await setup.kycSteps.enterContributionDetails('This is to test Contribution field works');
        // Assert
        await expectContributionsPage(setup.kycPage);
    });
    (0, test_1.test)('Contributions page - answers annual allowance exceedance', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeContributionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.selectAnnualAllowanceExceedance('Yes');
        // Assert
        await expectContributionsPage(setup.kycPage);
    });
    (0, test_1.test)('Contributions page - enters annual allowance details', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeContributionsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.selectAnnualAllowanceExceedance('Yes');
        // Act
        await setup.kycSteps.enterAnnualAllowanceDetails('This is to test Annual Allowance field works');
        // Assert
        await expectContributionsPage(setup.kycPage);
    });
    (0, test_1.test)('Contributions page - answers carry forward question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeContributionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.selectCarryForward('Yes');
        // Assert
        await expectContributionsPage(setup.kycPage);
    });
    (0, test_1.test)('Contributions page - enters carry forward details', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeContributionsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.selectCarryForward('Yes');
        // Act
        await setup.kycSteps.enterCarryForwardDetails('This is to test Carry Forward field works');
        // Assert
        await expectContributionsPage(setup.kycPage);
    });
    (0, test_1.test)('Contributions page - completes all contributions questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeContributionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerContributionsAllowancesAndProtectionQuestions();
        // Assert
        await expectContributionsPage(setup.kycPage);
    });
    (0, test_1.test)('Contributions page - completes page and proceeds to Annuity', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeContributionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.completeKycContributionsAllowancesAndProtection();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Annuity').first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=contributions-page.isolated.spec.js.map