import { BasePage, dataStore } from '@/framework/src';
import { expect, Locator, Page } from '@playwright/test';
import { ClientDetailsPageLocators } from '@pages/clients/clientFiles/ClientDetailsPageLocators';
import { NavBarService } from '@steps/components/NavBar';
import { FactFindPageLocators } from '@pages/clients/clientFiles/FactFindPageLocators';

export class GatewayFactFindSteps extends BasePage {
  private readonly clientDetailsPageLocators: ClientDetailsPageLocators;
  private readonly factFindLocators: FactFindPageLocators;
  private readonly navBar: NavBarService;

  constructor(page: Page) {
    super(page);
    this.clientDetailsPageLocators = new ClientDetailsPageLocators(page);
    this.factFindLocators = new FactFindPageLocators(page);
    this.navBar = new NavBarService(page);
  }

  private normalizeName(value: unknown): string {
    return String(value ?? '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private normalizeText(text: string): string {
    return text.replace(/\s+/g, ' ').trim().replace(/^"|"$/g, '');
  }

  private async firstExisting(...locators: Locator[]): Promise<Locator> {
    for (const l of locators) {
      if ((await l.count()) > 0) return l;
    }
    return locators[0];
  }

  private async readCellValue(cell: Locator): Promise<string> {
    await this.wait.waitForElement(cell);

    const link = cell.locator('a').first();
    if ((await link.count()) > 0) return this.normalizeText(await link.innerText());

    const span = cell.locator('span').first();
    if ((await span.count()) > 0) return this.normalizeText(await span.innerText());

    return this.normalizeText(await cell.innerText());
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

  /* -------------------- Checks -------------------- */
  private async verifyLatestFactFindClientNameMatchesKyc(): Promise<void> {
    const kycName = this.getDisplayedKycFullName();

    const section = this.factFindLocators.gatewaySectionByTitle('Fact Find History');
    const table = this.factFindLocators.factFindTableInSection(section);
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

    const section = this.factFindLocators.gatewaySectionByTitle('Fact Find History');
    const table = this.factFindLocators.factFindTableInSection(section);
    await expect(table).toBeVisible({ timeout: 30000 });

    const status = await this.table.getCellTextForRowByHeader(table, kycName, 'Status');
    expect(this.normalizeText(status)).toBe('Complete');
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
