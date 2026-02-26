import { Browser, BrowserContext, Page } from '@playwright/test';
/**
 * Central TestSetup class for managing browser and page setup/teardown
 * Provides reusable setup and teardown methods for all tests
 */
export interface TestSetup {
    page: Page;
    context: BrowserContext;
    browser: Browser;
}
export interface LoginTestSetup extends TestSetup {
    loginSteps: any;
}
export interface AuthTestSetup extends TestSetup {
    authSteps: any;
    dashboardSteps: any;
}
export interface ContactTestSetup extends TestSetup {
    contactSteps: any;
}
export declare class TestSetupManager {
    private static instance;
    private constructor();
    static getInstance(): TestSetupManager;
    /**
     * Create a new browser context and page
     */
    createContext(browser: Browser): Promise<BrowserContext>;
    /**
     * Create a new page from context
     */
    createPage(context: BrowserContext): Promise<Page>;
    /**
     * Basic setup - creates context and page, navigates to base URL
     */
    sharedSetup(browser: Browser): Promise<TestSetup>;
    /**
     * Setup with login functionality (legacy - kept for backward compatibility)
     */
    loginSetup(browser: Browser): Promise<LoginTestSetup>;
    /**
     * Setup with contact form functionality
     */
    contactSetup(browser: Browser): Promise<ContactTestSetup>;
    /**
     * Setup for OAuth authentication tests
     */
    authSetup(browser: Browser): Promise<AuthTestSetup>;
    /**
     * Setup for authenticated user tests (OAuth flow)
     */
    authenticatedSetup(browser: Browser): Promise<AuthTestSetup>;
    /**
     * Legacy setup for authenticated user tests (keeping for backward compatibility)
     */
    legacyAuthenticatedSetup(browser: Browser): Promise<LoginTestSetup>;
    /**
     * Setup for admin user tests (OAuth flow)
     */
    adminSetup(browser: Browser): Promise<AuthTestSetup>;
    /**
     * Teardown - cleanup context and save traces
     */
    sharedTeardown(setup: TestSetup | undefined): Promise<void>;
    /**
     * Clear browser storage
     */
    clearBrowserStorage(page: Page): Promise<void>;
    /**
     * Setup for mobile testing
     */
    mobileSetup(browser: Browser, device?: string): Promise<TestSetup>;
    /**
     * Setup for API testing (headless context)
     */
    apiSetup(browser: Browser): Promise<TestSetup>;
    /**
     * Setup with custom viewport
     */
    customViewportSetup(browser: Browser, width: number, height: number): Promise<TestSetup>;
    /**
     * Setup with geolocation
     */
    geolocationSetup(browser: Browser, latitude: number, longitude: number): Promise<TestSetup>;
    /**
     * Setup with timezone
     */
    timezoneSetup(browser: Browser, timezone: string): Promise<TestSetup>;
    /**
     * Setup with locale
     */
    localeSetup(browser: Browser, locale: string): Promise<TestSetup>;
}
export declare const testSetupManager: TestSetupManager;
export declare const sharedSetup: (browser: Browser) => Promise<TestSetup>;
export declare const loginSetup: (browser: Browser) => Promise<LoginTestSetup>;
export declare const contactSetup: (browser: Browser) => Promise<ContactTestSetup>;
export declare const authSetup: (browser: Browser) => Promise<AuthTestSetup>;
export declare const authenticatedSetup: (browser: Browser) => Promise<AuthTestSetup>;
export declare const legacyAuthenticatedSetup: (browser: Browser) => Promise<LoginTestSetup>;
export declare const adminSetup: (browser: Browser) => Promise<AuthTestSetup>;
export declare const sharedTeardown: (setup: TestSetup | undefined) => Promise<void>;
export declare const mobileSetup: (browser: Browser, device?: string) => Promise<TestSetup>;
export declare const apiSetup: (browser: Browser) => Promise<TestSetup>;
//# sourceMappingURL=TestSetup.d.ts.map