// FactFindPageLocators.ts
import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';

export class FactFindPageLocators extends BasePage {
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  // ----------------------------------------------------------
  // Global / shared areas
  // ----------------------------------------------------------

  /**
   * Impersonation banner (top-right user display)
   * Example: <div class="divImpersonation ...">John Kushoro <b class="caret"></b></div>
   */
  public get impersonationBanner(): Locator {
    return this.page.locator('div.divImpersonation').first();
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

  // ----------------------------------------------------------
  // Fact Find History section
  // ----------------------------------------------------------

  public get factFindHistorySection(): Locator {
    return this.gatewaySectionByTitle('Fact Find History');
  }

  public get factFindHistoryHeading(): Locator {
    return this.factFindHistorySection.locator('.ibox-title h5', { hasText: 'Fact Find History' });
  }

  /**
   * Table inside Fact Find History section
   */
  public get factFindHistoryTable(): Locator {
    return this.factFindHistorySection.locator('table.gatewaytable').first();
  }

  public get factFindHistoryHeaderCells(): Locator {
    return this.factFindHistoryTable.locator('thead th');
  }

  public get factFindHistoryFirstRow(): Locator {
    return this.factFindHistoryTable.locator('tbody tr').first();
  }

  public get factFindHistoryFirstRowCells(): Locator {
    return this.factFindHistoryFirstRow.locator('td');
  }

  // First-row action buttons/links
  public get addNameButtonFirstRow(): Locator {
    return this.factFindHistoryFirstRow.getByRole('button', { name: /Add Name/i });
  }

  public get addNoteButtonFirstRow(): Locator {
    return this.factFindHistoryFirstRow.getByRole('button', { name: /Add Note/i });
  }

  public get abandonButtonFirstRow(): Locator {
    return this.factFindHistoryFirstRow.getByRole('button', { name: /Abandon/i });
  }

  public get launchFactFindLinkFirstRow(): Locator {
    return this.factFindHistoryFirstRow.getByRole('link', { name: /Launch Fact Find/i });
  }

  // ----------------------------------------------------------
  // Create Fact Find controls (page-level)
  // ----------------------------------------------------------

  public checkboxByLabel(labelText: string): Locator {
    return this.page
      .locator(`label:has-text("${labelText}")`)
      .first()
      .locator('xpath=following::input[@type="checkbox"][1]')
      .first();
  }

  public get enableNewFactFindCheckbox(): Locator {
    return this.checkboxByLabel('Enable new fact find for this client');
  }
}