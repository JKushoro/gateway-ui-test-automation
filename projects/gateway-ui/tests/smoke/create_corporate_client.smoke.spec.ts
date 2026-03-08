//projects/gateway-ui/tests/smoke/create_corporate_client.smoke.spec.ts
import { test } from '@playwright/test';
import { BaseTest } from '../shared/TestUtils';
import { AddCorporateClientSteps } from '@steps/clients/CorporateClientCreationSteps';
import { ClientsSearchSteps } from '@steps/clients/ClientsSearchSteps';
import { ClientFilesSteps } from '@steps/clients/ClientFilesSteps';

test.describe('Create Corporate Client', () => {
  let testBase: BaseTest;
  let clientSteps: AddCorporateClientSteps;
  let searchSteps: ClientsSearchSteps;
  let clientFilesSteps: ClientFilesSteps;

  test.beforeAll(async ({ browser }) => {
    testBase = await BaseTest.create(browser, 'qa');

    // Initialize additional services specific to this test
    clientSteps = new AddCorporateClientSteps(testBase.page);
    searchSteps = new ClientsSearchSteps(testBase.page);
    clientFilesSteps = new ClientFilesSteps(testBase.page);
  });

  test('Navigate to Add Corporate Client page', async () => {
    await clientSteps.executeNavigateToAddCorporateClient(testBase.sideNav);
  });

  test('Create complete Corporate Client', async () => {
    await clientSteps.executeCompleteClientCreation();
  });

  test('Search for created client and verify company name matches', async () => {
    await searchSteps.executeSearchAndVerifyStoredClient();
  });

  test('Verify all stored client data matches client details page', async () => {
    await clientFilesSteps.executeStoredClientDataVerification();
  });

  test.afterAll(async () => {
    await testBase.cleanup();
  });
});