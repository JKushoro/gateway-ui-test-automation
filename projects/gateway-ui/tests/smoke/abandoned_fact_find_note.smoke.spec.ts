// projects/gateway-ui/tests/smoke/abandoned_fact_find_note.smoke.spec.ts
import { test } from '@playwright/test';
import { BaseTest } from '../shared/TestUtils';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';

/**
 * Abandoned Fact Find Name Test Suite
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
test.describe.serial('Verify a note can be added to an abandoned KYC Fact Find', () => {
  let testBase: BaseTest;

  test.beforeAll(async ({ browser }) => {
    testBase = await BaseTest.create(browser, 'qa');
  });

  test('Create and Abandon Create Core Fact Find', async () => {
    await testBase.factFindSteps.createAndAbandonFactFind(testBase.sideNav, testBase.navBar);
  });

  test('Verify Add Note action is available after abandoning the Fact Find', async () => {
    await testBase.factFindSteps.verifyFirstRowAddNoteButtonIsVisible();
  });

  test('Verify the Note column is blank after abandoning the Fact Find', async () => {
    await testBase.factFindSteps.verifyFactFindHistoryHasNoNoteHeader();
  });



  test('Verify a note can be added to an abandoned Fact Find and the Note column is populated', async () => {
    await testBase.factFindSteps.executeAddNoteToAbandonedFactFind();
  });

  test('Verify note remains saved after page reload', async () => {
    await testBase.factFindSteps.executeVerifyNoteSavedAgainstAbandonedFactFind();
  });

  test('Edit note on abandoned Fact Find', async () => {
    await testBase.factFindSteps.executeEditNoteOnAbandonedFactFind();
  });

  test('Verify updated note is saved and persisted', async () => {
    await testBase.factFindSteps.executeVerifyUpdatedNoteSavedAndPersisted();
  });

  test.afterAll(async () => {
    await cleanupClient1FactFinds();
    await testBase.cleanup();
  });
});
