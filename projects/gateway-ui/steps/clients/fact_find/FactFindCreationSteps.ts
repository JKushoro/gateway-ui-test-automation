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

/**
 * FactFindCreationSteps - Orchestrates creating a client and moving to Fact Find
 */
export class FactFindCreationSteps extends BasePage {
  private readonly clientSteps: RetailClientCreationSteps;
  private readonly factFindLocators: FactFindPageLocators;
  private readonly alert: AlertService;

  private static readonly KYC_TIMEOUT_MS = 180000;
  private static readonly POPUP_TIMEOUT_MS = 10000;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.clientSteps = new RetailClientCreationSteps(page, config);
    this.factFindLocators = new FactFindPageLocators(page, config);
    this.alert = new AlertService(page, config);
  }

  /**
   * Returns the first-row cell locator for the given column header name.
   * Logic lives in Steps (not Locators) to keep locator classes selector-only.
   */
  private async getFirstRowCellByHeader(headerName: string): Promise<Locator> {
    await expect(this.factFindLocators.factFindTable).toBeVisible({ timeout: 60000 });

    const headers = (await this.factFindLocators.factFindHeaderCells.allTextContents()).map(h =>
      h.replace(/\s+/g, ' ').trim().toLowerCase()
    );

    const idx = headers.findIndex(h => h === headerName.trim().toLowerCase());
    if (idx === -1) {
      throw new Error(
        `Fact Find table: "${headerName}" header not found. Headers: ${headers.join(' | ')}`
      );
    }

    return this.factFindLocators.factFindFirstRowCells.nth(idx);
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
    await this.waitForFactFindTable();

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

  private async waitForFactFindTable(): Promise<void> {
    await expect(this.factFindLocators.factFindTable).toBeVisible({ timeout: 60000 });
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
    await this.clickFactFindButton();

    await this.verifyLatestFactFindRowType(selectedType);
    const popupPromise = this.listenForPopup();
    await this.ensureLaunchFactFindIsVisible();
    const kycTargetPage = await this.launchFactFindAndResolveTarget(popupPromise);

    return await this.verifyKYCPage(kycTargetPage);
  }

  // ----------------------------------------------------------
  // New helper methods (extracted from inline logic)
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
    await expect(this.factFindLocators.launchFactFindButton).toBeVisible();
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
  // Existing helpers (unchanged)
  // ----------------------------------------------------------

  /**
   * Enable new fact find for this client (checkbox)
   */
  public async selectEnableNewFactFindCheckBox(): Promise<void> {
    const checkbox = this.factFindLocators.checkboxByLabel('Enable new fact find for this client');
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
   * Verify the newly created first row shows the expected "Type".
   */
  private async verifyLatestFactFindRowType(expectedType: string): Promise<void> {
    const typeCell = await this.getFirstRowCellByHeader('Type');
    await expect(typeCell).toBeVisible();
    await expect(typeCell).toHaveText(expectedType, { timeout: 60000 });
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