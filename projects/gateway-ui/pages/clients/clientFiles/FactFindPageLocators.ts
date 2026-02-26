// FactFindPageLocators.ts
import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';

export class FactFindPageLocators extends BasePage {
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  /**
   * Main Fact Find table (page-level)
   */
  public get factFindTable(): Locator {
    return this.page.locator('table.gatewaytable');
  }

  /**
   * Fact Find table scoped to a given Gateway section
   * (e.g. "Fact Find History", "Latest Fact Finds")
   */
  public factFindTableInSection(section: Locator): Locator {
    return section.locator('table.gatewaytable');
  }

  public get factFindHeaderCells(): Locator {
    return this.factFindTable.locator('thead th');
  }

  public get factFindFirstRowCells(): Locator {
    return this.factFindTable.locator('tbody tr').first().locator('td');
  }

  public get launchFactFindButton(): Locator {
    return this.factFindTable
      .locator('tbody tr')
      .first()
      .getByRole('link', { name: /Launch Fact Find/i });
  }

  public checkboxByLabel(labelText: string): Locator {
    return this.page
      .locator(`label:has-text("${labelText}")`)
      .first()
      .locator('xpath=following::input[@type="checkbox"][1]')
      .first();
  }

  /**
   * Gateway section container by title (ibox-based layout)
   */
  public gatewaySectionByTitle(title: string): Locator {
    return this.page
      .locator('div.ibox.float-e-margins')
      .filter({ has: this.page.locator('.ibox-title h5', { hasText: title }) })
      .first();
  }
}
