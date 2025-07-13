//ui/pages/RoomsPage.ts
import { BasePage } from "../base/BasePage";
import { Locator, Page } from "@playwright/test";

export class RoomsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly roomInputLocator = this.page.locator('input#roomName');
    private readonly typeDropdownLocator = this.page.locator('select#type');
    private readonly accessibleDropdownLocator = this.page.locator('select#accessible');
    private readonly priceInputLocator = this.page.locator('input#roomPrice');
    public readonly closePopButtonLocator = this.page.locator('.btn.btn-outline-primary');

    private readonly roomRowsLocator = this.page.locator('[data-testid="roomlisting"]');
    private readonly roomNameLocatorString = 'p[id^="roomName"]';
    public readonly messageTextAreaInputLocator = this.page.locator('#description');


    public get roomInput(): Locator {
        return this.roomInputLocator;
    }

    public get typeDropdown(): Locator {
        return this.typeDropdownLocator;
    }

    public get accessibleDropdown(): Locator {
        return this.accessibleDropdownLocator;
    }

    public get priceInput(): Locator {
        return this.priceInputLocator;
    }

    public get allRoomRows(): Locator {
        return this.roomRowsLocator;
    }

    public getRoomNameFromRow(row: Locator): Locator {
        return row.locator(this.roomNameLocatorString);
    }

    public getDeleteButtonFromRow(row: Locator): Locator {
        return row.locator('span.roomDelete');
    }

    public get roomsTextAreaInput(): Locator {
        return this.messageTextAreaInputLocator;
    }

    public getRoomLocatorByName(roomName: string): Locator {
        return this.page.locator(`p[id^="roomName"]:has-text("${roomName}")`);
    }
}
