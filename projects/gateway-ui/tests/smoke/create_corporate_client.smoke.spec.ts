// projects/gateway-ui/tests/smoke/create_corporate_client.smoke.spec.ts
import { Browser, expect, test } from '@playwright/test';
import { clearWorkerDataStore } from '@framework/utils/DataStore';
import { AddCorporateClientSteps } from '@steps/clients/CorporateClientCreationSteps';
import { ClientFilesSteps } from '@steps/clients/ClientFilesSteps';
import { ClientsSearchSteps } from '@steps/clients/ClientsSearchSteps';
import BaseTest from '../shared/TestUtils';

type CorporateClientSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  clientSteps: AddCorporateClientSteps;
  searchSteps: ClientsSearchSteps;
  clientFilesSteps: ClientFilesSteps;
};

async function arrangeCorporateClientServices(browser: Browser): Promise<CorporateClientSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  return {
    testBase,
    clientSteps: new AddCorporateClientSteps(testBase.page),
    searchSteps: new ClientsSearchSteps(testBase.page),
    clientFilesSteps: new ClientFilesSteps(testBase.page),
  };
}

async function arrangeCorporateClientPage(browser: Browser): Promise<CorporateClientSetup> {
  const setup = await arrangeCorporateClientServices(browser);
  await setup.clientSteps.executeNavigateToAddCorporateClient(setup.testBase.sideNav);
  return setup;
}

async function arrangeCreatedCorporateClient(browser: Browser): Promise<CorporateClientSetup> {
  const setup = await arrangeCorporateClientPage(browser);
  const result = await setup.clientSteps.createCorporateClient();
  expect(result.formData.companyName).toBeTruthy();
  return setup;
}

async function arrangeCreatedCorporateClientDetailsPage(
  browser: Browser
): Promise<CorporateClientSetup> {
  const setup = await arrangeCreatedCorporateClient(browser);
  const result = await setup.searchSteps.searchAndVerifyStoredClient();
  expect(result.clientFound).toBe(true);
  return setup;
}

test.describe('Create Corporate Client', () => {
  let currentSetup: CorporateClientSetup | undefined;

  test.beforeEach(async () => {
    clearWorkerDataStore();
  });

  test.afterEach(async () => {
    await currentSetup?.testBase.cleanup();
    currentSetup = undefined;
  });

  test('Corporate Client - navigates to Add Corporate Client page', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeCorporateClientServices(browser);
    const setup = currentSetup;

    // Act
    await setup.clientSteps.executeNavigateToAddCorporateClient(setup.testBase.sideNav);

    // Assert
    await setup.clientSteps.verifyCorporateClientPage();
  });

  test('Corporate Client - creates corporate client', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeCorporateClientPage(browser);
    const setup = currentSetup;

    // Act
    const result = await setup.clientSteps.createCorporateClient();

    // Assert
    expect(result.formData.companyName).toBeTruthy();
    expect(result.selectedAddress).toBeTruthy();
  });

  test('Corporate Client - searches for created client', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeCreatedCorporateClient(browser);
    const setup = currentSetup;

    // Act
    const result = await setup.searchSteps.searchAndVerifyStoredClient();

    // Assert
    expect(result.clientFound).toBe(true);
  });

  test('Corporate Client - verifies stored client data matches client details page', async ({
    browser,
  }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeCreatedCorporateClientDetailsPage(browser);
    const setup = currentSetup;

    // Act
    await setup.clientFilesSteps.verifyClientFilesPage();

    // Assert
    await setup.clientFilesSteps.assertStoredClientDataMatches();
  });
});
