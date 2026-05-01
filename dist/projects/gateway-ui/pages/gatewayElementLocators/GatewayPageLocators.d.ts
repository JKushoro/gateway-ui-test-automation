import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';
export declare class GatewayPageLocators extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Impersonation banner (top-right user display)
     * Example: <div class="divImpersonation ...">John Kushoro <b class="caret"></b></div>
     */
    get impersonationBanner(): Locator;
    /**
     * Gateway section container by title (ibox-based layout)
     */
    gatewaySectionByTitle(title: string): Locator;
    get factFindHistorySection(): Locator;
    get factFindHistoryHeading(): Locator;
    /**
     * Table inside Fact Find History section
     */
    get factFindHistoryTable(): Locator;
    get factFindHistoryHeaderCells(): Locator;
    get factFindHistoryFirstRow(): Locator;
    get factFindHistoryFirstRowCells(): Locator;
    get addNameButtonFirstRow(): Locator;
    get editNameButtonFirstRow(): Locator;
    get addNoteButtonFirstRow(): Locator;
    get abandonButtonFirstRow(): Locator;
    get launchFactFindLinkFirstRow(): Locator;
    get editNoteButtonFirstRow(): Locator;
    /**
     * Expanded detail row shown under the first Fact Find row.
     */
    get factFindHistoryFirstRowDetail(): Locator;
    /**
     * Note history table inside the expanded first Fact Find row.
     */
    get firstRowNoteHistoryTable(): Locator;
    /**
     * First row in the inner note history table.
     */
    get firstRowNoteHistoryFirstRow(): Locator;
    /**
     * Cells for the first row in the inner note history table.
     */
    get firstRowNoteHistoryFirstRowCells(): Locator;
    checkboxByLabel(labelText: string): Locator;
    get enableNewFactFindCheckbox(): Locator;
    get expandFirstRowDetailsButton(): Locator;
    /**
     * Get link element within a cell
     */
    getCellLink(cell: Locator): Locator;
    /**
     * Get span element within a cell
     */
    getCellSpan(cell: Locator): Locator;
    /**
     * Get the Status cell for the first Fact Find row (column 1)
     */
    getFirstRowStatusCell(): Locator;
    /**
     * Get the Name cell for the first Fact Find row (column 2)
     */
    getFirstRowNameCell(): Locator;
    /**
     * Get the Note cell from the first row of the expanded note history table
     */
    getFirstRowNoteValueCell(): Locator;
}
//# sourceMappingURL=GatewayPageLocators.d.ts.map