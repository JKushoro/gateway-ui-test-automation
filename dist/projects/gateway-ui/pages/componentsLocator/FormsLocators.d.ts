import { Locator, Page } from '@playwright/test';
/**
 * FormsComponent - Essential locators for Forms-related pages/components
 *
 * Notes:
 * - Retail dropdowns are handled via ActionHelper.selectDropdownByLabel/ByAnyLabel
 * - Select2 handling is encapsulated in ActionHelper, with this component exposing only special cases.
 */
export declare class FormsComponent {
    private readonly page;
    constructor(page: Page);
    get dateEstablished(): Locator;
    get clientDOB(): Locator;
    get checkboxInput(): string;
    get radioInput(): string;
    get textInput(): string;
    get emailInput(): string;
    get numberInput(): string;
    get selectDropdown(): string;
    get textareaInput(): string;
}
//# sourceMappingURL=FormsLocators.d.ts.map