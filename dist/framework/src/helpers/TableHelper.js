"use strict";
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
    async getRows(tableRoot, rowsSelector = 'tbody > tr', minRows = 1, timeout = 10000) {
        await this.wait.waitForElement(tableRoot, timeout);
        const rows = tableRoot.locator(rowsSelector);
        await (0, test_1.expect)(rows).toHaveCount(minRows, { timeout });
        return rows;
    }
    async findRowIndex(rows, rule) {
        for (let i = 0, n = await rows.count(); i < n; i++) {
            const row = rows.nth(i);
            if (await this.matchesRow(row, rule))
                return i;
        }
        return -1;
    }
    async clickInRow(rows, rowIndex, target) {
        const el = target(rows.nth(rowIndex));
        await this.wait.waitForElement(el, 10000);
        await el.scrollIntoViewIfNeeded();
        await el.click();
    }
    async getCellTextByHeader(tableRoot, rowIndex, headerText) {
        const rows = await this.getRows(tableRoot);
        const col = await this.getHeaderIndex(tableRoot, headerText);
        return this.getCellTextByIndexes(rows, rowIndex, col);
    }
    async getCellTextForRowByHeader(tableRoot, rowContains, headerText) {
        const rows = await this.getRows(tableRoot);
        const rowIndex = await this.findRowIndex(rows, { containsText: rowContains });
        if (rowIndex < 0)
            throw new Error(`Row not found containing: ${String(rowContains)}`);
        const col = await this.getHeaderIndex(tableRoot, headerText);
        return this.getCellTextByIndexes(rows, rowIndex, col);
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