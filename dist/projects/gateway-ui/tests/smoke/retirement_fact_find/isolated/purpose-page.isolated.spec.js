"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const KycPurposePageSteps_1 = require("@steps/kyc/retirement/KycPurposePageSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangePurposePage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Retirement Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Purpose');
    return {
        testBase,
        kycPage,
        kycSteps: new KycPurposePageSteps_1.KycPurposePageSteps(kycPage),
    };
}
async function cleanupPurposePage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectPurposePage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Purpose').first()).toBeVisible({
        timeout: 15000,
    });
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Retirement Fact Find - Purpose Page (Isolated)', () => {
    let currentSetup;
    test_1.test.afterEach(async () => {
        await cleanupPurposePage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Purpose page - validates page heading', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePurposePage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycPage.waitForLoadState('domcontentloaded');
        // Assert
        await expectPurposePage(setup.kycPage);
    });
    (0, test_1.test)('Purpose page - fills pension discussion purpose', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePurposePage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.fillPensionDiscussionPurpose('What is the purpose of this pension discussion?', 'This is to test Pension Discussion Purpose field works');
        // Assert
        await expectPurposePage(setup.kycPage);
    });
    (0, test_1.test)('Purpose page - completes all purpose questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePurposePage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerPurposeQuestions();
        // Assert
        await expectPurposePage(setup.kycPage);
    });
    (0, test_1.test)('Purpose page - completes page and proceeds to Life Events & Benefits', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePurposePage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.completeKYCPurpose();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Life Events & Benefits').first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=purpose-page.isolated.spec.js.map