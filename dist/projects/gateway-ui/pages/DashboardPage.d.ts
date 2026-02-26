import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { Locator, Page } from '@playwright/test';
/**
 * DashboardPage - Page Object Model for the main dashboard
 * Implements proper OOP principles with clear encapsulation and abstraction
 */
export declare class DashboardPage extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    private readonly sideMenuRoot;
    getSideMenuItemByText(menuText: string): Locator;
    getSubmenuItemByText(submenuText: string): Locator;
}
//# sourceMappingURL=DashboardPage.d.ts.map