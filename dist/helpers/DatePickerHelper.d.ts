import { Page } from '@playwright/test';
/**
 * Enhanced DatePickerHelper for handling date picker interactions
 * Supports various date picker libraries and formats
 */
export declare class DatePickerHelper {
    private page;
    private waitHelper;
    private locatorHelper;
    constructor(page: Page);
    /**
     * Get next button locator for React DatePicker
     */
    private getNextButton;
    /**
     * Get previous button locator for React DatePicker
     */
    private getPreviousButton;
    /**
     * Get current month label locator
     */
    private getCurrentMonthLabel;
    /**
     * Get year dropdown locator
     */
    private getYearDropdown;
    /**
     * Get month dropdown locator
     */
    private getMonthDropdown;
    /**
     * Get label by text
     */
    private getLabelByText;
    /**
     * Get input from label
     */
    private getInputFromLabel;
    /**
     * Get day by aria-label
     */
    private getDayByAriaLabel;
    /**
     * Get day by date number
     */
    private getDayByNumber;
    /**
     * Format date to aria-label format
     */
    private formatToAriaLabel;
    /**
     * Parse date string to Date object
     */
    private parseDate;
    /**
     * Format date to display format
     */
    private formatDate;
    /**
     * Select date in React DatePicker
     */
    selectDate(labelText: string, dateStr?: string, options?: {
        inputFormat?: string;
        outputFormat?: string;
        defaultDaysFromToday?: number;
    }): Promise<{
        inputFormat: string;
        confirmFormat: string;
    }>;
    /**
     * Navigate to specific month and year
     */
    private navigateToMonth;
    /**
     * Select date using dropdowns (if available)
     */
    selectDateWithDropdowns(labelText: string, year: number, month: number, // 0-based (0 = January)
    day: number): Promise<void>;
    /**
     * Select date range
     */
    selectDateRange(startLabelText: string, endLabelText: string, startDate?: string, endDate?: string, options?: {
        inputFormat?: string;
        defaultDaysFromToday?: number;
    }): Promise<{
        start: {
            inputFormat: string;
            confirmFormat: string;
        };
        end: {
            inputFormat: string;
            confirmFormat: string;
        };
    }>;
    /**
     * Get selected date from input
     */
    getSelectedDate(labelText: string): Promise<string>;
    /**
     * Clear selected date
     */
    clearDate(labelText: string): Promise<void>;
    /**
     * Check if date picker is open
     */
    isDatePickerOpen(): Promise<boolean>;
    /**
     * Close date picker
     */
    closeDatePicker(): Promise<void>;
    /**
     * Select today's date
     */
    selectToday(labelText: string): Promise<{
        inputFormat: string;
        confirmFormat: string;
    }>;
    /**
     * Select date relative to today
     */
    selectRelativeDate(labelText: string, daysFromToday: number): Promise<{
        inputFormat: string;
        confirmFormat: string;
    }>;
    /**
     * Validate date format
     */
    validateDateFormat(dateStr: string, format?: string): boolean;
    /**
     * Get available dates (non-disabled days)
     */
    getAvailableDates(): Promise<string[]>;
    /**
     * Check if specific date is disabled
     */
    isDateDisabled(date: Date): Promise<boolean>;
}
//# sourceMappingURL=DatePickerHelper.d.ts.map