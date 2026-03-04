// projects/gateway-ui/tests/smoke/abandon_fact_find.smoke.spec.ts
import { test, Page } from '@playwright/test';
import { LoginSteps } from '@steps/gateway/LoginSteps';
import { FactFindCreationSteps } from '@steps/gateway/fact_find/FactFindCreationSteps';
import { FactFindAbandonmentSteps } from '@steps/gateway/FactFindAbandonmentSteps';
import { SideNavService } from '@steps/components/SideNav';
import { NavBarService } from '@steps/components/NavBar';

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
  let factFindCreationSteps: FactFindCreationSteps;
  let factFindAbandonmentSteps: FactFindAbandonmentSteps;
  let sideNav: SideNavService;
  let navBar: NavBarService;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    
    // Setup authentication for test environment
    await LoginSteps.setupForEnvironment(page, 'qa');

    // Initialize services once for efficiency
    factFindCreationSteps = new FactFindCreationSteps(page);
    factFindAbandonmentSteps = new FactFindAbandonmentSteps(page);
    sideNav = new SideNavService(page);
    navBar = new NavBarService(page);
  });

  test('Create retail client and navigate to Fact Find tab', async () => {
    await factFindCreationSteps.executeAddClientAndNavigateToFactFindTab(sideNav, navBar);
  });

  test('Create Core Fact Find', async () => {
    await factFindCreationSteps.executeCreateCoreFactFind();
  });

  test('Abandon Fact Find with status verification', async () => {
    await factFindAbandonmentSteps.executeAbandonFactFind();
  });

  test('Verify abandoned Fact Find cannot be launched', async () => {
    await factFindAbandonmentSteps.executeVerifyAbandonedFactFindCannotBeLaunched();
  });

  test('Verify abandonment status persists after page reload', async () => {
    await factFindAbandonmentSteps.executeVerifyAbandonmentStatusMaintained();
  });

  test('Verify system response for abandoned Fact Find', async () => {
    await factFindAbandonmentSteps.executeVerifySystemResponseForAbandonedFactFind();
  });

  test.afterAll(async () => {
    await page?.close();
  });
});