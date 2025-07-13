//ui/base/WaitHelper.ts
import {expect, Locator, Page, Response} from "@playwright/test";


export class WaitHelper {
    constructor(private page: Page) {
    }

    async waitForElement(locator: Locator): Promise<void> {
        await locator.waitFor({state: 'visible'});
    }

    async waitForVisible(selector: string, timeout: number = 5000): Promise<void> {
        await this.page.waitForSelector(selector, {
            state: 'visible',
            timeout,
        });
    }

    async waitForFunction(
        fn: (arg: any) => unknown,
        arg: any,
        timeout: number = 5000
    ): Promise<void> {
        await this.page.waitForFunction(fn, arg, { timeout });
    }

    async waitForLocatorToHaveCount(locator: Locator, expectedCount: number, timeout = 5000): Promise<void> {
        await expect(locator).toHaveCount(expectedCount, { timeout });
    }

    async waitForLocatorToBeHidden(locator: Locator, timeout: number = 5000): Promise<void> {
        await locator.waitFor({ state: 'hidden', timeout });
    }



    async waitForNewTab(clickAction: () => Promise<void>): Promise<Page> {
        const [newTab] = await Promise.all([
            this.page.context().waitForEvent('page'),
            clickAction(),
        ]);
        await newTab.waitForLoadState('domcontentloaded');
        return newTab;
    }

    async verifyPageTitleContains(partialTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(new RegExp(partialTitle));
    }

    async assertElementVisibleWithOptionalText(locator: Locator, expectedText?: string): Promise<void> {
        await expect(locator).toBeVisible();
        if (expectedText) {
            await expect(locator).toHaveText(expectedText);
        }
    }

    async waitForElementToDisappear(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'hidden' });
    }

    async waitForPageLoad(
        url: string,
        waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'load'
    ): Promise<Response | null> {
        return this.page.goto(url, { waitUntil });
    }


    async waitForUrlToChangeFrom(
        originalUrl: string,
        timeout: number = 10000
    ): Promise<void> {
        await this.page.waitForURL(
            (url) => url.toString() !== originalUrl,
            { timeout }
        );
    }


    async waitForLocatorToBeDetached(locator: Locator, timeout = 5000): Promise<void> {
        await locator.waitFor({ state: 'detached', timeout });
    }

}