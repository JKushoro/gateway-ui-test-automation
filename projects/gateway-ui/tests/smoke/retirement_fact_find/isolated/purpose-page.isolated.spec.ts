import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { KycPurposePageSteps } from '@steps/kyc/retirement/KycPurposePageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type PurposeSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycPurposePageSteps;
};

async function arrangePurposePage(browser: Browser): Promise<PurposeSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind(
    'Retirement Fact Find'
  );

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Purpose');

  return {
    testBase,
    kycPage,
    kycSteps: new KycPurposePageSteps(kycPage),
  };
}

async function cleanupPurposePage(setup?: PurposeSetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectPurposePage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Purpose').first()).toBeVisible({
    timeout: 15_000,
  });
}

setupIsolatedTest('Retirement Fact Find - Purpose Page (Isolated)', () => {
  let currentSetup: PurposeSetup | undefined;

  test.afterEach(async () => {
    await cleanupPurposePage(currentSetup);
    currentSetup = undefined;
  });

  test('Purpose page - validates page heading', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePurposePage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycPage.waitForLoadState('domcontentloaded');

    // Assert
    await expectPurposePage(setup.kycPage);
  });

  test('Purpose page - fills pension discussion purpose', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePurposePage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.fillPensionDiscussionPurpose(
      'What is the purpose of this pension discussion?',
      'This is to test Pension Discussion Purpose field works'
    );

    // Assert
    await expectPurposePage(setup.kycPage);
  });

  test('Purpose page - completes all purpose questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePurposePage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerPurposeQuestions();

    // Assert
    await expectPurposePage(setup.kycPage);
  });

  test('Purpose page - completes page and proceeds to Life Events & Benefits', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePurposePage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKYCPurpose();

    // Assert
    await expect(setup.kycPage.getByText('Life Events & Benefits').first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
