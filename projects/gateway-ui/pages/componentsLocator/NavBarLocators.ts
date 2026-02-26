import { Locator, Page } from '@playwright/test';

/**
 * NavBar Component Locators
 * All selectors for the client details navigation bar functionality
 */
export class NavBarComponent {
  constructor(private readonly page: Page) {}

  // Root navbar
  get navBarRoot(): Locator {
    return this.page.locator('nav.navbar.navbar-default.gatewaynavbar');
  }

  // Navigation list
  get navList(): Locator {
    return this.navBarRoot.locator('ul.nav.navbar-nav');
  }

  // --- Navigation Items ---
  /**
   * Get navigation item by text content
   * @param itemText - The text content of the navigation item (e.g., "Fact Find", "Client Details")
   */
  getNavItemByText(itemText: string): Locator {
    return this.navList.locator(`li a:has-text("${itemText}")`).first();
  }
}