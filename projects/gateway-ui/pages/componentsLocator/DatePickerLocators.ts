// projects/gateway-ui/pages/componentsLocator/DatePickerLocators.ts
import { Locator, Page } from '@playwright/test';

/**
 * KYC Date Picker Component Locators
 * Handles both Bootstrap and Material-UI date pickers for KYC forms
 */
export class DatePickerComponent {
  constructor(private readonly page: Page) {}

  // =============================
  // BOOTSTRAP DATE PICKER (Legacy)
  // =============================
  get visiblePopup(): Locator {
    return this.page.locator('.datepicker.datepicker-dropdown:visible').first();
  }

  // --- Controls ---
  get switchBtn(): Locator {
    return this.visiblePopup.locator('.datepicker-switch');
  }

  // --- Views ---
  get yearsView(): Locator {
    return this.visiblePopup.locator('.datepicker-years');
  }
  get monthsView(): Locator {
    return this.visiblePopup.locator('.datepicker-months');
  }
  get daysView(): Locator {
    return this.visiblePopup.locator('.datepicker-days');
  }

  // --- Elements within views ---
  get yearCells(): Locator {
    return this.yearsView.locator('.year');
  }
  get monthCells(): Locator {
    return this.monthsView.locator('.month');
  }
  get validDayCells(): Locator {
    return this.daysView.locator('.day:not(.old):not(.new)');
  }

  // --- Year view navigation ---
  get yearsPrev(): Locator {
    return this.yearsView.locator('.prev').first();
  }
  get yearsNext(): Locator {
    return this.yearsView.locator('.next').first();
  }

  // --- Convenience ---
  get todayDay(): Locator {
    return this.visiblePopup.locator('.datepicker-days .day.today').first();
  }

  // =============================
  // MATERIAL-UI DATE PICKER (KYC)
  // =============================
  
  // Main date picker dialog
  get muiDatePickerDialog(): Locator {
    return this.page.locator('[role="dialog"].MuiPickersPopper-root');
  }

  // Calendar container
  get muiCalendarPicker(): Locator {
    return this.muiDatePickerDialog.locator('.MuiCalendarPicker-root');
  }

  // Header controls
  get muiMonthYearLabel(): Locator {
    return this.muiCalendarPicker.locator('.MuiPickersCalendarHeader-label');
  }

  get muiPreviousMonthButton(): Locator {
    return this.muiCalendarPicker.locator('button[aria-label*="Previous month"]');
  }

  get muiNextMonthButton(): Locator {
    return this.muiCalendarPicker.locator('button[aria-label*="Next month"]');
  }

  get muiSwitchViewButton(): Locator {
    return this.muiCalendarPicker.locator('.MuiPickersCalendarHeader-switchViewButton');
  }

  // Day selection
  get muiDayButtons(): Locator {
    return this.muiCalendarPicker.locator('.MuiPickersDay-root:not(.Mui-disabled)');
  }

  get muiTodayButton(): Locator {
    return this.muiCalendarPicker.locator('.MuiPickersDay-today');
  }

  // Get specific day button
  getMuiDayButton(day: number): Locator {
    return this.muiCalendarPicker.locator(`.MuiPickersDay-root:not(.Mui-disabled):has-text("${day}")`);
  }

  // Year/Month view selectors
  get muiYearView(): Locator {
    return this.muiDatePickerDialog.locator('.MuiYearPicker-root');
  }

  get muiMonthView(): Locator {
    return this.muiDatePickerDialog.locator('.MuiMonthPicker-root');
  }

}
