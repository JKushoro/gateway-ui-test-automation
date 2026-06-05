"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const KycProtectionPageSteps_1 = require("@steps/kyc/core/KycProtectionPageSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangeProtectionPage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Protection');
    return {
        testBase,
        kycPage,
        kycSteps: new KycProtectionPageSteps_1.KycProtectionPageSteps(kycPage),
    };
}
async function cleanupProtectionPage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectProtectionPage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Protection').first()).toBeVisible({
        timeout: 15000,
    });
    (0, test_1.expect)(kycPage.url()).toContain('page=protection');
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Core Fact Find - Protection Page (Isolated)', () => {
    let currentSetup;
    test_1.test.afterEach(async () => {
        await cleanupProtectionPage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Protection page - validates page heading and URL', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeProtectionPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycPage.waitForLoadState('domcontentloaded');
        // Assert
        await expectProtectionPage(setup.kycPage);
    });
    (0, test_1.test)('Protection page - answers income protection question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeProtectionPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerIncomeProtectionQuestion('No');
        // Assert
        await expectProtectionPage(setup.kycPage);
    });
    (0, test_1.test)('Protection page - answers life or critical illness cover question', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeProtectionPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerLifeOrCriticalIllnessCoverQuestion('No');
        // Assert
        await expectProtectionPage(setup.kycPage);
    });
    (0, test_1.test)('Protection page - answers private medical insurance question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeProtectionPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerPrivateMedicalInsuranceQuestion('No');
        // Assert
        await expectProtectionPage(setup.kycPage);
    });
    (0, test_1.test)('Protection page - completes all protection questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeProtectionPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerAllProtectionQuestions();
        // Assert
        await expectProtectionPage(setup.kycPage);
    });
    (0, test_1.test)('Protection page - completes page and proceeds to Income', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeProtectionPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.completeKYC_Protection();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Income').first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=protection-page.isolated.spec.js.map