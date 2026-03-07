// projects/gateway-ui/tests/smoke/abandoned_fact_find_name.smoke.spec.ts
import { test, Page } from '@playwright/test';
import { LoginSteps } from '@steps/gateway/LoginSteps';
import { FactFindManagementSteps } from '@steps/gateway/FactFindManagementSteps';
import { SideNavService } from '@steps/components/SideNav';
import { NavBarService } from '@steps/components/NavBar';
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
  let page: Page;
  let factFindManagementSteps: FactFindManagementSteps;
  let sideNav: SideNavService;
  let navBar: NavBarService;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    await LoginSteps.setupForEnvironment(page, 'qa');

    factFindManagementSteps = new FactFindManagementSteps(page);
    sideNav = new SideNavService(page);
    navBar = new NavBarService(page);
  });

  test('Create and Abandon Create Core Fact Find', async () => {
    await factFindManagementSteps.createAndAbandonFactFind(sideNav, navBar);
  });

  test('Verify the Name column is blank after abandoning the Fact Find', async () => {
    await factFindManagementSteps.verifyFirstRowNameIsBlank();
  });

  test('Verify a name can be added to an abandoned Fact Find and the Name column is populated', async () => {
    await factFindManagementSteps.executeAddNameToAbandonedFactFind();
  });

  test('Verify name remains saved after page reload', async () => {
    await factFindManagementSteps.executeVerifyNameSavedAgainstAbandonedFactFind();
  });

  test('Edit name on abandoned Fact Find', async () => {
    await factFindManagementSteps.executeEditNameOnAbandonedFactFind();
  });

  test('Verify updated name is saved and persisted', async () => {
    await factFindManagementSteps.executeVerifyUpdatedNameSavedAndPersisted();
  });

  test.afterAll(async () => {
    await cleanupClient1FactFinds();
    await page?.close();
  });
});
