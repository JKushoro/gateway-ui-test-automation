import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { KycContributionsAndProtectionSteps } from '@steps/kyc/retirement/KycContributionsAndProtectionSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type ContributionsSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycContributionsAndProtectionSteps;
};

async function arrangeContributionsPage(browser: Browser): Promise<ContributionsSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind(
    'Retirement Fact Find'
  );

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Contributions & Protection');

  return {
    testBase,
    kycPage,
    kycSteps: new KycContributionsAndProtectionSteps(kycPage),
  };
}

async function cleanupContributionsPage(setup?: ContributionsSetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectContributionsPage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Contributions & Protection').first()).toBeVisible({
    timeout: 15_000,
  });
  expect(kycPage.url()).toContain('page=contributions-allowances-protection');
}

setupIsolatedTest('Retirement Fact Find - Contributions Page (Isolated)', () => {
  let currentSetup: ContributionsSetup | undefined;

  test.afterEach(async () => {
    await cleanupContributionsPage(currentSetup);
    currentSetup = undefined;
  });

  test('Contributions page - validates page heading and URL', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeContributionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycPage.waitForLoadState('domcontentloaded');

    // Assert
    await expectContributionsPage(setup.kycPage);
  });

  test('Contributions page - answers pension contribution intent', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeContributionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.selectPensionContributionIntent('Yes');

    // Assert
    await expectContributionsPage(setup.kycPage);
  });

  test('Contributions page - enters contribution details', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeContributionsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectPensionContributionIntent('Yes');

    // Act
    await setup.kycSteps.enterContributionDetails('This is to test Contribution field works');

    // Assert
    await expectContributionsPage(setup.kycPage);
  });

  test('Contributions page - answers annual allowance exceedance', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeContributionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.selectAnnualAllowanceExceedance('Yes');

    // Assert
    await expectContributionsPage(setup.kycPage);
  });

  test('Contributions page - enters annual allowance details', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeContributionsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectAnnualAllowanceExceedance('Yes');

    // Act
    await setup.kycSteps.enterAnnualAllowanceDetails(
      'This is to test Annual Allowance field works'
    );

    // Assert
    await expectContributionsPage(setup.kycPage);
  });

  test('Contributions page - answers carry forward question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeContributionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.selectCarryForward('Yes');

    // Assert
    await expectContributionsPage(setup.kycPage);
  });

  test('Contributions page - enters carry forward details', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeContributionsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectCarryForward('Yes');

    // Act
    await setup.kycSteps.enterCarryForwardDetails('This is to test Carry Forward field works');

    // Assert
    await expectContributionsPage(setup.kycPage);
  });

  test('Contributions page - completes all contributions questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeContributionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerContributionsAllowancesAndProtectionQuestions();

    // Assert
    await expectContributionsPage(setup.kycPage);
  });

  test('Contributions page - completes page and proceeds to Annuity', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeContributionsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKycContributionsAllowancesAndProtection();

    // Assert
    await expect(setup.kycPage.getByText('Annuity').first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
