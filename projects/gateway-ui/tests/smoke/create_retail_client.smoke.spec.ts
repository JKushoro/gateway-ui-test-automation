// projects/gateway-ui/tests/smoke/create_retail_client.smoke.spec.ts
import { Browser, expect, test } from '@playwright/test';
import { clearWorkerDataStore } from '@framework/utils/DataStore';
import { ClientsSearchSteps } from '@steps/gateway/ClientsSearchSteps';
import { RetailClientCreationSteps } from '@steps/gateway/RetailClientCreationSteps';
import BaseTest from '../shared/TestUtils';

type RetailClientSetup = {
  testBase: Awaited<ReturnType<typeof BaseTest.create>>;
  clientSteps: RetailClientCreationSteps;
  searchSteps: ClientsSearchSteps;
};

async function arrangeRetailClientServices(browser: Browser): Promise<RetailClientSetup> {
  const testBase = await BaseTest.create(browser, 'qa');

  return {
    testBase,
    clientSteps: new RetailClientCreationSteps(testBase.page),
    searchSteps: new ClientsSearchSteps(testBase.page),
  };
}

async function arrangeAddRetailClientPage(browser: Browser): Promise<RetailClientSetup> {
  const setup = await arrangeRetailClientServices(browser);
  await setup.clientSteps.executeNavigateToAddClient(setup.testBase.sideNav);
  return setup;
}

async function arrangeCreatedRetailClient(browser: Browser): Promise<RetailClientSetup> {
  const setup = await arrangeAddRetailClientPage(browser);
  const client = await setup.clientSteps.createClient();
  expect(client.forename).toBeTruthy();
  expect(client.surname).toBeTruthy();
  return setup;
}

test.describe('Create a Retail Client', () => {
  let currentSetup: RetailClientSetup | undefined;

  test.beforeEach(async () => {
    clearWorkerDataStore();
  });

  test.afterEach(async () => {
    await currentSetup?.testBase.cleanup();
    currentSetup = undefined;
  });

  test('Retail Client - navigates to Add Client page', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeRetailClientServices(browser);
    const setup = currentSetup;

    // Act
    await setup.clientSteps.executeNavigateToAddClient(setup.testBase.sideNav);

    // Assert
    await setup.clientSteps.verifyClientPage();
  });

  test('Retail Client - creates client', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeAddRetailClientPage(browser);
    const setup = currentSetup;

    // Act
    const client = await setup.clientSteps.createClient();

    // Assert
    expect(client.forename).toBeTruthy();
    expect(client.surname).toBeTruthy();
  });

  test('Retail Client - searches for created client', async ({ browser }) => {
    test.setTimeout(300_000);

    // Arrange
    currentSetup = await arrangeCreatedRetailClient(browser);
    const setup = currentSetup;

    // Act
    const result = await setup.searchSteps.searchAndVerifyStoredIndividualClient();

    // Assert
    expect(result.clientFound).toBe(true);
  });
});
