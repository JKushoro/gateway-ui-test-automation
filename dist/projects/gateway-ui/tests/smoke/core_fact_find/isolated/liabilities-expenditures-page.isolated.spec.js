"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
const KycLiabilitiesAndExpendituresPageSteps_1 = require("@steps/kyc/core/KycLiabilitiesAndExpendituresPageSteps");
const IsolatedTestManager_1 = require("@tests/shared/IsolatedTestManager");
const TestUtils_1 = __importDefault(require("@tests/shared/TestUtils"));
async function arrangeLiabilitiesAndExpendituresPage(browser) {
    const testBase = await TestUtils_1.default.create(browser, 'qa');
    await testBase.factFindSteps.addClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
    const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
    const actionHelper = new ActionHelper_1.ActionHelper(kycPage);
    await actionHelper.selectCustomRadioOptionByLabel('Liabilities & Expenditures');
    return {
        testBase,
        kycPage,
        kycSteps: new KycLiabilitiesAndExpendituresPageSteps_1.KycLiabilitiesAndExpendituresPageSteps(kycPage),
    };
}
async function cleanupLiabilitiesAndExpendituresPage(setup) {
    await setup?.kycPage.close();
    await setup?.testBase.cleanup();
}
async function expectLiabilitiesAndExpendituresPage(kycPage) {
    await (0, test_1.expect)(kycPage.getByText('Liabilities & Expenditures').first()).toBeVisible({
        timeout: 15000,
    });
    (0, test_1.expect)(kycPage.url()).toContain('page=liabilities-and-expenditures');
}
async function arrangeMortgageFields(setup) {
    await setup.kycSteps.answerHasMortgageOnProperty('Yes');
    await setup.kycSteps.selectCurrentMortgageEndTerm('I know the date');
}
async function arrangeMortgageDetails(setup) {
    await arrangeMortgageFields(setup);
    await setup.kycSteps.setMortgageTermEndDate(2, 3);
    await setup.kycSteps.selectMortgageLender();
    await setup.kycSteps.selectTypeOfMortgage();
    await setup.kycSteps.fillFirstOutstandingBalance('20,000');
    await setup.kycSteps.fillMortgageAccountNumber();
    await setup.kycSteps.selectMortgageRepaymentType();
    await setup.kycSteps.fillFirstMonthlyPayment(12);
    await setup.kycSteps.selectInterestType();
}
(0, IsolatedTestManager_1.setupIsolatedTest)('Core Fact Find - Liabilities & Expenditures Page (Isolated)', () => {
    let currentSetup;
    test_1.test.afterEach(async () => {
        await cleanupLiabilitiesAndExpendituresPage(currentSetup);
        currentSetup = undefined;
    });
    (0, test_1.test)('Liabilities & Expenditures page - validates page heading and URL', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycPage.waitForLoadState('domcontentloaded');
        // Assert
        await expectLiabilitiesAndExpendituresPage(setup.kycPage);
    });
    (0, test_1.test)('Liabilities & Expenditures page - answers mortgage question', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerHasMortgageOnProperty('Yes');
        // Assert
        await expectLiabilitiesAndExpendituresPage(setup.kycPage);
    });
    (0, test_1.test)('Liabilities & Expenditures page - selects current mortgage term end', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        await setup.kycSteps.answerHasMortgageOnProperty('Yes');
        // Act
        await setup.kycSteps.selectCurrentMortgageEndTerm('I know the date');
        // Assert
        await expectLiabilitiesAndExpendituresPage(setup.kycPage);
    });
    (0, test_1.test)('Liabilities & Expenditures page - sets mortgage term end date', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        await arrangeMortgageFields(setup);
        // Act
        const date = await setup.kycSteps.setMortgageTermEndDate(2, 3);
        // Assert
        (0, test_1.expect)(date).toBeTruthy();
        await expectLiabilitiesAndExpendituresPage(setup.kycPage);
    });
    (0, test_1.test)('Liabilities & Expenditures page - selects mortgage lender and type', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        await arrangeMortgageFields(setup);
        await setup.kycSteps.setMortgageTermEndDate(2, 3);
        // Act
        await setup.kycSteps.selectMortgageLender();
        await setup.kycSteps.selectTypeOfMortgage();
        // Assert
        await expectLiabilitiesAndExpendituresPage(setup.kycPage);
    });
    (0, test_1.test)('Liabilities & Expenditures page - fills mortgage balance and account number', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        await arrangeMortgageFields(setup);
        // Act
        await setup.kycSteps.fillFirstOutstandingBalance('20,000');
        await setup.kycSteps.fillMortgageAccountNumber();
        // Assert
        await expectLiabilitiesAndExpendituresPage(setup.kycPage);
    });
    (0, test_1.test)('Liabilities & Expenditures page - selects mortgage repayment and interest type', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        await arrangeMortgageFields(setup);
        // Act
        await setup.kycSteps.selectMortgageRepaymentType();
        await setup.kycSteps.selectInterestType();
        // Assert
        await expectLiabilitiesAndExpendituresPage(setup.kycPage);
    });
    (0, test_1.test)('Liabilities & Expenditures page - fills mortgage payment and fixed term details', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        await arrangeMortgageDetails(setup);
        // Act
        await setup.kycSteps.fillFirstMonthlyPayment(12);
        await setup.kycSteps.fillFixedLengthYears('15');
        await setup.kycSteps.fillRemainingMortgageTermYears('4');
        await setup.kycSteps.fillFirstCurrentInterestRate(12);
        // Assert
        await expectLiabilitiesAndExpendituresPage(setup.kycPage);
    });
    (0, test_1.test)('Liabilities & Expenditures page - sets product start date', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        await arrangeMortgageDetails(setup);
        // Act
        const date = await setup.kycSteps.setProductStartDate(1, 1);
        // Assert
        (0, test_1.expect)(date).toBeTruthy();
        await expectLiabilitiesAndExpendituresPage(setup.kycPage);
    });
    (0, test_1.test)('Liabilities & Expenditures page - answers other liabilities and validates totals', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        await arrangeMortgageDetails(setup);
        await setup.kycSteps.fillFixedLengthYears('15');
        await setup.kycSteps.fillRemainingMortgageTermYears('4');
        await setup.kycSteps.fillFirstCurrentInterestRate(12);
        await setup.kycSteps.setProductStartDate(1, 1);
        // Act
        await setup.kycSteps.answerOtherLiabilities('Yes');
        await setup.kycSteps.assertTotalLiabilitiesCalculatedCorrectly();
        // Assert
        await expectLiabilitiesAndExpendituresPage(setup.kycPage);
    });
    (0, test_1.test)('Liabilities & Expenditures page - fills committed expenditures', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.fillCommittedExpenditures();
        // Assert
        await expectLiabilitiesAndExpendituresPage(setup.kycPage);
    });
    (0, test_1.test)('Liabilities & Expenditures page - completes all questions', async ({ browser }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.answerLiabilitiesAndExpendituresQuestions();
        // Assert
        await expectLiabilitiesAndExpendituresPage(setup.kycPage);
    });
    (0, test_1.test)('Liabilities & Expenditures page - completes page and proceeds to Investment Knowledge', async ({ browser, }) => {
        test_1.test.setTimeout(300000);
        // Arrange
        currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
        const setup = currentSetup;
        // Act
        await setup.kycSteps.completeKYC_LiabilitiesAndExpenditures();
        // Assert
        await (0, test_1.expect)(setup.kycPage.getByText('Investment Knowledge & Preferences').first()).toBeVisible({
            timeout: 15000,
        });
    });
});
//# sourceMappingURL=liabilities-expenditures-page.isolated.spec.js.map