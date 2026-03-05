// projects/gateway-ui/tests/smoke/abandon_fact_find.smoke.spec.ts
import { test, Page, expect } from '@playwright/test';
import { LoginSteps } from '@steps/gateway/LoginSteps';
import { FactFindCreationSteps } from '@steps/gateway/FactFindCreationSteps';
import { FactFindAbandonmentSteps } from '@steps/gateway/FactFindAbandonmentSteps';
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
 * CI-CD Pipeline Ready: Robust error handling and reliable assertions
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

  test.afterAll(async () => {
    await page?.close().catch(() => {});
  });

  test('Create, abandon Core Fact Find, and verify Add Note is blocked', async () => {
    test.setTimeout(300_000);

    // ==========================================================
    // CREATE CLIENT + NAV TO FACT FIND TAB
    // ==========================================================
    await test.step('Create retail client and navigate to Fact Find tab', async () => {
      await factFindCreationSteps.executeAddClientAndNavigateToFactFindTab(sideNav, navBar);
    });

    // ==========================================================
    // CREATE CORE FACT FIND
    // ==========================================================
    await test.step('Create Core Fact Find', async () => {
      await factFindCreationSteps.executeCreateCoreFactFind();
    });

    // ==========================================================
    // LOCATORS
    // ==========================================================
    const factFindHistoryTable = page.locator('table.gatewaytable').first();
    const firstRow = factFindHistoryTable.locator('tbody tr').first();
    const firstRowCells = firstRow.locator('td');

    // Assumes Status column is index 1
    const statusCell = firstRowCells.nth(1);

    const addNameButton = firstRow.getByRole('button', { name: /Add Name/i });
    const abandonButton = page.getByRole('button', { name: /Abandon/i }).first();

    const abandonFactFindModal = page
      .locator('.modal-content:has(.modal-title:has-text("Abandon Fact Find"))')
      .first();

    const abandonFactFindTitle = abandonFactFindModal.locator('.modal-title');
    const abandonFactFindWarning = abandonFactFindModal.locator('.alert-danger');
    const abandonConfirmButton = abandonFactFindModal.locator(
      'button.btn-danger:has-text("Abandon")'
    );

    // ==========================================================
    // VERIFY ADD NAME AVAILABLE WHEN OPEN
    // ==========================================================
    await test.step('Verify Add Name is available when Fact Find is Open', async () => {
      await expect(factFindHistoryTable).toBeVisible({ timeout: 15000 });

      await expect(
        statusCell,
        'Expected first Fact Find to be Open before abandoning'
      ).toContainText(/Open/i, { timeout: 15000 });

      await expect(addNameButton).toBeVisible({ timeout: 5000 });
      await expect(addNameButton).toBeEnabled();
    });

    // ==========================================================
    // ABANDON FLOW
    // ==========================================================
    await test.step('Abandon the Fact Find via modal confirmation', async () => {
      await abandonButton.waitFor({ state: 'visible', timeout: 15000 });
      await abandonButton.click();

      await expect(abandonFactFindModal).toBeVisible({ timeout: 15000 });
      await expect(abandonFactFindTitle).toContainText('Abandon Fact Find');
      await expect(abandonFactFindWarning).toBeVisible();

      await abandonConfirmButton.click();
      await expect(abandonFactFindModal).not.toBeVisible({ timeout: 15000 });
    });

    // ==========================================================
    // VERIFY STATUS CHANGED
    // ==========================================================
    await test.step('Verify Fact Find status is Abandoned', async () => {
      await expect(statusCell, 'Expected status to change to Abandoned').toContainText(
        /Abandoned/i,
        { timeout: 15000 }
      );
    });

    // ==========================================================
    // VERIFY ADD NAME NOT AVAILABLE
    // ==========================================================
    await test.step('Verify Add Name button is not visible for Abandoned Fact Find', async () => {
      await expect(addNameButton).not.toBeVisible({ timeout: 5000 });

      await expect(firstRow, 'Expected first-row not to contain "Add Name"').not.toContainText(
        /Add Name/i,
        { timeout: 5000 }
      );
    });

    // ==========================================================
    // RELOAD AND VERIFY STILL BLOCKED
    // ==========================================================
    await test.step('Reload and verify restriction persists', async () => {
      await page.reload({ waitUntil: 'domcontentloaded' });

      await expect(factFindHistoryTable).toBeVisible({ timeout: 15000 });

      await expect(statusCell, 'Expected status to show Abandoned').toContainText(/Abandoned/i, {
        timeout: 15000,
      });

      await expect(addNameButton).not.toBeVisible({ timeout: 5000 });

      await expect(firstRow, 'Expected first-row not to contain "Add Name"').not.toContainText(
        /Add Name/i,
        { timeout: 5000 }
      );
    });

    // ==========================================================
    // CLEANUP
    // ==========================================================
    await test.step('Clean up - Abandon all fact finds', async () => {
      await cleanupClient1FactFinds();
    });

    await page.reload();
    await page.waitForLoadState('networkidle');
  });

});
