"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePickerComponent = void 0;
/**
 * KYC Date Picker Component Locators
 * Handles both Bootstrap and Material-UI date pickers for KYC forms
 */
class DatePickerComponent {
    constructor(page) {
        this.page = page;
    }
    // =============================
    // BOOTSTRAP DATE PICKER (Legacy)
    // =============================
    get visiblePopup() {
        return this.page.locator('.datepicker.datepicker-dropdown:visible').first();
    }
    // --- Controls ---
    get switchBtn() {
        return this.visiblePopup.locator('.datepicker-switch');
    }
    // --- Views ---
    get yearsView() {
        return this.visiblePopup.locator('.datepicker-years');
    }
    get monthsView() {
        return this.visiblePopup.locator('.datepicker-months');
    }
    get daysView() {
        return this.visiblePopup.locator('.datepicker-days');
    }
    // --- Elements within views ---
    get yearCells() {
        return this.yearsView.locator('.year');
    }
    get monthCells() {
        return this.monthsView.locator('.month');
    }
    get validDayCells() {
        return this.daysView.locator('.day:not(.old):not(.new)');
    }
    // --- Year view navigation ---
    get yearsPrev() {
        return this.yearsView.locator('.prev').first();
    }
    get yearsNext() {
        return this.yearsView.locator('.next').first();
    }
    // --- Convenience ---
    get todayDay() {
        return this.visiblePopup.locator('.datepicker-days .day.today').first();
    }
    // =============================
    // MATERIAL-UI DATE PICKER (KYC)
    // =============================
    // Main date picker dialog
    get muiDatePickerDialog() {
        return this.page.locator('[role="dialog"].MuiPickersPopper-root');
    }
    // Calendar container
    get muiCalendarPicker() {
        return this.muiDatePickerDialog.locator('.MuiCalendarPicker-root');
    }
    // Header controls
    get muiMonthYearLabel() {
        return this.muiCalendarPicker.locator('.MuiPickersCalendarHeader-label');
    }
    get muiPreviousMonthButton() {
        return this.muiCalendarPicker.locator('button[aria-label*="Previous month"]');
    }
    get muiNextMonthButton() {
        return this.muiCalendarPicker.locator('button[aria-label*="Next month"]');
    }
    get muiSwitchViewButton() {
        return this.muiCalendarPicker.locator('.MuiPickersCalendarHeader-switchViewButton');
    }
    // Day selection
    get muiDayButtons() {
        return this.muiCalendarPicker.locator('.MuiPickersDay-root:not(.Mui-disabled)');
    }
    get muiTodayButton() {
        return this.muiCalendarPicker.locator('.MuiPickersDay-today');
    }
    // Get specific day button
    getMuiDayButton(day) {
        return this.muiCalendarPicker.locator(`.MuiPickersDay-root:not(.Mui-disabled):has-text("${day}")`);
    }
    // Year/Month view selectors
    get muiYearView() {
        return this.muiDatePickerDialog.locator('.MuiYearPicker-root');
    }
    get muiMonthView() {
        return this.muiDatePickerDialog.locator('.MuiMonthPicker-root');
    }
}
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=DatePickerLocators.js.map