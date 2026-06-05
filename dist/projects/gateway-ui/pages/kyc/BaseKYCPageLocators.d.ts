import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';
/**
 * Base KYC Page Locators
 * Contains common locators used across all KYC pages
 */
export declare class BaseKYCPageLocators extends BasePage {
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Common heading locator for KYC pages
     */
    get pageHeading(): Locator;
    /**
     * Get dropdown element by label text
     */
    getDropdownByLabel(labelText: string): Locator;
    /**
     * Get select dropdown element
     */
    get selectDropdown(): Locator;
    /**
     * Get combobox element
     */
    get comboboxDropdown(): Locator;
}
//# sourceMappingURL=BaseKYCPageLocators.d.ts.map