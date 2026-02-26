import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
/**
 * NavBar Service - Business logic for client details navigation bar interactions
 * Uses NavBarComponent for locators and BasePage for actions
 */
export declare class NavBarService extends BasePage {
    private readonly component;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Click on navigation item by text
     * @param itemText - Navigation item text (e.g., "Fact Find", "Client Details", "AML")
     */
    clickNavItem(itemText: string): Promise<void>;
}
//# sourceMappingURL=NavBar.d.ts.map