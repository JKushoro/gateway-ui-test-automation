// projects/gateway-ui/steps/components/DatePicker.ts
import { Page, Locator } from '@playwright/test';
import { DatePickerComponent } from '@pages/componentsLocator/DatePickerLocators';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';

type GetField = () => Locator;

const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as const;
const DDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/;

/** Centralised date formatting + robust Bootstrap-style datepicker interactions (DD/MM/YYYY). */
export class DatePickerService extends BasePage {
  private readonly component: DatePickerComponent;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.component = new DatePickerComponent(page);
  }

  // ---------- Public utilities ----------

  /** Format a Date to DD/MM/YYYY */
  public formatDate(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = String(date.getFullYear());
    return `${dd}/${mm}/${yyyy}`;
  }

  /** Generate a random DOB between minAge and maxAge (inclusive). Defaults to 20–60 years. */
  public generateRandomDOB(minAge = 20, maxAge = 60): string {
    const today = new Date();
    const birthYear = today.getFullYear() - (minAge + Math.floor(Math.random() * (maxAge - minAge + 1)));
    const month = Math.floor(Math.random() * 12); // 0–11
    const daysInMonth = new Date(birthYear, month + 1, 0).getDate();
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    return this.formatDate(new Date(birthYear, month, day));
  }

  /** Set today's date on a date field. Returns the DD/MM/YYYY used. */
  public async setToday(getDateField: GetField): Promise<string> {
    const dateString = this.formatDate(new Date());
    await this.openPopup(getDateField);
    await this.action.clickLocator(this.component.todayDay);
    return dateString;
  }

  /** Set a specific date (DD/MM/YYYY). If omitted, sets today. Returns the DD/MM/YYYY used. */
  public async setDate(getDateField: GetField, dateString?: string): Promise<string> {
    if (!dateString) return this.setToday(getDateField);
    this.assertDdMmYyyy(dateString);
    this.assertValidDayMonth(dateString);

    await this.openPopup(getDateField);
    await this.selectDateInPopup(dateString);
    return dateString;
  }

  /** Alias for clarity at call-sites when setting DoB. */
  public async selectDOB(getDateField: GetField, dobString: string): Promise<void> {
    await this.setDate(getDateField, dobString);
  }

  // ---------- Internal picker choreography ----------

  /** Click the field and wait for the popup to be visible. */
  private async openPopup(getDateField: GetField): Promise<void> {
    const field = getDateField();
    await field.click();
    await this.wait.waitForElement(this.component.visiblePopup);
  }

  /** Navigate and select DD/MM/YYYY in popup (robust to current view). */
  private async selectDateInPopup(ddmmyyyy: string): Promise<void> {
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
  private async ensureYearsView(): Promise<void> {
    if (await this.component.yearsView.isVisible().catch(() => false)) return;

    await this.action.clickLocator(this.component.switchBtn); // days -> months
    if (await this.component.yearsView.isVisible().catch(() => false)) return;

    await this.action.clickLocator(this.component.switchBtn); // months -> years
    await this.wait.waitForElement(this.component.yearsView);
  }

  /** Navigate the years view so that targetYear is within the visible range. */
  private async navigateToYearRange(targetYear: number): Promise<void> {
    await this.wait.waitForElement(this.component.yearsView);

    for (let i = 0; i < 30; i++) {
      const texts = await this.component.yearCells.allTextContents();
      const nums = texts.map(t => parseInt(t, 10)).filter(Number.isFinite);
      if (nums.length) {
        const min = Math.min(...nums);
        const max = Math.max(...nums);
        if (targetYear >= min && targetYear <= max) return;
        await this.action.clickLocator(targetYear < min ? this.component.yearsPrev : this.component.yearsNext);
      }
      await this.wait.waitForTimeout(80); // small settle time
    }
    throw new Error(`Could not reach year ${targetYear} in datepicker`);
  }

  // ---------- tiny helpers ----------

  private assertDdMmYyyy(value: string): void {
    if (!DDMMYYYY.test(value)) {
      throw new Error(`Invalid date format "${value}" – expected DD/MM/YYYY`);
    }
  }

  /** Quick sanity check for day/month bounds to catch typos early. */
  private assertValidDayMonth(value: string): void {
    const [d, m, y] = value.split('/').map(Number);
    if (m < 1 || m > 12) throw new Error(`Invalid month "${m}" – expected 1–12`);
    const last = new Date(y, m, 0).getDate(); // day 0 of next month
    if (d < 1 || d > last) throw new Error(`Invalid day "${d}" for ${String(m).padStart(2,'0')}/${y} – max ${last}`);
  }
}
