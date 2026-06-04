import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { KycPropertyAndAssetsSteps } from '@steps/kyc/core/KycPropertyAndAssetsSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type PropertyAndAssetsSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycPropertyAndAssetsSteps;
};

async function arrangePropertyAndAssetsPage(
  browser: Browser
): Promise<PropertyAndAssetsSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Property & Assets');

  return {
    testBase,
    kycPage,
    kycSteps: new KycPropertyAndAssetsSteps(kycPage),
  };
}

async function cleanupPropertyAndAssetsPage(setup?: PropertyAndAssetsSetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectPropertyAndAssetsPage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Property & assets').first()).toBeVisible({
    timeout: 15_000,
  });
  expect(kycPage.url()).toContain('page=property-and-assets');
}

setupIsolatedTest('Core Fact Find - Property & Assets Page (Isolated)', () => {
  let currentSetup: PropertyAndAssetsSetup | undefined;

  test.afterEach(async () => {
    await cleanupPropertyAndAssetsPage(currentSetup);
    currentSetup = undefined;
  });

  test('Property & Assets page - validates page heading and URL', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePropertyAndAssetsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycPage.waitForLoadState('domcontentloaded');

    // Assert
    await expectPropertyAndAssetsPage(setup.kycPage);
  });

  test('Property & Assets page - answers own or rent property question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePropertyAndAssetsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerOwnOrRentPropertyQuestion('Owner');

    // Assert
    await expectPropertyAndAssetsPage(setup.kycPage);
  });

  test('Property & Assets page - answers asset owner question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePropertyAndAssetsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.answerOwnOrRentPropertyQuestion('Owner');

    // Act
    await setup.kycSteps.answerAssetOwnerQuestion('Joint');

    // Assert
    await expectPropertyAndAssetsPage(setup.kycPage);
  });

  test('Property & Assets page - fills current property value', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePropertyAndAssetsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.answerOwnOrRentPropertyQuestion('Owner');
    await setup.kycSteps.answerAssetOwnerQuestion('Joint');

    // Act
    await setup.kycSteps.fillPropertyValue('250,000');

    // Assert
    await expectPropertyAndAssetsPage(setup.kycPage);
  });

  test('Property & Assets page - fills purchase home date', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePropertyAndAssetsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.answerOwnOrRentPropertyQuestion('Owner');
    await setup.kycSteps.answerAssetOwnerQuestion('Joint');
    await setup.kycSteps.fillPropertyValue('250,000');

    // Act
    await setup.kycSteps.fillPurchaseHomeDate(5, 15);

    // Assert
    await expectPropertyAndAssetsPage(setup.kycPage);
  });

  test('Property & Assets page - answers other properties or assets question', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePropertyAndAssetsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.answerOwnOrRentPropertyQuestion('Owner');

    // Act
    await setup.kycSteps.answerOtherPropertiesOrAssets('No');

    // Assert
    await expectPropertyAndAssetsPage(setup.kycPage);
  });

  test('Property & Assets page - completes all property and asset questions', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePropertyAndAssetsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerPropertyAndAssetQuestions();

    // Assert
    await expectPropertyAndAssetsPage(setup.kycPage);
  });

  test('Property & Assets page - completes page and proceeds to Savings & Investments', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePropertyAndAssetsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKYC_PropertyAndAssets();

    // Assert
    await expect(setup.kycPage.getByText('Savings & Investments').first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
