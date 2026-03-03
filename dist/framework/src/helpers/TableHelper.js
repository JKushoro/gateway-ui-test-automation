"use strict";
// // framework/src/helpers/TableHelper.ts
// import { Locator, Page, expect } from '@playwright/test';
// import { WaitHelper } from './WaitHelper';
// import { TextHelper } from './TextHelper';
//
// type RowRule =
//   | { containsText: string | RegExp }
//   | { getCell: (row: Locator) => Locator; textEquals: string; caseInsensitive?: boolean }
//   | { predicate: (row: Locator) => Promise<boolean> };
//
// export class TableHelper {
//   private readonly wait: WaitHelper;
//
//   constructor(
//     private readonly page: Page,
//     wait?: WaitHelper
//   ) {
//     this.wait = wait ?? new WaitHelper(page);
//   }
//
//   async getRows(
//     tableRoot: Locator,
//     rowsSelector = 'tbody > tr',
//     minRows = 1,
//     timeout = 10_000
//   ): Promise<Locator> {
//     await this.wait.waitForElement(tableRoot, timeout);
//     const rows = tableRoot.locator(rowsSelector);
//     await expect(rows).toHaveCount(minRows, { timeout });
//     return rows;
//   }
//
//   async findRowIndex(rows: Locator, rule: RowRule): Promise<number> {
//     for (let i = 0, n = await rows.count(); i < n; i++) {
//       const row = rows.nth(i);
//       if (await this.matchesRow(row, rule)) return i;
//     }
//     return -1;
//   }
//
//   async clickInRow(
//     rows: Locator,
//     rowIndex: number,
//     target: (row: Locator) => Locator
//   ): Promise<void> {
//     const el = target(rows.nth(rowIndex));
//     await this.wait.waitForElement(el, 10_000);
//     await el.scrollIntoViewIfNeeded();
//     await el.click();
//   }
//
//   async getCellTextByHeader(
//     tableRoot: Locator,
//     rowIndex: number,
//     headerText: string
//   ): Promise<string> {
//     const rows = await this.getRows(tableRoot);
//     const col = await this.getHeaderIndex(tableRoot, headerText);
//     return this.getCellTextByIndexes(rows, rowIndex, col);
//   }
//
//   async getCellTextForRowByHeader(
//     tableRoot: Locator,
//     rowContains: string | RegExp,
//     headerText: string
//   ): Promise<string> {
//     const rows = await this.getRows(tableRoot);
//     const rowIndex = await this.findRowIndex(rows, { containsText: rowContains });
//     if (rowIndex < 0) throw new Error(`Row not found containing: ${String(rowContains)}`);
//
//     const col = await this.getHeaderIndex(tableRoot, headerText);
//     return this.getCellTextByIndexes(rows, rowIndex, col);
//   }
//
//   // ----------------- internals -----------------
//
//   private async matchesRow(row: Locator, rule: RowRule): Promise<boolean> {
//     if ('predicate' in rule) return rule.predicate(row);
//     if ('getCell' in rule)
//       return this.matchesCell(rule.getCell(row), rule.textEquals, rule.caseInsensitive);
//
//     const text = this.clean(await TextHelper.getInnerText(row));
//     return typeof rule.containsText === 'string'
//       ? text.toLowerCase().includes(rule.containsText.toLowerCase())
//       : rule.containsText.test(text);
//   }
//
//   private async matchesCell(cell: Locator, want: string, caseInsensitive = true): Promise<boolean> {
//     const actual = this.clean((await cell.textContent()) ?? '');
//     return caseInsensitive ? actual.toLowerCase() === want.toLowerCase() : actual === want;
//   }
//
//   private clean(s: string): string {
//     return s.replace(/\s+/g, ' ').trim();
//   }
//
//   private async getHeaderIndex(tableRoot: Locator, headerText: string): Promise<number> {
//     const headers = tableRoot.locator('thead th');
//     for (let i = 0, n = await headers.count(); i < n; i++) {
//       if (this.clean(await headers.nth(i).innerText()).toLowerCase() === headerText.toLowerCase())
//         return i;
//     }
//     throw new Error(`Table header not found: "${headerText}"`);
//   }
//
//   private async getCellTextByIndexes(
//     rows: Locator,
//     rowIndex: number,
//     columnIndex: number
//   ): Promise<string> {
//     const cell = rows.nth(rowIndex).locator('td').nth(columnIndex);
//     await this.wait.waitForElement(cell, 5_000);
//     return this.clean(await TextHelper.getInnerText(cell));
//   }
//
//   /**
//    * Get cell Locator by header text for a given row index.
//    * (Instance version - avoids hardcoded column indexes in tests)
//    */
//   public async getCellByHeader(
//     tableRoot: Locator,
//     headerText: string,
//     rowIndex: number = 0
//   ): Promise<Locator> {
//     const rows = await this.getRows(tableRoot);
//     const col = await this.getHeaderIndex(tableRoot, headerText);
//     const cell = rows.nth(rowIndex).locator('td').nth(col);
//     await this.wait.waitForElement(cell, 5_000);
//     return cell;
//   }
//
//   /**
//    * Find the first row index where the cell under a header matches the expected value.
//    * - No hardcoded column numbers.
//    * - Matching is whitespace-normalized and case-insensitive by default.
//    */
//   public async findRowIndexByHeaderValue(
//     tableRoot: Locator,
//     headerText: string,
//     expectedValue: string,
//     caseInsensitive: boolean = true
//   ): Promise<number> {
//     const rows = await this.getRows(tableRoot);
//     const col = await this.getHeaderIndex(tableRoot, headerText);
//
//     const want = this.clean(expectedValue);
//     const wantCmp = caseInsensitive ? want.toLowerCase() : want;
//
//     for (let i = 0, n = await rows.count(); i < n; i++) {
//       const cell = rows.nth(i).locator('td').nth(col);
//       const actual = this.clean(await TextHelper.getInnerText(cell));
//       const actualCmp = caseInsensitive ? actual.toLowerCase() : actual;
//
//       if (actualCmp === wantCmp) return i;
//     }
//     return -1;
//   }
//
//   /**
//    * Find the first row that matches ALL provided header/value pairs.
//    * Example: { Type: "Core Fact Find", Status: "Open" }
//    */
//   public async findRowIndexByHeaderValues(
//     tableRoot: Locator,
//     pairs: Record<string, string>,
//     caseInsensitive: boolean = true
//   ): Promise<number> {
//     const rows = await this.getRows(tableRoot);
//
//     // Precompute header indexes once
//     const headerIndexes: Array<[string, number]> = [];
//     for (const [header, value] of Object.entries(pairs)) {
//       const col = await this.getHeaderIndex(tableRoot, header);
//       headerIndexes.push([`${header}:::${value}`, col]);
//     }
//
//     for (let i = 0, n = await rows.count(); i < n; i++) {
//       const row = rows.nth(i);
//
//       let ok = true;
//       for (const [key, col] of headerIndexes) {
//         const [, value] = key.split(':::');
//         const cell = row.locator('td').nth(col);
//
//         const actual = this.clean(await TextHelper.getInnerText(cell));
//         const want = this.clean(value);
//
//         if (caseInsensitive) {
//           if (actual.toLowerCase() !== want.toLowerCase()) {
//             ok = false;
//             break;
//           }
//         } else {
//           if (actual !== want) {
//             ok = false;
//             break;
//           }
//         }
//       }
//
//       if (ok) return i;
//     }
//
//     return -1;
//   }
//
//   /**
//    * Build a header->index map for a table.
//    * Normalises headers to lowercase and single spaces.
//    */
//   public static async getHeaderIndexMap(table: Locator): Promise<Map<string, number>> {
//     const headers = table.locator('thead th');
//     await expect(headers.first()).toBeVisible({ timeout: 15000 });
//
//     const texts = (await headers.allTextContents()).map(t =>
//       TextHelper.normalizeWhitespace(t).toLowerCase()
//     );
//
//     const map = new Map<string, number>();
//     texts.forEach((h, i) => {
//       if (h) map.set(h, i);
//     });
//
//     return map;
//   }
//
//   /**
//    * Return a cell locator by column header name for a given row index (default first row).
//    */
//   public static async getCellByHeader(
//     table: Locator,
//     headerName: string,
//     rowIndex: number = 0
//   ): Promise<Locator> {
//     const map = await this.getHeaderIndexMap(table);
//     const key = TextHelper.normalizeWhitespace(headerName).toLowerCase();
//
//     const idx = map.get(key);
//     if (idx === undefined) {
//       throw new Error(
//         `Header "${headerName}" not found. Available: ${Array.from(map.keys()).join(' | ')}`
//       );
//     }
//
//     const row = table.locator('tbody tr').nth(rowIndex);
//     await expect(row).toBeVisible({ timeout: 15000 });
//
//     return row.locator('td').nth(idx);
//   }
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableHelper = void 0;
// framework/src/helpers/TableHelper.ts
const test_1 = require("@playwright/test");
const WaitHelper_1 = require("./WaitHelper");
const TextHelper_1 = require("./TextHelper");
class TableHelper {
    constructor(page, wait) {
        this.page = page;
        this.wait = wait ?? new WaitHelper_1.WaitHelper(page);
    }
    /**
     * Get table rows and ensure at least minRows are present.
     */
    async getRows(tableRoot, rowsSelector = 'tbody > tr', minRows = 1, timeout = 10000) {
        await this.wait.waitForElement(tableRoot, timeout);
        const rows = tableRoot.locator(rowsSelector);
        await (0, test_1.expect)(rows).toHaveCount(minRows, { timeout });
        return rows;
    }
    /**
     * Find the first row index matching a rule (contains text, cell equals, or predicate)
     */
    async findRowIndex(rows, rule) {
        for (let i = 0, n = await rows.count(); i < n; i++) {
            const row = rows.nth(i);
            if (await this.matchesRow(row, rule))
                return i;
        }
        return -1;
    }
    /**
     * Click something inside a row by index.
     */
    async clickInRow(rows, rowIndex, target) {
        const el = target(rows.nth(rowIndex));
        await this.wait.waitForElement(el, 10000);
        await el.scrollIntoViewIfNeeded();
        await el.click();
    }
    /**
     * Get a cell text by header + row index (text output).
     */
    async getCellTextByHeader(tableRoot, rowIndex, headerText) {
        const rows = await this.getRows(tableRoot);
        const col = await this.getHeaderIndex(tableRoot, headerText);
        return this.getCellTextByIndexes(rows, rowIndex, col);
    }
    /**
     * Get cell text for first row containing rowContains under a specific header.
     */
    async getCellTextForRowByHeader(tableRoot, rowContains, headerText) {
        const rows = await this.getRows(tableRoot);
        const rowIndex = await this.findRowIndex(rows, { containsText: rowContains });
        if (rowIndex < 0)
            throw new Error(`Row not found containing: ${String(rowContains)}`);
        const col = await this.getHeaderIndex(tableRoot, headerText);
        return this.getCellTextByIndexes(rows, rowIndex, col);
    }
    /**
     * Return a cell Locator by column header name for a given row index.
     * - No hardcoded column indexes in Steps
     */
    async getCellByHeader(tableRoot, headerText, rowIndex = 0) {
        const rows = await this.getRows(tableRoot);
        const col = await this.getHeaderIndex(tableRoot, headerText);
        const cell = rows.nth(rowIndex).locator('td').nth(col);
        await this.wait.waitForElement(cell, 5000);
        return cell;
    }
    /**
     * Find the first row that matches ALL provided header/value pairs.
     * Example: { Type: "Core Fact Find", Status: "Open" }
     * - No hardcoded row indexes
     * - No hardcoded column indexes
     */
    async findRowIndexByHeaderValues(tableRoot, pairs, caseInsensitive = true) {
        const rows = await this.getRows(tableRoot);
        // Precompute header indexes once
        const headerCols = [];
        for (const [header, value] of Object.entries(pairs)) {
            const col = await this.getHeaderIndex(tableRoot, header);
            headerCols.push({ header, value, col });
        }
        // Scan rows
        for (let i = 0, n = await rows.count(); i < n; i++) {
            const row = rows.nth(i);
            let ok = true;
            for (const hc of headerCols) {
                const cell = row.locator('td').nth(hc.col);
                const actual = this.clean(await TextHelper_1.TextHelper.getInnerText(cell));
                const want = this.clean(hc.value);
                if (caseInsensitive) {
                    if (actual.toLowerCase() !== want.toLowerCase()) {
                        ok = false;
                        break;
                    }
                }
                else {
                    if (actual !== want) {
                        ok = false;
                        break;
                    }
                }
            }
            if (ok)
                return i;
        }
        return -1;
    }
    // ----------------- internals -----------------
    async matchesRow(row, rule) {
        if ('predicate' in rule)
            return rule.predicate(row);
        if ('getCell' in rule)
            return this.matchesCell(rule.getCell(row), rule.textEquals, rule.caseInsensitive);
        const text = this.clean(await TextHelper_1.TextHelper.getInnerText(row));
        return typeof rule.containsText === 'string'
            ? text.toLowerCase().includes(rule.containsText.toLowerCase())
            : rule.containsText.test(text);
    }
    async matchesCell(cell, want, caseInsensitive = true) {
        const actual = this.clean((await cell.textContent()) ?? '');
        return caseInsensitive ? actual.toLowerCase() === want.toLowerCase() : actual === want;
    }
    clean(s) {
        return s.replace(/\s+/g, ' ').trim();
    }
    async getHeaderIndex(tableRoot, headerText) {
        const headers = tableRoot.locator('thead th');
        for (let i = 0, n = await headers.count(); i < n; i++) {
            if (this.clean(await headers.nth(i).innerText()).toLowerCase() === headerText.toLowerCase())
                return i;
        }
        throw new Error(`Table header not found: "${headerText}"`);
    }
    async getCellTextByIndexes(rows, rowIndex, columnIndex) {
        const cell = rows.nth(rowIndex).locator('td').nth(columnIndex);
        await this.wait.waitForElement(cell, 5000);
        return this.clean(await TextHelper_1.TextHelper.getInnerText(cell));
    }
}
exports.TableHelper = TableHelper;
//# sourceMappingURL=TableHelper.js.map