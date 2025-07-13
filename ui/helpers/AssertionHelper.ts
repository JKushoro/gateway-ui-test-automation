// ui/base/AssertionHelper.ts
import {expect, Locator, Page} from "@playwright/test";

export class AssertionHelper {

    constructor(private page: Page) {
    }

    async assertElementHasText(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator).toHaveText(expectedText);
    }

    async assertElementContainsText(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator).toContainText(expectedText);
    }

    async assertElementVisibleWithOptionalText(locator: Locator, expectedText?: string): Promise<void> {
        await expect(locator).toBeVisible();
        if (expectedText) {
            await expect(locator).toHaveText(expectedText);
        }
    }

    async assertElementVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    async assertElementHidden(locator: Locator): Promise<void> {
        await expect(locator).toBeHidden();
    }
}
