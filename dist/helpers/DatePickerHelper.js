"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePickerHelper = void 0;
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const WaitHelper_1 = require("./WaitHelper");
const LocatorHelper_1 = require("./LocatorHelper");
/**
 * Enhanced DatePickerHelper for handling date picker interactions
 * Supports various date picker libraries and formats
 */
class DatePickerHelper {
    constructor(page) {
        this.page = page;
        this.waitHelper = new WaitHelper_1.WaitHelper(page);
        this.locatorHelper = new LocatorHelper_1.LocatorHelper(page);
    }
    /**
     * Get next button locator for React DatePicker
     */
    getNextButton() {
        return this.locatorHelper.getLocator('.react-datepicker__navigation--next');
    }
    /**
     * Get previous button locator for React DatePicker
     */
    getPreviousButton() {
        return this.locatorHelper.getLocator('.react-datepicker__navigation--previous');
    }
    /**
     * Get current month label locator
     */
    getCurrentMonthLabel() {
        return this.locatorHelper.getLocator('.react-datepicker__current-month');
    }
    /**
     * Get year dropdown locator
     */
    getYearDropdown() {
        return this.locatorHelper.getLocator('.react-datepicker__year-select');
    }
    /**
     * Get month dropdown locator
     */
    getMonthDropdown() {
        return this.locatorHelper.getLocator('.react-datepicker__month-select');
    }
    /**
     * Get label by text
     */
    getLabelByText(text) {
        return this.locatorHelper.getContainingText('label.form-label', text);
    }
    /**
     * Get input from label
     */
    getInputFromLabel(labelLocator) {
        return labelLocator.locator('..').locator('input[type="text"]');
    }
    /**
     * Get day by aria-label
     */
    getDayByAriaLabel(ariaLabel) {
        return this.locatorHelper.getLocator(`.react-datepicker__day[aria-label="${ariaLabel}"]`);
    }
    /**
     * Get day by date number
     */
    getDayByNumber(dayNumber) {
        return this.locatorHelper.getLocator(`.react-datepicker__day--0${dayNumber.toString().padStart(2, '0')}`);
    }
    /**
     * Format date to aria-label format
     */
    formatToAriaLabel(date) {
        return (0, date_fns_1.format)(date, `'Choose' EEEE, d MMMM yyyy`, { locale: locale_1.enGB });
    }
    /**
     * Parse date string to Date object
     */
    parseDate(dateStr, inputFormat = 'dd/MM/yyyy') {
        return (0, date_fns_1.parse)(dateStr, inputFormat, new Date());
    }
    /**
     * Format date to display format
     */
    formatDate(date, outputFormat = 'dd/MM/yyyy') {
        return (0, date_fns_1.format)(date, outputFormat);
    }
    /**
     * Select date in React DatePicker
     */
    async selectDate(labelText, dateStr, options) {
        let targetDate;
        if (!dateStr) {
            const daysToAdd = options?.defaultDaysFromToday ||
                (labelText.toLowerCase().includes('check in') ? 2 : 4);
            targetDate = (0, date_fns_1.addDays)(new Date(), daysToAdd);
        }
        else {
            targetDate = this.parseDate(dateStr, options?.inputFormat);
        }
        const ariaLabel = this.formatToAriaLabel(targetDate);
        const label = this.getLabelByText(labelText);
        const input = this.getInputFromLabel(label);
        // Click to open date picker
        await input.click();
        await this.waitHelper.waitForVisible('.react-datepicker__month');
        // Navigate to correct month/year
        await this.navigateToMonth(targetDate);
        // Select the day
        const dayToSelect = this.getDayByAriaLabel(ariaLabel);
        await this.waitHelper.waitForElement(dayToSelect);
        await dayToSelect.click();
        return {
            inputFormat: this.formatDate(targetDate, options?.outputFormat || 'dd/MM/yyyy'),
            confirmFormat: this.formatDate(targetDate, 'yyyy-MM-dd'),
        };
    }
    /**
     * Navigate to specific month and year
     */
    async navigateToMonth(targetDate) {
        const maxIterations = 24; // Prevent infinite loops
        for (let i = 0; i < maxIterations; i++) {
            const currentMonthText = await this.getCurrentMonthLabel().textContent();
            const expectedMonth = (0, date_fns_1.format)(targetDate, 'MMMM yyyy');
            if (currentMonthText?.trim() === expectedMonth) {
                break;
            }
            // Determine if we need to go forward or backward
            const currentDate = (0, date_fns_1.parse)(currentMonthText || '', 'MMMM yyyy', new Date());
            const shouldGoForward = targetDate > currentDate;
            if (shouldGoForward) {
                await this.getNextButton().click();
            }
            else {
                await this.getPreviousButton().click();
            }
            // Wait for month to change
            await this.waitHelper.waitForFunction(({ selector, prevMonth }) => {
                const el = document.querySelector(selector);
                return el && el.textContent?.trim() !== prevMonth;
            }, {
                selector: '.react-datepicker__current-month',
                prevMonth: currentMonthText?.trim(),
            });
        }
    }
    /**
     * Select date using dropdowns (if available)
     */
    async selectDateWithDropdowns(labelText, year, month, // 0-based (0 = January)
    day) {
        const label = this.getLabelByText(labelText);
        const input = this.getInputFromLabel(label);
        // Click to open date picker
        await input.click();
        await this.waitHelper.waitForVisible('.react-datepicker__month');
        // Select year if dropdown is available
        const yearDropdown = this.getYearDropdown();
        if (await yearDropdown.isVisible()) {
            await yearDropdown.selectOption({ value: year.toString() });
        }
        // Select month if dropdown is available
        const monthDropdown = this.getMonthDropdown();
        if (await monthDropdown.isVisible()) {
            await monthDropdown.selectOption({ value: month.toString() });
        }
        // Select day
        const dayLocator = this.getDayByNumber(day);
        await this.waitHelper.waitForElement(dayLocator);
        await dayLocator.click();
    }
    /**
     * Select date range
     */
    async selectDateRange(startLabelText, endLabelText, startDate, endDate, options) {
        // Select start date
        const startResult = await this.selectDate(startLabelText, startDate, {
            ...options,
            defaultDaysFromToday: options?.defaultDaysFromToday || 2
        });
        // Select end date
        const endResult = await this.selectDate(endLabelText, endDate, {
            ...options,
            defaultDaysFromToday: options?.defaultDaysFromToday ? options.defaultDaysFromToday + 2 : 4
        });
        return {
            start: startResult,
            end: endResult
        };
    }
    /**
     * Get selected date from input
     */
    async getSelectedDate(labelText) {
        const label = this.getLabelByText(labelText);
        const input = this.getInputFromLabel(label);
        return await input.inputValue();
    }
    /**
     * Clear selected date
     */
    async clearDate(labelText) {
        const label = this.getLabelByText(labelText);
        const input = this.getInputFromLabel(label);
        await input.clear();
    }
    /**
     * Check if date picker is open
     */
    async isDatePickerOpen() {
        const datePicker = this.locatorHelper.getLocator('.react-datepicker');
        return await datePicker.isVisible();
    }
    /**
     * Close date picker
     */
    async closeDatePicker() {
        if (await this.isDatePickerOpen()) {
            await this.page.keyboard.press('Escape');
            await this.waitHelper.waitForHidden('.react-datepicker');
        }
    }
    /**
     * Select today's date
     */
    async selectToday(labelText) {
        const today = new Date();
        return await this.selectDate(labelText, this.formatDate(today));
    }
    /**
     * Select date relative to today
     */
    async selectRelativeDate(labelText, daysFromToday) {
        const targetDate = (0, date_fns_1.addDays)(new Date(), daysFromToday);
        return await this.selectDate(labelText, this.formatDate(targetDate));
    }
    /**
     * Validate date format
     */
    validateDateFormat(dateStr, format = 'dd/MM/yyyy') {
        try {
            const parsed = this.parseDate(dateStr, format);
            return !isNaN(parsed.getTime());
        }
        catch {
            return false;
        }
    }
    /**
     * Get available dates (non-disabled days)
     */
    async getAvailableDates() {
        const availableDays = this.locatorHelper.getLocator('.react-datepicker__day:not(.react-datepicker__day--disabled)');
        const count = await availableDays.count();
        const dates = [];
        for (let i = 0; i < count; i++) {
            const day = availableDays.nth(i);
            const ariaLabel = await day.getAttribute('aria-label');
            if (ariaLabel) {
                dates.push(ariaLabel);
            }
        }
        return dates;
    }
    /**
     * Check if specific date is disabled
     */
    async isDateDisabled(date) {
        const ariaLabel = this.formatToAriaLabel(date);
        const dayLocator = this.getDayByAriaLabel(ariaLabel);
        const disabledClass = await dayLocator.getAttribute('class');
        return disabledClass?.includes('react-datepicker__day--disabled') || false;
    }
}
exports.DatePickerHelper = DatePickerHelper;
//# sourceMappingURL=DatePickerHelper.js.map