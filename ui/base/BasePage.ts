//ui/base/BasePage.ts
import { LocatorHelper } from '../helpers/LocatorHelper';
import { WaitHelper } from '../helpers/WaitHelper';
import { ActionHelper } from '../helpers/ActionHelper';
import { Page } from '@playwright/test';
import { AssertionHelper } from '../helpers/AssertionHelper';
import { getBaseUrl } from '../config/EnvConfig';

export class BasePage {
    public locatorHelper: LocatorHelper;
    public waitHelper: WaitHelper;
    public actionHelper: ActionHelper;
    public assertionHelper: AssertionHelper;
    protected baseUrl: string;

    constructor(protected page: Page) {
        this.locatorHelper = new LocatorHelper(page);
        this.waitHelper = new WaitHelper(page);
        this.actionHelper = new ActionHelper(page);
        this.assertionHelper = new AssertionHelper(page);

        this.baseUrl = getBaseUrl();
    }

    public getPage(): Page {
        return this.page;
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }
}
