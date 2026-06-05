import { Page } from '@playwright/test';
/**
 * Navigation helper for direct access to application states
 * Bypasses UI navigation for faster, more reliable test execution
 */
export declare class NavigationHelper {
    private readonly page;
    private readonly logger;
    constructor(page: Page);
    /**
     * Navigate directly to a fact find by ID, bypassing UI navigation
     * @param factFindId - The ID of the fact find to navigate to
     * @param baseUrl - Base URL (required)
     */
    gotoFactFindDirectly(factFindId: string, baseUrl: string): Promise<void>;
    /**
     * Navigate directly to KYC form for a specific fact find
     * @param factFindId - The ID of the fact find
     * @param baseUrl - Base URL (required)
     */
    gotoKYCFormDirectly(factFindId: string, baseUrl: string): Promise<void>;
    /**
     * Navigate directly to client details page
     * @param clientId - The ID of the client
     * @param baseUrl - Base URL (required)
     */
    gotoClientDirectly(clientId: string, baseUrl: string): Promise<void>;
    /**
     * Navigate to dashboard/home page
     * @param baseUrl - Base URL (required)
     */
    gotoDashboard(baseUrl: string): Promise<void>;
    /**
     * Wait for page to be ready for interaction
     * @param timeout - Optional timeout in milliseconds
     */
    waitForPageReady(timeout?: number): Promise<void>;
    /**
     * Refresh the current page and wait for it to load
     */
    refreshPage(): Promise<void>;
}
/**
 * Convenience function to create a navigation helper
 * @param page - Playwright page instance
 * @returns NavigationHelper instance
 */
export declare function createNavigationHelper(page: Page): NavigationHelper;
/**
 * Direct navigation functions for use in tests
 */
export declare function gotoFactFindDirectly(page: Page, factFindId: string, baseUrl: string): Promise<void>;
export declare function gotoKYCFormDirectly(page: Page, factFindId: string, baseUrl: string): Promise<void>;
export declare function gotoClientDirectly(page: Page, clientId: string, baseUrl: string): Promise<void>;
//# sourceMappingURL=NavigationHelper.d.ts.map