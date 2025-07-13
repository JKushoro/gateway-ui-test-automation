//ui/helpers/DatePickerHelper.ts
import { Page } from '@playwright/test';
import { parse, format, addDays } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { WaitHelper } from './WaitHelper';

export class DatePickerHelper {
    private waitHelper: WaitHelper;

    constructor(private page: Page) {
        this.waitHelper = new WaitHelper(page);
    }

    // ---------- Locator Getters ----------

    private getNextButton() {
        return this.page.locator('.react-datepicker__navigation--next');
    }

    private getCurrentMonthLabel() {
        return this.page.locator('.react-datepicker__current-month');
    }

    private getLabelByText(text: string) {
        return this.page.locator('label.form-label', { hasText: text });
    }

    private getInputFromLabel(labelLocator: ReturnType<Page['locator']>) {
        return labelLocator.locator('..').locator('input[type="text"]');
    }

    private getDayByAriaLabel(ariaLabel: string) {
        return this.page.locator(`.react-datepicker__day[aria-label="${ariaLabel}"]`);
    }

    // ---------- Utility Method ----------

    private formatToAriaLabel(date: Date): string {
        return format(date, `'Choose' EEEE, d MMMM yyyy`, { locale: enGB });
    }

    // ---------- Main Method ----------


    async selectDate(labelText: string, dateStr?: string): Promise<{ inputFormat: string; confirmFormat: string }> {
        let targetDate: Date;

        if (!dateStr) {
            targetDate = labelText.includes('Check In') ? addDays(new Date(), 2) : addDays(new Date(), 4);
        } else {
            targetDate = parse(dateStr, 'dd/MM/yyyy', new Date());
        }

        const ariaLabel = this.formatToAriaLabel(targetDate);
        const label = this.getLabelByText(labelText);
        const input = this.getInputFromLabel(label);

        await input.click();
        await this.waitHelper.waitForVisible('.react-datepicker__month');

        for (let i = 0; i < 12; i++) {
            const currentMonthText = await this.getCurrentMonthLabel().textContent();
            const expectedMonth = format(targetDate, 'MMMM yyyy');
            if (currentMonthText?.trim() === expectedMonth) break;

            await this.getNextButton().click();

            await this.waitHelper.waitForFunction(
                ({ selector, prevMonth }) => {
                    const el = document.querySelector(selector);
                    return el && el.textContent?.trim() !== prevMonth;
                },
                {
                    selector: '.react-datepicker__current-month',
                    prevMonth: currentMonthText?.trim(),
                }
            );
        }

        const dayToSelect = this.getDayByAriaLabel(ariaLabel);
        await this.waitHelper.waitForElement(dayToSelect);
        await dayToSelect.click();

        return {
            inputFormat: format(targetDate, 'dd/MM/yyyy'),
            confirmFormat: format(targetDate, 'yyyy-MM-dd'),
        };
    }

}
