import { Page } from '@playwright/test';
import { SideNavComponent } from '@pages/componentsLocator/SideNavLocators';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';

/**
 * SideNav Service - Business logic for side navigation interactions
 * Uses SideNavComponent for locators and BaseSteps for actions
 */
export class SideNavService extends BasePage {
  private readonly component: SideNavComponent;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.component = new SideNavComponent(page);
  }

  /**
   * Click on side menu item by text with optional submenu item
   * @param menuText - Main menu item text (e.g., "Clients", "Administration")
   * @param submenuText - Optional submenu item text (e.g., "Search Clients", "Users")
   */
  async clickSideMenuItem(menuText: string, submenuText?: string): Promise<void> {
    // Click main menu item
    const mainMenuItem = this.component.getSideMenuItemByText(menuText);
    await this.action.clickLocator(mainMenuItem);

    // If submenu item is specified, click it
    if (submenuText) {
      // Wait for submenu to expand and become visible
      const submenuItem = this.component.getSubmenuItemByText(submenuText);
      
      // Wait for the submenu item to be visible (up to 5 seconds)
      await this.wait.waitForElement(submenuItem, 5000);
      
      // Click submenu item
      await this.action.clickLocator(submenuItem);
    }
  }
}
