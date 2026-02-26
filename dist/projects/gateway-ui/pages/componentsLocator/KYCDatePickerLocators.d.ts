import { Page } from '@playwright/test';
export declare class KYCDatePickerLocators {
    private readonly page;
    constructor(page: Page);
    static readonly DATE_PICKER_CONTAINER = ".react-datepicker";
    static readonly YEAR_DROPDOWN = ".react-datepicker__year-select";
    static readonly MONTH_DROPDOWN = ".react-datepicker__month-select";
    static readonly DAY_OPTION: (day: number) => string;
    static readonly DATE_INPUT = "input[placeholder=\"DD/MM/YYYY\"]";
    static readonly MONTH_YEAR_DIALOG = ".react-datepicker[role=\"dialog\"]";
    static readonly YEAR_HEADER = ".react-datepicker-year-header";
    static readonly PREVIOUS_YEAR_BUTTON = "button[aria-label*=\"Previous\"]";
    static readonly NEXT_YEAR_BUTTON = "button[aria-label*=\"Next\"]";
    static readonly MONTH_YEAR_OPTION: (monthName: string, year: number) => string;
}
//# sourceMappingURL=KYCDatePickerLocators.d.ts.map