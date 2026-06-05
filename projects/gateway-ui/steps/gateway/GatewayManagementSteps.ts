// projects/gateway-ui/steps/gateway/GatewayManagementSteps.ts
import { expect, Locator, Page } from '@playwright/test';
import { BasePage, dataStore } from '@/framework/src';
import { FrameworkConfig } from '@framework/types';
import { SideNavService } from '@steps/components/SideNav';
import { NavBarService } from '@steps/components/NavBar';
import { RetailClientCreationSteps } from '@steps/gateway/RetailClientCreationSteps';
import type {
  RetailClientData,
  RetailClientFormResult,
} from '@steps/gateway/fact_find/types/RetailClientCreation.types';
import { GatewayPageLocators } from '@pages/gatewayElementLocators/GatewayPageLocators';
import { ClientDetailsPageLocators } from '@pages/gatewayElementLocators/ClientDetailsPageLocators';
import { AlertService } from '@steps/components/AlertService';
import { AlertServiceLocator } from '@components/AlertServiceLocator';
import { TextHelper } from '@framework/helpers/TextHelper';
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';

/**
 * GatewayManagementSteps
 *
 * Combines fact find management and gateway fact find validation functionality.
 * Structured to match the page layout:
 * 1. Navigation / page load
 * 2. Fact Find History section
 * 3. Create New Fact Find section
 * 4. Shared history assertions
 * 5. High-level business flows
 * 6. Gateway fact find validation
 */
export class GatewayManagementSteps extends BasePage {
  private readonly clientSteps: RetailClientCreationSteps;
  private readonly factFindLocators: GatewayPageLocators;
  private readonly clientDetailsPageLocators: ClientDetailsPageLocators;
  private readonly alertServiceLocator: AlertServiceLocator;
  private readonly alert: AlertService;
  private readonly navBar: NavBarService;

  private static readonly KYC_TIMEOUT_MS = 180000;
  private static readonly POPUP_TIMEOUT_MS = 10000;
  private static readonly FACT_FIND_HISTORY_TIMEOUT_MS = 60000;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.clientSteps = new RetailClientCreationSteps(page, config);
    this.factFindLocators = new GatewayPageLocators(page, config);
    this.clientDetailsPageLocators = new ClientDetailsPageLocators(page);
    this.alert = new AlertService(page, config);
    this.alertServiceLocator = new AlertServiceLocator(page);
    this.navBar = new NavBarService(page);
  }

  // ==========================================================
  // UTILITY METHODS (from GatewayFactFindSteps)
  // ==========================================================

  private normalizeName(value: unknown): string {
    return String(value ?? '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private async firstExisting(...locators: Locator[]): Promise<Locator> {
    for (const l of locators) {
      if ((await l.count()) > 0) return l;
    }
    // Return first locator if none exist (for consistency)
    if (locators.length === 0) {
      throw new Error('No locators provided to firstExisting method');
    }
    return locators[0]!; // Non-null assertion since we checked length above
  }

  private async readCellValue(cell: Locator): Promise<string> {
    await this.wait.waitForElement(cell);

    const link = this.factFindLocators.getCellLink(cell);
    if ((await link.count()) > 0) return TextHelper.normalizeWhitespace(await link.innerText());

    const span = this.factFindLocators.getCellSpan(cell);
    if ((await span.count()) > 0) return TextHelper.normalizeWhitespace(await span.innerText());

    return TextHelper.normalizeWhitespace(await cell.innerText());
  }

  private async getGatewayValueByLabel(sectionTitle: string, labelText: string): Promise<string> {
    const cell = await this.firstExisting(
      this.clientDetailsPageLocators.gatewayBsCell(sectionTitle, labelText),
      this.clientDetailsPageLocators.summaryPanelCell(sectionTitle, labelText),
      this.clientDetailsPageLocators.summaryPanelCellAlt(sectionTitle, labelText)
    );

    return this.readCellValue(cell);
  }

  /* -------------------- Store readers -------------------- */

  private getDisplayedKycFullName(): string {
    const displayedKycClient = dataStore.getValue('displayed.kycClient') || {};
    const fullName = this.normalizeName(displayedKycClient.fullName);

    if (!fullName) {
      throw new Error('Displayed KYC full name not found (displayed.kycClient.fullName)');
    }
    return fullName;
  }

  private getDisplayedKycMobile(): string {
    const value = String(dataStore.getValue('displayed.kyc.contact.mobile') ?? '').trim();
    if (!value) throw new Error('Displayed KYC mobile not found (displayed.kyc.contact.mobile)');
    return value;
  }

  private getDisplayedKycEmail(): string {
    const value = String(dataStore.getValue('displayed.kyc.contact.email') ?? '').trim();
    if (!value) throw new Error('Displayed KYC email not found (displayed.kyc.contact.email)');
    return value;
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
   * Open an existing client by email and navigate to the Fact Find tab.
   * This method does NOT create a new client - it searches for an existing one.
   */
  public async openExistingClientAndNavigateToFactFindTab(
    clientEmail: string,
    sideNav: SideNavService,
    navBar: NavBarService
  ): Promise<void> {
    // Navigate to Clients section
    await sideNav.clickSideMenuItem('Clients');
    await this.wait.waitForDOMContentLoaded();

    // Search for client by email
    const searchInput = this.page
      .getByRole('textbox', { name: /search/i })
      .or(this.page.getByPlaceholder(/search/i));
    await expect(searchInput).toBeVisible();
    await searchInput.fill(clientEmail);
    await searchInput.press('Enter');

    // Wait for search results to load with longer timeout
    await this.page.waitForTimeout(5000);
    await this.wait.waitForDOMContentLoaded();

    // Try multiple ways to find the client record
    let clientElement: any = null;
    const searchStrategies = [
      () => this.page.getByText(clientEmail).first(),
      () => this.page.locator(`td:has-text("${clientEmail}")`).first(),
      () => this.page.locator(`tr:has-text("${clientEmail}")`).first(),
      () => this.page.locator(`a:has-text("${clientEmail}")`).first(),
      () => this.page.getByText('Pipeline Automation').first(), // Try by name
      () => this.page.locator('tr').filter({ hasText: clientEmail }).first(),
      () => this.page.locator('[data-testid*="client"]').filter({ hasText: clientEmail }).first(),
    ];

    for (const strategy of searchStrategies) {
      try {
        const element = strategy();
        await expect(element).toBeVisible({ timeout: 3000 });
        console.log(`Found client using strategy: ${strategy.toString()}`);
        clientElement = element;
        break;
      } catch (error) {
        console.log(`Strategy failed: ${strategy.toString()}`);
        continue;
      }
    }

    if (!clientElement) {
      // If still not found, try searching by name instead
      await searchInput.fill('Pipeline Automation');
      await searchInput.press('Enter');
      await this.page.waitForTimeout(3000);

      const nameElement = this.page.getByText('Pipeline Automation').first();
      await expect(nameElement).toBeVisible({ timeout: 5000 });
      clientElement = nameElement;
    }

    await this.action.clickLocator(clientElement);

    // Wait for client details page to load
    await this.wait.waitForDOMContentLoaded();

    // Navigate to Fact Find tab
    await this.navigateToFactFindTab(navBar);
    await this.waitForFactFindHistoryTable();
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
      timeout: GatewayManagementSteps.FACT_FIND_HISTORY_TIMEOUT_MS,
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

  /**
   * Verify the Add Note action is available for the first Fact Find row.
   */
  public async verifyFirstRowAddNoteButtonIsVisible(): Promise<void> {
    await expect(this.factFindLocators.addNoteButtonFirstRow).toBeVisible({ timeout: 15000 });
  }

  /**
   * Verify the Fact Find History table does not contain a Note header.
   */
  public async verifyFactFindHistoryHasNoNoteHeader(): Promise<void> {
    const headers = await this.factFindLocators.factFindHistoryHeaderCells.allInnerTexts();

    expect(headers.map(h => h.trim().toLowerCase())).not.toContain('note');
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
    return this.factFindLocators.getFirstRowStatusCell();
  }

  /**
   * Get the Name cell for the first Fact Find row.
   */
  private getFirstRowNameCell(): Locator {
    return this.factFindLocators.getFirstRowNameCell();
  }

  /**
   * Get the Note cell for the specified row.
   */
  private async getRowNoteCell(rowIndex: number): Promise<Locator> {
    return await this.table.getCellByHeader(
      this.factFindLocators.factFindHistoryTable,
      'Note',
      rowIndex
    );
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
   * Verify the Launch Fact Find link is available on the first row.
   */
  public async verifyFirstRowLaunchFactFindAvailable(): Promise<void> {
    await expect(this.factFindLocators.launchFactFindLinkFirstRow).toBeVisible({
      timeout: GatewayManagementSteps.FACT_FIND_HISTORY_TIMEOUT_MS,
    });
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

  /**
   * Verify the Note column is blank for the first Fact Find row.
   */
  public async verifyFirstRowNoteIsBlank(): Promise<void> {
    const noteCell = await this.getRowNoteCell(0);
    await expect(noteCell).not.toHaveText(/^\s*$/, { timeout: 15000 });
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
   * Enter a Fact Find note in the Add Note modal input field.
   */
  public async enterFactFindNoteInAddModal(name: string): Promise<void> {
    await this.alertServiceLocator.addNoteModalInput.fill(name);
  }

  /**
   * Click the Edit Name button for the first Fact Find row.
   */
  public async clickEditNameButton(): Promise<void> {
    await this.action.clickLocator(this.factFindLocators.editNameButtonFirstRow);
  }

  /**
   * Click the gatewaytable-collapse button for the first Fact Find row.
   */
  public async clickGatewayTableCollapseButton(): Promise<void> {
    await this.action.clickLocator(this.factFindLocators.expandFirstRowDetailsButton);
  }

  /**
   * Click the Add Note button for the first Fact Find row.
   */
  public async clickAddNoteButton(): Promise<void> {
    await this.action.clickLocator(this.factFindLocators.addNoteButtonFirstRow);
  }

  /**
   * Get the Note cell from the first row of the expanded note history table.
   */
  private getFirstRowNoteValueCell(): Locator {
    return this.factFindLocators.getFirstRowNoteValueCell();
  }

  /**
   * Verify the saved note value for the first Fact Find row.
   */
  public async verifyFirstRowNoteValue(expectedNote: string): Promise<void> {
    await expect(this.factFindLocators.firstRowNoteHistoryTable).toBeVisible({ timeout: 15000 });
    await expect(this.getFirstRowNoteValueCell()).toContainText(expectedNote, { timeout: 15000 });
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
   * Add a note to the abandoned Fact Find and verify the Note value is displayed.
   */
  public async executeAddNoteToAbandonedFactFind(): Promise<void> {
    const factFindNote = `Fact Find Note ${Date.now()}`;
    await this.clickAddNoteButton();

    await expect(this.alertServiceLocator.addNoteModal).toBeVisible({ timeout: 15000 });
    await expect(this.alertServiceLocator.addNoteModalTitle).toContainText('Fact Find Notes');

    await this.enterFactFindNoteInAddModal(factFindNote);
    await this.action.clickLocator(this.alertServiceLocator.addNoteModalSaveButton);

    await expect(this.alertServiceLocator.addNoteModal).not.toBeVisible({ timeout: 15000 });
    await this.clickGatewayTableCollapseButton();

    await this.verifyFirstRowNoteValue(factFindNote);
  }

  /**
   * Verify the note remains saved against the abandoned Fact Find after page reload.
   */
  public async executeVerifyNoteSavedAgainstAbandonedFactFind(): Promise<void> {
    await this.reloadPageAndWait();
    await this.clickGatewayTableCollapseButton();
    await expect(this.getFirstRowNoteValueCell()).not.toHaveText(/^\s*$/, { timeout: 15000 });
  }

  /**
   * Click the Edit Note button for the first Fact Find row.
   */
  public async clickEditNoteButtonFirstRow(): Promise<void> {
    await this.action.clickLocator(this.factFindLocators.editNoteButtonFirstRow);
  }

  /**
   * Enter a Fact Find note in the Add Note modal input field.
   */
  public async enterFactFindNoteInEditModal(name: string): Promise<void> {
    await this.alertServiceLocator.editNoteModalInput.fill(name);
  }

  /**
   * Edit the note on the abandoned Fact Find and verify the updated value is displayed.
   */
  public async executeEditNoteOnAbandonedFactFind(): Promise<string> {
    const currentNote = (await this.getFirstRowNoteValueCell().textContent())?.trim() ?? '';
    const updatedNote = `Updated Fact Find Note ${Date.now() + 1}`;

    await this.clickEditNoteButtonFirstRow();

    await expect(this.alertServiceLocator.editNoteModal).toBeVisible({ timeout: 15000 });
    await expect(this.alertServiceLocator.editNoteModal).toContainText('Edit Fact Find Note');

    await this.alertServiceLocator.editNoteModalInput.clear();
    await this.enterFactFindNoteInEditModal(updatedNote);

    await this.action.clickLocator(this.alertServiceLocator.editNoteModalSaveButton);
    await expect(this.alertServiceLocator.editNoteModal).not.toBeVisible({ timeout: 15000 });

    await this.clickGatewayTableCollapseButton();

    await this.verifyFirstRowNoteValue(updatedNote);
    expect(currentNote).not.toBe(updatedNote);

    return updatedNote;
  }

  public async executeVerifyUpdatedNoteSavedAndPersisted(): Promise<void> {
    const updatedNote = await this.executeEditNoteOnAbandonedFactFind();
    await this.reloadPageAndWait();
    await this.clickGatewayTableCollapseButton();
    await this.verifyFirstRowNoteValue(updatedNote);
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
    const timeout = GatewayManagementSteps.KYC_TIMEOUT_MS;
    await kycPage.waitForLoadState('domcontentloaded', { timeout }).catch(() => {});
    await kycPage.waitForURL('**/kyc-ff/*', { timeout });
    await expect(kycPage).toHaveTitle('Fairstone', { timeout });
    return kycPage;
  }

  /**
   * Start listening for a popup or new page.
   */
  private async listenForPopup(): Promise<Page | null> {
    return this.page
      .context()
      .waitForEvent('page', { timeout: GatewayManagementSteps.POPUP_TIMEOUT_MS })
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
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }

  /**
   * Verify the Enable new fact find checkbox is selected.
   */
  public async verifyEnableNewFactFindCheckBoxIsSelected(): Promise<void> {
    await expect(this.factFindLocators.enableNewFactFindCheckbox).toBeChecked();
  }

  /**
   * Click the Confirm & Migrate button.
   */
  public async clickConfirmAndMigrateButton(): Promise<void> {
    await this.action.clickLinkByText('Confirm & Migrate', false);
  }

  /**
   * Verify the enable client confirmation alert is visible.
   */
  public async verifyEnableClientForNewFactFindAlertIsVisible(): Promise<void> {
    await expect(this.alertServiceLocator.container).toBeVisible({ timeout: 15000 });
    await expect(this.alertServiceLocator.alertTitle).toContainText(
      'Enable client for new fact find?'
    );
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
  public async chooseFactFindType(value: string): Promise<string> {
    await this.wait.waitForNetworkIdle(GatewayManagementSteps.KYC_TIMEOUT_MS);
    // Select from dropdown using direct locator approach
    const dropdown = this.page
      .locator('select')
      .filter({ hasText: 'Choose Fact Find Type' })
      .or(this.page.getByLabel('Choose Fact Find Type'));
    await dropdown.selectOption(value);
    return value;
  }
  /**
   * Click the Create Fact Find button.
   */
  public async clickFactFindButton(): Promise<void> {
    await this.action.clickButtonByText('Create Fact Find', false);
  }

  private async createFactFind(factFindType: string): Promise<{
    selectedType: string;
    createClickedAt: Date;
  }> {
    await this.selectEnableNewFactFindCheckBox();
    await this.clickConfirmAndMigrateButton();
    await this.confirmEnableClientForNewFactFind();

    const selectedType = await this.chooseFactFindType(factFindType);

    const createClickedAt = new Date();
    await this.clickFactFindButton();

    return { selectedType, createClickedAt };
  }

  /**
   * Create a Fact Find without launching KYC.
   */
  public async executeCreateFactFind(factFindType: string): Promise<string> {
    const { selectedType } = await this.createFactFind(factFindType);
    await this.waitForFactFindHistoryTable();
    return selectedType;
  }

  /**
   * Create and launch a new Fact Find into the KYC page.
   */
  public async createAndLaunchNewFactFind(factFindType: string): Promise<Page> {
    const { selectedType, createClickedAt } = await this.createFactFind(factFindType);

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
    this.assertCreateDateIsValidAndRecent(createDateText, args.createClickedAt);
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
  private assertCreateDateIsValidAndRecent(
    createDateText: string,
    createClickedAt: Date,
    toleranceMs = 90_000
  ): void {
    const displayed = TextHelper.parseGatewayDateTime(createDateText);
    const differenceMs = Math.abs(displayed.getTime() - createClickedAt.getTime());

    if (differenceMs > toleranceMs) {
      throw new Error(
        [
          `Create Date was not within ${toleranceMs / 1000}s of the expected time.`,
          `Displayed: "${createDateText}" -> ${displayed.toISOString()}`,
          `Expected: ${createClickedAt.toISOString()}`,
          `DiffMs: ${differenceMs} (${(differenceMs / 1000).toFixed(1)}s)`,
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

  async refreshAfterFactFindCleanup(): Promise<void> {
    await cleanupClient1FactFinds();
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  /**
   * Create a client, create a Fact Find, and abandon the first row Fact Find.
   */
  public async createAndAbandonFactFind(
    sideNav: SideNavService,
    navBar: NavBarService,
    factFindType: string
  ): Promise<void> {
    await this.executeAddClientAndNavigateToFactFindTab(sideNav, navBar);
    await this.createFactFind(factFindType);
    await this.refreshAfterFactFindCleanup();
  }

  // ==========================================================
  // 6. GATEWAY FACT FIND VALIDATION (from GatewayFactFindSteps)
  // ==========================================================

  /* -------------------- Main Flow -------------------- */
  public async validateGatewayFactFindData(): Promise<void> {
    await this.page.bringToFront();
    await this.page.reload({ waitUntil: 'domcontentloaded' });

    await this.verifyLatestFactFindClientNameMatchesKyc();
    await this.verifyLatestFactFindStatusIsCompleteForKycClient();

    await this.navigateToClientDetailsPage();

    // clear method for contact comparison
    await this.verifyGatewayContactDetailsMatchKyc();
  }

  /**
   * Verifies that the first fact find row has 'Complete' status
   * This is a specific validation for completed fact finds
   */
  public async verifyFirstFactFindStatusIsComplete(): Promise<void> {
    await this.page.bringToFront();
    await this.page.reload({ waitUntil: 'domcontentloaded' });

    const table = this.factFindLocators.factFindHistoryTable;
    await expect(table).toBeVisible({ timeout: 30000 });

    const status = await this.table.getCellTextByHeader(table, 0, 'Status');
    expect(status).toBe('Complete');
  }

  /* -------------------- Checks -------------------- */
  private async verifyLatestFactFindClientNameMatchesKyc(): Promise<void> {
    const kycName = this.getDisplayedKycFullName();

    const table = this.factFindLocators.factFindHistoryTable;
    await expect(table).toBeVisible({ timeout: 30000 });

    const rows = await this.table.getRows(table);
    const rowIndex = await this.table.findRowIndex(rows, { containsText: kycName });
    if (rowIndex < 0) {
      throw new Error(`Client "${kycName}" not found in Fact Find History`);
    }

    const clientNameOnTable = this.normalizeName(
      await this.table.getCellTextByHeader(table, rowIndex, 'Client Names')
    );

    expect(clientNameOnTable).toBe(this.normalizeName(kycName));
  }

  private async verifyLatestFactFindStatusIsCompleteForKycClient(): Promise<void> {
    const kycName = this.getDisplayedKycFullName();

    const table = this.factFindLocators.factFindHistoryTable;
    await expect(table).toBeVisible({ timeout: 30000 });

    const status = await this.table.getCellTextForRowByHeader(table, kycName, 'Status');
    expect(TextHelper.normalizeWhitespace(status)).toBe('Complete');
  }

  private async navigateToClientDetailsPage(): Promise<void> {
    await this.navBar.clickNavItem('Client Details');
  }

  /* -------------------- Contact comparison (Gateway UI vs KYC UI) -------------------- */
  private async verifyGatewayContactDetailsMatchKyc(): Promise<void> {
    // KYC values (already stored earlier from KYC screen)
    const displayedKycMobile = this.getDisplayedKycMobile();
    const displayedKycEmail = this.getDisplayedKycEmail();

    // Gateway values (read directly from Gateway screen)
    const displayedGatewayMobile = await this.getGatewayValueByLabel(
      'Contact Details',
      'Mobile Phone'
    );
    const displayedGatewayEmail = await this.getGatewayValueByLabel('Contact Details', 'Email');

    dataStore.setValue('displayed.gateway.contact.mobile', displayedGatewayMobile);
    dataStore.setValue('displayed.gateway.contact.email', displayedGatewayEmail);

    this.logger.info?.(
      `Gateway vs KYC Mobile → Gateway: "${displayedGatewayMobile}", KYC: "${displayedKycMobile}"`
    );
    this.logger.info?.(
      `Gateway vs KYC Email  → Gateway: "${displayedGatewayEmail}", KYC: "${displayedKycEmail}"`
    );

    expect(displayedGatewayMobile).toBe(displayedKycMobile);
    expect(displayedGatewayEmail).toBe(displayedKycEmail);
  }
}
