//projects/gateway-ui/steps/gateway/fact_find/FactFindCreationSteps.ts
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
import { TextHelper } from '@framework/helpers/TextHelper';

/**
 * FactFindCreationSteps - Orchestrates creating a client and moving to Fact Find
 */
export class FactFindCreationSteps extends BasePage {
  private readonly clientSteps: RetailClientCreationSteps;
  private readonly factFindLocators: FactFindPageLocators;
  private readonly alert: AlertService;

  private static readonly KYC_TIMEOUT_MS = 180000;
  private static readonly POPUP_TIMEOUT_MS = 10000;

  // Create Date time tolerance when comparing to "Create Fact Find" click time
  // Increased tolerance to account for network latency, server processing, and UI refresh delays
  private static readonly CREATE_DATE_TOLERANCE_MS = 60000; // 60 seconds

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.clientSteps = new RetailClientCreationSteps(page, config);
    this.factFindLocators = new FactFindPageLocators(page, config);
    this.alert = new AlertService(page, config);
  }

  /**
   * Add a client then navigate to the Fact Find tab
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

  private async navigateToAddClient(sideNav: SideNavService): Promise<void> {
    await this.clientSteps.executeNavigateToAddClient(sideNav);
  }

  private async createClientRecord(clientData?: RetailClientData): Promise<RetailClientFormResult> {
    return await this.clientSteps.createClient(clientData);
  }

  private async navigateToFactFindTab(navBar: NavBarService): Promise<void> {
    await navBar.clickNavItem('Fact Find');
  }

  /**
   * Wait for Fact Find History table to appear.
   */
  private async waitForFactFindHistoryTable(): Promise<void> {
    await expect(this.factFindLocators.factFindHistoryTable).toBeVisible({ timeout: 60000 });
  }

  /**
   * Creates a new Fact Find and launches the KYC app.
   * Returns the page that contains KYC (either a new tab or the same tab).
   */
  public async createAndLaunchNewFactFind(): Promise<Page> {
    await this.selectEnableNewFactFindCheckBox();
    await this.clickConfirmAndMigrateButton();
    await this.confirmEnableClientForNewFactFind();

    const selectedType = await this.chooseFactFindType();

    // Capture time close to click (required for tolerance check)
    const createClickedAt = new Date();
    await this.clickFactFindButton();

    // Assert the row we created (no hardcoded row index or column index)
    await this.assertFactFindHistoryRow({
      expectedType: selectedType,
      expectedStatus: 'Open',
      createClickedAt,
    });

    // Launch KYC
    const popupPromise = this.listenForPopup();
    await this.ensureLaunchFactFindIsVisible();
    const kycTargetPage = await this.launchFactFindAndResolveTarget(popupPromise);

    return await this.verifyKYCPage(kycTargetPage);
  }

  // ---------------------------------------------------------------------------
  // Dynamic row finder (based on business meaning)
  // ---------------------------------------------------------------------------

  /**
   * Find the created row once, based on business meaning (Type + Status).
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

  // ---------------------------------------------------------------------------
  // "Assert all" method (uses dynamic rowIndex)
  // ---------------------------------------------------------------------------

  /**
   * Assert Fact Find History row using dynamic row index (no hardcoded row number).
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
    await this.assertCreateDateWithinTolerance(createDateText, args.createClickedAt);
  }

  // ---------------------------------------------------------------------------
  // 1) Heading
  // ---------------------------------------------------------------------------

  private async assertFactFindHistoryHeadingVisible(): Promise<void> {
    await expect(this.factFindLocators.factFindHistoryHeading).toBeVisible({ timeout: 15000 });
  }

  // ---------------------------------------------------------------------------
  // 2) Created By = impersonation banner
  // ---------------------------------------------------------------------------

  private async getImpersonationName(): Promise<string> {
    const raw = await this.factFindLocators.impersonationBanner.innerText();
    return TextHelper.normalizeWhitespace(raw);
  }

  private async getRowCreatedByCell(rowIndex: number): Promise<Locator> {
    return await this.table.getCellByHeader(
      this.factFindLocators.factFindHistoryTable,
      'Created By',
      rowIndex
    );
  }

  private async assertRowCreatedByMatchesImpersonation(rowIndex: number): Promise<void> {
    const expected = await this.getImpersonationName();
    const cell = await this.getRowCreatedByCell(rowIndex);
    await expect(cell).toHaveText(expected);
  }

  // ---------------------------------------------------------------------------
  // 3) Status
  // ---------------------------------------------------------------------------

  private async getRowStatusCell(rowIndex: number): Promise<Locator> {
    return await this.table.getCellByHeader(
      this.factFindLocators.factFindHistoryTable,
      'Status',
      rowIndex
    );
  }

  private async assertRowStatusIs(expectedStatus: string, rowIndex: number): Promise<void> {
    const cell = await this.getRowStatusCell(rowIndex);
    const safe = TextHelper.escapeRegExp(expectedStatus);
    await expect(cell).toHaveText(new RegExp(`^\\s*${safe}\\s*$`, 'i'));
  }

  // ---------------------------------------------------------------------------
  // 4) Type
  // ---------------------------------------------------------------------------

  private async getRowTypeCell(rowIndex: number): Promise<Locator> {
    return await this.table.getCellByHeader(
      this.factFindLocators.factFindHistoryTable,
      'Type',
      rowIndex
    );
  }

  private async assertRowTypeMatches(expectedType: string, rowIndex: number): Promise<void> {
    const cell = await this.getRowTypeCell(rowIndex);
    await expect(cell).toHaveText(expectedType);
  }

  // ---------------------------------------------------------------------------
  // 5) Create Date
  // ---------------------------------------------------------------------------

  private async getRowCreateDateCell(rowIndex: number): Promise<Locator> {
    return await this.table.getCellByHeader(
      this.factFindLocators.factFindHistoryTable,
      'Create Date',
      rowIndex
    );
  }

  private async getRowCreateDateText(rowIndex: number): Promise<string> {
    const cell = await this.getRowCreateDateCell(rowIndex);
    return TextHelper.normalizeWhitespace(await cell.innerText());
  }

  private async assertCreateDateFormat(createDateText: string): Promise<void> {
    if (!TextHelper.isGatewayDateTime(createDateText)) {
      throw new Error(
        `Create Date format invalid. Expected a valid Gateway date-time format but got: "${createDateText}"`
      );
    }
  }

  private async assertCreateDateWithinTolerance(
    createDateText: string,
    createClickedAt: Date
  ): Promise<void> {
    const displayed = TextHelper.parseGatewayDateTime(createDateText);
    const diffMs = Math.abs(displayed.getTime() - createClickedAt.getTime());

    if (diffMs > FactFindCreationSteps.CREATE_DATE_TOLERANCE_MS) {
      throw new Error(
        [
          `Create Date not within ${FactFindCreationSteps.CREATE_DATE_TOLERANCE_MS}ms (${FactFindCreationSteps.CREATE_DATE_TOLERANCE_MS / 1000}s) of Create Fact Find click time.`,
          `Displayed: "${createDateText}" -> ${displayed.toISOString()}`,
          `ClickedAt: ${createClickedAt.toISOString()}`,
          `DiffMs: ${diffMs} (${(diffMs / 1000).toFixed(1)}s)`,
          `NOTE: UI shows minute precision; seconds assumed as ":00".`,
          `This timing difference may be due to network latency, server processing, or UI refresh delays.`,
        ].join('\n')
      );
    }
  }

  // ----------------------------------------------------------
  // Popup / navigation helpers
  // ----------------------------------------------------------

  /**
   * Start listening for a popup/new tab (resolves to null if none).
   */
  private async listenForPopup(): Promise<Page | null> {
    return this.page
      .context()
      .waitForEvent('page', { timeout: FactFindCreationSteps.POPUP_TIMEOUT_MS })
      .catch(() => null);
  }

  /**
   * Ensure the "Launch Fact Find" action is available.
   */
  private async ensureLaunchFactFindIsVisible(): Promise<void> {
    await expect(this.factFindLocators.launchFactFindLinkFirstRow).toBeVisible();
  }

  /**
   * Click "Launch Fact Find" and resolve the target page (popup or current tab).
   */
  private async launchFactFindAndResolveTarget(popupPromise: Promise<Page | null>): Promise<Page> {
    await this.clickLaunchFactFindButton();
    const popupPage = await popupPromise;
    return popupPage ?? this.page;
  }

  // ----------------------------------------------------------
  // Existing flow helpers
  // ----------------------------------------------------------

  /**
   * Enable new fact find for this client (checkbox)
   */
  public async selectEnableNewFactFindCheckBox(): Promise<void> {
    const checkbox = this.factFindLocators.enableNewFactFindCheckbox;
    await this.action.checkCheckbox(checkbox);
    await expect(checkbox).toBeChecked();
  }

  /**
   * Click "Confirm & Migrate"
   */
  public async clickConfirmAndMigrateButton(): Promise<void> {
    await this.action.clickLinkByText('Confirm & Migrate', false);
  }

  /**
   * Confirm enable client for new fact find (modal/alert)
   */
  public async confirmEnableClientForNewFactFind(): Promise<void> {
    await this.alert.handleEnableClientForNewFactFind('Yes');
  }

  /**
   * Select the fact find type from dropdown
   */
  public async chooseFactFindType(): Promise<string> {
    // Wait for dropdown to become available (QA can be slow)
    await this.wait.waitForNetworkIdle(FactFindCreationSteps.KYC_TIMEOUT_MS);
    return await this.action.selectDropdownByLabel('Choose Fact Find Type', 'Core Fact Find');
  }

  /**
   * Click "Create Fact Find"
   */
  public async clickFactFindButton(): Promise<void> {
    await this.action.clickButtonByText('Create Fact Find', false);
  }

  /**
   * Click "Launch Fact Find"
   */
  public async clickLaunchFactFindButton(): Promise<void> {
    await this.action.clickLinkByText('Launch Fact Find', false);
  }

  /**
   * Verify KYC page is loaded with URL and title checks.
   */
  public async verifyKYCPage(kycPage: Page): Promise<Page> {
    const timeout = FactFindCreationSteps.KYC_TIMEOUT_MS;
    await kycPage.waitForLoadState('domcontentloaded', { timeout }).catch(() => {});
    await kycPage.waitForURL('**/kyc-ff/*', { timeout });
    await expect(kycPage).toHaveTitle('KYC', { timeout });
    return kycPage;
  }

  /**
   * Execute the complete flow to create a Core Fact Find
   * This method creates a fact find without launching the KYC form
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
   * Execute the complete flow to add client and navigate to fact find tab
   */
  public async executeAddClientAndNavigateToFactFindTab(
    sideNav: SideNavService,
    navBar: NavBarService
  ): Promise<void> {
    await this.addClientAndNavigateToFactFindTab(sideNav, navBar);
  }

}