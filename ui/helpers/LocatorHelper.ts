//ui/helpers/LocatorHelper.ts
import {Page, Locator} from "@playwright/test";

export class LocatorHelper {
    constructor(private page: Page) {
    }


    getLocator(selector: string): Locator {
        return this.page.locator(selector);
    }

    getLinkByText(text: string, exact = true): Locator {
        return this.page.getByRole('link', {name: text, exact});
    }

    getInputByLabel(label: string, exact = true): Locator {
        return this.page.getByLabel(label, {exact});
    }

    getLabelByText(text: string): Locator {
        return this.page.locator(`label:has-text("${text}")`);
    }
}
