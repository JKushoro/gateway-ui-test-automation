// projects/gateway-ui/tests/smoke/abandoned_fact_find_name.smoke.spec.ts
import { test } from '@playwright/test';
import BaseTest from '../shared/TestUtils';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';
import { clearWorkerDataStore } from '@framework/utils/DataStore';

/**
 * Abandoned Fact Find Name Test Suite
 *
 * Validates that a name can be added and edited against an abandoned KYC Fact Find:
 * - Creates an active KYC Fact Find
 * - Abandons the Fact Find
 * - Adds a name to the abandoned Fact Find
 * - Verifies the name is saved successfully
 * - Edits the name on the abandoned Fact Find
 * - Verifies the updated name is saved and persisted
 *
 * CI-CD Pipeline Ready: Robust assertions and reliable persistence checks
 */
test.describe('Verify a name can be added to an abandoned KYC Fact Find', () => {
  test.beforeEach(async () => {
    // Clear any shared state before each test
    clearWorkerDataStore();
  });

  test('Complete abandoned fact find name workflow', async ({ browser }) => {
    const testBase = await BaseTest.create(browser, 'qa');
    
    try {
      // Create and Abandon Create Core Fact Find
      await testBase.factFindSteps.createAndAbandonFactFind(testBase.sideNav, testBase.navBar);

      // Verify the Name column is blank after abandoning the Fact Find
      await testBase.factFindSteps.verifyFirstRowNameIsBlank();

      // Verify a name can be added to an abandoned Fact Find and the Name column is populated
      await testBase.factFindSteps.executeAddNameToAbandonedFactFind();

      // Verify name remains saved after page reload
      await testBase.factFindSteps.executeVerifyNameSavedAgainstAbandonedFactFind();

      // Edit name on abandoned Fact Find
      await testBase.factFindSteps.executeEditNameOnAbandonedFactFind();

      // Verify updated name is saved and persisted
      await testBase.factFindSteps.executeVerifyUpdatedNameSavedAndPersisted();

    } finally {
      await cleanupClient1FactFinds();
      await testBase.cleanup();
    }
  });
});
