// projects/gateway-ui/steps/clients/ClientsSearchSteps.ts
import { BasePage } from '@framework/core/BasePage';
import { Page, expect } from '@playwright/test';
import { FormsService, GatewaySearchFormData } from '@steps/components/Forms';
import { SideNavService } from '@steps/components/SideNav';
import { FrameworkConfig } from '@framework/types';
import { SearchClientPage } from '@pages/clients/SearchClientsPageLocators';
import { dataStore } from '@framework/utils/DataStore';
import { TextHelper } from '@framework/helpers/TextHelper';

export class ClientsSearchSteps extends BasePage {
  public readonly forms: FormsService;
  private readonly searchClientPage: SearchClientPage;
  public readonly sideNav: SideNavService;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.forms = new FormsService(page);
    this.searchClientPage = new SearchClientPage(page);
    this.sideNav = new SideNavService(page);
  }

  public async verifySearchClientPage(): Promise<void> {
    await this.wait.waitForUrlToMatch('**/clientfiles/searchclients');
    await expect(this.page).toHaveTitle('Gateway | Search Clients');
  }

  async searchClients(): Promise<void> {
    //await this.action.clickLocator(this.searchClientPage.searchClientButton);
    await this.action.clickButtonByText('Search clients', false);
  }

  async searchForStoredClient(
    searchData: GatewaySearchFormData = {},
    dataPrefix: string = 'gateway.formData'
  ): Promise<GatewaySearchFormData> {
    await this.sideNav.clickSideMenuItem('Clients', 'Search Clients');
    await this.verifySearchClientPage();
    const used = await this.forms.searchMinimalForm(searchData, dataPrefix);
    await this.searchClients();
    return used;
  }

  // --- Generic result row clickers using TableHelper ---

  async clickCompanyRowByExactName(dataPrefix: string = 'formData'): Promise<boolean> {
    const expected = dataStore.getValue(`${dataPrefix}.companyName`);
    if (!expected) throw new Error(`No companyName in DataStore at ${dataPrefix}.companyName`);

    const rows = await this.table.getRows(this.searchClientPage.clientsTable);
    const idx = await this.table.findRowIndex(rows, {
      getCell: (row) => this.searchClientPage.getCompanyNameFromRow(row),
      textEquals: expected
    });

    if (idx < 0) return false;

    await this.table.clickInRow(rows, idx, (row) => this.searchClientPage.getViewClientButtonFromRow(row));
    await this.wait.waitForUrlToMatch('**/clientfiles/details/**');
    return true;
  }

  async clickIndividualRowByName(dataPrefix: string = 'clientData.complete'): Promise<boolean> {
    const client = dataStore.getValue(dataPrefix);
    if (!client?.forename || !client?.surname) {
      throw new Error(`No forename/surname in DataStore at ${dataPrefix}`);
    }

    const rows = await this.table.getRows(this.searchClientPage.clientsTable);
    const idx = await this.table.findRowIndex(rows, {
      predicate: async (row) => {
        const cell = this.searchClientPage.getCompanyNameFromRow(row);
        const full = await cell.textContent() ?? '';
        return TextHelper.nameContains(full, client.forename, client.surname);
      }
    });

    if (idx < 0) return false;

    await this.table.clickInRow(rows, idx, (row) => this.searchClientPage.getViewClientButtonFromRow(row));
    await this.wait.waitForUrlToMatch('**/clientfiles/details/**');
    return true;
  }

  // --- High-level flows (unchanged signatures, simplified internals) ---

  async searchAndVerifyStoredClient(
    searchData: GatewaySearchFormData = {},
    dataPrefix: string = 'gateway.formData'
  ): Promise<{ searchData: GatewaySearchFormData; clientFound: boolean; }> {
    const used = await this.searchForStoredClient(searchData, dataPrefix);
    const found = await this.clickCompanyRowByExactName(dataPrefix);
    return { searchData: used, clientFound: found };
  }

  async searchAndVerifyStoredIndividualClient(
    searchData: GatewaySearchFormData = {},
    dataPrefix: string = 'gateway.clientData.complete'
  ): Promise<{ searchData: GatewaySearchFormData; clientFound: boolean; }> {
    const stored = dataStore.getValue(dataPrefix);
    if (!stored?.forename || !stored?.surname) {
      throw new Error(`No individual client data found at ${dataPrefix}`);
    }

    // If currently on details page, bounce to dashboard (kept from your original)
    if (this.page.url().includes('/clientfiles/details/')) {
      const baseUrl = this.page.url().split('/clientfiles')[0];
      await this.page.goto(`${baseUrl}/dashboard/developmentdash`);
      await this.wait.waitForTimeout(500); // shorter & consistent
    }

    await this.sideNav.clickSideMenuItem('Clients', 'Search Clients');
    await this.verifySearchClientPage();

    const used = await this.forms.searchMinimalForm({
      forename: stored.forename,
      surname: stored.surname,
      ...searchData
    });

    await this.searchClients();

    const found = await this.clickIndividualRowByName(dataPrefix);
    return { searchData: used, clientFound: found };
  }

  async executeSearchAndVerifyStoredClient(): Promise<void> {
    const result = await this.searchAndVerifyStoredClient();
    if (!result.clientFound) {
      throw new Error('Client verification failed - stored company name not found in results');
    }
  }

  async executeSearchAndVerifyStoredIndividualClient(): Promise<void> {
    const result = await this.searchAndVerifyStoredIndividualClient();
    if (!result.clientFound) {
      throw new Error('Individual client verification failed - stored name not found in results');
    }
  }
}
