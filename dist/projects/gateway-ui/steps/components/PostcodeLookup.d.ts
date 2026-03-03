import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
/**
 * Postcode Lookup Service
 * Handles postcode lookup modal interactions with clean, structured methods
 */
export declare class PostcodeLookupService extends BasePage {
    private readonly pc;
    private static readonly DROPDOWN_SELECTOR;
    private static readonly POSTCODE_INPUT_SELECTOR;
    private static readonly EXCLUDE_TEXT;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Complete postcode lookup workflow
     * Main method that orchestrates the entire flow
     */
    performPostcodeLookup(postcode?: string): Promise<string>;
    /**
     * Open the postcode lookup modal
     */
    openPostcodeLookup(): Promise<void>;
    /**
     * Search for addresses using a postcode
     */
    searchPostcode(postcode: string): Promise<void>;
    /**
     * Select a random address from the results
     */
    selectRandomAddress(): Promise<string>;
    /**
     * Confirm the selected address and close modal
     */
    chooseAddress(): Promise<void>;
    /**
     * KYC Address Search Field - Material-UI autocomplete address search
     * Enters postcode into search field and randomly selects from dropdown menu
     * @param labelText - The label text of the address search field
     * @param postcode - Optional postcode to use (generates random if not provided)
     */
    kycAddressSearchField(labelText: string, postcode?: string): Promise<string>;
    /**
     * Enhanced Material-UI menu item selection with better error handling
     */
    private selectRandomAddressFromMUIMenu;
    private openModal;
    private searchForAddresses;
    private waitForAddressResults;
    private validateAddressOptions;
    private confirmSelection;
}
//# sourceMappingURL=PostcodeLookup.d.ts.map