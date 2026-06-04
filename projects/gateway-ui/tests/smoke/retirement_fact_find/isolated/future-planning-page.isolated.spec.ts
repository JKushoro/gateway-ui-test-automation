import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { KycFuturePlanningPageSteps } from '@steps/kyc/retirement/KycFuturePlanningPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type FuturePlanningSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycFuturePlanningPageSteps;
};

async function arrangeFuturePlanningPage(browser: Browser): Promise<FuturePlanningSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind(
    'Retirement Fact Find'
  );

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Future Planning');

  return {
    testBase,
    kycPage,
    kycSteps: new KycFuturePlanningPageSteps(kycPage),
  };
}

async function cleanupFuturePlanningPage(setup?: FuturePlanningSetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectFuturePlanningPage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Future Planning').first()).toBeVisible({
    timeout: 15_000,
  });
  expect(kycPage.url()).toContain('page=futureplanning');
}

setupIsolatedTest('Retirement Fact Find - Future Planning Page (Isolated)', () => {
  let currentSetup: FuturePlanningSetup | undefined;

  test.afterEach(async () => {
    await cleanupFuturePlanningPage(currentSetup);
    currentSetup = undefined;
  });

  test('Future Planning page - validates page heading and URL', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFuturePlanningPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycPage.waitForLoadState('domcontentloaded');

    // Assert
    await expectFuturePlanningPage(setup.kycPage);
  });

  test('Future Planning page - fills retirement plans', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFuturePlanningPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.fillRetirementPlans(
      'What are your retirement plans? Please provide details of short and longer term plans',
      'This is to test Retirement Plans field works'
    );

    // Assert
    await expectFuturePlanningPage(setup.kycPage);
  });

  test('Future Planning page - answers retirement move intent', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFuturePlanningPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.selectRetirementMoveIntent('Yes');

    // Assert
    await expectFuturePlanningPage(setup.kycPage);
  });

  test('Future Planning page - fills further information', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFuturePlanningPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectRetirementMoveIntent('Yes');

    // Act
    await setup.kycSteps.fillFurtherInformation(
      'Please provide further information',
      'This is to test Further Information field works'
    );

    // Assert
    await expectFuturePlanningPage(setup.kycPage);
  });

  test('Future Planning page - fills expenditure changes', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFuturePlanningPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.fillEssentialExpenditureChanges(
      'What changes do you expect to your Essential Expenditure? Please provide details',
      'This is to test Essential Expenditure Changes field works'
    );
    await setup.kycSteps.fillDiscretionaryExpenditureChanges(
      'What changes do you expect to your Discretionary Expenditure? Please provide details',
      'This is to test Discretionary Expenditure Changes field works'
    );

    // Assert
    await expectFuturePlanningPage(setup.kycPage);
  });

  test('Future Planning page - answers one-off events planning', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFuturePlanningPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.selectOneOffEventsPlanning('Yes');

    // Assert
    await expectFuturePlanningPage(setup.kycPage);
  });

  test('Future Planning page - sets one-off event date and amount', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFuturePlanningPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectOneOffEventsPlanning('Yes');

    // Act
    const date = await setup.kycSteps.setRetirementOneOffEventDate(0, 1, 1);
    await setup.kycSteps.fillFirstRetirementAmount(200000);

    // Assert
    expect(date).toBeTruthy();
    await expectFuturePlanningPage(setup.kycPage);
  });

  test('Future Planning page - fills retirement income sources details', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFuturePlanningPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.fillRetirementIncomeSourcesDetails(
      'What sources of income and/ or capital do you wish to designate for your retirement? Please provide details',
      'This is to test Retirement IncomeSources field works'
    );

    // Assert
    await expectFuturePlanningPage(setup.kycPage);
  });

  test('Future Planning page - fills guaranteed income details', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFuturePlanningPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.fillGuaranteedIncomeEssentialExpenditureDetails(
      'How do you feel about securing a guaranteed income to meet your Essential expenditure in retirement? Please provide details',
      'This is to test Guaranteed Income Essential Expenditure field works'
    );
    await setup.kycSteps.fillGuaranteedIncomeForOtherExpenditureDetails(
      'How do you feel about securing guaranteed income to meet other expenditure in retirement? Please provide details',
      'This is to test Guaranteed Income For Other Expenditure field works'
    );

    // Assert
    await expectFuturePlanningPage(setup.kycPage);
  });

  test('Future Planning page - completes all future planning questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFuturePlanningPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerFuturePlanningQuestions();

    // Assert
    await expectFuturePlanningPage(setup.kycPage);
  });

  test('Future Planning page - completes page and proceeds to Contributions & Protection', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFuturePlanningPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKYCKycFuturePlanning();

    // Assert
    await expect(setup.kycPage.getByText('Contributions & Protection').first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
