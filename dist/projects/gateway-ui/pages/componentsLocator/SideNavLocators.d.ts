import { Locator, Page } from '@playwright/test';
/**
 * Side Navigation Component Locators
 * All selectors for the side navigation menu functionality
 */
export declare class SideNavComponent {
    private readonly page;
    constructor(page: Page);
    get sideMenuRoot(): Locator;
    getSideMenuItemByText(menuText: string): Locator;
    getSubmenuItemByText(submenuText: string): Locator;
}
//# sourceMappingURL=SideNavLocators.d.ts.map