"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const KycPropertyAndAssetsSteps_1 = require("@steps/kyc/core/KycPropertyAndAssetsSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangePropertyAndAssetsPage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Property & Assets');
    return {
        testBase,
        kycPage,
        kycSteps: new KycPropertyAndAssetsSteps_1.KycPropertyAndAssetsSteps(kycPage),
    };
}
async function cleanupPropertyAndAssetsPage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectPropertyAndAssetsPage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Property & assets').first()).toBeVisible({
        timeout: 15000,
    });
    (0, test_1.expect)(kycPage.url()).toContain('page=property-and-assets');
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Core Fact Find - Property & Assets Page (Isolated)', () => {
    let currentSetup;
    test_1.test.afterEach(async () => {
        await cleanupPropertyAndAssetsPage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Property & Assets page - validates page heading and URL', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePropertyAndAssetsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycPage.waitForLoadState('domcontentloaded');
        // Assert
        await expectPropertyAndAssetsPage(setup.kycPage);
    });
    (0, test_1.test)('Property & Assets page - answers own or rent property question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePropertyAndAssetsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerOwnOrRentPropertyQuestion('Owner');
        // Assert
        await expectPropertyAndAssetsPage(setup.kycPage);
    });
    (0, test_1.test)('Property & Assets page - answers asset owner question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePropertyAndAssetsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.answerOwnOrRentPropertyQuestion('Owner');
        // Act
        await setup.kycSteps.answerAssetOwnerQuestion('Joint');
        // Assert
        await expectPropertyAndAssetsPage(setup.kycPage);
    });
    (0, test_1.test)('Property & Assets page - fills current property value', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePropertyAndAssetsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.answerOwnOrRentPropertyQuestion('Owner');
        await setup.kycSteps.answerAssetOwnerQuestion('Joint');
        // Act
        await setup.kycSteps.fillPropertyValue('250,000');
        // Assert
        await expectPropertyAndAssetsPage(setup.kycPage);
    });
    (0, test_1.test)('Property & Assets page - fills purchase home date', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePropertyAndAssetsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.answerOwnOrRentPropertyQuestion('Owner');
        await setup.kycSteps.answerAssetOwnerQuestion('Joint');
        await setup.kycSteps.fillPropertyValue('250,000');
        // Act
        await setup.kycSteps.fillPurchaseHomeDate(5, 15);
        // Assert
        await expectPropertyAndAssetsPage(setup.kycPage);
    });
    (0, test_1.test)('Property & Assets page - answers other properties or assets question', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePropertyAndAssetsPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.answerOwnOrRentPropertyQuestion('Owner');
        // Act
        await setup.kycSteps.answerOtherPropertiesOrAssets('No');
        // Assert
        await expectPropertyAndAssetsPage(setup.kycPage);
    });
    (0, test_1.test)('Property & Assets page - completes all property and asset questions', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePropertyAndAssetsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerPropertyAndAssetQuestions();
        // Assert
        await expectPropertyAndAssetsPage(setup.kycPage);
    });
    (0, test_1.test)('Property & Assets page - completes page and proceeds to Savings & Investments', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangePropertyAndAssetsPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.completeKYC_PropertyAndAssets();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Savings & Investments').first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=property-assets-page.isolated.spec.js.map