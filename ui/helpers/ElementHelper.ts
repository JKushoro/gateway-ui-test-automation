// ui/helpers/ElementHelper.ts

import { Locator } from "@playwright/test";

export class ElementHelper {
    public static async getTrimmedText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() || '';
    }

    public static async getLowerCasedText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim().toLowerCase() || '';
    }

    // Optional future methods:
    public static async getAttribute(locator: Locator, attribute: string): Promise<string> {
        return (await locator.getAttribute(attribute)) || '';
    }

    public static async getValue(locator: Locator): Promise<string> {
        return (await locator.inputValue())?.trim() || '';
    }
}
