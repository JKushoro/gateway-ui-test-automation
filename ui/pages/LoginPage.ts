// src/pages/LoginPage.ts
import { BasePage } from "../base/BasePage";
import { Locator, Page } from "@playwright/test";

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly loginErrorMessageAlertLocator = this.page.locator('div.alert.alert-danger[role="alert"]');


    public get loginErrorMessageAlert(): Locator {
        return this.loginErrorMessageAlertLocator;
    }


}
