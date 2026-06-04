import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { KycIncomePageSteps } from '@steps/kyc/core/KycIncomePageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type IncomeSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycIncomePageSteps;
};

async function arrangeIncomePage(browser: Browser): Promise<IncomeSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Income');

  return {
    testBase,
    kycPage,
    kycSteps: new KycIncomePageSteps(kycPage),
  };
}

async function cleanupIncomePage(setup?: IncomeSetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectIncomePage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Income').first()).toBeVisible({
    timeout: 15_000,
  });
  expect(kycPage.url()).toContain('page=income');
}

setupIsolatedTest('Core Fact Find - Income Page (Isolated)', () => {
  let currentSetup: IncomeSetup | undefined;

  test.afterEach(async () => {
    await cleanupIncomePage(currentSetup);
    currentSetup = undefined;
  });

  test('Income page - validates page heading and URL', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeIncomePage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycPage.waitForLoadState('domcontentloaded');

    // Assert
    await expectIncomePage(setup.kycPage);
  });

  test('Income page - answers other income source question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeIncomePage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerOtherIncomeSourceQuestion('Yes');

    // Assert
    await expectIncomePage(setup.kycPage);
  });

  test('Income page - answers earner type question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeIncomePage(browser);
    const setup = currentSetup;
    await setup.kycSteps.answerOtherIncomeSourceQuestion('Yes');

    // Act
    await setup.kycSteps.answerEarnerTypeQuestion('Joint');

    // Assert
    await expectIncomePage(setup.kycPage);
  });

  test('Income page - selects income source', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeIncomePage(browser);
    const setup = currentSetup;
    await setup.kycSteps.answerOtherIncomeSourceQuestion('Yes');
    await setup.kycSteps.answerEarnerTypeQuestion('Joint');

    // Act
    const selectedIncomeSource = await setup.kycSteps.selectIncomeSourceOption('Employed Salary');

    // Assert
    expect(selectedIncomeSource).toBeTruthy();
    await expect(setup.kycPage.getByText(selectedIncomeSource, { exact: false }).first()).toBeVisible();
    await expectIncomePage(setup.kycPage);
  });

  test('Income page - fills gross annual income', async ({ browser }) => {
    test.setTimeout(300_000);

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

  test('Income page - completes all income questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeIncomePage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerAllIncomeQuestions();

    // Assert
    await expectIncomePage(setup.kycPage);
  });

  test('Income page - completes page and proceeds to Liabilities & Expenditures', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeIncomePage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKYC_Income();

    // Assert
    await expect(setup.kycPage.getByText('Liabilities & Expenditures').first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
