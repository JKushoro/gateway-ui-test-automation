import { Locator, Page } from '@playwright/test';
/**
 * NavBar Component Locators
 * All selectors for the client details navigation bar functionality
 */
export declare class NavBarComponent {
    private readonly page;
    constructor(page: Page);
    get navBarRoot(): Locator;
    get navList(): Locator;
    /**
     * Get navigation item by text content
     * @param itemText - The text content of the navigation item (e.g., "Fact Find", "Client Details")
     */
    getNavItemByText(itemText: string): Locator;
}
//# sourceMappingURL=NavBarLocators.d.ts.map