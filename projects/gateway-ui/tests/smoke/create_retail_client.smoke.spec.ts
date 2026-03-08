//projects/gateway-ui/tests/smoke/create_retail_client.smoke.spec.ts
import { test } from '@playwright/test';
import { BaseTest } from '../shared/TestUtils';
import { RetailClientCreationSteps } from '@steps/gateway/RetailClientCreationSteps';
import { ClientsSearchSteps } from '@steps/gateway/ClientsSearchSteps';

test.describe('Create a Retail Client', () => {
  let testBase: BaseTest;
  let clientSteps: RetailClientCreationSteps;
  let searchSteps: ClientsSearchSteps;

  test.beforeAll(async ({ browser }) => {
    testBase = await BaseTest.create(browser, 'qa');

    // Initialize additional services specific to this test
    clientSteps = new RetailClientCreationSteps(testBase.page);
    searchSteps = new ClientsSearchSteps(testBase.page);
  });

  test('Navigate to Add Client page', async () => {
    await clientSteps.executeNavigateToAddClient(testBase.sideNav);
  });

  test('Create complete Client', async () => {
    await clientSteps.createClient();
  });

  test('Search for created client and verify Forename and Surname matches', async () => {
    await searchSteps.executeSearchAndVerifyStoredIndividualClient();
  });

  test.afterAll(async () => {
    await testBase.cleanup();
  });
});