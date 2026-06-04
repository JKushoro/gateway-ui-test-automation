import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { KycPensionsPageSteps } from '@steps/kyc/core/KycPensionsPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type PensionsSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycPensionsPageSteps;
};

async function arrangePensionsPage(browser: Browser): Promise<PensionsSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Pensions');

  return {
    testBase,
    kycPage,
    kycSteps: new KycPensionsPageSteps(kycPage),
  };
}

async function cleanupPensionsPage(setup?: PensionsSetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectPensionsPage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Pensions').first()).toBeVisible({
    timeout: 15_000,
  });
  expect(kycPage.url()).toContain('page=pensions');
}

setupIsolatedTest('Core Fact Find - Pensions Page (Isolated)', () => {
  let currentSetup: PensionsSetup | undefined;

  test.afterEach(async () => {
    await cleanupPensionsPage(currentSetup);
    currentSetup = undefined;
  });

  test('Pensions page - validates page heading and URL', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePensionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycPage.waitForLoadState('domcontentloaded');

    // Assert
    await expectPensionsPage(setup.kycPage);
  });

  test('Pensions page - answers workplace pension question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePensionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerWorkplacePensionQuestion('No');

    // Assert
    await expectPensionsPage(setup.kycPage);
  });

  test('Pensions page - answers previous employment pensions question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePensionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerPreviousEmploymentPensionsQuestion('No');

    // Assert
    await expectPensionsPage(setup.kycPage);
  });

  test('Pensions page - answers other pensions question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePensionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerOtherPensionsQuestion('No');

    // Assert
    await expectPensionsPage(setup.kycPage);
  });

  test('Pensions page - answers state pension forecast question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePensionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerStatePensionForecastQuestion('No');

    // Assert
    await expectPensionsPage(setup.kycPage);
  });

  test('Pensions page - completes all pension questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePensionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerAllPensionQuestions();

    // Assert
    await expectPensionsPage(setup.kycPage);
  });

  test('Pensions page - completes page and proceeds to Protection', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePensionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKYC_Pensions();

    // Assert
    await expect(setup.kycPage.getByText('Protection').first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
