// pages/ReportsCalendarPage.ts
import { Locator, Page } from "@playwright/test";
import {BasePage} from "../base/BasePage";

export class ReportsCalendarPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public get toolbarLabel(): Locator {
        return this.page.locator('.rbc-toolbar-label');
    }

    public get nextButton(): Locator {
        return this.page.getByRole('button', { name: 'Next' });
    }

    public getCalendarEventLocatorByText(expectedText: string): Locator {
        return this.page.locator('.rbc-event-content', { hasText: expectedText });
    }

}
