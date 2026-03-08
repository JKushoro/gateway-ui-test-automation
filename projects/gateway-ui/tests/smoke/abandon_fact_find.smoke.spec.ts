// projects/gateway-ui/tests/smoke/abandon_fact_find.smoke.spec.ts
import { test } from '@playwright/test';
import { BaseTest } from '../shared/TestUtils';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';

/**
 * Abandon Fact Find Test Suite
 *
 * Validates the complete abandonment behavior of a KYC Fact Find:
 * - Creates an active KYC Fact Find
 * - Performs abandon action with modal confirmation
 * - Verifies system prevents launching abandoned fact finds
 * - Confirms abandoned status persistence
 *
 * CI-CD Pipeline Ready: Robust error handling and reliable asserTIONS
 */
test.describe.serial('Abandon Fact Find', () => {
  let testBase: BaseTest;

  test.beforeAll(async ({ browser }) => {
    testBase = await BaseTest.create(browser, 'qa');
  });

  test('Create retail client and navigate to Fact Find tab', async () => {
    await testBase.factFindSteps.executeAddClientAndNavigateToFactFindTab(testBase.sideNav, testBase.navBar);
  });

  test('Create Core Fact Find', async () => {
    await testBase.factFindSteps.executeCreateCoreFactFind();
  });

  test('Abandon Fact Find with status verification', async () => {
    await testBase.factFindSteps.executeAbandonFirstRowFactFind();
  });

  test('Verify abandoned Fact Find cannot be launched', async () => {
    await testBase.factFindSteps.executeVerifyFirstRowAbandonedFactFindCannotBeLaunched();
  });

  test('Verify abandonment status persists after page reload', async () => {
    await testBase.factFindSteps.executeVerifyFirstRowAbandonmentStatusMaintained();
  });

  test('Verify system response for abandoned Fact Find', async () => {
    await testBase.factFindSteps.executeVerifySystemResponseForFirstRowAbandonedFactFind();
  });

  test.afterAll(async () => {
    await cleanupClient1FactFinds();
    await testBase.cleanup();
  });
});