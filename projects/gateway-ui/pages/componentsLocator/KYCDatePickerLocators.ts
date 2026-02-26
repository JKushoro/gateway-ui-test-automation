// =====================================================
// KYCDatePickerLocators.ts (FULL)
// =====================================================
import { Page } from '@playwright/test';

export class KYCDatePickerLocators {
  // Keeping constructor for consistency with your other locator classes
  // (even though this class only exposes static locators)
  constructor(private readonly page: Page) {}

  // Date picker root / container
  static readonly DATE_PICKER_CONTAINER = '.react-datepicker';

  // Dropdowns (DD/MM/YYYY picker)
  static readonly YEAR_DROPDOWN = '.react-datepicker__year-select';
  static readonly MONTH_DROPDOWN = '.react-datepicker__month-select';

  // Day cell (react-datepicker uses 3-digit padded day numbers, e.g., 001–031)
  static readonly DAY_OPTION = (day: number): string =>
    `.react-datepicker__day--${day
      .toString()
      .padStart(3, '0')}:not(.react-datepicker__day--disabled):not(.react-datepicker__day--outside-month)`;

  // Fallback inputs (DD/MM/YYYY)
  static readonly DATE_INPUT = 'input[placeholder="DD/MM/YYYY"]';

  // Month/Year picker (MM/YYYY)
  static readonly MONTH_YEAR_DIALOG = '.react-datepicker[role="dialog"]';
  static readonly YEAR_HEADER = '.react-datepicker-year-header';

  // Keep these as role-based in service where possible, but include as fallback CSS too
  static readonly PREVIOUS_YEAR_BUTTON = 'button[aria-label*="Previous"]';
  static readonly NEXT_YEAR_BUTTON = 'button[aria-label*="Next"]';

  // Month/Year option (uses aria-label: "Choose March 2027")
  static readonly MONTH_YEAR_OPTION = (monthName: string, year: number): string =>
    `[aria-label="Choose ${monthName} ${year}"]`;
}
