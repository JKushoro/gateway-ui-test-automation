"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const KycCurrentSituationPageSteps_1 = require("@steps/kyc/core/KycCurrentSituationPageSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const DataStore_1 = require("@framework/utils/DataStore");
async function arrangeCurrentSituationPage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Current Situation');
    return {
        testBase,
        kycPage,
        kycSteps: new KycCurrentSituationPageSteps_1.KycCurrentSituationPageSteps(kycPage),
    };
}
async function cleanupCurrentSituationPage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Core Fact Find - Current Situation Page (Isolated)', () => {
    (0, test_1.test)('Current Situation page - validates page heading and URL', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        let setup;
        try {
            // Arrange
            setup = await arrangeCurrentSituationPage(browser);
            // Act
            await setup.kycSteps.validateCurrentSituationPage();
            // Assert
            await (0, test_1.expect)(setup.kycPage.getByText('Current situation').first()).toBeVisible();
            (0, test_1.expect)(setup.kycPage.url()).toContain('page=current-situation');
        }
        finally {
            await cleanupCurrentSituationPage(setup);
        }
    });
    (0, test_1.test)('Current Situation page - completes employment questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        let setup;
        try {
            // Arrange
            setup = await arrangeCurrentSituationPage(browser);
            await setup.kycSteps.validateCurrentSituationPage();
            // Act
            await setup.kycSteps.handleEmploymentQuestions();
            // Assert
            await (0, test_1.expect)(setup.kycPage.getByText('Current situation').first()).toBeVisible();
            (0, test_1.expect)(setup.kycPage.url()).toContain('page=current-situation');
        }
        finally {
            await cleanupCurrentSituationPage(setup);
        }
    });
    (0, test_1.test)('Current Situation page - completes retirement questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        let setup;
        try {
            // Arrange
            setup = await arrangeCurrentSituationPage(browser);
            await setup.kycSteps.validateCurrentSituationPage();
            // Act
            await setup.kycSteps.handleRetirementQuestions();
            // Assert
            await (0, test_1.expect)(setup.kycPage.getByText('Current situation').first()).toBeVisible();
            (0, test_1.expect)(setup.kycPage.url()).toContain('page=current-situation');
        }
        finally {
            await cleanupCurrentSituationPage(setup);
        }
    });
    (0, test_1.test)('Current Situation page - completes health questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        let setup;
        try {
            // Arrange
            setup = await arrangeCurrentSituationPage(browser);
            await setup.kycSteps.validateCurrentSituationPage();
            // Act
            await setup.kycSteps.handleHealthQuestions();
            // Assert
            await (0, test_1.expect)(setup.kycPage.getByText('Current situation').first()).toBeVisible();
            (0, test_1.expect)(setup.kycPage.url()).toContain('page=current-situation');
        }
        finally {
            await cleanupCurrentSituationPage(setup);
        }
    });
    (0, test_1.test)('Current Situation page - completes personal details questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        let setup;
        try {
            // Arrange
            setup = await arrangeCurrentSituationPage(browser);
            await setup.kycSteps.validateCurrentSituationPage();
            // Act
            await setup.kycSteps.handlePersonalDetailsQuestions();
            // Assert
            (0, test_1.expect)(DataStore_1.dataStore.getValue('kyc.currentSituation.occupation')).toBeTruthy();
            (0, test_1.expect)(DataStore_1.dataStore.getValue('kyc.currentSituation.currentEmployer')).toBeTruthy();
            await (0, test_1.expect)(setup.kycPage.getByText('Current situation').first()).toBeVisible();
        }
        finally {
            await cleanupCurrentSituationPage(setup);
        }
    });
    (0, test_1.test)('Current Situation page - completes legal document questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        let setup;
        try {
            // Arrange
            setup = await arrangeCurrentSituationPage(browser);
            await setup.kycSteps.validateCurrentSituationPage();
            // Act
            await setup.kycSteps.handleLegalDocumentQuestions();
            // Assert
            await (0, test_1.expect)(setup.kycPage.getByText('Current situation').first()).toBeVisible();
            (0, test_1.expect)(setup.kycPage.url()).toContain('page=current-situation');
        }
        finally {
            await cleanupCurrentSituationPage(setup);
        }
    });
    (0, test_1.test)('Current Situation page - completes all questions and saves page', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        let setup;
        try {
            // Arrange
            setup = await arrangeCurrentSituationPage(browser);
            await setup.kycSteps.validateCurrentSituationPage();
            await setup.kycSteps.answerAllCurrentSituationQuestions();
            // Act
            await setup.kycSteps.saveAndContinue();
            // Assert
            await (0, test_1.expect)(setup.kycPage.getByText('Property & assets').first()).toBeVisible({
                timeout: 15000,
            });
        }
        finally {
            await cleanupCurrentSituationPage(setup);
        }
    });
});
//# sourceMappingURL=current-situation-page.isolated.spec.js.map