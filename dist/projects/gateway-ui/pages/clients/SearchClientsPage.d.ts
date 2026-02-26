import { Locator, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
export declare class SearchClientPage extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    private readonly searchClientButtonLocator;
    private readonly clientsTableLocator;
    private readonly tableRowsLocator;
    get searchClientButton(): Locator;
    get clientsTable(): Locator;
    get tableRows(): Locator;
    /**
     * Get company name from a specific table row
     */
    getCompanyNameFromRow(row: Locator): Locator;
    /**
     * Get view client button from a specific table row
     */
    getViewClientButtonFromRow(row: Locator): Locator;
}
//# sourceMappingURL=SearchClientsPage.d.ts.map