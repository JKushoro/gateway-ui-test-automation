//projects/gateway-ui/tests/smoke/create_corporate_client.smoke.spec.ts
import { test } from '@playwright/test';
import BaseTest from '../shared/TestUtils';
import { AddCorporateClientSteps } from '@steps/clients/CorporateClientCreationSteps';
import { ClientsSearchSteps } from '@steps/clients/ClientsSearchSteps';
import { ClientFilesSteps } from '@steps/clients/ClientFilesSteps';
import { clearWorkerDataStore } from '@framework/utils/DataStore';

test.describe('Create Corporate Client', () => {
  test.beforeEach(async () => {
    // Clear any shared state before each test
    clearWorkerDataStore();
  });

  test('Complete corporate client creation workflow', async ({ browser }) => {
    const testBase = await BaseTest.create(browser, 'qa');
    
    try {
      // Initialize services
      const clientSteps = new AddCorporateClientSteps(testBase.page);
      const searchSteps = new ClientsSearchSteps(testBase.page);
      const clientFilesSteps = new ClientFilesSteps(testBase.page);

      // Navigate to Add Corporate Client page
      await clientSteps.executeNavigateToAddCorporateClient(testBase.sideNav);

      // Create complete Corporate Client
      await clientSteps.executeCompleteClientCreation();

      // Search for created client and verify company name matches
      await searchSteps.executeSearchAndVerifyStoredClient();

      // Verify all stored client data matches client details page
      await clientFilesSteps.executeStoredClientDataVerification();

    } finally {
      await testBase.cleanup();
    }
  });
});