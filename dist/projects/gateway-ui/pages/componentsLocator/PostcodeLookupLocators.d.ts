import { Locator, Page } from '@playwright/test';
/**
 * Postcode Lookup Component Locators
 * All selectors for the postcode lookup modal functionality
 */
export declare class PostcodeLookupComponent {
    private readonly page;
    constructor(page: Page);
    get postcodeLookupButton(): Locator;
    get modal(): Locator;
    get modalContent(): Locator;
    get modalHeader(): Locator;
    get modalTitle(): Locator;
    get closeButton(): Locator;
    get postcodeInput(): Locator;
    get searchButton(): Locator;
    get chooseAddressSection(): Locator;
    get addressDropdown(): Locator;
    get chooseAddressButton(): Locator;
    get addressOptions(): Locator;
    get validAddressOptions(): Locator;
    get modalFooter(): Locator;
    get modalCloseButton(): Locator;
    addressOptionByText(addressText: string): Locator;
    addressOptionByIndex(index: number): Locator;
    get muiAddressMenu(): Locator;
    get muiAddressMenuItems(): Locator;
}
//# sourceMappingURL=PostcodeLookupLocators.d.ts.map