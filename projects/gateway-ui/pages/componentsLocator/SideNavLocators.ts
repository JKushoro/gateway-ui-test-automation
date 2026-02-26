import { Locator, Page } from '@playwright/test';

/**
 * Side Navigation Component Locators
 * All selectors for the side navigation menu functionality
 */
export class SideNavComponent {
  constructor(private readonly page: Page) {}

  // Root side menu
  get sideMenuRoot(): Locator {
    return this.page.locator('#side-menu');
  }

  // --- Main Menu Items ---
  getSideMenuItemByText(menuText: string): Locator {
    return this.sideMenuRoot
      .locator(`> li > a.gw-navmenu:has(span.nav-label:has-text("${menuText}"))`)
      .first();
  }

  getSubmenuItemByText(submenuText: string): Locator {
    return this.sideMenuRoot
      .locator(`ul.nav-second-level a.gw-navmenu:has-text("${submenuText}")`)
      .first();
  }
}
