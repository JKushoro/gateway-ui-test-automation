import { BasePage } from '@framework/core/BasePage';
import { Page } from '@playwright/test';
import { FormsService, SearchFormData } from '@steps/components/Forms';
import { SideNavService } from '@steps/components/SideNav';
import { FrameworkConfig } from '@framework/types';
export declare class SearchClientsSteps extends BasePage {
    readonly forms: FormsService;
    private readonly searchClientPage;
    readonly sideNav: SideNavService;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Verify Search Client page is loaded with URL and title checks
     */
    verifySearchClientPage(): Promise<void>;
    /**
     * Submit the search form using the enhanced action helper
     */
    searchClients(): Promise<void>;
    /**
     * Main method to navigate to search clients page and perform search using stored data
     * @param searchData - Optional search data overrides
     * @param dataPrefix - DataStore prefix to retrieve data from (default: 'formData')
     * @returns The search data that was used
     */
    searchForStoredClient(searchData?: SearchFormData, dataPrefix?: string): Promise<SearchFormData>;
    /**
     * Verify that the stored company name matches the name in the table and click view client button
     * @param dataPrefix - DataStore prefix to retrieve company name from (default: 'formData')
     * @returns Promise<boolean> - true if company found and clicked, false otherwise
     */
    verifyAndClickMatchingClient(dataPrefix?: string): Promise<boolean>;
    /**
     * Verify that the stored forename and surname match a client in the search results table
     * @param dataPrefix - DataStore prefix to retrieve individual client data from
     * @returns Promise<boolean> - true if individual client found and clicked, false otherwise
     */
    verifyAndClickMatchingIndividualClient(dataPrefix?: string): Promise<boolean>;
    /**
     * Complete search and verification flow - searches for stored client and verifies company name match
     * @param searchData - Optional search data overrides
     * @param dataPrefix - DataStore prefix to retrieve data from (default: 'formData')
     * @returns Object containing search data and verification result
     */
    searchAndVerifyStoredClient(searchData?: SearchFormData, dataPrefix?: string): Promise<{
        searchData: SearchFormData;
        clientFound: boolean;
    }>;
    /**
     * Search for and verify an individual client using stored forename and surname
     * @param searchData - Optional search data overrides
     * @param dataPrefix - DataStore prefix to retrieve data from (default: 'clientData.complete')
     * @returns Object containing search data and verification result
     */
    searchAndVerifyStoredIndividualClient(searchData?: SearchFormData, dataPrefix?: string): Promise<{
        searchData: SearchFormData;
        clientFound: boolean;
    }>;
    /**
     * Main method: Execute complete search and verification workflow
     */
    executeSearchAndVerifyStoredClient(): Promise<void>;
    /**
     * Main method: Execute complete individual client search and verification workflow
     * This follows the same pattern as executeSearchAndVerifyStoredClient() but for individual clients
     */
    executeSearchAndVerifyStoredIndividualClient(): Promise<void>;
}
//# sourceMappingURL=SearchClientsSteps.d.ts.map