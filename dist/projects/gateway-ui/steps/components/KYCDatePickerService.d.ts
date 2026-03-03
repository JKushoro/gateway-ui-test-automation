import { Locator, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
export declare class KYCDatePickerService extends BasePage {
    protected logger: import("@framework/utils/Logger").Logger;
    constructor(page: Page);
    generateRandomPastDate(minYearsAgo: number, maxYearsAgo: number): string;
    generateRandomFutureDate(minYearsAhead: number, maxYearsAhead: number): string;
    setDateByLabel(labelText: string, date: string): Promise<void>;
    setDateByLabelOrFallback(labelText: string, fallback: string | Locator, date: string): Promise<void>;
    private parseDDMMYYYY;
    private setDateIntoInput;
    private openPicker;
    private selectYear;
    private selectMonth;
    private selectDay;
    private tryFindInputByLabel;
    /**
     * Generates {month, year, value} where value is "MM/YYYY"
     */
    generateRandomFutureMonthYear(minYearsAhead: number, maxYearsAhead: number): {
        month: number;
        year: number;
        value: string;
    };
    /**
     * One-liner helper for tests/steps.
     * - Generates month/year dynamically
     * - Selects them in the month/year picker
     * - Returns "MM/YYYY"
     */
    pickRandomFutureMonthYear(input: Locator, minYearsAhead: number, maxYearsAhead: number): Promise<string>;
    /**
     * Selects a specific month/year (numbers only).
     * - month: 1-12
     * - year: YYYY
     * Returns "MM/YYYY"
     */
    setMonthYearIntoInput(input: Locator, month: number, year: number): Promise<string>;
    private openMonthYearPicker;
    private monthName;
    private assertValidRange;
    private randomInt;
}
//# sourceMappingURL=KYCDatePickerService.d.ts.map