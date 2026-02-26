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
    getRows(tableRoot: Locator, rowsSelector?: string, minRows?: number, timeout?: number): Promise<Locator>;
    findRowIndex(rows: Locator, rule: RowRule): Promise<number>;
    clickInRow(rows: Locator, rowIndex: number, target: (row: Locator) => Locator): Promise<void>;
    getCellTextByHeader(tableRoot: Locator, rowIndex: number, headerText: string): Promise<string>;
    getCellTextForRowByHeader(tableRoot: Locator, rowContains: string | RegExp, headerText: string): Promise<string>;
    private matchesRow;
    private matchesCell;
    private clean;
    private getHeaderIndex;
    private getCellTextByIndexes;
}
export {};
//# sourceMappingURL=TableHelper.d.ts.map