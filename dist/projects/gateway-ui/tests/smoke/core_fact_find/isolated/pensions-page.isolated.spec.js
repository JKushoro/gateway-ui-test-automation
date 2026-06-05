"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const KycPensionsPageSteps_1 = require("@steps/kyc/core/KycPensionsPageSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangePensionsPage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Pensions');
    return {
        testBase,
        kycPage,
        kycSteps: new KycPensionsPageSteps_1.KycPensionsPageSteps(kycPage),
    };
}
async function cleanupPensionsPage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectPensionsPage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Pensions').first()).toBeVisible({
        timeout: 15000,
    });
    (0, test_1.expect)(kycPage.url()).toContain('page=pensions');
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Core Fact Find - Pensions Page (Isolated)', () => {
    let currentSetup;
    test_1.test.afterEach(async () => {
        await cleanupPensionsPage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Pensions page - validates page heading and URL', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePensionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycPage.waitForLoadState('domcontentloaded');
        // Assert
        await expectPensionsPage(setup.kycPage);
    });
    (0, test_1.test)('Pensions page - answers workplace pension question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePensionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerWorkplacePensionQuestion('No');
        // Assert
        await expectPensionsPage(setup.kycPage);
    });
    (0, test_1.test)('Pensions page - answers previous employment pensions question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePensionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerPreviousEmploymentPensionsQuestion('No');
        // Assert
        await expectPensionsPage(setup.kycPage);
    });
    (0, test_1.test)('Pensions page - answers other pensions question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePensionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerOtherPensionsQuestion('No');
        // Assert
        await expectPensionsPage(setup.kycPage);
    });
    (0, test_1.test)('Pensions page - answers state pension forecast question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePensionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerStatePensionForecastQuestion('No');
        // Assert
        await expectPensionsPage(setup.kycPage);
    });
    (0, test_1.test)('Pensions page - completes all pension questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePensionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerAllPensionQuestions();
        // Assert
        await expectPensionsPage(setup.kycPage);
    });
    (0, test_1.test)('Pensions page - completes page and proceeds to Protection', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePensionsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.completeKYC_Pensions();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Protection').first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=pensions-page.isolated.spec.js.map