import { BasePage } from '@framework/core/BasePage';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@framework/types';
type VerificationResult = {
    companyName: boolean;
    contactForename: boolean;
    contactSurname: boolean;
    phone: boolean;
    emailAddress: boolean;
    addressMatches: boolean;
    allFieldsMatch: boolean;
};
type DisplayedClientData = {
    companyName: string;
    contactForename: string;
    contactSurname: string;
    phone: string;
    emailAddress: string;
    addressLine1: string;
    townCity: string;
    postcode: string;
};
export declare class ClientFilesSteps extends BasePage {
    private readonly clientFilePage;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Ensure we are on the Client Files (Client Details) page.
     */
    verifyClientFilesPage(): Promise<void>;
    /**
     * Click a navigation link in the client file by its text.
     */
    clickNavigationLink(linkText: string): Promise<void>;
    /**
     * Main workflow: verify page, then assert all stored data matches what is displayed.
     */
    executeStoredClientDataVerification(dataPrefix?: string): Promise<void>;
    /**
     * Assert that stored data matches displayed data (field-by-field).
     */
    /**
     * 🎯 Assert that stored data matches displayed data (field-by-field)
     *
     * This method verifies that all client data fields match between what was stored
     * during form submission and what is currently displayed on the page.
     *
     * @param dataPrefix - The prefix used to store data in the data store (default: 'formData')
     *
     * @example
     * ```typescript
     * // Verify all client data matches what was stored
     * await clientSteps.assertStoredClientDataMatches();
     *
     * // Verify with custom data prefix
     * await clientSteps.assertStoredClientDataMatches('customPrefix');
     * ```
     */
    assertStoredClientDataMatches(dataPrefix?: string): Promise<void>;
    /**
     * Compare stored vs displayed and return a per-field result.
     */
    verifyStoredClientDataMatches(dataPrefix?: string): Promise<VerificationResult>;
    /**
     * Read all client data displayed on the page (single pass).
     */
    getDisplayedClientData(): Promise<DisplayedClientData>;
    /**
     * Pull expected values from the DataStore.
     */
    private getExpectedFromStore;
    /**
     * Trim-only comparison for plain text fields.
     */
    private same;
    /**
     * Email comparison: trim and lower-case.
     */
    private sameEmail;
    /**
     * Phone comparison: compare only digits (ignores spaces, dashes, brackets).
     * If you want strict comparison instead, replace with `return this.same(a, b)`.
     */
    private samePhone;
}
export {};
//# sourceMappingURL=ClientFilesSteps.d.ts.map