import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { KycKycLifeEventsAndBenefitsPageSteps } from '@steps/kyc/retirement/KycLifeEventsAndBenefitsPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type LifeEventsSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycKycLifeEventsAndBenefitsPageSteps;
};

async function arrangeLifeEventsPage(browser: Browser): Promise<LifeEventsSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind(
    'Retirement Fact Find'
  );

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Life Events & Benefits');

  return {
    testBase,
    kycPage,
    kycSteps: new KycKycLifeEventsAndBenefitsPageSteps(kycPage),
  };
}

async function cleanupLifeEventsPage(setup?: LifeEventsSetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectLifeEventsPage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Life Events & Benefits').first()).toBeVisible({
    timeout: 15_000,
  });
  expect(kycPage.url()).toContain('page=life-events-benefits');
}

setupIsolatedTest('Retirement Fact Find - Life Events & Benefits Page (Isolated)', () => {
  let currentSetup: LifeEventsSetup | undefined;

  test.afterEach(async () => {
    await cleanupLifeEventsPage(currentSetup);
    currentSetup = undefined;
  });

  test('Life Events & Benefits page - validates page heading and URL', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLifeEventsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycPage.waitForLoadState('domcontentloaded');

    // Assert
    await expectLifeEventsPage(setup.kycPage);
  });

  test('Life Events & Benefits page - answers maximum state pension question', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLifeEventsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.selectMaximumStatePension('No');

    // Assert
    await expectLifeEventsPage(setup.kycPage);
  });

  test('Life Events & Benefits page - fills state pension shortfall details', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLifeEventsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectMaximumStatePension('No');

    // Act
    await setup.kycSteps.fillProvideFurtherInformation(
      'Please provide further information',
      'This is to test Further Information field works'
    );
    await setup.kycSteps.fillShortfallAmount(2);

    // Assert
    await expectLifeEventsPage(setup.kycPage);
  });

  test('Life Events & Benefits page - answers means tested benefits question', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLifeEventsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.selectMeansTestedBenefitsReceipt('Yes');

    // Assert
    await expectLifeEventsPage(setup.kycPage);
  });

  test('Life Events & Benefits page - fills post state pension details', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLifeEventsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectMeansTestedBenefitsReceipt('Yes');

    // Act
    await setup.kycSteps.fillPostStatePensionDetails(
      'Please give details and if these are likely to continue post State Pension Age (where relevant)',
      'This is to test Post State Pension field works'
    );

    // Assert
    await expectLifeEventsPage(setup.kycPage);
  });

  test('Life Events & Benefits page - answers future inheritance or windfalls', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLifeEventsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.selectFutureInheritanceOrWindfalls('Yes');

    // Assert
    await expectLifeEventsPage(setup.kycPage);
  });

  test('Life Events & Benefits page - fills amount and timescale details', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLifeEventsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectFutureInheritanceOrWindfalls('Yes');

    // Act
    await setup.kycSteps.fillAmountAndTimescaleDetails(
      'Please give us more information on the amount and likely timescales',
      'This is to test Amount And Timescale field works'
    );

    // Assert
    await expectLifeEventsPage(setup.kycPage);
  });

  test('Life Events & Benefits page - fills pension death benefit plans', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLifeEventsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.fillPensionDeathBenefitPlans(
      'What are your plans for any remaining pension benefits on death? Please provide details',
      'This is to test Pension Death Benefit Plans field works'
    );

    // Assert
    await expectLifeEventsPage(setup.kycPage);
  });

  test('Life Events & Benefits page - completes all life events questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLifeEventsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerLifeEventsAndBenefitsQuestions();

    // Assert
    await expectLifeEventsPage(setup.kycPage);
  });

  test('Life Events & Benefits page - completes page and proceeds to Future Planning', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeLifeEventsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKYCKycLifeEventsAndBenefits();

    // Assert
    await expect(setup.kycPage.getByText('Future Planning').first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
