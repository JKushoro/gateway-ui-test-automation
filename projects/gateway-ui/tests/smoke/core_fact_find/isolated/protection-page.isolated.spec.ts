import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { KycProtectionPageSteps } from '@steps/kyc/core/KycProtectionPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type ProtectionSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycProtectionPageSteps;
};

async function arrangeProtectionPage(browser: Browser): Promise<ProtectionSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Protection');

  return {
    testBase,
    kycPage,
    kycSteps: new KycProtectionPageSteps(kycPage),
  };
}

async function cleanupProtectionPage(setup?: ProtectionSetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectProtectionPage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Protection').first()).toBeVisible({
    timeout: 15_000,
  });
  expect(kycPage.url()).toContain('page=protection');
}

setupIsolatedTest('Core Fact Find - Protection Page (Isolated)', () => {
  let currentSetup: ProtectionSetup | undefined;

  test.afterEach(async () => {
    await cleanupProtectionPage(currentSetup);
    currentSetup = undefined;
  });

  test('Protection page - validates page heading and URL', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeProtectionPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycPage.waitForLoadState('domcontentloaded');

    // Assert
    await expectProtectionPage(setup.kycPage);
  });

  test('Protection page - answers income protection question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeProtectionPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerIncomeProtectionQuestion('No');

    // Assert
    await expectProtectionPage(setup.kycPage);
  });

  test('Protection page - answers life or critical illness cover question', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeProtectionPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerLifeOrCriticalIllnessCoverQuestion('No');

    // Assert
    await expectProtectionPage(setup.kycPage);
  });

  test('Protection page - answers private medical insurance question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeProtectionPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerPrivateMedicalInsuranceQuestion('No');

    // Assert
    await expectProtectionPage(setup.kycPage);
  });

  test('Protection page - completes all protection questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeProtectionPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerAllProtectionQuestions();

    // Assert
    await expectProtectionPage(setup.kycPage);
  });

  test('Protection page - completes page and proceeds to Income', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeProtectionPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKYC_Protection();

    // Assert
    await expect(setup.kycPage.getByText('Income').first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
