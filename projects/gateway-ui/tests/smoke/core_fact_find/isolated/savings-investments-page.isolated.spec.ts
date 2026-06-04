import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { KycSavingsAndInvestmentsPageSteps } from '@steps/kyc/core/KycSavingsAndInvestmentsPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type SavingsAndInvestmentsSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycSavingsAndInvestmentsPageSteps;
};

async function arrangeSavingsAndInvestmentsPage(
  browser: Browser
): Promise<SavingsAndInvestmentsSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Savings & Investments');

  return {
    testBase,
    kycPage,
    kycSteps: new KycSavingsAndInvestmentsPageSteps(kycPage),
  };
}

async function cleanupSavingsAndInvestmentsPage(
  setup?: SavingsAndInvestmentsSetup
): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectSavingsAndInvestmentsPage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Savings & Investments').first()).toBeVisible({
    timeout: 15_000,
  });
  expect(kycPage.url()).toContain('page=savings-and-investments');
}

setupIsolatedTest('Core Fact Find - Savings & Investments Page (Isolated)', () => {
  let currentSetup: SavingsAndInvestmentsSetup | undefined;

  test.afterEach(async () => {
    await cleanupSavingsAndInvestmentsPage(currentSetup);
    currentSetup = undefined;
  });

  test('Savings & Investments page - validates page heading and URL', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeSavingsAndInvestmentsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycPage.waitForLoadState('domcontentloaded');

    // Assert
    await expectSavingsAndInvestmentsPage(setup.kycPage);
  });

  test('Savings & Investments page - answers cash savings outside Fairstone question', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeSavingsAndInvestmentsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerCashSavingsOutsideFairstoneQuestion('No');

    // Assert
    await expectSavingsAndInvestmentsPage(setup.kycPage);
  });

  test('Savings & Investments page - answers investments outside Fairstone question', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeSavingsAndInvestmentsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerInvestmentsOutsideFairstoneQuestion('No');

    // Assert
    await expectSavingsAndInvestmentsPage(setup.kycPage);
  });

  test('Savings & Investments page - answers ISA contribution question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeSavingsAndInvestmentsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerIsaContributionQuestion('No');

    // Assert
    await expectSavingsAndInvestmentsPage(setup.kycPage);
  });

  test('Savings & Investments page - completes all savings and investments questions', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeSavingsAndInvestmentsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerAllSavingsAndInvestmentsQuestions();

    // Assert
    await expectSavingsAndInvestmentsPage(setup.kycPage);
  });

  test('Savings & Investments page - completes page and proceeds to Pensions', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeSavingsAndInvestmentsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKYC_SavingsAndInvestments();

    // Assert
    await expect(setup.kycPage.getByText('Pensions').first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
