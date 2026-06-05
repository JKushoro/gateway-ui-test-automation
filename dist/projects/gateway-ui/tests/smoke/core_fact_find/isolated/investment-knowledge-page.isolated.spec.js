"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const KycInvestmentKnowledgeAndPreferencesPageSteps_1 = require("@steps/kyc/core/KycInvestmentKnowledgeAndPreferencesPageSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangeInvestmentKnowledgePage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Investment Knowledge & Preferences');
    return {
        testBase,
        kycPage,
        kycSteps: new KycInvestmentKnowledgeAndPreferencesPageSteps_1.KycInvestmentKnowledgeAndPreferencesPageSteps(kycPage),
    };
}
async function cleanupInvestmentKnowledgePage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectInvestmentKnowledgePage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Investment Knowledge & Preferences').first()).toBeVisible({
        timeout: 15000,
    });
    (0, test_1.expect)(kycPage.url()).toContain('page=investment-knowledge-and-preferences');
}
async function arrangeSustainabilityFields(setup) {
    await setup.kycSteps.answerInvestmentKnowledgeAndPreference('Yes');
    await setup.kycSteps.answerClientClassification('Retail');
    await setup.kycSteps.answerInvestmentExperience('Basic');
    await setup.kycSteps.answerSustainabilityRequirements('Yes â€“ relating to one and/or some of my objectives');
}
async function arrangeResponsibleInvestmentFields(setup) {
    await arrangeSustainabilityFields(setup);
    await setup.kycSteps.answerSustainabilityAwareness('Yes - they are comfortable proceeding');
    await setup.kycSteps.assertResponsibleInvestmentFramework();
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Core Fact Find - Investment Knowledge & Preferences Page (Isolated)', () => {
    let currentSetup;
    test_1.test.afterEach(async () => {
        await cleanupInvestmentKnowledgePage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - validates page heading and URL', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycPage.waitForLoadState('domcontentloaded');
        // Assert
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - answers update preference question', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerInvestmentKnowledgeAndPreference('Yes');
        // Assert
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - answers client classification', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        await setup.kycSteps.answerInvestmentKnowledgeAndPreference('Yes');
        // Act
        await setup.kycSteps.answerClientClassification('Retail');
        // Assert
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - answers investment experience', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        await setup.kycSteps.answerInvestmentKnowledgeAndPreference('Yes');
        await setup.kycSteps.answerClientClassification('Retail');
        // Act
        await setup.kycSteps.answerInvestmentExperience('Basic');
        // Assert
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - answers sustainability requirements', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        await setup.kycSteps.answerInvestmentKnowledgeAndPreference('Yes');
        await setup.kycSteps.answerClientClassification('Retail');
        await setup.kycSteps.answerInvestmentExperience('Basic');
        // Act
        await setup.kycSteps.answerSustainabilityRequirements('Yes â€“ relating to one and/or some of my objectives');
        // Assert
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - answers sustainability awareness', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        await arrangeSustainabilityFields(setup);
        // Act
        await setup.kycSteps.answerSustainabilityAwareness('Yes - they are comfortable proceeding');
        // Assert
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - validates responsible investment framework', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        await arrangeSustainabilityFields(setup);
        await setup.kycSteps.answerSustainabilityAwareness('Yes - they are comfortable proceeding');
        // Act
        await setup.kycSteps.assertResponsibleInvestmentFramework();
        // Assert
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - answers responsible investment framework', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        await arrangeResponsibleInvestmentFields(setup);
        // Act
        await setup.kycSteps.answerResponsibleInvestmentFramework('No');
        // Assert
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - answers faith based requirements', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        await arrangeResponsibleInvestmentFields(setup);
        await setup.kycSteps.answerResponsibleInvestmentFramework('No');
        // Act
        await setup.kycSteps.answerFaithBasedRequirements('No');
        // Assert
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - answers negative screens', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        await arrangeResponsibleInvestmentFields(setup);
        await setup.kycSteps.answerResponsibleInvestmentFramework('No');
        await setup.kycSteps.answerFaithBasedRequirements('No');
        // Act
        await setup.kycSteps.answerNegativeScreens('Yes');
        // Assert
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - selects negative screens', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        await arrangeResponsibleInvestmentFields(setup);
        await setup.kycSteps.answerResponsibleInvestmentFramework('No');
        await setup.kycSteps.answerFaithBasedRequirements('No');
        await setup.kycSteps.answerNegativeScreens('Yes');
        // Act
        const selected = await setup.kycSteps.selectNegativeScreens();
        // Assert
        (0, test_1.expect)(Array.isArray(selected)).toBe(true);
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - answers sustainable investment statement', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        await arrangeResponsibleInvestmentFields(setup);
        await setup.kycSteps.answerResponsibleInvestmentFramework('No');
        await setup.kycSteps.answerFaithBasedRequirements('No');
        await setup.kycSteps.answerNegativeScreens('Yes');
        await setup.kycSteps.selectNegativeScreens();
        // Act
        await setup.kycSteps.answerSustainableInvestmentStatement();
        // Assert
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - completes all questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerInvestmentKnowledgeAndPreferencesQuestions();
        // Assert
        await expectInvestmentKnowledgePage(setup.kycPage);
    });
    (0, test_1.test)('Investment Knowledge & Preferences page - completes page and submits Fact Find', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeInvestmentKnowledgePage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.completeKYC_InvestmentKnowledgeAndPreferences();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText(/Fact Find Successfully Completed/i).first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=investment-knowledge-page.isolated.spec.js.map