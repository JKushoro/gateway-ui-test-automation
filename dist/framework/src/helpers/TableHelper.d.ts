import { Locator, Page } from '@playwright/test';
import { WaitHelper } from './WaitHelper';
type RowRule = {
    containsText: string | RegExp;
} | {
    getCell: (row: Locator) => Locator;
    textEquals: string;
    caseInsensitive?: boolean;
} | {
    predicate: (row: Locator) => Promise<boolean>;
};
export declare class TableHelper {
    private readonly page;
    private readonly wait;
    constructor(page: Page, wait?: WaitHelper);
    /**
     * Get table rows and ensure at least minRows are present.
     */
    getRows(tableRoot: Locator, rowsSelector?: string, minRows?: number, timeout?: number): Promise<Locator>;
    /**
     * Find the first row index matching a rule (contains text, cell equals, or predicate)
     */
    findRowIndex(rows: Locator, rule: RowRule): Promise<number>;
    /**
     * Click something inside a row by index.
     */
    clickInRow(rows: Locator, rowIndex: number, target: (row: Locator) => Locator): Promise<void>;
    /**
     * Get a cell text by header + row index (text output).
     */
    getCellTextByHeader(tableRoot: Locator, rowIndex: number, headerText: string): Promise<string>;
    /**
     * Get cell text for first row containing rowContains under a specific header.
     */
    getCellTextForRowByHeader(tableRoot: Locator, rowContains: string | RegExp, headerText: string): Promise<string>;
    /**
     * Return a cell Locator by column header name for a given row index.
     * - No hardcoded column indexes in Steps
     */
    getCellByHeader(tableRoot: Locator, headerText: string, rowIndex?: number): Promise<Locator>;
    /**
     * Find the first row that matches ALL provided header/value pairs.
     * Example: { Type: "Core Fact Find", Status: "Open" }
     * - No hardcoded row indexes
     * - No hardcoded column indexes
     */
    findRowIndexByHeaderValues(tableRoot: Locator, pairs: Record<string, string>, caseInsensitive?: boolean): Promise<number>;
    private matchesRow;
    private matchesCell;
    private clean;
    private getHeaderIndex;
    private getCellTextByIndexes;
}
export {};
//# sourceMappingURL=TableHelper.d.ts.map