// pages/AdminMessagesPage.ts

import { BasePage } from "../base/BasePage";
import { Locator, Page } from "@playwright/test";

export class AdminMessagesPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Row and cell locators
    private readonly messageRowLocator = this.page.locator('div.row.detail');

    // Navigation and pop-up locators
    private readonly adminPopUpNameLocator = this.page.locator('div.col-10 p', { hasText: 'From:' });
    private readonly adminPopUpPhoneLocator = this.page.locator('div.col-2 p', { hasText: 'Phone:' });
    private readonly adminPopUpEmailLocator = this.page.locator('div.col-12 p', { hasText: 'Email:' });

    public readonly closePopButtonLocator = this.page.locator('.btn.btn-outline-primary');

    // Public getters for use in steps
    public get messageRows(): Locator {
        return this.messageRowLocator;
    }

    public get adminPopUpName(): Locator {
        return this.adminPopUpNameLocator;
    }

    public get adminPopUpPhone(): Locator {
        return this.adminPopUpPhoneLocator;
    }

    public get adminPopUpEmail(): Locator {
        return this.adminPopUpEmailLocator;
    }

    // Public methods for dynamic locators
    public getNameLocatorFromRow(row: Locator): Locator {
        return row.locator('div.col-sm-2 p');
    }

    public getSubjectLocatorFromRow(row: Locator): Locator {
        return row.locator('div.col-sm-9 p');
    }

    public deleteButtonFromRow(row: Locator): Locator {
        return row.locator('span.fa-remove.roomDelete');
    }
}
