import { BasePage } from '@framework/core/BasePage';
import { Page } from '@playwright/test';
import { FormsService, GatewaySearchFormData } from '@steps/components/Forms';
import { SideNavService } from '@steps/components/SideNav';
import { FrameworkConfig } from '@framework/types';
export declare class ClientsSearchSteps extends BasePage {
    readonly forms: FormsService;
    private readonly searchClientPage;
    readonly sideNav: SideNavService;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    verifySearchClientPage(): Promise<void>;
    searchClients(): Promise<void>;
    searchForStoredClient(searchData?: GatewaySearchFormData, dataPrefix?: string): Promise<GatewaySearchFormData>;
    clickCompanyRowByExactName(dataPrefix?: string): Promise<boolean>;
    clickIndividualRowByName(dataPrefix?: string): Promise<boolean>;
    searchAndVerifyStoredClient(searchData?: GatewaySearchFormData, dataPrefix?: string): Promise<{
        searchData: GatewaySearchFormData;
        clientFound: boolean;
    }>;
    searchAndVerifyStoredIndividualClient(searchData?: GatewaySearchFormData, dataPrefix?: string): Promise<{
        searchData: GatewaySearchFormData;
        clientFound: boolean;
    }>;
    executeSearchAndVerifyStoredClient(): Promise<void>;
    executeSearchAndVerifyStoredIndividualClient(): Promise<void>;
}
//# sourceMappingURL=ClientsSearchSteps.d.ts.map