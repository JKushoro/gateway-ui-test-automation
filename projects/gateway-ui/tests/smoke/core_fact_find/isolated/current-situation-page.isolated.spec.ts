import { expect, Page, test } from '@playwright/test';
import { KycCurrentSituationPageSteps } from '@steps/kyc/core/KycCurrentSituationPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { dataStore } from '@framework/utils/DataStore';

type CurrentSituationSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycCurrentSituationPageSteps;
};

async function arrangeCurrentSituationPage(browser: Parameters<typeof BaseTest.create>[0]): Promise<CurrentSituationSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Current Situation');

  return {
    testBase,
    kycPage,
    kycSteps: new KycCurrentSituationPageSteps(kycPage),
  };
}

async function cleanupCurrentSituationPage(setup?: CurrentSituationSetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

setupIsolatedTest('Core Fact Find - Current Situation Page (Isolated)', () => {
  test('Current Situation page - validates page heading and URL', async ({ browser }) => {
    test.setTimeout(300_000);
    let setup: CurrentSituationSetup | undefined;

    try {
      // Arrange
      setup = await arrangeCurrentSituationPage(browser);

      // Act
      await setup.kycSteps.validateCurrentSituationPage();

      // Assert
      await expect(setup.kycPage.getByText('Current situation').first()).toBeVisible();
      expect(setup.kycPage.url()).toContain('page=current-situation');
    } finally {
      await cleanupCurrentSituationPage(setup);
    }
  });

  test('Current Situation page - completes employment questions', async ({ browser }) => {
    test.setTimeout(300_000);
    let setup: CurrentSituationSetup | undefined;

    try {
      // Arrange
      setup = await arrangeCurrentSituationPage(browser);
      await setup.kycSteps.validateCurrentSituationPage();

      // Act
      await setup.kycSteps.handleEmploymentQuestions();

      // Assert
      await expect(setup.kycPage.getByText('Current situation').first()).toBeVisible();
      expect(setup.kycPage.url()).toContain('page=current-situation');
    } finally {
      await cleanupCurrentSituationPage(setup);
    }
  });

  test('Current Situation page - completes retirement questions', async ({ browser }) => {
    test.setTimeout(300_000);
    let setup: CurrentSituationSetup | undefined;

    try {
      // Arrange
      setup = await arrangeCurrentSituationPage(browser);
      await setup.kycSteps.validateCurrentSituationPage();

      // Act
      await setup.kycSteps.handleRetirementQuestions();

      // Assert
      await expect(setup.kycPage.getByText('Current situation').first()).toBeVisible();
      expect(setup.kycPage.url()).toContain('page=current-situation');
    } finally {
      await cleanupCurrentSituationPage(setup);
    }
  });

  test('Current Situation page - completes health questions', async ({ browser }) => {
    test.setTimeout(300_000);
    let setup: CurrentSituationSetup | undefined;

    try {
      // Arrange
      setup = await arrangeCurrentSituationPage(browser);
      await setup.kycSteps.validateCurrentSituationPage();

      // Act
      await setup.kycSteps.handleHealthQuestions();

      // Assert
      await expect(setup.kycPage.getByText('Current situation').first()).toBeVisible();
      expect(setup.kycPage.url()).toContain('page=current-situation');
    } finally {
      await cleanupCurrentSituationPage(setup);
    }
  });

  test('Current Situation page - completes personal details questions', async ({ browser }) => {
    test.setTimeout(300_000);
    let setup: CurrentSituationSetup | undefined;

    try {
      // Arrange
      setup = await arrangeCurrentSituationPage(browser);
      await setup.kycSteps.validateCurrentSituationPage();

      // Act
      await setup.kycSteps.handlePersonalDetailsQuestions();

      // Assert
      expect(dataStore.getValue<string>('kyc.currentSituation.occupation')).toBeTruthy();
      expect(dataStore.getValue<string>('kyc.currentSituation.currentEmployer')).toBeTruthy();
      await expect(setup.kycPage.getByText('Current situation').first()).toBeVisible();
    } finally {
      await cleanupCurrentSituationPage(setup);
    }
  });

  test('Current Situation page - completes legal document questions', async ({ browser }) => {
    test.setTimeout(300_000);
    let setup: CurrentSituationSetup | undefined;

    try {
      // Arrange
      setup = await arrangeCurrentSituationPage(browser);
      await setup.kycSteps.validateCurrentSituationPage();

      // Act
      await setup.kycSteps.handleLegalDocumentQuestions();

      // Assert
      await expect(setup.kycPage.getByText('Current situation').first()).toBeVisible();
      expect(setup.kycPage.url()).toContain('page=current-situation');
    } finally {
      await cleanupCurrentSituationPage(setup);
    }
  });

  test('Current Situation page - completes all questions and saves page', async ({ browser }) => {
    test.setTimeout(300_000);
    let setup: CurrentSituationSetup | undefined;

    try {
      // Arrange
      setup = await arrangeCurrentSituationPage(browser);
      await setup.kycSteps.validateCurrentSituationPage();
      await setup.kycSteps.answerAllCurrentSituationQuestions();

      // Act
      await setup.kycSteps.saveAndContinue();

      // Assert
      await expect(setup.kycPage.getByText('Property & assets').first()).toBeVisible({
        timeout: 15_000,
      });
    } finally {
      await cleanupCurrentSituationPage(setup);
    }
  });
});
