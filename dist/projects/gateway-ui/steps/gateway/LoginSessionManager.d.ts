import { Page } from '@playwright/test';
import { LoginPage } from '@pages/auth/LoginPageLocators';
import { Environment } from '../../shared/SharedImports';
/**
 * Manages login session state and navigation
 * Single Responsibility: Session state management only
 */
export declare class LoginSessionManager {
    private readonly page;
    private readonly loginPage;
    private readonly envManager;
    constructor(page: Page, loginPage: LoginPage);
    navigateToApplication(environment?: Environment): Promise<void>;
    isUserLoggedIn(): Promise<boolean>;
    logoutIfLoggedIn(): Promise<void>;
    getAdvisorEmail(environment?: Environment): string;
}
//# sourceMappingURL=LoginSessionManager.d.ts.map