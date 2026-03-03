import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
/**
 * SideNav Service - Business logic for side navigation interactions
 * Uses SideNavComponent for locators and BaseSteps for actions
 */
export declare class SideNavService extends BasePage {
    private readonly component;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Click on side menu item by text with optional submenu item
     * @param menuText - Main menu item text (e.g., "Clients", "Administration")
     * @param submenuText - Optional submenu item text (e.g., "Search Clients", "Users")
     */
    clickSideMenuItem(menuText: string, submenuText?: string): Promise<void>;
}
//# sourceMappingURL=SideNav.d.ts.map