import { Page, Locator } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
type GetField = () => Locator;
/** Centralised date formatting + robust Bootstrap-style datepicker interactions (DD/MM/YYYY). */
export declare class DatePickerService extends BasePage {
    private readonly component;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /** Format a Date to DD/MM/YYYY */
    formatDate(date: Date): string;
    /** Generate a random DOB between minAge and maxAge (inclusive). Defaults to 20–60 years. */
    generateRandomDOB(minAge?: number, maxAge?: number): string;
    /** Set today's date on a date field. Returns the DD/MM/YYYY used. */
    setToday(getDateField: GetField): Promise<string>;
    /** Set a specific date (DD/MM/YYYY). If omitted, sets today. Returns the DD/MM/YYYY used. */
    setDate(getDateField: GetField, dateString?: string): Promise<string>;
    /** Alias for clarity at call-sites when setting DoB. */
    selectDOB(getDateField: GetField, dobString: string): Promise<void>;
    /** Click the field and wait for the popup to be visible. */
    private openPopup;
    /** Navigate and select DD/MM/YYYY in popup (robust to current view). */
    private selectDateInPopup;
    /** Ensure we are in the years view (click switch up to twice if needed). */
    private ensureYearsView;
    /** Navigate the years view so that targetYear is within the visible range. */
    private navigateToYearRange;
    private assertDdMmYyyy;
    /** Quick sanity check for day/month bounds to catch typos early. */
    private assertValidDayMonth;
}
export {};
//# sourceMappingURL=DatePicker.d.ts.map