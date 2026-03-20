// projects/gateway-ui/tests/smoke/abandoned_fact_find_note.smoke.spec.ts
import { test } from '@playwright/test';
import BaseTest from '../shared/TestUtils';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';
import { clearWorkerDataStore } from '@framework/utils/DataStore';

/**
 * Abandoned Fact Find Note Test Suite
 *
 * Validates that a note can be added and edited against an abandoned KYC Fact Find:
 * - Creates an active KYC Fact Find
 * - Abandons the Fact Find
 * - Adds a note to the abandoned Fact Find
 * - Verifies the note is saved successfully
 * - Edits the note on the abandoned Fact Find
 * - Verifies the updated note is saved and persisted
 *
 * CI-CD Pipeline Ready: Robust assertions and reliable persistence checks
 */
test.describe('Verify a note can be added to an abandoned KYC Fact Find', () => {
  test.beforeEach(async () => {
    // Clear any shared state before each test
    clearWorkerDataStore();
  });

  test('Complete abandoned fact find note workflow', async ({ browser }) => {
    const testBase = await BaseTest.create(browser, 'qa');
    
    try {
      // Create and Abandon Create Core Fact Find
      await testBase.factFindSteps.createAndAbandonFactFind(
        testBase.sideNav,
        testBase.navBar,
        'Core Fact Find'
      );

      // Verify Add Note action is available after abandoning the Fact Find
      await testBase.factFindSteps.verifyFirstRowAddNoteButtonIsVisible();

      // Verify the Note column is blank after abandoning the Fact Find
      await testBase.factFindSteps.verifyFactFindHistoryHasNoNoteHeader();

      // Verify a note can be added to an abandoned Fact Find and the Note column is populated
      await testBase.factFindSteps.executeAddNoteToAbandonedFactFind();

      // Verify note remains saved after page reload
      await testBase.factFindSteps.executeVerifyNoteSavedAgainstAbandonedFactFind();

      // Edit note on abandoned Fact Find
      await testBase.factFindSteps.executeEditNoteOnAbandonedFactFind();

      // Verify updated note is saved and persisted
      await testBase.factFindSteps.executeVerifyUpdatedNoteSavedAndPersisted();

    } finally {
      await cleanupClient1FactFinds();
      await testBase.cleanup();
    }
  });
});
