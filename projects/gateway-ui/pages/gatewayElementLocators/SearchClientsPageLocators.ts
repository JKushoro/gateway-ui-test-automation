import { Locator, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';

export class SearchClientPage extends BasePage {
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  // Private locators
  private readonly searchClientButtonLocator = this.page.getByRole('button', {
    name: 'Search clients',
  });
  private readonly clientsTableLocator = this.page.locator('table.gatewaytable');
  private readonly tableRowsLocator = this.clientsTableLocator.locator('tbody tr');

  // Public getters
  get searchClientButton(): Locator {
    return this.searchClientButtonLocator;
  }

  get clientsTable(): Locator {
    return this.clientsTableLocator;
  }

  get tableRows(): Locator {
    return this.tableRowsLocator;
  }

  /**
   * Get company name from a specific table row
   */
  getCompanyNameFromRow(row: Locator): Locator {
    return row.locator('td:first-child .gateway-icontext span');
  }

  /**
   * Get view client button from a specific table row
   */
  getViewClientButtonFromRow(row: Locator): Locator {
    return row.locator('a[href*="/clientfiles/details/"]');
  }
}
