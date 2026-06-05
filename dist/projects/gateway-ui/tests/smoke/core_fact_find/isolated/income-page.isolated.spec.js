"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const KycIncomePageSteps_1 = require("@steps/kyc/core/KycIncomePageSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangeIncomePage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Income');
    return {
        testBase,
        kycPage,
        kycSteps: new KycIncomePageSteps_1.KycIncomePageSteps(kycPage),
    };
}
async function cleanupIncomePage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectIncomePage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Income').first()).toBeVisible({
        timeout: 15000,
    });
    (0, test_1.expect)(kycPage.url()).toContain('page=income');
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Core Fact Find - Income Page (Isolated)', () => {
    let currentSetup;
    test_1.test.afterEach(async () => {
        await cleanupIncomePage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Income page - validates page heading and URL', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeIncomePage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycPage.waitForLoadState('domcontentloaded');
        // Assert
        await expectIncomePage(setup.kycPage);
    });
    (0, test_1.test)('Income page - answers other income source question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeIncomePage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerOtherIncomeSourceQuestion('Yes');
        // Assert
        await expectIncomePage(setup.kycPage);
    });
    (0, test_1.test)('Income page - answers earner type question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeIncomePage(browser);
        const setup = currentSetup;
        await setup.kycSteps.answerOtherIncomeSourceQuestion('Yes');
        // Act
        await setup.kycSteps.answerEarnerTypeQuestion('Joint');
        // Assert
        await expectIncomePage(setup.kycPage);
    });
    (0, test_1.test)('Income page - selects income source', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeIncomePage(browser);
        const setup = currentSetup;
        await setup.kycSteps.answerOtherIncomeSourceQuestion('Yes');
        await setup.kycSteps.answerEarnerTypeQuestion('Joint');
        // Act
        const selectedIncomeSource = await setup.kycSteps.selectIncomeSourceOption('Employed Salary');
        // Assert
        (0, test_1.expect)(selectedIncomeSource).toBeTruthy();
        await (0, test_1.expect)(setup.kycPage.getByText(selectedIncomeSource, { exact: false }).first()).toBeVisible();
        await expectIncomePage(setup.kycPage);
    });
    (0, test_1.test)('Income page - fills gross annual income', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeIncomePage(browser);
        const setup = currentSetup;
        await setup.kycSteps.answerOtherIncomeSourceQuestion('Yes');
        await setup.kycSteps.answerEarnerTypeQuestion('Joint');
        await setup.kycSteps.selectIncomeSourceOption('Employed Salary');
        // Act
        await setup.kycSteps.fillGrossAnnualIncomeField('90,000');
        // Assert
        await expectIncomePage(setup.kycPage);
    });
    (0, test_1.test)('Income page - completes all income questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeIncomePage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerAllIncomeQuestions();
        // Assert
        await expectIncomePage(setup.kycPage);
    });
    (0, test_1.test)('Income page - completes page and proceeds to Liabilities & Expenditures', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeIncomePage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.completeKYC_Income();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Liabilities & Expenditures').first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=income-page.isolated.spec.js.map