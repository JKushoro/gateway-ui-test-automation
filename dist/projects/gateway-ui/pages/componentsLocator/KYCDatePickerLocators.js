"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYCDatePickerLocators = void 0;
class KYCDatePickerLocators {
    // Keeping constructor for consistency with your other locator classes
    // (even though this class only exposes static locators)
    constructor(page) {
        this.page = page;
    }
}
exports.KYCDatePickerLocators = KYCDatePickerLocators;
// Date picker root / container
KYCDatePickerLocators.DATE_PICKER_CONTAINER = '.react-datepicker';
// Dropdowns (DD/MM/YYYY picker)
KYCDatePickerLocators.YEAR_DROPDOWN = '.react-datepicker__year-select';
KYCDatePickerLocators.MONTH_DROPDOWN = '.react-datepicker__month-select';
// Day cell (react-datepicker uses 3-digit padded day numbers, e.g., 001–031)
KYCDatePickerLocators.DAY_OPTION = (day) => `.react-datepicker__day--${day
    .toString()
    .padStart(3, '0')}:not(.react-datepicker__day--disabled):not(.react-datepicker__day--outside-month)`;
// Fallback inputs (DD/MM/YYYY)
KYCDatePickerLocators.DATE_INPUT = 'input[placeholder="DD/MM/YYYY"]';
// Month/Year picker (MM/YYYY)
KYCDatePickerLocators.MONTH_YEAR_DIALOG = '.react-datepicker[role="dialog"]';
KYCDatePickerLocators.YEAR_HEADER = '.react-datepicker-year-header';
// Keep these as role-based in service where possible, but include as fallback CSS too
KYCDatePickerLocators.PREVIOUS_YEAR_BUTTON = 'button[aria-label*="Previous"]';
KYCDatePickerLocators.NEXT_YEAR_BUTTON = 'button[aria-label*="Next"]';
// Month/Year option (uses aria-label: "Choose March 2027")
KYCDatePickerLocators.MONTH_YEAR_OPTION = (monthName, year) => `[aria-label="Choose ${monthName} ${year}"]`;
//# sourceMappingURL=KYCDatePickerLocators.js.map