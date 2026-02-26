import { Locator, Page } from '@playwright/test';
/**
 * KYC Date Picker Component Locators
 * Handles both Bootstrap and Material-UI date pickers for KYC forms
 */
export declare class DatePickerComponent {
    private readonly page;
    constructor(page: Page);
    get visiblePopup(): Locator;
    get switchBtn(): Locator;
    get yearsView(): Locator;
    get monthsView(): Locator;
    get daysView(): Locator;
    get yearCells(): Locator;
    get monthCells(): Locator;
    get validDayCells(): Locator;
    get yearsPrev(): Locator;
    get yearsNext(): Locator;
    get todayDay(): Locator;
    get muiDatePickerDialog(): Locator;
    get muiCalendarPicker(): Locator;
    get muiMonthYearLabel(): Locator;
    get muiPreviousMonthButton(): Locator;
    get muiNextMonthButton(): Locator;
    get muiSwitchViewButton(): Locator;
    get muiDayButtons(): Locator;
    get muiTodayButton(): Locator;
    getMuiDayButton(day: number): Locator;
    get muiYearView(): Locator;
    get muiMonthView(): Locator;
}
//# sourceMappingURL=DatePickerLocators.d.ts.map