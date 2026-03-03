// //projects/gateway-ui/steps/clients/fact_find/FactFindCreationSteps.ts
// import { expect, Locator, Page } from '@playwright/test';
// import { BasePage } from '@framework/core/BasePage';
// import { FrameworkConfig } from '@framework/types';
// import { SideNavService } from '@steps/components/SideNav';
// import { NavBarService } from '@steps/components/NavBar';
// import { RetailClientCreationSteps } from '@steps/clients/RetailClientCreationSteps';
// import type {
//   RetailClientData,
//   RetailClientFormResult,
// } from '@steps/clients/fact_find/types/RetailClientCreation.types';
//
// import { FactFindPageLocators } from '@pages/clients/clientFiles/FactFindPageLocators';
// import { AlertService } from '@steps/components/AlertService';
//
// /**
//  * FactFindCreationSteps - Orchestrates creating a client and moving to Fact Find
//  */
// export class FactFindCreationSteps extends BasePage {
//   private readonly clientSteps: RetailClientCreationSteps;
//   private readonly factFindLocators: FactFindPageLocators;
//   private readonly alert: AlertService;
//
//   private static readonly KYC_TIMEOUT_MS = 180000;
//   private static readonly POPUP_TIMEOUT_MS = 10000;
//
//   constructor(page: Page, config?: Partial<FrameworkConfig>) {
//     super(page, config);
//     this.clientSteps = new RetailClientCreationSteps(page, config);
//     this.factFindLocators = new FactFindPageLocators(page, config);
//     this.alert = new AlertService(page, config);
//   }
//
//   /**
//    * Returns the first-row cell locator for the given column header name.
//    * Logic lives in Steps (not Locators) to keep locator classes selector-only.
//    */
//   private async getFirstRowCellByHeader(headerName: string): Promise<Locator> {
//     await expect(this.factFindLocators.factFindTable).toBeVisible({ timeout: 60000 });
//
//     const headers = (await this.factFindLocators.factFindHeaderCells.allTextContents()).map(h =>
//       h.replace(/\s+/g, ' ').trim().toLowerCase()
//     );
//
//     const idx = headers.findIndex(h => h === headerName.trim().toLowerCase());
//     if (idx === -1) {
//       throw new Error(
//         `Fact Find table: "${headerName}" header not found. Headers: ${headers.join(' | ')}`
//       );
//     }
//
//     return this.factFindLocators.factFindFirstRowCells.nth(idx);
//   }
//
//   /**
//    * Add a client then navigate to the Fact Find tab
//    */
//   public async addClientAndNavigateToFactFindTab(
//     sideNav: SideNavService,
//     navBar: NavBarService,
//     clientData?: RetailClientData
//   ): Promise<RetailClientFormResult> {
//     await this.navigateToAddClient(sideNav);
//     const usedClientData = await this.createClientRecord(clientData);
//     await this.navigateToFactFindTab(navBar);
//     await this.waitForFactFindTable();
//
//     return usedClientData;
//   }
//
//   private async navigateToAddClient(sideNav: SideNavService): Promise<void> {
//     await this.clientSteps.executeNavigateToAddClient(sideNav);
//   }
//
//   private async createClientRecord(clientData?: RetailClientData): Promise<RetailClientFormResult> {
//     return await this.clientSteps.createClient(clientData);
//   }
//
//   private async navigateToFactFindTab(navBar: NavBarService): Promise<void> {
//     await navBar.clickNavItem('Fact Find');
//   }
//
//   private async waitForFactFindTable(): Promise<void> {
//     await expect(this.factFindLocators.factFindTable).toBeVisible({ timeout: 60000 });
//   }
//
//   /**
//    * Creates a new Fact Find and launches the KYC app.
//    * Returns the page that contains KYC (either a new tab or the same tab).
//    */
//   public async createAndLaunchNewFactFind(): Promise<Page> {
//     await this.selectEnableNewFactFindCheckBox();
//     await this.clickConfirmAndMigrateButton();
//     await this.confirmEnableClientForNewFactFind();
//
//     const selectedType = await this.chooseFactFindType();
//     await this.clickFactFindButton();
//
//     await this.verifyLatestFactFindRowType(selectedType);
//
//
//
//
//     const popupPromise = this.listenForPopup();
//     await this.ensureLaunchFactFindIsVisible();
//     const kycTargetPage = await this.launchFactFindAndResolveTarget(popupPromise);
//
//     return await this.verifyKYCPage(kycTargetPage);
//   }
//
//   // ----------------------------------------------------------
//   // New helper methods (extracted from inline logic)
//   // ----------------------------------------------------------
//
//   /**
//    * Start listening for a popup/new tab (resolves to null if none).
//    */
//   private async listenForPopup(): Promise<Page | null> {
//     return this.page
//       .context()
//       .waitForEvent('page', { timeout: FactFindCreationSteps.POPUP_TIMEOUT_MS })
//       .catch(() => null);
//   }
//
//   /**
//    * Ensure the "Launch Fact Find" action is available.
//    */
//   private async ensureLaunchFactFindIsVisible(): Promise<void> {
//     await expect(this.factFindLocators.launchFactFindButton).toBeVisible();
//   }
//
//   /**
//    * Click "Launch Fact Find" and resolve the target page (popup or current tab).
//    */
//   private async launchFactFindAndResolveTarget(popupPromise: Promise<Page | null>): Promise<Page> {
//     await this.clickLaunchFactFindButton();
//     const popupPage = await popupPromise;
//     return popupPage ?? this.page;
//   }
//
//   // ----------------------------------------------------------
//   // Existing helpers (unchanged)
//   // ----------------------------------------------------------
//
//   /**
//    * Enable new fact find for this client (checkbox)
//    */
//   public async selectEnableNewFactFindCheckBox(): Promise<void> {
//     const checkbox = this.factFindLocators.checkboxByLabel('Enable new fact find for this client');
//     await this.action.checkCheckbox(checkbox);
//     await expect(checkbox).toBeChecked();
//   }
//
//   /**
//    * Click "Confirm & Migrate"
//    */
//   public async clickConfirmAndMigrateButton(): Promise<void> {
//     await this.action.clickLinkByText('Confirm & Migrate', false);
//   }
//
//   /**
//    * Confirm enable client for new fact find (modal/alert)
//    */
//   public async confirmEnableClientForNewFactFind(): Promise<void> {
//     await this.alert.handleEnableClientForNewFactFind('Yes');
//   }
//
//   /**
//    * Select the fact find type from dropdown
//    */
//   public async chooseFactFindType(): Promise<string> {
//     // Wait for dropdown to become available (QA can be slow)
//     await this.wait.waitForNetworkIdle(FactFindCreationSteps.KYC_TIMEOUT_MS);
//     return await this.action.selectDropdownByLabel('Choose Fact Find Type', 'Core Fact Find');
//   }
//
//   /**
//    * Click "Create Fact Find"
//    */
//   public async clickFactFindButton(): Promise<void> {
//     await this.action.clickButtonByText('Create Fact Find', false);
//   }
//
//   /**
//    * Verify the newly created first row shows the expected "Type".
//    */
//   private async verifyLatestFactFindRowType(expectedType: string): Promise<void> {
//     const typeCell = await this.getFirstRowCellByHeader('Type');
//     await expect(typeCell).toBeVisible();
//     await expect(typeCell).toHaveText(expectedType, { timeout: 60000 });
//   }
//
//   /**
//    * Click "Launch Fact Find"
//    */
//   public async clickLaunchFactFindButton(): Promise<void> {
//     await this.action.clickLinkByText('Launch Fact Find', false);
//   }
//
//   /**
//    * Verify KYC page is loaded with URL and title checks.
//    */
//   public async verifyKYCPage(kycPage: Page): Promise<Page> {
//     const timeout = FactFindCreationSteps.KYC_TIMEOUT_MS;
//     await kycPage.waitForLoadState('domcontentloaded', { timeout }).catch(() => {});
//     await kycPage.waitForURL('**/kyc-ff/*', { timeout });
//     await expect(kycPage).toHaveTitle('KYC', { timeout });
//     return kycPage;
//   }
// }



















//
// //projects/gateway-ui/steps/clients/fact_find/FactFindCreationSteps.ts
// import { expect, Locator, Page } from '@playwright/test';
// import { BasePage } from '@framework/core/BasePage';
// import { FrameworkConfig } from '@framework/types';
// import { SideNavService } from '@steps/components/SideNav';
// import { NavBarService } from '@steps/components/NavBar';
// import { RetailClientCreationSteps } from '@steps/clients/RetailClientCreationSteps';
// import type {
//   RetailClientData,
//   RetailClientFormResult,
// } from '@steps/clients/fact_find/types/RetailClientCreation.types';
//
// import { FactFindPageLocators } from '@pages/clients/clientFiles/FactFindPageLocators';
// import { AlertService } from '@steps/components/AlertService';
// import { TextHelper } from '@framework/helpers/TextHelper';
//
// /**
//  * FactFindCreationSteps - Orchestrates creating a client and moving to Fact Find
//  */
// export class FactFindCreationSteps extends BasePage {
//   private readonly clientSteps: RetailClientCreationSteps;
//   private readonly factFindLocators: FactFindPageLocators;
//   private readonly alert: AlertService;
//
//   private static readonly KYC_TIMEOUT_MS = 180000;
//   private static readonly POPUP_TIMEOUT_MS = 10000;
//
//   // Create Date time tolerance when comparing to "Create Fact Find" click time
//   private static readonly CREATE_DATE_TOLERANCE_MS = 5000;
//
//   constructor(page: Page, config?: Partial<FrameworkConfig>) {
//     super(page, config);
//     this.clientSteps = new RetailClientCreationSteps(page, config);
//     this.factFindLocators = new FactFindPageLocators(page, config);
//     this.alert = new AlertService(page, config);
//   }
//
//   /**
//    * Add a client then navigate to the Fact Find tab
//    */
//   public async addClientAndNavigateToFactFindTab(
//     sideNav: SideNavService,
//     navBar: NavBarService,
//     clientData?: RetailClientData
//   ): Promise<RetailClientFormResult> {
//     await this.navigateToAddClient(sideNav);
//     const usedClientData = await this.createClientRecord(clientData);
//     await this.navigateToFactFindTab(navBar);
//     await this.waitForFactFindTable();
//
//     return usedClientData;
//   }
//
//   private async navigateToAddClient(sideNav: SideNavService): Promise<void> {
//     await this.clientSteps.executeNavigateToAddClient(sideNav);
//   }
//
//   private async createClientRecord(clientData?: RetailClientData): Promise<RetailClientFormResult> {
//     return await this.clientSteps.createClient(clientData);
//   }
//
//   private async navigateToFactFindTab(navBar: NavBarService): Promise<void> {
//     await navBar.clickNavItem('Fact Find');
//   }
//
//   private async waitForFactFindTable(): Promise<void> {
//     // Prefer the Fact Find History table, but keep a safe fallback
//     const table =
//       this.factFindLocators.factFindHistoryTable ?? this.factFindLocators.factFindHistoryTable;
//     await expect(table).toBeVisible({ timeout: 60000 });
//   }
//
//   /**
//    * Creates a new Fact Find and launches the KYC app.
//    * Returns the page that contains KYC (either a new tab or the same tab).
//    */
//   public async createAndLaunchNewFactFind(): Promise<Page> {
//     await this.selectEnableNewFactFindCheckBox();
//     await this.clickConfirmAndMigrateButton();
//     await this.confirmEnableClientForNewFactFind();
//
//     const selectedType = await this.chooseFactFindType();
//
//     // Capture click time as close to the action as possible (required for date tolerance check)
//     const createClickedAt = new Date();
//     await this.clickFactFindButton();
//
//     // Wait for table refresh by checking Type in first row
//     await this.verifyLatestFactFindRowType(selectedType);
//
//     // Assert all Fact Find History values (each check has its own method)
//     await this.assertLatestFactFindHistoryRow({
//       expectedType: selectedType,
//       expectedStatus: 'Open',
//       createClickedAt,
//     });
//
//     const popupPromise = this.listenForPopup();
//     await this.ensureLaunchFactFindIsVisible();
//     const kycTargetPage = await this.launchFactFindAndResolveTarget(popupPromise);
//
//     return await this.verifyKYCPage(kycTargetPage);
//   }
//
//   // ---------------------------------------------------------------------------
//   // Main public assertion (calls separate methods)
//   // ---------------------------------------------------------------------------
//
//   /**
//    * Assert all Fact Find History checks for the latest row.
//    */
//   public async assertLatestFactFindHistoryRow(args: {
//     expectedType: string;
//     createClickedAt: Date;
//     expectedStatus?: string;
//   }): Promise<void> {
//     const expectedStatus = args.expectedStatus ?? 'Open';
//
//     await this.assertFactFindHistoryHeadingVisible();
//     await this.assertLatestRowCreatedByMatchesImpersonation();
//     await this.assertLatestRowStatusIs(expectedStatus);
//     await this.assertLatestRowTypeMatches(args.expectedType);
//
//     const createDateText = await this.getLatestRowCreateDateText();
//     await this.assertCreateDateFormat(createDateText);
//     await this.assertCreateDateWithinTolerance(createDateText, args.createClickedAt);
//   }
//
//   // ---------------------------------------------------------------------------
//   // 1) Heading
//   // ---------------------------------------------------------------------------
//
//   private async assertFactFindHistoryHeadingVisible(): Promise<void> {
//     await expect(this.factFindLocators.factFindHistoryHeading).toBeVisible({ timeout: 15000 });
//   }
//
//   // ---------------------------------------------------------------------------
//   // 2) Created By = impersonation banner
//   // ---------------------------------------------------------------------------
//
//   private async getImpersonationName(): Promise<string> {
//     const raw = await this.factFindLocators.impersonationBanner.innerText();
//     return TextHelper.normalizeWhitespace(raw);
//   }
//
//   private async getLatestRowCreatedByCell(): Promise<Locator> {
//     return await this.table.getCellByHeader(
//       this.factFindLocators.factFindHistoryTable,
//       'Created By',
//       0
//     );
//   }
//
//   private async assertLatestRowCreatedByMatchesImpersonation(): Promise<void> {
//     const expected = await this.getImpersonationName();
//     const cell = await this.getLatestRowCreatedByCell();
//     await expect(cell).toHaveText(expected);
//   }
//
//   // ---------------------------------------------------------------------------
//   // 3) Status = Open
//   // ---------------------------------------------------------------------------
//
//   private async getLatestRowStatusCell(): Promise<Locator> {
//     return await this.table.getCellByHeader(
//       this.factFindLocators.factFindHistoryTable,
//       'Status',
//       0
//     );
//   }
//
//   private async assertLatestRowStatusIs(expectedStatus: string): Promise<void> {
//     const cell = await this.getLatestRowStatusCell();
//     const safe = TextHelper.escapeRegExp(expectedStatus);
//     await expect(cell).toHaveText(new RegExp(`^\\s*${safe}\\s*$`, 'i'));
//   }
//
//   // ---------------------------------------------------------------------------
//   // 4) Type matches chosen dropdown value
//   // ---------------------------------------------------------------------------
//
//   private async getLatestRowTypeCell(): Promise<Locator> {
//     return await this.table.getCellByHeader(this.factFindLocators.factFindHistoryTable, 'Type', 0);
//   }
//
//   private async assertLatestRowTypeMatches(expectedType: string): Promise<void> {
//     const cell = await this.getLatestRowTypeCell();
//     await expect(cell).toHaveText(expectedType);
//   }
//
//   // ---------------------------------------------------------------------------
//   // 5) Create Date text / format / tolerance
//   // ---------------------------------------------------------------------------
//
//   private async getLatestRowCreateDateCell(): Promise<Locator> {
//     return await this.table.getCellByHeader(
//       this.factFindLocators.factFindHistoryTable,
//       'Create Date',
//       0
//     );
//   }
//
//   private async getLatestRowCreateDateText(): Promise<string> {
//     const cell = await this.getLatestRowCreateDateCell();
//     return TextHelper.normalizeWhitespace(await cell.innerText());
//   }
//
//   private async assertCreateDateFormat(createDateText: string): Promise<void> {
//     if (!TextHelper.isGatewayDateTime(createDateText)) {
//       throw new Error(
//         `Create Date format invalid. Expected "2 March 2026 at 20:30" but got: "${createDateText}"`
//       );
//     }
//   }
//
//   private async assertCreateDateWithinTolerance(
//     createDateText: string,
//     createClickedAt: Date
//   ): Promise<void> {
//     const displayed = TextHelper.parseGatewayDateTime(createDateText);
//     const diffMs = Math.abs(displayed.getTime() - createClickedAt.getTime());
//
//     if (diffMs > FactFindCreationSteps.CREATE_DATE_TOLERANCE_MS) {
//       throw new Error(
//         [
//           `Create Date not within ${FactFindCreationSteps.CREATE_DATE_TOLERANCE_MS}ms of Create Fact Find click time.`,
//           `Displayed: "${createDateText}" -> ${displayed.toISOString()}`,
//           `ClickedAt: ${createClickedAt.toISOString()}`,
//           `DiffMs: ${diffMs}`,
//           `NOTE: UI shows minute precision; seconds assumed as ":00".`,
//         ].join('\n')
//       );
//     }
//   }
//
//   // ----------------------------------------------------------
//   // New helper methods (extracted from inline logic)
//   // ----------------------------------------------------------
//
//   /**
//    * Start listening for a popup/new tab (resolves to null if none).
//    */
//   private async listenForPopup(): Promise<Page | null> {
//     return this.page
//       .context()
//       .waitForEvent('page', { timeout: FactFindCreationSteps.POPUP_TIMEOUT_MS })
//       .catch(() => null);
//   }
//
//   /**
//    * Ensure the "Launch Fact Find" action is available.
//    */
//   private async ensureLaunchFactFindIsVisible(): Promise<void> {
//     await expect(this.factFindLocators.launchFactFindLinkFirstRow).toBeVisible();
//   }
//
//   /**
//    * Click "Launch Fact Find" and resolve the target page (popup or current tab).
//    */
//   private async launchFactFindAndResolveTarget(popupPromise: Promise<Page | null>): Promise<Page> {
//     await this.clickLaunchFactFindButton();
//     const popupPage = await popupPromise;
//     return popupPage ?? this.page;
//   }
//
//   // ----------------------------------------------------------
//   // Existing helpers (unchanged)
//   // ----------------------------------------------------------
//
//   /**
//    * Enable new fact find for this client (checkbox)
//    */
//   public async selectEnableNewFactFindCheckBox(): Promise<void> {
//     const checkbox = this.factFindLocators.enableNewFactFindCheckbox;
//     await this.action.checkCheckbox(checkbox);
//     await expect(checkbox).toBeChecked();
//   }
//
//   /**
//    * Click "Confirm & Migrate"
//    */
//   public async clickConfirmAndMigrateButton(): Promise<void> {
//     await this.action.clickLinkByText('Confirm & Migrate', false);
//   }
//
//   /**
//    * Confirm enable client for new fact find (modal/alert)
//    */
//   public async confirmEnableClientForNewFactFind(): Promise<void> {
//     await this.alert.handleEnableClientForNewFactFind('Yes');
//   }
//
//   /**
//    * Select the fact find type from dropdown
//    */
//   public async chooseFactFindType(): Promise<string> {
//     // Wait for dropdown to become available (QA can be slow)
//     await this.wait.waitForNetworkIdle(FactFindCreationSteps.KYC_TIMEOUT_MS);
//     return await this.action.selectDropdownByLabel('Choose Fact Find Type', 'Core Fact Find');
//   }
//
//   /**
//    * Click "Create Fact Find"
//    */
//   public async clickFactFindButton(): Promise<void> {
//     await this.action.clickButtonByText('Create Fact Find', false);
//   }
//
//   /**
//    * Verify the newly created first row shows the expected "Type".
//    */
//   private async verifyLatestFactFindRowType(expectedType: string): Promise<void> {
//     const cell = await this.table.getCellByHeader(
//       this.factFindLocators.factFindHistoryTable,
//       'Type',
//       0
//     );
//     await expect(cell).toBeVisible();
//     await expect(cell).toHaveText(expectedType, { timeout: 60000 });
//   }
//
//   /**
//    * Click "Launch Fact Find"
//    */
//   public async clickLaunchFactFindButton(): Promise<void> {
//     await this.action.clickLinkByText('Launch Fact Find', false);
//   }
//
//   /**
//    * Verify KYC page is loaded with URL and title checks.
//    */
//   public async verifyKYCPage(kycPage: Page): Promise<Page> {
//     const timeout = FactFindCreationSteps.KYC_TIMEOUT_MS;
//     await kycPage.waitForLoadState('domcontentloaded', { timeout }).catch(() => {});
//     await kycPage.waitForURL('**/kyc-ff/*', { timeout });
//     await expect(kycPage).toHaveTitle('KYC', { timeout });
//     return kycPage;
//   }
// }
































//projects/gateway-ui/steps/clients/fact_find/FactFindCreationSteps.ts
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { SideNavService } from '@steps/components/SideNav';
import { NavBarService } from '@steps/components/NavBar';
import { RetailClientCreationSteps } from '@steps/clients/RetailClientCreationSteps';
import type {
  RetailClientData,
  RetailClientFormResult,
} from '@steps/clients/fact_find/types/RetailClientCreation.types';

import { FactFindPageLocators } from '@pages/clients/clientFiles/FactFindPageLocators';
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
  private static readonly CREATE_DATE_TOLERANCE_MS = 5000;

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
  private async findCreatedFactFindRowIndex(expectedType: string, expectedStatus: string): Promise<number> {
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
    return await this.table.getCellByHeader(this.factFindLocators.factFindHistoryTable, 'Created By', rowIndex);
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
    return await this.table.getCellByHeader(this.factFindLocators.factFindHistoryTable, 'Status', rowIndex);
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
    return await this.table.getCellByHeader(this.factFindLocators.factFindHistoryTable, 'Type', rowIndex);
  }

  private async assertRowTypeMatches(expectedType: string, rowIndex: number): Promise<void> {
    const cell = await this.getRowTypeCell(rowIndex);
    await expect(cell).toHaveText(expectedType);
  }

  // ---------------------------------------------------------------------------
  // 5) Create Date
  // ---------------------------------------------------------------------------

  private async getRowCreateDateCell(rowIndex: number): Promise<Locator> {
    return await this.table.getCellByHeader(this.factFindLocators.factFindHistoryTable, 'Create Date', rowIndex);
  }

  private async getRowCreateDateText(rowIndex: number): Promise<string> {
    const cell = await this.getRowCreateDateCell(rowIndex);
    return TextHelper.normalizeWhitespace(await cell.innerText());
  }

  private async assertCreateDateFormat(createDateText: string): Promise<void> {
    if (!TextHelper.isGatewayDateTime(createDateText)) {
      throw new Error(
        `Create Date format invalid. Expected "2 March 2026 at 20:30" but got: "${createDateText}"`
      );
    }
  }

  private async assertCreateDateWithinTolerance(createDateText: string, createClickedAt: Date): Promise<void> {
    const displayed = TextHelper.parseGatewayDateTime(createDateText);
    const diffMs = Math.abs(displayed.getTime() - createClickedAt.getTime());

    if (diffMs > FactFindCreationSteps.CREATE_DATE_TOLERANCE_MS) {
      throw new Error(
        [
          `Create Date not within ${FactFindCreationSteps.CREATE_DATE_TOLERANCE_MS}ms of Create Fact Find click time.`,
          `Displayed: "${createDateText}" -> ${displayed.toISOString()}`,
          `ClickedAt: ${createClickedAt.toISOString()}`,
          `DiffMs: ${diffMs}`,
          `NOTE: UI shows minute precision; seconds assumed as ":00".`,
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
}