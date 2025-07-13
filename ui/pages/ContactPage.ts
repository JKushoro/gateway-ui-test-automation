
import { BasePage } from "../base/BasePage";
import { Page, Locator } from "@playwright/test";

export class ContactPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private readonly messageTextAreaInputLocator = this.page.locator('#description');
    private readonly confirmationNameHeaderLocator = this.page.locator("div[class='card-body p-4'] h3.h4.mb-4");
    private readonly confirmationSubjectLocator = this.page.locator("p[style='font-weight: bold;']");


    public get messageTextAreaInput(): Locator {
        return this.messageTextAreaInputLocator;
    }

    public get confirmationNameHeader(): Locator {
        return this.confirmationNameHeaderLocator;
    }

    public get confirmationSubjectText(): Locator {
        return this.confirmationSubjectLocator;
    }

}
