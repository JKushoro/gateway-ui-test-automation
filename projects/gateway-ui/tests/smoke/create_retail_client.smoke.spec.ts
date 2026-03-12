//projects/gateway-ui/tests/smoke/create_retail_client.smoke.spec.ts
import { test } from '@playwright/test';
import { BaseTest } from '../shared/TestUtils';
import { RetailClientCreationSteps } from '@steps/gateway/RetailClientCreationSteps';
import { ClientsSearchSteps } from '@steps/gateway/ClientsSearchSteps';
import { clearWorkerDataStore } from '@framework/utils/DataStore';

test.describe('Create a Retail Client', () => {
  test.beforeEach(async () => {
    // Clear any shared state before each test
    clearWorkerDataStore();
  });

  test('Complete retail client creation workflow', async ({ browser }) => {
    const testBase = await BaseTest.create(browser, 'qa');
    
    try {
      // Initialize services
      const clientSteps = new RetailClientCreationSteps(testBase.page);
      const searchSteps = new ClientsSearchSteps(testBase.page);

      // Navigate to Add Client page
      await clientSteps.executeNavigateToAddClient(testBase.sideNav);

      // Create complete Client
      await clientSteps.createClient();

      // Search for created client and verify Forename and Surname matches
      await searchSteps.executeSearchAndVerifyStoredIndividualClient();
    } finally {
      await testBase.cleanup();
    }
  });
});