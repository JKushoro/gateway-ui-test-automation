import { Locator, Page } from '@playwright/test';
/**
 * Alert Component Locators
 * Pure element selectors only — no logic or filtering.
 */
export declare class AlertComponent {
    private readonly page;
    constructor(page: Page);
    /** Visible alert or modal container */
    get container(): Locator;
    get successIcon(): Locator;
    get errorIcon(): Locator;
    get warningIcon(): Locator;
    get infoIcon(): Locator;
    get title(): Locator;
    get message(): Locator;
    get allButtons(): Locator;
    /** Optional convenience, keep if you actually need these: */
    get okButton(): Locator;
    get cancelButton(): Locator;
    get fieldset(): Locator;
    get errorContainer(): Locator;
    get errorMessage(): Locator;
}
//# sourceMappingURL=AlertServiceLocator.d.ts.map