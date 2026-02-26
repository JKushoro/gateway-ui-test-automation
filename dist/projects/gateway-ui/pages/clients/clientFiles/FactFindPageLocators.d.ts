import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';
export declare class FactFindPageLocators extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Main Fact Find table (page-level)
     */
    get factFindTable(): Locator;
    /**
     * Fact Find table scoped to a given Gateway section
     * (e.g. "Fact Find History", "Latest Fact Finds")
     */
    factFindTableInSection(section: Locator): Locator;
    get factFindHeaderCells(): Locator;
    get factFindFirstRowCells(): Locator;
    get launchFactFindButton(): Locator;
    checkboxByLabel(labelText: string): Locator;
    /**
     * Gateway section container by title (ibox-based layout)
     */
    gatewaySectionByTitle(title: string): Locator;
}
//# sourceMappingURL=FactFindPageLocators.d.ts.map