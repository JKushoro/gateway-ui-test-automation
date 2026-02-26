import { BasePage } from '@framework/core/BasePage';
import { Page } from '@playwright/test';
import { FrameworkConfig } from '@framework/types';
export declare class ClientFilesSteps extends BasePage {
    private readonly clientFilePage;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    verifyClientFilesPage(): Promise<void>;
    clickNavigationLink(linkText: string): Promise<void>;
    executeStoredClientDataVerification(dataPrefix?: string): Promise<void>;
    private verifyStoredClientDataMatches;
    private getDisplayedClientData;
    private getExpectedFromStore;
    private same;
    private sameEmail;
    private samePhone;
}
//# sourceMappingURL=ClientFilesSteps.d.ts.map