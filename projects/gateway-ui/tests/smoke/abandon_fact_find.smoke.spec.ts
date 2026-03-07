// projects/gateway-ui/tests/smoke/abandon_fact_find.smoke.spec.ts
import { test, Page } from '@playwright/test';
import { LoginSteps } from '@steps/gateway/LoginSteps';
import { FactFindManagementSteps } from '@steps/gateway/FactFindManagementSteps';
//import { FactFindAbandonmentSteps } from '@steps/gateway/FactFindAbandonmentSteps';
import { SideNavService } from '@steps/components/SideNav';
import { NavBarService } from '@steps/components/NavBar';
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
  let page: Page;
  let factFindManagementSteps: FactFindManagementSteps;
  let sideNav: SideNavService;
  let navBar: NavBarService;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    // Setup authentication for test environment
    await LoginSteps.setupForEnvironment(page, 'qa');

    // Initialize services once for efficiency
    factFindManagementSteps = new FactFindManagementSteps(page);
    sideNav = new SideNavService(page);
    navBar = new NavBarService(page);
  });

  test('Create retail client and navigate to Fact Find tab', async () => {
    await factFindManagementSteps.executeAddClientAndNavigateToFactFindTab(sideNav, navBar);
  });

  test('Create Core Fact Find', async () => {
    await factFindManagementSteps.executeCreateCoreFactFind();
  });

  test('Abandon Fact Find with status verification', async () => {
    await factFindManagementSteps.executeAbandonFirstRowFactFind();
  });

  test('Verify abandoned Fact Find cannot be launched', async () => {
    await factFindManagementSteps.executeVerifyFirstRowAbandonedFactFindCannotBeLaunched();
  });

  test('Verify abandonment status persists after page reload', async () => {
    await factFindManagementSteps.executeVerifyFirstRowAbandonmentStatusMaintained();
  });

  test('Verify system response for abandoned Fact Find', async () => {
    await factFindManagementSteps.executeVerifySystemResponseForFirstRowAbandonedFactFind();
  });

  test.afterAll(async () => {
    await cleanupClient1FactFinds();
    await page?.close();
  });
});