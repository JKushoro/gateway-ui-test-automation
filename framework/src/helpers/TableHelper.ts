// framework/src/helpers/TableHelper.ts
import { Locator, Page, expect } from '@playwright/test';
import { WaitHelper } from './WaitHelper';
import { TextHelper } from './TextHelper';

type RowRule =
  | { containsText: string | RegExp }
  | { getCell: (row: Locator) => Locator; textEquals: string; caseInsensitive?: boolean }
  | { predicate: (row: Locator) => Promise<boolean> };

export class TableHelper {
  private readonly wait: WaitHelper;

  constructor(private readonly page: Page, wait?: WaitHelper) {
    this.wait = wait ?? new WaitHelper(page);
  }

  async getRows(
    tableRoot: Locator,
    rowsSelector = 'tbody > tr',
    minRows = 1,
    timeout = 10_000
  ): Promise<Locator> {
    await this.wait.waitForElement(tableRoot, timeout);
    const rows = tableRoot.locator(rowsSelector);
    await expect(rows).toHaveCount(minRows, { timeout });
    return rows;
  }

  async findRowIndex(rows: Locator, rule: RowRule): Promise<number> {
    for (let i = 0, n = await rows.count(); i < n; i++) {
      const row = rows.nth(i);
      if (await this.matchesRow(row, rule)) return i;
    }
    return -1;
  }

  async clickInRow(rows: Locator, rowIndex: number, target: (row: Locator) => Locator): Promise<void> {
    const el = target(rows.nth(rowIndex));
    await this.wait.waitForElement(el, 10_000);
    await el.scrollIntoViewIfNeeded();
    await el.click();
  }

  async getCellTextByHeader(tableRoot: Locator, rowIndex: number, headerText: string): Promise<string> {
    const rows = await this.getRows(tableRoot);
    const col = await this.getHeaderIndex(tableRoot, headerText);
    return this.getCellTextByIndexes(rows, rowIndex, col);
  }

  async getCellTextForRowByHeader(
    tableRoot: Locator,
    rowContains: string | RegExp,
    headerText: string
  ): Promise<string> {
    const rows = await this.getRows(tableRoot);
    const rowIndex = await this.findRowIndex(rows, { containsText: rowContains });
    if (rowIndex < 0) throw new Error(`Row not found containing: ${String(rowContains)}`);

    const col = await this.getHeaderIndex(tableRoot, headerText);
    return this.getCellTextByIndexes(rows, rowIndex, col);
  }

  // ----------------- internals -----------------

  private async matchesRow(row: Locator, rule: RowRule): Promise<boolean> {
    if ('predicate' in rule) return rule.predicate(row);
    if ('getCell' in rule) return this.matchesCell(rule.getCell(row), rule.textEquals, rule.caseInsensitive);

    const text = this.clean(await TextHelper.getInnerText(row));
    return typeof rule.containsText === 'string'
      ? text.toLowerCase().includes(rule.containsText.toLowerCase())
      : rule.containsText.test(text);
  }

  private async matchesCell(cell: Locator, want: string, caseInsensitive = true): Promise<boolean> {
    const actual = this.clean((await cell.textContent()) ?? '');
    return caseInsensitive ? actual.toLowerCase() === want.toLowerCase() : actual === want;
  }

  private clean(s: string): string {
    return s.replace(/\s+/g, ' ').trim();
  }

  private async getHeaderIndex(tableRoot: Locator, headerText: string): Promise<number> {
    const headers = tableRoot.locator('thead th');
    for (let i = 0, n = await headers.count(); i < n; i++) {
      if (this.clean(await headers.nth(i).innerText()).toLowerCase() === headerText.toLowerCase()) return i;
    }
    throw new Error(`Table header not found: "${headerText}"`);
  }

  private async getCellTextByIndexes(rows: Locator, rowIndex: number, columnIndex: number): Promise<string> {
    const cell = rows.nth(rowIndex).locator('td').nth(columnIndex);
    await this.wait.waitForElement(cell, 5_000);
    return this.clean(await TextHelper.getInnerText(cell));
  }
}
