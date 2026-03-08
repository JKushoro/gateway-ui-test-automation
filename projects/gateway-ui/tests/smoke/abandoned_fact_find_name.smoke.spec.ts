// projects/gateway-ui/tests/smoke/abandoned_fact_find_name.smoke.spec.ts
import { test } from '@playwright/test';
import { BaseTest } from '../shared/TestUtils';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';

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
test.describe.serial('Verify a name can be added to an abandoned KYC Fact Find', () => {
  let testBase: BaseTest;

  test.beforeAll(async ({ browser }) => {
    testBase = await BaseTest.create(browser, 'qa');
  });

  test('Create and Abandon Create Core Fact Find', async () => {
    await testBase.factFindSteps.createAndAbandonFactFind(testBase.sideNav, testBase.navBar);
  });

  test('Verify the Name column is blank after abandoning the Fact Find', async () => {
    await testBase.factFindSteps.verifyFirstRowNameIsBlank();
  });

  test('Verify a name can be added to an abandoned Fact Find and the Name column is populated', async () => {
    await testBase.factFindSteps.executeAddNameToAbandonedFactFind();
  });

  test('Verify name remains saved after page reload', async () => {
    await testBase.factFindSteps.executeVerifyNameSavedAgainstAbandonedFactFind();
  });

  test('Edit name on abandoned Fact Find', async () => {
    await testBase.factFindSteps.executeEditNameOnAbandonedFactFind();
  });

  test('Verify updated name is saved and persisted', async () => {
    await testBase.factFindSteps.executeVerifyUpdatedNameSavedAndPersisted();
  });

  test.afterAll(async () => {
    await cleanupClient1FactFinds();
    await testBase.cleanup();
  });
});
