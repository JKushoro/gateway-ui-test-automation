// projects/gateway-ui/steps/gateway/fact_find/FactFindManagementSteps.ts
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { SideNavService } from '@steps/components/SideNav';
import { NavBarService } from '@steps/components/NavBar';
import { RetailClientCreationSteps } from '@steps/gateway/RetailClientCreationSteps';
import type {
  RetailClientData,
  RetailClientFormResult,
} from '@steps/gateway/fact_find/types/RetailClientCreation.types';
import { FactFindPageLocators } from '@pages/gatewayElementLocators/FactFindPageLocators';
import { AlertService } from '@steps/components/AlertService';
import { AlertServiceLocator } from '@components/AlertServiceLocator';
import { TextHelper } from '@framework/helpers/TextHelper';

/**
 * FactFindManagementSteps
 *
 * Structured to match the page layout:
 * 1. Navigation / page load
 * 2. Fact Find History section
 * 3. Create New Fact Find section
 * 4. Shared history assertions
 * 5. High-level business flows
 */
export class FactFindManagementSteps extends BasePage {
  private readonly clientSteps: RetailClientCreationSteps;
  private readonly factFindLocators: FactFindPageLocators;
  private readonly alertServiceLocator: AlertServiceLocator;
  private readonly alert: AlertService;

  private static readonly KYC_TIMEOUT_MS = 180000;
  private static readonly POPUP_TIMEOUT_MS = 10000;
  private static readonly FACT_FIND_HISTORY_TIMEOUT_MS = 60000;
  private static readonly CREATE_DATE_TOLERANCE_MS = 60000;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.clientSteps = new RetailClientCreationSteps(page, config);
    this.factFindLocators = new FactFindPageLocators(page, config);
    this.alert = new AlertService(page, config);
    this.alertServiceLocator = new AlertServiceLocator(page);
  }

  // ==========================================================
  // 1. NAVIGATION / PAGE LOAD
  // ==========================================================

  /**
   * Add a client then navigate to the Fact Find tab.
   */
  public async addClientAndNavigateToFactFindTab(
    sideNav: SideNavService,
    navBar: NavBarService,
    clientData?: RetailClientData
  ): Promise<RetailClientFormResult> {
    await this.navigateToAddClient(sideNav);
    const usedClientData = await this.createClientRecord(clientData);
    await this.navigateToFactFindTab(navBar);
    await this.waitForFactFindHistoryTable();

    return usedClientData;
  }

  /**
   * Execute the complete flow to add a client and navigate to the Fact Find tab.
   */
  public async executeAddClientAndNavigateToFactFindTab(
    sideNav: SideNavService,
    navBar: NavBarService
  ): Promise<void> {
    await this.addClientAndNavigateToFactFindTab(sideNav, navBar);
  }

  /**
   * Wait for the Fact Find History table to be visible.
   */
  public async waitForFactFindHistoryTable(): Promise<void> {
    await expect(this.factFindLocators.factFindHistoryTable).toBeVisible({
      timeout: FactFindManagementSteps.FACT_FIND_HISTORY_TIMEOUT_MS,
    });
  }

  /**
   * Reload the page and wait for the Fact Find History table to be visible.
   */
  public async reloadPageAndWait(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.waitForFactFindHistoryTable();
  }

  /**
   * Navigate to the Add Client page.
   */
  private async navigateToAddClient(sideNav: SideNavService): Promise<void> {
    await this.clientSteps.executeNavigateToAddClient(sideNav);
  }

  /**
   * Create a client record.
   */
  private async createClientRecord(clientData?: RetailClientData): Promise<RetailClientFormResult> {
    return await this.clientSteps.createClient(clientData);
  }

  /**
   * Navigate to the Fact Find tab from the client page.
   */
  private async navigateToFactFindTab(navBar: NavBarService): Promise<void> {
    await navBar.clickNavItem('Fact Find');
  }

  // ==========================================================
  // 2. FACT FIND HISTORY SECTION
  // ==========================================================

  // ----------------------------------------------------------
  // 2a. First row cell helpers
  // ----------------------------------------------------------

  /**
   * Get the Status cell for the first Fact Find row.
   */
  private getFirstRowStatusCell(): Locator {
    return this.factFindLocators.factFindHistoryFirstRowCells.nth(1);
  }

  /**
   * Get the Name cell for the first Fact Find row.
   */
  private getFirstRowNameCell(): Locator {
    return this.factFindLocators.factFindHistoryFirstRowCells.nth(2);
  }

  // ----------------------------------------------------------
  // 2b. First row state / value checks
  // ----------------------------------------------------------

  /**
   * Get the current status of the first Fact Find row.
   */
  public async getFirstRowFactFindStatus(): Promise<string> {
    return (await this.getFirstRowStatusCell().textContent()) || '';
  }

  /**
   * Verify the first Fact Find row has the expected status.
   */
  private async verifyFirstRowFactFindStatus(expectedStatus: string): Promise<void> {
    await expect(this.getFirstRowStatusCell()).toContainText(expectedStatus, { timeout: 15000 });
  }

  /**
   * Verify the first Fact Find row is in Open status.
   */
  public async verifyFirstRowFactFindIsOpen(): Promise<void> {
    await this.verifyFirstRowFactFindStatus('Open');
  }

  /**
   * Verify the first Fact Find row is in Abandoned status.
   */
  public async verifyFirstRowFactFindIsAbandoned(): Promise<void> {
    await this.verifyFirstRowFactFindStatus('Abandoned');
  }

  /**
   * Verify the Launch Fact Find link is not available on the first row.
   */
  public async verifyFirstRowLaunchFactFindNotAvailable(): Promise<void> {
    await expect(this.factFindLocators.launchFactFindLinkFirstRow).not.toBeVisible();
  }

  /**
   * Verify the Name column is blank for the first Fact Find row.
   */
  public async verifyFirstRowNameIsBlank(): Promise<void> {
    await expect(this.getFirstRowNameCell()).toHaveText(/^\s*$/, { timeout: 15000 });
  }

  /**
   * Verify the Name column value for the first Fact Find row.
   */
  public async verifyFirstRowNameValue(expectedName: string): Promise<void> {
    await expect(this.getFirstRowNameCell()).toContainText(expectedName, { timeout: 15000 });
  }

  // ----------------------------------------------------------
  // 2c. Abandon Fact Find
  // ----------------------------------------------------------

  /**
   * Click the Abandon button for the first Fact Find row.
   */
  public async clickAbandonButtonFirstRow(): Promise<void> {
    await this.action.clickLocator(this.factFindLocators.abandonButtonFirstRow);
  }

  /**
   * Confirm the abandon action in the Abandon Fact Find modal.
   */
  public async confirmAbandonInPopup(): Promise<void> {
    await expect(this.alertServiceLocator.abandonModal).toBeVisible({ timeout: 15000 });
    await expect(this.alertServiceLocator.abandonModalTitle).toContainText('Abandon Fact Find');
    await expect(this.alertServiceLocator.abandonModalWarning).toBeVisible();

    await this.action.clickLocator(this.alertServiceLocator.abandonModalButton);

    await expect(this.alertServiceLocator.abandonModal).not.toBeVisible({ timeout: 15000 });
  }

  /**
   * Abandon the first Fact Find row.
   */
  public async abandonFirstRowFactFind(): Promise<void> {
    await this.clickAbandonButtonFirstRow();
    await this.confirmAbandonInPopup();
  }

  // ----------------------------------------------------------
  // 2d. Add / Edit Name
  // ----------------------------------------------------------

  /**
   * Click the Add Name button for the first Fact Find row.
   */
  public async clickAddNameButton(): Promise<void> {
    await this.action.clickLocator(this.factFindLocators.addNameButtonFirstRow);
  }

  /**
   * Enter a Fact Find name in the Add Name modal input field.
   */
  public async enterFactFindNameInAddModal(name: string): Promise<void> {
    await this.alertServiceLocator.nameModalInput.fill(name);
  }

  /**
   * Enter a Fact Find name in the Add Name modal input field.
   */
  public async enterFactFindNameInEditModal(name: string): Promise<void> {
    await this.alertServiceLocator.nameEditModalInput.fill(name);
  }

  /**
   * Click the Edit Name button for the first Fact Find row.
   */
  public async clickEditNameButton(): Promise<void> {
    await this.action.clickLocator(this.factFindLocators.editNameButtonFirstRow);
  }

  /**
   * Add a name to the abandoned Fact Find and verify the Name column is populated.
   */
  public async executeAddNameToAbandonedFactFind(): Promise<void> {
    const factFindName = `Fact Find Name ${Date.now()}`;

    await this.clickAddNameButton();

    await expect(this.alertServiceLocator.addNameModal).toBeVisible({ timeout: 15000 });
    await expect(this.alertServiceLocator.addNameModalTitle).toContainText('Add Fact Find Name');

    await this.enterFactFindNameInAddModal(factFindName);

    await this.action.clickLocator(this.alertServiceLocator.addNameModalSaveButton);

    await expect(this.alertServiceLocator.addNameModal).not.toBeVisible({ timeout: 15000 });

    await this.verifyFirstRowNameValue(factFindName);
  }

  /**
   * Verify the name remains saved against the abandoned Fact Find after page reload.
   */
  public async executeVerifyNameSavedAgainstAbandonedFactFind(): Promise<void> {
    await this.reloadPageAndWait();
    await expect(this.getFirstRowNameCell()).not.toHaveText(/^\s*$/, { timeout: 15000 });
  }

  /**
   * Edit the name on the abandoned Fact Find and verify the updated value is displayed.
   */
  public async executeEditNameOnAbandonedFactFind(): Promise<string> {
    const currentName = (await this.getFirstRowNameCell().textContent())?.trim() ?? '';
    const updatedName = `Updated Fact Find Name ${Date.now()}`;

    await this.clickEditNameButton();

    await expect(this.alertServiceLocator.editNameModal).toBeVisible({ timeout: 15000 });
    await expect(this.alertServiceLocator.editNameModalTitle).toContainText('Edit Fact Find Name');

    await this.alertServiceLocator.nameEditModalInput.clear();
    await this.enterFactFindNameInEditModal(updatedName);

    await this.action.clickLocator(this.alertServiceLocator.editNameModalSaveButton);
    await expect(this.alertServiceLocator.editNameModal).not.toBeVisible({ timeout: 15000 });

    await this.verifyFirstRowNameValue(updatedName);
    expect(currentName).not.toBe(updatedName);

    return updatedName;
  }

  public async executeVerifyUpdatedNameSavedAndPersisted(): Promise<void> {
    const updatedName = await this.executeEditNameOnAbandonedFactFind();
    await this.reloadPageAndWait();
    await this.verifyFirstRowNameValue(updatedName);
  }

  // ----------------------------------------------------------
  // 2e. Launch Fact Find from history
  // ----------------------------------------------------------

  /**
   * Click the Launch Fact Find link.
   */
  public async clickLaunchFactFindButton(): Promise<void> {
    await this.action.clickLinkByText('Launch Fact Find', false);
  }

  /**
   * Verify the KYC page is loaded successfully.
   */
  public async verifyKYCPage(kycPage: Page): Promise<Page> {
    const timeout = FactFindManagementSteps.KYC_TIMEOUT_MS;
    await kycPage.waitForLoadState('domcontentloaded', { timeout }).catch(() => {});
    await kycPage.waitForURL('**/kyc-ff/*', { timeout });
    await expect(kycPage).toHaveTitle('KYC', { timeout });
    return kycPage;
  }

  /**
   * Start listening for a popup or new page.
   */
  private async listenForPopup(): Promise<Page | null> {
    return this.page
      .context()
      .waitForEvent('page', { timeout: FactFindManagementSteps.POPUP_TIMEOUT_MS })
      .catch(() => null);
  }

  /**
   * Ensure the Launch Fact Find link is visible on the first row.
   */
  private async ensureLaunchFactFindIsVisible(): Promise<void> {
    await expect(this.factFindLocators.launchFactFindLinkFirstRow).toBeVisible();
  }

  /**
   * Click Launch Fact Find and resolve the target page.
   */
  private async launchFactFindAndResolveTarget(popupPromise: Promise<Page | null>): Promise<Page> {
    await this.clickLaunchFactFindButton();
    const popupPage = await popupPromise;
    return popupPage ?? this.page;
  }

  // ==========================================================
  // 3. CREATE NEW FACT FIND SECTION
  // ==========================================================

  /**
   * Select the Enable new fact find for this client checkbox.
   */
  public async selectEnableNewFactFindCheckBox(): Promise<void> {
    const checkbox = this.factFindLocators.enableNewFactFindCheckbox;
    await this.action.checkCheckbox(checkbox);
    await expect(checkbox).toBeChecked();
  }

  /**
   * Click the Confirm & Migrate button.
   */
  public async clickConfirmAndMigrateButton(): Promise<void> {
    await this.action.clickLinkByText('Confirm & Migrate', false);
  }

  /**
   * Confirm the enable client for new fact find alert.
   */
  public async confirmEnableClientForNewFactFind(): Promise<void> {
    await this.alert.handleEnableClientForNewFactFind('Yes');
  }

  /**
   * Choose the Fact Find type from the dropdown.
   */
  public async chooseFactFindType(): Promise<string> {
    await this.wait.waitForNetworkIdle(FactFindManagementSteps.KYC_TIMEOUT_MS);
    return await this.action.selectDropdownByLabel('Choose Fact Find Type', 'Core Fact Find');
  }

  /**
   * Click the Create Fact Find button.
   */
  public async clickFactFindButton(): Promise<void> {
    await this.action.clickButtonByText('Create Fact Find', false);
  }

  /**
   * Create a Core Fact Find without launching KYC.
   */
  public async executeCreateCoreFactFind(): Promise<void> {
    await this.selectEnableNewFactFindCheckBox();
    await this.clickConfirmAndMigrateButton();
    await this.confirmEnableClientForNewFactFind();
    await this.chooseFactFindType();
    await this.clickFactFindButton();
    await this.waitForFactFindHistoryTable();
  }

  /**
   * Create and launch a new Fact Find into the KYC page.
   */
  public async createAndLaunchNewFactFind(): Promise<Page> {
    await this.selectEnableNewFactFindCheckBox();
    await this.clickConfirmAndMigrateButton();
    await this.confirmEnableClientForNewFactFind();

    const selectedType = await this.chooseFactFindType();

    const createClickedAt = new Date();
    await this.clickFactFindButton();

    await this.assertFactFindHistoryRow({
      expectedType: selectedType,
      expectedStatus: 'Open',
      createClickedAt,
    });

    const popupPromise = this.listenForPopup();
    await this.ensureLaunchFactFindIsVisible();
    const kycTargetPage = await this.launchFactFindAndResolveTarget(popupPromise);

    return await this.verifyKYCPage(kycTargetPage);
  }

  // ==========================================================
  // 4. FACT FIND HISTORY ASSERTIONS
  // ==========================================================

  /**
   * Find the created Fact Find row index using Type and Status.
   */
  private async findCreatedFactFindRowIndex(
    expectedType: string,
    expectedStatus: string
  ): Promise<number> {
    const table = this.factFindLocators.factFindHistoryTable;

    const rowIndex = await this.table.findRowIndexByHeaderValues(table, {
      Type: expectedType,
      Status: expectedStatus,
    });

    if (rowIndex < 0) {
      throw new Error(
        `Could not find created Fact Find row (Type="${expectedType}", Status="${expectedStatus}")`
      );
    }

    return rowIndex;
  }

  /**
   * Assert the Fact Find History row values for the created Fact Find.
   */
  public async assertFactFindHistoryRow(args: {
    expectedType: string;
    createClickedAt: Date;
    expectedStatus?: string;
  }): Promise<void> {
    const expectedStatus = args.expectedStatus ?? 'Open';

    const rowIndex = await this.findCreatedFactFindRowIndex(args.expectedType, expectedStatus);

    await this.assertFactFindHistoryHeadingVisible();
    await this.assertRowCreatedByMatchesImpersonation(rowIndex);
    await this.assertRowStatusIs(expectedStatus, rowIndex);
    await this.assertRowTypeMatches(args.expectedType, rowIndex);

    const createDateText = await this.getRowCreateDateText(rowIndex);
    await this.assertCreateDateFormat(createDateText);
    await this.assertCreateDateIsValidAndRecent(createDateText, args.createClickedAt);
  }

  /**
   * Verify the Fact Find History heading is visible.
   */
  private async assertFactFindHistoryHeadingVisible(): Promise<void> {
    await expect(this.factFindLocators.factFindHistoryHeading).toBeVisible({ timeout: 15000 });
  }

  /**
   * Get the impersonation name from the impersonation banner.
   */
  private async getImpersonationName(): Promise<string> {
    const raw = await this.factFindLocators.impersonationBanner.innerText();
    return TextHelper.normalizeWhitespace(raw);
  }

  /**
   * Get the Created By cell for the specified row.
   */
  private async getRowCreatedByCell(rowIndex: number): Promise<Locator> {
    return await this.table.getCellByHeader(
      this.factFindLocators.factFindHistoryTable,
      'Created By',
      rowIndex
    );
  }

  /**
   * Verify the Created By value matches the impersonation name.
   */
  private async assertRowCreatedByMatchesImpersonation(rowIndex: number): Promise<void> {
    const expected = await this.getImpersonationName();
    const cell = await this.getRowCreatedByCell(rowIndex);
    await expect(cell).toHaveText(expected);
  }

  /**
   * Get the Status cell for the specified row.
   */
  private async getRowStatusCell(rowIndex: number): Promise<Locator> {
    return await this.table.getCellByHeader(
      this.factFindLocators.factFindHistoryTable,
      'Status',
      rowIndex
    );
  }

  /**
   * Verify the Status value for the specified row.
   */
  private async assertRowStatusIs(expectedStatus: string, rowIndex: number): Promise<void> {
    const cell = await this.getRowStatusCell(rowIndex);
    const safe = TextHelper.escapeRegExp(expectedStatus);
    await expect(cell).toHaveText(new RegExp(`^\\s*${safe}\\s*$`, 'i'));
  }

  /**
   * Get the Type cell for the specified row.
   */
  private async getRowTypeCell(rowIndex: number): Promise<Locator> {
    return await this.table.getCellByHeader(
      this.factFindLocators.factFindHistoryTable,
      'Type',
      rowIndex
    );
  }

  /**
   * Verify the Type value for the specified row.
   */
  private async assertRowTypeMatches(expectedType: string, rowIndex: number): Promise<void> {
    const cell = await this.getRowTypeCell(rowIndex);
    await expect(cell).toHaveText(expectedType);
  }

  /**
   * Get the Create Date cell for the specified row.
   */
  private async getRowCreateDateCell(rowIndex: number): Promise<Locator> {
    return await this.table.getCellByHeader(
      this.factFindLocators.factFindHistoryTable,
      'Create Date',
      rowIndex
    );
  }

  /**
   * Get the Create Date text for the specified row.
   */
  private async getRowCreateDateText(rowIndex: number): Promise<string> {
    const cell = await this.getRowCreateDateCell(rowIndex);
    return TextHelper.normalizeWhitespace(await cell.innerText());
  }

  /**
   * Verify the Create Date format is valid.
   */
  private async assertCreateDateFormat(createDateText: string): Promise<void> {
    if (!TextHelper.isGatewayDateTime(createDateText)) {
      throw new Error(
        `Create Date format invalid. Expected a valid Gateway date-time format but got: "${createDateText}"`
      );
    }
  }

  /**
   * Verify the Create Date is within the acceptable tolerance of the click time.
   */
  private async assertCreateDateIsValidAndRecent(
    createDateText: string,
    createClickedAt: Date
  ): Promise<void> {
    const displayed = TextHelper.parseGatewayDateTime(createDateText);
    const diffMs = Math.abs(displayed.getTime() - createClickedAt.getTime());

    if (diffMs > FactFindManagementSteps.CREATE_DATE_TOLERANCE_MS) {
      throw new Error(
        [
          `Create Date was not within ${FactFindManagementSteps.CREATE_DATE_TOLERANCE_MS / 1000}s of Create Fact Find click time.`,
          `Displayed: "${createDateText}" -> ${displayed.toISOString()}`,
          `ClickedAt: ${createClickedAt.toISOString()}`,
          `DiffMs: ${diffMs} (${(diffMs / 1000).toFixed(1)}s)`,
        ].join('\n')
      );
    }
  }

  // ==========================================================
  // 5. HIGH-LEVEL BUSINESS FLOWS
  // ==========================================================

  /**
   * Abandon the first row Fact Find and verify the status is updated.
   */
  public async executeAbandonFirstRowFactFind(): Promise<void> {
    await this.verifyFirstRowFactFindIsOpen();
    await this.abandonFirstRowFactFind();
    await this.verifyFirstRowFactFindIsAbandoned();
  }

  /**
   * Verify the first row abandoned Fact Find cannot be launched.
   */
  public async executeVerifyFirstRowAbandonedFactFindCannotBeLaunched(): Promise<void> {
    await this.verifyFirstRowLaunchFactFindNotAvailable();
  }

  /**
   * Verify the first row abandoned Fact Find status remains after page reload.
   */
  public async executeVerifyFirstRowAbandonmentStatusMaintained(): Promise<void> {
    await this.reloadPageAndWait();
    await this.verifyFirstRowFactFindIsAbandoned();
    await this.verifyFirstRowLaunchFactFindNotAvailable();
  }

  /**
   * Verify the overall system response for the first row abandoned Fact Find.
   */
  public async executeVerifySystemResponseForFirstRowAbandonedFactFind(): Promise<void> {
    const status = await this.getFirstRowFactFindStatus();
    expect(status.toLowerCase()).toContain('abandoned');
    await this.verifyFirstRowLaunchFactFindNotAvailable();
  }

  /**
   * Create a client, create a Core Fact Find, and abandon the first row Fact Find.
   */
  public async createAndAbandonFactFind(
    sideNav: SideNavService,
    navBar: NavBarService
  ): Promise<void> {
    await this.executeAddClientAndNavigateToFactFindTab(sideNav, navBar);
    await this.executeCreateCoreFactFind();
    await this.executeAbandonFirstRowFactFind();
  }
}