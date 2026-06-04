import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { KycInvestmentKnowledgeAndPreferencesPageSteps } from '@steps/kyc/core/KycInvestmentKnowledgeAndPreferencesPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type InvestmentKnowledgeSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycInvestmentKnowledgeAndPreferencesPageSteps;
};

async function arrangeInvestmentKnowledgePage(browser: Browser): Promise<InvestmentKnowledgeSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Investment Knowledge & Preferences');

  return {
    testBase,
    kycPage,
    kycSteps: new KycInvestmentKnowledgeAndPreferencesPageSteps(kycPage),
  };
}

async function cleanupInvestmentKnowledgePage(setup?: InvestmentKnowledgeSetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectInvestmentKnowledgePage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Investment Knowledge & Preferences').first()).toBeVisible({
    timeout: 15_000,
  });
  expect(kycPage.url()).toContain('page=investment-knowledge-and-preferences');
}

async function arrangeSustainabilityFields(setup: InvestmentKnowledgeSetup): Promise<void> {
  await setup.kycSteps.answerInvestmentKnowledgeAndPreference('Yes');
  await setup.kycSteps.answerClientClassification('Retail');
  await setup.kycSteps.answerInvestmentExperience('Basic');
  await setup.kycSteps.answerSustainabilityRequirements(
    'Yes â€“ relating to one and/or some of my objectives'
  );
}

async function arrangeResponsibleInvestmentFields(
  setup: InvestmentKnowledgeSetup
): Promise<void> {
  await arrangeSustainabilityFields(setup);
  await setup.kycSteps.answerSustainabilityAwareness(
    'Yes - they are comfortable proceeding'
  );
  await setup.kycSteps.assertResponsibleInvestmentFramework();
}

setupIsolatedTest('Core Fact Find - Investment Knowledge & Preferences Page (Isolated)', () => {
  let currentSetup: InvestmentKnowledgeSetup | undefined;

  test.afterEach(async () => {
    await cleanupInvestmentKnowledgePage(currentSetup);
    currentSetup = undefined;
  });

  test('Investment Knowledge & Preferences page - validates page heading and URL', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycPage.waitForLoadState('domcontentloaded');

    // Assert
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - answers update preference question', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerInvestmentKnowledgeAndPreference('Yes');

    // Assert
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - answers client classification', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;
    await setup.kycSteps.answerInvestmentKnowledgeAndPreference('Yes');

    // Act
    await setup.kycSteps.answerClientClassification('Retail');

    // Assert
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - answers investment experience', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;
    await setup.kycSteps.answerInvestmentKnowledgeAndPreference('Yes');
    await setup.kycSteps.answerClientClassification('Retail');

    // Act
    await setup.kycSteps.answerInvestmentExperience('Basic');

    // Assert
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - answers sustainability requirements', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;
    await setup.kycSteps.answerInvestmentKnowledgeAndPreference('Yes');
    await setup.kycSteps.answerClientClassification('Retail');
    await setup.kycSteps.answerInvestmentExperience('Basic');

    // Act
    await setup.kycSteps.answerSustainabilityRequirements(
      'Yes â€“ relating to one and/or some of my objectives'
    );

    // Assert
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - answers sustainability awareness', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;
    await arrangeSustainabilityFields(setup);

    // Act
    await setup.kycSteps.answerSustainabilityAwareness(
      'Yes - they are comfortable proceeding'
    );

    // Assert
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - validates responsible investment framework', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;
    await arrangeSustainabilityFields(setup);
    await setup.kycSteps.answerSustainabilityAwareness(
      'Yes - they are comfortable proceeding'
    );

    // Act
    await setup.kycSteps.assertResponsibleInvestmentFramework();

    // Assert
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - answers responsible investment framework', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;
    await arrangeResponsibleInvestmentFields(setup);

    // Act
    await setup.kycSteps.answerResponsibleInvestmentFramework('No');

    // Assert
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - answers faith based requirements', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;
    await arrangeResponsibleInvestmentFields(setup);
    await setup.kycSteps.answerResponsibleInvestmentFramework('No');

    // Act
    await setup.kycSteps.answerFaithBasedRequirements('No');

    // Assert
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - answers negative screens', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;
    await arrangeResponsibleInvestmentFields(setup);
    await setup.kycSteps.answerResponsibleInvestmentFramework('No');
    await setup.kycSteps.answerFaithBasedRequirements('No');

    // Act
    await setup.kycSteps.answerNegativeScreens('Yes');

    // Assert
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - selects negative screens', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;
    await arrangeResponsibleInvestmentFields(setup);
    await setup.kycSteps.answerResponsibleInvestmentFramework('No');
    await setup.kycSteps.answerFaithBasedRequirements('No');
    await setup.kycSteps.answerNegativeScreens('Yes');

    // Act
    const selected = await setup.kycSteps.selectNegativeScreens();

    // Assert
    expect(Array.isArray(selected)).toBe(true);
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - answers sustainable investment statement', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;
    await arrangeResponsibleInvestmentFields(setup);
    await setup.kycSteps.answerResponsibleInvestmentFramework('No');
    await setup.kycSteps.answerFaithBasedRequirements('No');
    await setup.kycSteps.answerNegativeScreens('Yes');
    await setup.kycSteps.selectNegativeScreens();

    // Act
    await setup.kycSteps.answerSustainableInvestmentStatement();

    // Assert
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - completes all questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerInvestmentKnowledgeAndPreferencesQuestions();

    // Assert
    await expectInvestmentKnowledgePage(setup.kycPage);
  });

  test('Investment Knowledge & Preferences page - completes page and submits Fact Find', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeInvestmentKnowledgePage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKYC_InvestmentKnowledgeAndPreferences();

    // Assert
    await expect(setup.kycPage.getByText(/Fact Find Successfully Completed/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
