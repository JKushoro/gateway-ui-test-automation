"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePickerService = void 0;
const DatePickerLocators_1 = require("@pages/componentsLocator/DatePickerLocators");
const BasePage_1 = require("@framework/core/BasePage");
const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/;
/** Centralised date formatting + robust Bootstrap-style datepicker interactions (DD/MM/YYYY). */
class DatePickerService extends BasePage_1.BasePage {
    constructor(page, config) {
        super(page, config);
        this.component = new DatePickerLocators_1.DatePickerComponent(page);
    }
    // ---------- Public utilities ----------
    /** Format a Date to DD/MM/YYYY */
    formatDate(date) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = String(date.getFullYear());
        return `${dd}/${mm}/${yyyy}`;
    }
    /** Generate a random DOB between minAge and maxAge (inclusive). Defaults to 20–60 years. */
    generateRandomDOB(minAge = 20, maxAge = 60) {
        const today = new Date();
        const birthYear = today.getFullYear() - (minAge + Math.floor(Math.random() * (maxAge - minAge + 1)));
        const month = Math.floor(Math.random() * 12); // 0–11
        const daysInMonth = new Date(birthYear, month + 1, 0).getDate();
        const day = Math.floor(Math.random() * daysInMonth) + 1;
        return this.formatDate(new Date(birthYear, month, day));
    }
    /** Set today's date on a date field. Returns the DD/MM/YYYY used. */
    async setToday(getDateField) {
        const dateString = this.formatDate(new Date());
        await this.openPopup(getDateField);
        await this.action.clickLocator(this.component.todayDay);
        return dateString;
    }
    /** Set a specific date (DD/MM/YYYY). If omitted, sets today. Returns the DD/MM/YYYY used. */
    async setDate(getDateField, dateString) {
        if (!dateString)
            return this.setToday(getDateField);
        this.assertDdMmYyyy(dateString);
        this.assertValidDayMonth(dateString);
        await this.openPopup(getDateField);
        await this.selectDateInPopup(dateString);
        return dateString;
    }
    /** Alias for clarity at call-sites when setting DoB. */
    async selectDOB(getDateField, dobString) {
        await this.setDate(getDateField, dobString);
    }
    // ---------- Internal picker choreography ----------
    /** Click the field and wait for the popup to be visible. */
    async openPopup(getDateField) {
        const field = getDateField();
        await field.click();
        await this.wait.waitForElement(this.component.visiblePopup);
    }
    /** Navigate and select DD/MM/YYYY in popup (robust to current view). */
    async selectDateInPopup(ddmmyyyy) {
        const [d, m, y] = ddmmyyyy.split('/').map(Number);
        await this.ensureYearsView();
        await this.navigateToYearRange(y);
        // Year
        await this.component.yearCells.filter({ hasText: String(y) }).first().click();
        // Month
        await this.wait.waitForElement(this.component.monthsView);
        await this.component.monthCells.filter({ hasText: MONTH_ABBR[m - 1] }).first().click();
        // Day (ignore .old/.new days from adjacent months)
        await this.wait.waitForElement(this.component.daysView);
        await this.component.validDayCells.filter({ hasText: String(d) }).first().click();
    }
    /** Ensure we are in the years view (click switch up to twice if needed). */
    async ensureYearsView() {
        if (await this.component.yearsView.isVisible().catch(() => false))
            return;
        await this.action.clickLocator(this.component.switchBtn); // days -> months
        if (await this.component.yearsView.isVisible().catch(() => false))
            return;
        await this.action.clickLocator(this.component.switchBtn); // months -> years
        await this.wait.waitForElement(this.component.yearsView);
    }
    /** Navigate the years view so that targetYear is within the visible range. */
    async navigateToYearRange(targetYear) {
        await this.wait.waitForElement(this.component.yearsView);
        for (let i = 0; i < 30; i++) {
            const texts = await this.component.yearCells.allTextContents();
            const nums = texts.map(t => parseInt(t, 10)).filter(Number.isFinite);
            if (nums.length) {
                const min = Math.min(...nums);
                const max = Math.max(...nums);
                if (targetYear >= min && targetYear <= max)
                    return;
                await this.action.clickLocator(targetYear < min ? this.component.yearsPrev : this.component.yearsNext);
            }
            await this.wait.waitForTimeout(80); // small settle time
        }
        throw new Error(`Could not reach year ${targetYear} in datepicker`);
    }
    // ---------- tiny helpers ----------
    assertDdMmYyyy(value) {
        if (!DDMMYYYY.test(value)) {
            throw new Error(`Invalid date format "${value}" – expected DD/MM/YYYY`);
        }
    }
    /** Quick sanity check for day/month bounds to catch typos early. */
    assertValidDayMonth(value) {
        const [d, m, y] = value.split('/').map(Number);
        if (m < 1 || m > 12)
            throw new Error(`Invalid month "${m}" – expected 1–12`);
        const last = new Date(y, m, 0).getDate(); // day 0 of next month
        if (d < 1 || d > last)
            throw new Error(`Invalid day "${d}" for ${String(m).padStart(2, '0')}/${y} – max ${last}`);
    }
}
exports.DatePickerService = DatePickerService;
//# sourceMappingURL=DatePicker.js.map