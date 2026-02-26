"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYCDatePickerService = void 0;
// ==============================
// KYCDatePickerService.ts (FULL)
// ==============================
const test_1 = require("@playwright/test");
const BasePage_1 = require("@framework/core/BasePage");
const KYCDatePickerLocators_1 = require("@pages/componentsLocator/KYCDatePickerLocators");
const Logger_1 = require("@framework/utils/Logger");
class KYCDatePickerService extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.logger = (0, Logger_1.createLogger)('KYCDatePicker');
    }
    // =====================================================
    // Generators (DD/MM/YYYY)
    // =====================================================
    generateRandomPastDate(minYearsAgo, maxYearsAgo) {
        this.assertValidRange(minYearsAgo, maxYearsAgo, 'minYearsAgo', 'maxYearsAgo');
        const now = new Date();
        const yearsAgo = this.randomInt(minYearsAgo, maxYearsAgo);
        const year = now.getFullYear() - yearsAgo;
        const month = this.randomInt(1, 12);
        const day = this.randomInt(1, 28); // safe
        return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }
    generateRandomFutureDate(minYearsAhead, maxYearsAhead) {
        this.assertValidRange(minYearsAhead, maxYearsAhead, 'minYearsAhead', 'maxYearsAhead');
        const now = new Date();
        const yearsAhead = this.randomInt(minYearsAhead, maxYearsAhead);
        const year = now.getFullYear() + yearsAhead;
        const month = this.randomInt(1, 12);
        const day = this.randomInt(1, 28); // safe
        return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }
    // =====================================================
    // Set (DD/MM/YYYY) - dropdown based picker
    // =====================================================
    async setDateByLabel(labelText, date) {
        const input = await this.tryFindInputByLabel(labelText);
        if (!input)
            throw new Error(`Date input not found by label "${labelText}"`);
        await this.setDateIntoInput(input, date);
    }
    async setDateByLabelOrFallback(labelText, fallback, date) {
        const byLabel = await this.tryFindInputByLabel(labelText);
        if (!byLabel) {
            this.logger.warn(`Date input not found by label "${labelText}" — using fallback`);
        }
        const input = byLabel ?? (typeof fallback === 'string' ? this.page.locator(fallback) : fallback);
        await (0, test_1.expect)(input, `Date input "${labelText}" should be visible`).toBeVisible();
        await this.setDateIntoInput(input, date);
    }
    parseDDMMYYYY(date) {
        const [dd, mm, yyyy] = date.split('/');
        const day = Number(dd);
        const month0 = Number(mm) - 1;
        const year = Number(yyyy);
        if (!Number.isFinite(day) || !Number.isFinite(month0) || !Number.isFinite(year)) {
            throw new Error(`Invalid date "${date}" (expected DD/MM/YYYY)`);
        }
        if (day < 1 || day > 31)
            throw new Error(`Invalid day "${day}" in "${date}"`);
        if (month0 < 0 || month0 > 11)
            throw new Error(`Invalid month "${month0 + 1}" in "${date}"`);
        if (year < 1900 || year > 3000)
            throw new Error(`Invalid year "${year}" in "${date}"`);
        return { day, month0, year };
    }
    async setDateIntoInput(input, date) {
        const { day, month0, year } = this.parseDDMMYYYY(date);
        await this.openPicker(input);
        await this.selectYear(year);
        await this.selectMonth(month0);
        await this.selectDay(day);
    }
    async openPicker(input) {
        try {
            await input.click();
        }
        catch {
            await input.click({ force: true });
        }
        await this.wait.waitForVisible(KYCDatePickerLocators_1.KYCDatePickerLocators.DATE_PICKER_CONTAINER, 5000);
    }
    async selectYear(year) {
        const sel = this.page.locator(KYCDatePickerLocators_1.KYCDatePickerLocators.YEAR_DROPDOWN);
        await this.wait.waitForElement(sel);
        try {
            await sel.selectOption(year.toString());
        }
        catch {
            await this.action.selectDropdownOptionByJS(KYCDatePickerLocators_1.KYCDatePickerLocators.YEAR_DROPDOWN, year.toString());
        }
        const selected = await this.action.getSelectedDropdownText(KYCDatePickerLocators_1.KYCDatePickerLocators.YEAR_DROPDOWN);
        (0, test_1.expect)(selected?.includes(year.toString())).toBeTruthy();
    }
    async selectMonth(month0) {
        const sel = this.page.locator(KYCDatePickerLocators_1.KYCDatePickerLocators.MONTH_DROPDOWN);
        await this.wait.waitForElement(sel);
        try {
            await sel.selectOption(month0.toString());
        }
        catch {
            await this.action.selectDropdownOptionByJS(KYCDatePickerLocators_1.KYCDatePickerLocators.MONTH_DROPDOWN, month0.toString());
        }
        await (0, test_1.expect)(sel).toHaveValue(month0.toString());
    }
    async selectDay(day) {
        const dayLoc = this.page.locator(KYCDatePickerLocators_1.KYCDatePickerLocators.DAY_OPTION(day));
        await this.wait.waitForElement(dayLoc, 5000);
        await dayLoc.click();
    }
    async tryFindInputByLabel(labelText) {
        try {
            return await this.action.findInputFieldByLabel(labelText);
        }
        catch (e) {
            this.logger.debug?.(`findInputFieldByLabel failed for "${labelText}": ${String(e)}`);
            return null;
        }
    }
    // =====================================================
    // Month/Year picker (MM/YYYY) - generator driven (NO HARD CODE)
    // =====================================================
    /**
     * Generates {month, year, value} where value is "MM/YYYY"
     */
    generateRandomFutureMonthYear(minYearsAhead, maxYearsAhead) {
        this.assertValidRange(minYearsAhead, maxYearsAhead, 'minYearsAhead', 'maxYearsAhead');
        const now = new Date();
        const yearMin = now.getFullYear() + minYearsAhead;
        const yearMax = now.getFullYear() + maxYearsAhead;
        const year = this.randomInt(yearMin, yearMax);
        const month = this.randomInt(1, 12);
        return { month, year, value: `${String(month).padStart(2, '0')}/${year}` };
    }
    /**
     * One-liner helper for tests/steps.
     * - Generates month/year dynamically
     * - Selects them in the month/year picker
     * - Returns "MM/YYYY"
     */
    async pickRandomFutureMonthYear(input, minYearsAhead, maxYearsAhead) {
        const { month, year, value } = this.generateRandomFutureMonthYear(minYearsAhead, maxYearsAhead);
        await this.setMonthYearIntoInput(input, month, year);
        return value;
    }
    /**
     * Selects a specific month/year (numbers only).
     * - month: 1-12
     * - year: YYYY
     * Returns "MM/YYYY"
     */
    async setMonthYearIntoInput(input, month, year) {
        if (month < 1 || month > 12)
            throw new Error(`Invalid month "${month}" (expected 1-12)`);
        if (year < 1900 || year > 3000)
            throw new Error(`Invalid year "${year}"`);
        const dialog = await this.openMonthYearPicker(input);
        const yearHeader = dialog.locator(KYCDatePickerLocators_1.KYCDatePickerLocators.YEAR_HEADER).first();
        await this.wait.waitForElement(yearHeader, 5000);
        // Prefer role-based buttons (more resilient)
        const prevYear = dialog.getByRole('button', { name: /previous year/i }).first();
        const nextYear = dialog.getByRole('button', { name: /next year/i }).first();
        // Fallback: if role-based buttons fail (rare), use CSS from locators
        const prevFallback = dialog.locator(KYCDatePickerLocators_1.KYCDatePickerLocators.PREVIOUS_YEAR_BUTTON).first();
        const nextFallback = dialog.locator(KYCDatePickerLocators_1.KYCDatePickerLocators.NEXT_YEAR_BUTTON).first();
        const clickPrev = async () => {
            if ((await prevYear.count()) > 0)
                return prevYear.click();
            return prevFallback.click();
        };
        const clickNext = async () => {
            if ((await nextYear.count()) > 0)
                return nextYear.click();
            return nextFallback.click();
        };
        const maxSteps = 40;
        for (let i = 0; i < maxSteps; i++) {
            const currentText = (await yearHeader.textContent())?.trim() ?? '';
            const currentYear = Number(currentText.replace(/[^\d]/g, ''));
            if (Number.isFinite(currentYear) && currentYear === year)
                break;
            if (!Number.isFinite(currentYear)) {
                await clickNext();
            }
            else if (currentYear < year) {
                await clickNext();
            }
            else {
                await clickPrev();
            }
            await this.page.waitForTimeout(50);
        }
        const finalText = (await yearHeader.textContent())?.trim() ?? '';
        const finalYear = Number(finalText.replace(/[^\d]/g, ''));
        if (!Number.isFinite(finalYear) || finalYear !== year) {
            throw new Error(`Failed to navigate to year ${year}. Current year header is "${finalText}"`);
        }
        // Build option locator dynamically (NO hard-coded month name/year)
        const monthName = this.monthName(month);
        const optionCss = KYCDatePickerLocators_1.KYCDatePickerLocators.MONTH_YEAR_OPTION(monthName, year);
        // Prefer role-based option by name, fallback to CSS
        const roleOption = dialog.getByRole('option', { name: `Choose ${monthName} ${year}` }).first();
        const cssOption = dialog.locator(optionCss).first();
        if ((await roleOption.count()) > 0) {
            await this.wait.waitForElement(roleOption, 5000);
            await roleOption.click();
        }
        else {
            await this.wait.waitForElement(cssOption, 5000);
            await cssOption.click();
        }
        const value = `${String(month).padStart(2, '0')}/${year}`;
        await input.blur();
        await (0, test_1.expect)(input).toHaveValue(value, { timeout: 5000 });
        return value;
    }
    async openMonthYearPicker(input) {
        try {
            await input.click();
        }
        catch {
            await input.click({ force: true });
        }
        const dialog = this.page.locator(KYCDatePickerLocators_1.KYCDatePickerLocators.MONTH_YEAR_DIALOG).first();
        await this.wait.waitForElement(dialog, 5000);
        return dialog;
    }
    monthName(month) {
        const names = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        return names[month - 1];
    }
    // =====================================================
    // Helpers
    // =====================================================
    assertValidRange(min, max, minName, maxName) {
        if (min < 0 || max < 0)
            throw new Error(`Invalid year range: ${minName}/${maxName} must be >= 0`);
        if (min > max)
            throw new Error(`Invalid year range: ${minName} (${min}) > ${maxName} (${max})`);
    }
    randomInt(min, max) {
        // inclusive min/max
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
exports.KYCDatePickerService = KYCDatePickerService;
//# sourceMappingURL=KYCDatePickerService.js.map