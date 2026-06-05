import { Locator, Page } from '@playwright/test';
/**
 * 🖱️ Simple Click Helper
 * Easy-to-understand methods for clicking things on the page
 */
export declare class ClickHelper {
    private page;
    private wait;
    private logger;
    constructor(page: Page);
    /** Click a button by its text (e.g., "Save", "Submit", "Continue") */
    clickButton(buttonText: string): Promise<void>;
    /** Click a button with exact text match */
    clickButtonExact(buttonText: string): Promise<void>;
    /** Click a link by its text */
    clickLink(linkText: string): Promise<void>;
    /** Click any element by its selector */
    clickElement(selector: string): Promise<void>;
    /** Click any element (Playwright Locator) */
    clickLocator(locator: Locator): Promise<void>;
    /** Click and wait for page to navigate to new URL */
    clickAndWaitForNavigation(locator: Locator, expectedUrl: string): Promise<void>;
}
//# sourceMappingURL=ClickHelper.d.ts.map