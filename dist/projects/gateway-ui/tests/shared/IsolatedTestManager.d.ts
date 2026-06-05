/**
 * ISOLATED TEST MANAGER - JUNIOR DEVELOPER FRIENDLY
 *
 * This file helps you write isolated tests without repeating code.
 * It follows SOLID principles and OOP best practices in a simple way.
 *
 * WHAT THIS FILE DOES:
 * - Removes duplicated code from test files
 * - Makes test setup super easy
 * - Follows good coding practices
 * - Easy to understand and use
 *
 * HOW TO USE:
 * 1. Import the classes you need
 * 2. Create a test manager
 * 3. Use it in your test files
 *
 * EXAMPLE:
 * ```typescript
 * const testManager = new SimpleTestManager();
 * testManager.setupIsolatedTest('My Test', () => {
 *   // Your test code here
 * });
 * ```
 */
import { Browser, Page } from '@playwright/test';
import { TestIsolationApiClient } from '@framework/utils/TestIsolationApiClient';
/**
 * What information we store about a test client
 * This is like a blueprint for client data
 */
export interface TestClientInfo {
    readonly id: string;
    readonly email: string;
    readonly api: TestIsolationApiClient;
}
/**
 * Settings for our tests
 * This is like a blueprint for test configuration
 */
export interface TestSettings {
    readonly environment: 'qa' | 'dev';
    readonly storageState: string;
    readonly timeout: number;
}
/**
 * SIMPLE TEST MANAGER
 *
 * This is the main class that handles all test setup and cleanup.
 * It's designed to be super easy to use by junior developers.
 *
 * WHAT IT DOES:
 * - Creates test clients automatically
 * - Cleans up after tests
 * - Handles all the boring setup stuff
 * - Makes your test files much shorter
 *
 * HOW TO USE:
 * ```typescript
 * const manager = new SimpleTestManager();
 * manager.setupIsolatedTest('My Test Name', () => {
 *   test('should do something', async ({ browser }) => {
 *     // Your test code here
 *   });
 * });
 * ```
 */
export declare class SimpleTestManager {
    private settings;
    private clientInfo?;
    /**
     * CONSTRUCTOR - Sets up the manager with default settings
     *
     * @param customSettings - Optional custom settings (if you want to change defaults)
     */
    constructor(customSettings?: Partial<TestSettings>);
    /**
     * MAIN METHOD - Sets up an isolated test with all the boring stuff handled
     *
     * This method does ALL the setup work that you normally have to copy/paste:
     * - Sets up storage state
     * - Creates a test client before tests run
     * - Cleans up the client after tests finish
     * - Wraps your test code in a describe block
     *
     * @param testName - The name for your test (shows in test results)
     * @param testCode - The actual test code (the fun part!)
     */
    setupIsolatedTest(testName: string, testCode: () => void): void;
    /**
     * CREATES A TEST CLIENT - Makes a fake client for testing
     *
     * This method:
     * 1. Creates an API connection
     * 2. Makes a unique email address
     * 3. Creates a client in the system
     * 4. Returns the client information
     *
     * @returns Promise with client information
     */
    private createTestClient;
    /**
     * CLEANS UP TEST CLIENT - Removes the fake client after testing
     *
     * This method makes sure we don't leave test data lying around.
     * It's like cleaning up your desk after you're done working.
     */
    private cleanupTestClient;
}
/**
 * PAGE NAVIGATOR
 *
 * This class helps you navigate to different pages in the application.
 * It's like a GPS for your tests - it knows how to get where you want to go.
 *
 * WHAT IT DOES:
 * - Opens the application
 * - Navigates to specific KYC pages
 * - Cleans up when you're done
 *
 * HOW TO USE:
 * ```typescript
 * const navigator = new PageNavigator(browser);
 * const page = await navigator.goToKycPage('Income');
 * // Do your test stuff
 * await navigator.cleanup();
 * ```
 */
export declare class PageNavigator {
    private readonly browser;
    private readonly factFindType;
    private testBase?;
    private currentPage?;
    /**
     * CONSTRUCTOR - Sets up the navigator
     *
     * @param browser - The browser instance from Playwright
     * @param factFindType - Which type of fact find to create (Core Fact Find, Retirement Fact Find, etc.)
     */
    constructor(browser: Browser, factFindType?: string);
    /**
     * GO TO KYC PAGE - Navigates to a specific KYC form page
     *
     * This method does all the navigation work:
     * 1. Opens the application
     * 2. Logs in (using stored credentials)
     * 3. Creates a new fact find
     * 4. Goes to the specific page you want
     *
     * @param pageName - Which KYC page to go to (e.g., 'Income', 'Current Situation')
     * @returns The page object you can use for testing
     */
    goToKycPage(pageName: string): Promise<Page>;
    /**
     * CLEANUP - Closes pages and cleans up resources
     *
     * This method makes sure we don't leave browser pages open.
     * Always call this when you're done with your test!
     */
    cleanup(): Promise<void>;
}
/**
 * EASY SETUP FUNCTION - The simplest way to set up an isolated test
 *
 * This is a shortcut function that creates a SimpleTestManager for you.
 * Perfect for junior developers who just want to get started quickly.
 *
 * @param testName - Name for your test
 * @param testCode - Your test code
 *
 * @example
 * ```typescript
 * setupIsolatedTest('My Test', () => {
 *   test('should work', async ({ browser }) => {
 *     // Your test here
 *   });
 * });
 * ```
 */
export declare function setupIsolatedTest(testName: string, testCode: () => void): void;
/**
 * EASY NAVIGATION FUNCTION - The simplest way to navigate to a KYC page
 *
 * This function creates a PageNavigator and navigates to your page.
 * Returns both the page and the navigator so you can clean up later.
 *
 * @param browser - Browser instance from Playwright
 * @param pageName - Which page to go to
 * @returns Object with the page and navigator
 *
 * @example
 * ```typescript
 * const { page, navigator } = await navigateToKycPage(browser, 'Income');
 * // Do your test stuff
 * await navigator.cleanup();
 * ```
 */
export declare function navigateToKycPage(browser: Browser, pageName: string): Promise<{
    page: Page;
    navigator: PageNavigator;
}>;
/**
 * RETIREMENT PAGE NAVIGATION - Simple function for Retirement Fact Find tests
 *
 * This function is exactly like navigateToKycPage but creates a Retirement Fact Find.
 * Use this for all retirement-related isolated tests.
 *
 * @param browser - Browser instance from Playwright
 * @param pageName - Which retirement page to go to (e.g., 'Annuity', 'Purpose')
 * @returns Object with the page and navigator
 *
 * @example
 * ```typescript
 * const { page, navigator } = await navigateToRetirementPage(browser, 'Annuity');
 * // Do your test stuff
 * await navigator.cleanup();
 * ```
 */
export declare function navigateToRetirementPage(browser: Browser, pageName: string): Promise<{
    page: Page;
    navigator: PageNavigator;
}>;
/**
 * CORE FACT FIND NAVIGATION - Specifically for Core Fact Find tests
 *
 * This function is explicitly for Core Fact Find tests.
 * Makes it clear which type of fact find you're testing.
 *
 * @param browser - Browser instance from Playwright
 * @param pageName - Which Core Fact Find page to go to
 * @returns Object with the page and navigator
 */
export declare function navigateToCoreFactFindPage(browser: Browser, pageName: string): Promise<{
    page: Page;
    navigator: PageNavigator;
}>;
/**
 * RETIREMENT FACT FIND NAVIGATION - Specifically for Retirement Fact Find tests
 *
 * This function is explicitly for Retirement Fact Find tests.
 * Makes it clear which type of fact find you're testing.
 *
 * @param browser - Browser instance from Playwright
 * @param pageName - Which Retirement Fact Find page to go to
 * @returns Object with the page and navigator
 */
export declare function navigateToRetirementFactFindPage(browser: Browser, pageName: string): Promise<{
    page: Page;
    navigator: PageNavigator;
}>;
/**
 * RETIREMENT FACT FIND NAVIGATION - For retirement-specific tests
 *
 * This function is specifically for Retirement Fact Find tests.
 * It creates the correct type of fact find and navigates to the page.
 *
 * @param browser - Browser instance from Playwright
 * @param pageName - Which retirement page to go to
 * @returns Object with the page and navigator
 *
 * @example
 * ```typescript
 * const { page, navigator } = await navigateToRetirementKycPage(browser, 'Annuity');
 * // Do your test stuff
 * await navigator.cleanup();
 * ```
 */
export declare function navigateToRetirementKycPage(browser: Browser, pageName: string): Promise<{
    page: Page;
    navigator: PageNavigator;
}>;
/**
 * These are the old function names that existing code might use.
 * They work exactly the same as the new ones, so old code won't break.
 */
export interface IsolatedTestSetup extends TestClientInfo {
}
export declare function setupIsolatedTestClient(): Promise<TestClientInfo>;
export declare function cleanupIsolatedTestClient(client: TestClientInfo): Promise<void>;
export declare function configureIsolatedTest(testName: string, testCode: () => void): void;
export declare function setupKycPageTest(browser: Browser, pageName: string): Promise<{
    testBase: any;
    kycPage: Page;
}>;
export declare function cleanupKycPageTest(navigator: PageNavigator): Promise<void>;
//# sourceMappingURL=IsolatedTestManager.d.ts.map