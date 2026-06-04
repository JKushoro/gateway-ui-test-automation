import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { KycAnnuityPageSteps } from '@steps/kyc/retirement/KycAnnuityPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type AnnuitySetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycAnnuityPageSteps;
};

async function arrangeAnnuityPage(browser: Browser): Promise<AnnuitySetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind(
    'Retirement Fact Find'
  );

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Annuity');

  return {
    testBase,
    kycPage,
    kycSteps: new KycAnnuityPageSteps(kycPage),
  };
}

async function cleanupAnnuityPage(setup?: AnnuitySetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectAnnuityPage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Annuity').first()).toBeVisible({
    timeout: 15_000,
  });
  expect(kycPage.url()).toContain('page=personalised-annuity-quotes');
}

setupIsolatedTest('Retirement Fact Find - Annuity Page (Isolated)', () => {
  let currentSetup: AnnuitySetup | undefined;

  test.afterEach(async () => {
    await cleanupAnnuityPage(currentSetup);
    currentSetup = undefined;
  });

  test('Annuity page - validates page heading and URL', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAnnuityPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycPage.waitForLoadState('domcontentloaded');

    // Assert
    await expectAnnuityPage(setup.kycPage);
  });

  test('Annuity page - answers personalised annuity quote question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAnnuityPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');

    // Assert
    await expectAnnuityPage(setup.kycPage);
  });

  test('Annuity page - fills escalation requirements', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAnnuityPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');

    // Act
    await setup.kycSteps.fillEscalationRequirements(
      'Escalation requirements',
      'This is to test Escalation requirements field works'
    );

    // Assert
    await expectAnnuityPage(setup.kycPage);
  });

  test('Annuity page - fills income frequency', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAnnuityPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');

    // Act
    await setup.kycSteps.fillIncomeFrequency(
      'Income Frequency',
      'This is to test Income Frequency field works'
    );

    // Assert
    await expectAnnuityPage(setup.kycPage);
  });

  test('Annuity page - fills advance or arrears with proportion', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAnnuityPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');

    // Act
    await setup.kycSteps.fillAdvanceOrArrearsWithProportion(
      'Advanced/arrears (inc proportion)',
      'This is to test Advance Or Arrears With Proportion field works'
    );

    // Assert
    await expectAnnuityPage(setup.kycPage);
  });

  test('Annuity page - fills guaranteed period', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAnnuityPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');

    // Act
    await setup.kycSteps.fillGuaranteedPeriod(
      'Guaranteed period',
      'This is to test Guaranteed period field works'
    );

    // Assert
    await expectAnnuityPage(setup.kycPage);
  });

  test('Annuity page - fills overlap details', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAnnuityPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');

    // Act
    await setup.kycSteps.fillOverlapDetails(
      'Overlap (if relevant)',
      'This is to test Overlap Details field works'
    );

    // Assert
    await expectAnnuityPage(setup.kycPage);
  });

  test('Annuity page - fills value protection', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAnnuityPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.selectPersonalisedAnnuityQuote('Yes');

    // Act
    await setup.kycSteps.fillValueProtection(
      'Value Protection',
      'This is to test Value Protection field works'
    );

    // Assert
    await expectAnnuityPage(setup.kycPage);
  });

  test('Annuity page - completes all annuity questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAnnuityPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.answerAnnuityQuestions();

    // Assert
    await expectAnnuityPage(setup.kycPage);
  });

  test('Annuity page - completes page and submits Fact Find', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAnnuityPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKYCAnnuity();

    // Assert
    await expect(setup.kycPage.getByText(/Fact Find Successfully Completed/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
