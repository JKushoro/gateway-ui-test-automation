import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { KycLiabilitiesAndExpendituresPageSteps } from '@steps/kyc/core/KycLiabilitiesAndExpendituresPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type LiabilitiesAndExpendituresSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycLiabilitiesAndExpendituresPageSteps;
};

async function arrangeLiabilitiesAndExpendituresPage(
  browser: Browser
): Promise<LiabilitiesAndExpendituresSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Liabilities & Expenditures');

  return {
    testBase,
    kycPage,
    kycSteps: new KycLiabilitiesAndExpendituresPageSteps(kycPage),
  };
}

async function cleanupLiabilitiesAndExpendituresPage(
  setup?: LiabilitiesAndExpendituresSetup
): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectLiabilitiesAndExpendituresPage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Liabilities & Expenditures').first()).toBeVisible({
    timeout: 15_000,
  });
  expect(kycPage.url()).toContain('page=liabilities-and-expenditures');
}

async function arrangeMortgageFields(setup: LiabilitiesAndExpendituresSetup): Promise<void> {
  await setup.kycSteps.answerHasMortgageOnProperty('Yes');
  await setup.kycSteps.selectCurrentMortgageEndTerm('I know the date');
}

async function arrangeMortgageDetails(setup: LiabilitiesAndExpendituresSetup): Promise<void> {
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

setupIsolatedTest('Core Fact Find - Liabilities & Expenditures Page (Isolated)', () => {
  let currentSetup: LiabilitiesAndExpendituresSetup | undefined;

  test.afterEach(async () => {
    await cleanupLiabilitiesAndExpendituresPage(currentSetup);
    currentSetup = undefined;
  });

  test('Liabilities & Expenditures page - validates page heading and URL', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycPage.waitForLoadState('domcontentloaded');

    // Assert
    await expectLiabilitiesAndExpendituresPage(setup.kycPage);
  });

  test('Liabilities & Expenditures page - answers mortgage question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerHasMortgageOnProperty('Yes');

    // Assert
    await expectLiabilitiesAndExpendituresPage(setup.kycPage);
  });

  test('Liabilities & Expenditures page - selects current mortgage term end', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.answerHasMortgageOnProperty('Yes');

    // Act
    await setup.kycSteps.selectCurrentMortgageEndTerm('I know the date');

    // Assert
    await expectLiabilitiesAndExpendituresPage(setup.kycPage);
  });

  test('Liabilities & Expenditures page - sets mortgage term end date', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
    const setup = currentSetup;
    await arrangeMortgageFields(setup);

    // Act
    const date = await setup.kycSteps.setMortgageTermEndDate(2, 3);

    // Assert
    expect(date).toBeTruthy();
    await expectLiabilitiesAndExpendituresPage(setup.kycPage);
  });

  test('Liabilities & Expenditures page - selects mortgage lender and type', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

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

  test('Liabilities & Expenditures page - fills mortgage balance and account number', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

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

  test('Liabilities & Expenditures page - selects mortgage repayment and interest type', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

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

  test('Liabilities & Expenditures page - fills mortgage payment and fixed term details', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

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

  test('Liabilities & Expenditures page - sets product start date', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
    const setup = currentSetup;
    await arrangeMortgageDetails(setup);

    // Act
    const date = await setup.kycSteps.setProductStartDate(1, 1);

    // Assert
    expect(date).toBeTruthy();
    await expectLiabilitiesAndExpendituresPage(setup.kycPage);
  });

  test('Liabilities & Expenditures page - answers other liabilities and validates totals', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

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

  test('Liabilities & Expenditures page - fills committed expenditures', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.fillCommittedExpenditures();

    // Assert
    await expectLiabilitiesAndExpendituresPage(setup.kycPage);
  });

  test('Liabilities & Expenditures page - completes all questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerLiabilitiesAndExpendituresQuestions();

    // Assert
    await expectLiabilitiesAndExpendituresPage(setup.kycPage);
  });

  test('Liabilities & Expenditures page - completes page and proceeds to Investment Knowledge', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLiabilitiesAndExpendituresPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKYC_LiabilitiesAndExpenditures();

    // Assert
    await expect(setup.kycPage.getByText('Investment Knowledge & Preferences').first()).toBeVisible(
      {
        timeout: 15_000,
      }
    );
  });
});
