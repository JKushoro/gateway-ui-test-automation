import { Page } from '@playwright/test';
import { NavBarComponent } from '@pages/componentsLocator/NavBarLocators';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';

/**
 * NavBar Service - Business logic for client details navigation bar interactions
 * Uses NavBarComponent for locators and BasePage for actions
 */
export class NavBarService extends BasePage {
  private readonly component: NavBarComponent;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.component = new NavBarComponent(page);
  }

  /**
   * Click on navigation item by text
   * @param itemText - Navigation item text (e.g., "Fact Find", "Client Details", "AML")
   */
  async clickNavItem(itemText: string): Promise<void> {
    const navItem = this.component.getNavItemByText(itemText);
    await this.action.clickLocator(navItem);

    // Wait for page navigation to complete
    await this.wait.waitForTimeout(1000);
  }


}