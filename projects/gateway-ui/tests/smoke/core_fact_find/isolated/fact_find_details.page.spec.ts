import { Browser, expect, Page, test } from '@playwright/test';
import BaseTest from '@tests/shared/TestUtils';
import { clearWorkerDataStore } from '@framework/utils/DataStore';
import { KycFactFindDetailsPageSteps } from '@steps/kyc/core/KycFactFindDetailsPageSteps';

type FactFindDetailsSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycFactFindDetailsPageSteps: KycFactFindDetailsPageSteps;
};

async function arrangeFactFindDetailsPage(browser: Browser): Promise<FactFindDetailsSetup> {
  const testBase = await BaseTest.create(browser, 'dev');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');
  const kycFactFindDetailsPageSteps = new KycFactFindDetailsPageSteps(kycPage);

  await expect(kycPage.getByText('Fact Find Details').first()).toBeVisible({
    timeout: 15_000,
  });

  return {
    testBase,
    kycPage,
    kycFactFindDetailsPageSteps,
  };
}

async function arrangeThirdPartyFields(setup: FactFindDetailsSetup): Promise<void> {
  await setup.kycFactFindDetailsPageSteps.requireA3rdPartyToBePresent('Yes');
  await setup.kycFactFindDetailsPageSteps.clickAddThirdPartyButton();
}

async function cleanupFactFindDetailsPage(setup?: FactFindDetailsSetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectFactFindDetailsPage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Fact Find Details').first()).toBeVisible({
    timeout: 15_000,
  });
}

test.describe('Create core Fact Find - Fact Find Details', () => {
  let currentSetup: FactFindDetailsSetup | undefined;

  test.beforeEach(async () => {
    clearWorkerDataStore();
  });

  test.afterEach(async () => {
    await cleanupFactFindDetailsPage(currentSetup);
    currentSetup = undefined;
  });

  test('Fact Find Details page - answers work completed on a different date', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycFactFindDetailsPageSteps.workCompletedDate('Yes');

    // Assert
    await expectFactFindDetailsPage(setup.kycPage);
  });

  test('Fact Find Details page - sets work completed date', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycFactFindDetailsPageSteps.workCompletedDate('Yes');

    // Act
    const date = await setup.kycFactFindDetailsPageSteps.setWorkCompletedDate(
      'What date was the work completed on',
      1,
      1
    );

    // Assert
    expect(date).toBeTruthy();
    await expectFactFindDetailsPage(setup.kycPage);
  });

  test('Fact Find Details page - selects venue', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycFactFindDetailsPageSteps.selectVenue('Email');

    // Assert
    await expect(setup.kycPage.getByText('Email').first()).toBeVisible();
  });

  test('Fact Find Details page - answers third party required', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycFactFindDetailsPageSteps.requireA3rdPartyToBePresent('Yes');

    // Assert
    await expect(setup.kycPage.getByText('Add Third Party').first()).toBeVisible();
  });

  test('Fact Find Details page - adds third party', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycFactFindDetailsPageSteps.requireA3rdPartyToBePresent('Yes');

    // Act
    await setup.kycFactFindDetailsPageSteps.clickAddThirdPartyButton();

    // Assert
    await expect(setup.kycPage.getByText('Title').first()).toBeVisible();
  });

  test('Fact Find Details page - selects third party title', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;
    await arrangeThirdPartyFields(setup);

    // Act
    await setup.kycFactFindDetailsPageSteps.selectThirdPartyTitle();

    // Assert
    await expectFactFindDetailsPage(setup.kycPage);
  });

  test('Fact Find Details page - fills third party first name and surname', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;
    await arrangeThirdPartyFields(setup);

    // Act
    await setup.kycFactFindDetailsPageSteps.fillFirstAndLastName();

    // Assert
    await expectFactFindDetailsPage(setup.kycPage);
  });

  test('Fact Find Details page - selects third party relationship', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;
    await arrangeThirdPartyFields(setup);

    // Act
    await setup.kycFactFindDetailsPageSteps.selectRelationship();

    // Assert
    await expectFactFindDetailsPage(setup.kycPage);
  });

  test('Fact Find Details page - fills third party contact number', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;
    await arrangeThirdPartyFields(setup);

    // Act
    await setup.kycFactFindDetailsPageSteps.fillContactNumber();

    // Assert
    await expectFactFindDetailsPage(setup.kycPage);
  });

  test('Fact Find Details page - fills third party address', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;
    await arrangeThirdPartyFields(setup);

    // Act
    await setup.kycFactFindDetailsPageSteps.fillThirdPartyAddress();

    // Assert
    await expectFactFindDetailsPage(setup.kycPage);
  });

  test('Fact Find Details page - answers third party present at meeting', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;
    await arrangeThirdPartyFields(setup);

    // Act
    await setup.kycFactFindDetailsPageSteps.selectPresentAtMeeting('Yes');

    // Assert
    await expectFactFindDetailsPage(setup.kycPage);
  });

  test('Fact Find Details page - fills notes when present', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;
    await arrangeThirdPartyFields(setup);

    // Act
    await setup.kycFactFindDetailsPageSteps.fillNotesIfPresent();

    // Assert
    await expectFactFindDetailsPage(setup.kycPage);
  });

  test('Fact Find Details page - answers third party Power of Attorney', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;
    await arrangeThirdPartyFields(setup);

    // Act
    await setup.kycFactFindDetailsPageSteps.selectIf3rdPartyPowerOfAttorney('No');

    // Assert
    await expectFactFindDetailsPage(setup.kycPage);
  });

  test('Fact Find Details page - completes all Fact Find Details questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycFactFindDetailsPageSteps.answerFactFindDetailsQuestions();

    // Assert
    await expectFactFindDetailsPage(setup.kycPage);
  });

  test('Fact Find Details page - completes page and proceeds to Personal Details', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeFactFindDetailsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycFactFindDetailsPageSteps.completeKYCFactFindDetails();

    // Assert
    await expect(setup.kycPage.getByText('Personal Details').first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
