import { Page } from '../types/PlaywrightTypes';
import { FrameworkConfig } from '../types';
/**
 * Simplified Authentication Helper
 * Contains only essential authentication methods for your project
 */
export declare class AuthenticationHelper {
    private page;
    private actionHelper;
    private waitHelper;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Handle Microsoft OAuth flow (your main authentication method)
     */
    authenticateWithMicrosoft(username: string, password: string): Promise<void>;
    /**
     * Check if user is authenticated
     */
    isAuthenticated(): Promise<boolean>;
    /**
     * Save authentication session
     */
    saveAuthSession(): Promise<void>;
    /**
     * Load authentication session
     */
    loadAuthSession(): Promise<boolean>;
    /**
     * Wait for authentication to complete
     */
    private waitForAuthenticationComplete;
}
//# sourceMappingURL=AuthenticationHelper.d.ts.map