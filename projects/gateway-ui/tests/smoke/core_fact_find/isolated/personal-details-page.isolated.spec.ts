import { Browser, expect, Page, test } from '@playwright/test';
import { ActionHelper } from '@framework/helpers/ActionHelper';
import { dataStore } from '@framework/utils/DataStore';
import { KycPersonalDetailsPageSteps } from '@steps/kyc/core/KycPersonalDetailsPageSteps';
import { setupIsolatedTest } from '@tests/shared/IsolatedTestManager';
import BaseTest from '@tests/shared/TestUtils';

type PersonalDetailsSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  kycPage: Page;
  kycSteps: KycPersonalDetailsPageSteps;
};

async function arrangePersonalDetailsPage(browser: Browser): Promise<PersonalDetailsSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  await testBase.factFindSteps.addClientAndNavigateToFactFindTab(
    testBase.sideNav,
    testBase.navBar
  );

  const kycPage = await testBase.factFindSteps.createAndLaunchNewFactFind('Core Fact Find');

  const actionHelper = new ActionHelper(kycPage);
  await actionHelper.selectCustomRadioOptionByLabel('Personal Details');

  return {
    testBase,
    kycPage,
    kycSteps: new KycPersonalDetailsPageSteps(kycPage),
  };
}

async function cleanupPersonalDetailsPage(setup?: PersonalDetailsSetup): Promise<void> {
  await setup?.kycPage.close();
  await setup?.testBase.cleanup();
}

async function expectPersonalDetailsPage(kycPage: Page): Promise<void> {
  await expect(kycPage.getByText('Personal details').first()).toBeVisible({
    timeout: 15_000,
  });
  expect(kycPage.url()).toContain('page=personal-details');
}

setupIsolatedTest('Core Fact Find - Personal Details Page (Isolated)', () => {
  let currentSetup: PersonalDetailsSetup | undefined;

  test.afterEach(async () => {
    await cleanupPersonalDetailsPage(currentSetup);
    currentSetup = undefined;
  });

  test('Personal Details page - validates page heading and URL', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.verifyPersonalDetailsHeading();

    // Assert
    await expectPersonalDetailsPage(setup.kycPage);
  });

  test('Personal Details page - validates Gateway client details against KYC details', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.verifyPersonalDetailsHeading();
    const gatewayClient = setup.kycSteps.getSelectedGatewayClient();

    // Act
    const displayedClient = await setup.kycSteps.readAndStoreDisplayedKycClient();
    await setup.kycSteps.compareSelectedGatewayVsDisplayedKyc(gatewayClient, displayedClient);

    // Assert
    expect(dataStore.getValue('displayed.kycClient')).toBeTruthy();
    await expectPersonalDetailsPage(setup.kycPage);
  });

  test('Personal Details page - fills contact details', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.verifyPersonalDetailsHeading();
    const contactDetails = setup.kycSteps.generateAndStoreKycContactDetails();

    // Act
    await setup.kycSteps.fillKycContactAndStoreDisplayed(contactDetails);

    // Assert
    expect(dataStore.getValue('displayed.kyc.contact.mobile')).toBe(contactDetails.mobile);
    expect(dataStore.getValue('displayed.kyc.contact.email')).toBe(contactDetails.email);
    await expectPersonalDetailsPage(setup.kycPage);
  });

  test('Personal Details page - fills current address', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.verifyPersonalDetailsHeading();

    // Act
    await setup.kycSteps.fillCurrentAddress_Address1();

    // Assert
    expect(dataStore.getValue('kyc.address1.moveInDate')).toBeTruthy();
    expect(dataStore.getValue('kyc.address1.postcode')).toBeTruthy();
    await expectPersonalDetailsPage(setup.kycPage);
  });

  test('Personal Details page - adds previous address', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.verifyPersonalDetailsHeading();

    // Act
    await setup.kycSteps.addPreviousAddress_Address2();

    // Assert
    await expectPersonalDetailsPage(setup.kycPage);
  });

  test('Personal Details page - fills previous address', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.verifyPersonalDetailsHeading();
    await setup.kycSteps.fillCurrentAddress_Address1();
    await setup.kycSteps.addPreviousAddress_Address2();

    // Act
    const moveInDate = await setup.kycSteps.fillPreviousAddress_Address2();

    // Assert
    expect(moveInDate).toBeTruthy();
    expect(dataStore.getValue('kyc.address2.postcode')).toBeTruthy();
    await expectPersonalDetailsPage(setup.kycPage);
  });

  test('Personal Details page - answers nationality questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.verifyPersonalDetailsHeading();

    // Act
    await setup.kycSteps.answerUkNationality('No');
    await setup.kycSteps.selectNonUkNationality('Nigeria');

    // Assert
    await expect(setup.kycPage.getByText('Nigeria').first()).toBeVisible();
    await expectPersonalDetailsPage(setup.kycPage);
  });

  test('Personal Details page - answers residency questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.verifyPersonalDetailsHeading();

    // Act
    await setup.kycSteps.answerUkResidency('No');
    await setup.kycSteps.selectNonUkResidency('Nigeria');

    // Assert
    await expect(setup.kycPage.getByText('Nigeria').first()).toBeVisible();
    await expectPersonalDetailsPage(setup.kycPage);
  });

  test('Personal Details page - answers tax outside UK questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.verifyPersonalDetailsHeading();

    // Act
    await setup.kycSteps.answerTaxOutsideUk('Yes');
    await setup.kycSteps.selectTaxPaidCountryOutsideUk('Nigeria');

    // Assert
    await expect(setup.kycPage.getByText('Nigeria').first()).toBeVisible();
    await expectPersonalDetailsPage(setup.kycPage);
  });

  test('Personal Details page - answers children or dependants question', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.verifyPersonalDetailsHeading();

    // Act
    await setup.kycSteps.answerChildrenOrDependants('Yes');

    // Assert
    await expectPersonalDetailsPage(setup.kycPage);
  });

  test('Personal Details page - completes children or dependants details', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.verifyPersonalDetailsHeading();
    await setup.kycSteps.answerChildrenOrDependants('Yes');

    // Act
    await setup.kycSteps.completeChildrenOrDependantsDetails();

    // Assert
    await expectPersonalDetailsPage(setup.kycPage);
  });

  test('Personal Details page - answers all personal details questions', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;
    await setup.kycSteps.verifyPersonalDetailsHeading();

    // Act
    await setup.kycSteps.answerPersonalDetailsQuestions();

    // Assert
    await expectPersonalDetailsPage(setup.kycPage);
  });

  test('Personal Details page - completes page and proceeds to Current Situation', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangePersonalDetailsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.kycSteps.completeKYCPersonalDetails();

    // Assert
    await expect(setup.kycPage.getByText('Current Situation').first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
