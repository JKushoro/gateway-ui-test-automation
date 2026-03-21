// GatewayPageLocators.ts
import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';
import { TextHelper } from '@framework/helpers/TextHelper';

export class GatewayPageLocators extends BasePage {
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

  public get editNameButtonFirstRow(): Locator {
    return this.factFindHistoryFirstRow.getByRole('button', { name: /Edit Name/i });
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

  public get editNoteButtonFirstRow(): Locator {
    return this.firstRowNoteHistoryFirstRow.getByRole('button', { name: /Edit Note/i });
  }

  /**
   * Expanded detail row shown under the first Fact Find row.
   */
  public get factFindHistoryFirstRowDetail(): Locator {
    return this.factFindHistoryTable.locator('tbody tr.footable-row-detail').first();
  }

  /**
   * Note history table inside the expanded first Fact Find row.
   */
  public get firstRowNoteHistoryTable(): Locator {
    return this.factFindHistoryFirstRowDetail.locator('table.gatewaytable').first();
  }

  /**
   * First row in the inner note history table.
   */
  public get firstRowNoteHistoryFirstRow(): Locator {
    return this.firstRowNoteHistoryTable.locator('tbody tr').first();
  }

  /**
   * Cells for the first row in the inner note history table.
   */
  public get firstRowNoteHistoryFirstRowCells(): Locator {
    return this.firstRowNoteHistoryFirstRow.locator('td');
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

  get expandFirstRowDetailsButton(): Locator {
    return this.factFindHistoryFirstRow.locator('i.gatewaytable-collapse');
  }

  // ----------------------------------------------------------
  // Cell content locators
  // ----------------------------------------------------------

  /**
   * Get link element within a cell
   */
  public getCellLink(cell: Locator): Locator {
    return cell.locator('a').first();
  }

  /**
   * Get span element within a cell
   */
  public getCellSpan(cell: Locator): Locator {
    return cell.locator('span').first();
  }

  /**
   * Find the first existing locator from a list of locators
   */
  public async firstExisting(...locators: Locator[]): Promise<Locator> {
    for (const l of locators) {
      if ((await l.count()) > 0) return l;
    }
    // Return first locator if none exist (for consistency)
    if (locators.length === 0) {
      throw new Error('No locators provided to firstExisting method');
    }
    return locators[0]!; // Non-null assertion since we checked length above
  }

  /**
   * Read cell value handling different element types (links, spans, text)
   */
  public async readCellValue(cell: Locator): Promise<string> {
    await this.wait.waitForElement(cell);

    const link = this.getCellLink(cell);
    if ((await link.count()) > 0) return TextHelper.normalizeWhitespace(await link.innerText());

    const span = this.getCellSpan(cell);
    if ((await span.count()) > 0) return TextHelper.normalizeWhitespace(await span.innerText());

    return TextHelper.normalizeWhitespace(await cell.innerText());
  }
}