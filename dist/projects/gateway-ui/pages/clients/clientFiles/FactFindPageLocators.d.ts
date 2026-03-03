import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';
export declare class FactFindPageLocators extends BasePage {
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
    get addNoteButtonFirstRow(): Locator;
    get abandonButtonFirstRow(): Locator;
    get launchFactFindLinkFirstRow(): Locator;
    checkboxByLabel(labelText: string): Locator;
    get enableNewFactFindCheckbox(): Locator;
    get chooseFactFindTypeDropdown(): Locator;
    get createFactFindButton(): Locator;
    get confirmAndMigrateLink(): Locator;
}
//# sourceMappingURL=FactFindPageLocators.d.ts.map