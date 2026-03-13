// projects/gateway-ui/tests/smoke/abandon_fact_find.smoke.spec.ts
import { test } from '@playwright/test';
import BaseTest from '../shared/TestUtils';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';
import { clearWorkerDataStore } from '@framework/utils/DataStore';

/**
 * Abandon Fact Find Test Suite
 *
 * Validates the complete abandonment behavior of a KYC Fact Find:
 * - Creates an active KYC Fact Find
 * - Performs abandon action with modal confirmation
 * - Verifies system prevents launching abandoned fact finds
 * - Confirms abandoned status persistence
 *
 * CI-CD Pipeline Ready: Robust error handling and reliable assertions
 */
test.describe('Abandon Fact Find', () => {
  test.beforeEach(async () => {
    // Clear any shared state before each test
    clearWorkerDataStore();
  });

  test('Complete abandon fact find workflow', async ({ browser }) => {
    const testBase = await BaseTest.create(browser, 'qa');
    
    try {
      // Create retail client and navigate to Fact Find tab
      await testBase.factFindSteps.executeAddClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);

      // Create Core Fact Find
      await testBase.factFindSteps.executeCreateCoreFactFind();

      // Abandon Fact Find with status verification
      await testBase.factFindSteps.executeAbandonFirstRowFactFind();

      // Verify abandoned Fact Find cannot be launched
      await testBase.factFindSteps.executeVerifyFirstRowAbandonedFactFindCannotBeLaunched();

      // Verify abandonment status persists after page reload
      await testBase.factFindSteps.executeVerifyFirstRowAbandonmentStatusMaintained();

      // Verify system response for abandoned Fact Find
      await testBase.factFindSteps.executeVerifySystemResponseForFirstRowAbandonedFactFind();

    } finally {
      await cleanupClient1FactFinds();
      await testBase.cleanup();
    }
  });
});