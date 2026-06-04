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

import { test, Browser, Page } from '@playwright/test';
import { TestIsolationApiClient } from '@framework/utils/TestIsolationApiClient';
import BaseTest from './TestUtils';
import { ActionHelper } from '@framework/helpers/ActionHelper';

// ============================================================================
// INTERFACES - These define what our objects should look like
// ============================================================================

/**
 * What information we store about a test client
 * This is like a blueprint for client data
 */
export interface TestClientInfo {
  readonly id: string;           // Client ID (can't be changed)
  readonly email: string;        // Client email (can't be changed)
  readonly api: TestIsolationApiClient;  // API connection (can't be changed)
}

/**
 * Settings for our tests
 * This is like a blueprint for test configuration
 */
export interface TestSettings {
  readonly environment: 'qa' | 'dev';    // Which environment to test
  readonly storageState: string;         // Where to store login info
  readonly timeout: number;              // How long to wait for tests
}

// ============================================================================
// SIMPLE TEST MANAGER - The main class that does everything
// ============================================================================

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
export class SimpleTestManager {
  // Private properties (only this class can access them)
  private settings: TestSettings;
  private clientInfo?: TestClientInfo;

  /**
   * CONSTRUCTOR - Sets up the manager with default settings
   * 
   * @param customSettings - Optional custom settings (if you want to change defaults)
   */
  constructor(customSettings: Partial<TestSettings> = {}) {
    // Set up default settings, but allow custom ones to override
    this.settings = {
      environment: customSettings.environment || 'qa',
      storageState: customSettings.storageState || 'playwright/.auth/user.json',
      timeout: customSettings.timeout || 300_000  // 5 minutes
    };
  }

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
  setupIsolatedTest(testName: string, testCode: () => void): void {
    test.describe(testName, () => {
      // Tell Playwright to use our login information
      test.use({ storageState: this.settings.storageState });

      // BEFORE ALL TESTS: Create a test client
      test.beforeAll(async () => {
        this.clientInfo = await this.createTestClient();
      });

      // AFTER ALL TESTS: Clean up the test client
      test.afterAll(async () => {
        await this.cleanupTestClient();
      });

      // RUN YOUR ACTUAL TEST CODE
      testCode();
    });
  }

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
  private async createTestClient(): Promise<TestClientInfo> {
    // Connect to the API
    const api = new TestIsolationApiClient(this.settings.environment);
    
    // Create a unique email (uses current time to make it unique)
    const email = `testuser${Date.now()}@example.com`;

    // Create the client in the system
    const response = await api.api.createClient({
      forename: 'Pipeline',      // First name
      surname: 'Automation',     // Last name
      emailAddress: email,       // Email we just created
      migrated: true,           // Technical setting
    });

    // Package up the client information
    const clientInfo: TestClientInfo = {
      id: response.id,
      email: email,
      api: api
    };

    return clientInfo;
  }

  /**
   * CLEANS UP TEST CLIENT - Removes the fake client after testing
   * 
   * This method makes sure we don't leave test data lying around.
   * It's like cleaning up your desk after you're done working.
   */
  private async cleanupTestClient(): Promise<void> {
    // Only clean up if we have a client to clean up
    if (this.clientInfo?.id && this.clientInfo?.api) {
      await this.clientInfo.api.cleanupClient(this.clientInfo.id);
    }
  }
}

// ============================================================================
// PAGE NAVIGATOR - Handles moving around in the application
// ============================================================================

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
export class PageNavigator {
  // Private properties (only this class can access them)
  private testBase?: BaseTest;
  private currentPage?: Page;

  /**
   * CONSTRUCTOR - Sets up the navigator
   *
   * @param browser - The browser instance from Playwright
   * @param factFindType - Which type of fact find to create (Core Fact Find, Retirement Fact Find, etc.)
   */
  constructor(
    private readonly browser: Browser,
    private readonly factFindType: string = 'Core Fact Find'
  ) {
    // The browser and fact find type are stored so we can use them later
  }

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
  async goToKycPage(pageName: string): Promise<Page> {
    try {
      // Step 1: Open the application
      this.testBase = await BaseTest.create(this.browser, 'qa');

      // Step 2: Navigate to the fact find section
      await this.testBase.factFindSteps.addClientAndNavigateToFactFindTab(
        this.testBase.sideNav,
        this.testBase.navBar
      );

      // Step 3: Create the specified type of fact find
      this.currentPage = await this.testBase.factFindSteps.createAndLaunchNewFactFind(this.factFindType);

      // Step 4: Go to the specific page you want
      const actionHelper = new ActionHelper(this.currentPage);
      await actionHelper.selectCustomRadioOptionByLabel(pageName);

      return this.currentPage;

    } catch (error) {
      // If something goes wrong, clean up and throw the error
      await this.cleanup();
      throw error;
    }
  }

  /**
   * CLEANUP - Closes pages and cleans up resources
   * 
   * This method makes sure we don't leave browser pages open.
   * Always call this when you're done with your test!
   */
  async cleanup(): Promise<void> {
    // Close the current page (if we have one)
    if (this.currentPage) {
      try {
        await this.currentPage.close();
      } catch (error) {
        console.warn('Could not close page:', error);
      }
    }

    // Clean up the test base (if we have one)
    if (this.testBase) {
      try {
        await this.testBase.cleanup();
      } catch (error) {
        console.warn('Could not clean up test base:', error);
      }
    }
  }
}

// ============================================================================
// CONVENIENCE FUNCTIONS - Easy-to-use functions for common tasks
// ============================================================================

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
export function setupIsolatedTest(testName: string, testCode: () => void): void {
  const manager = new SimpleTestManager();
  manager.setupIsolatedTest(testName, testCode);
}

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
export async function navigateToKycPage(browser: Browser, pageName: string): Promise<{ page: Page; navigator: PageNavigator }> {
  const navigator = new PageNavigator(browser);
  const page = await navigator.goToKycPage(pageName);
  
  return { page, navigator };
}

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
export async function navigateToRetirementPage(browser: Browser, pageName: string): Promise<{ page: Page; navigator: PageNavigator }> {
  const navigator = new PageNavigator(browser, 'Retirement Fact Find');
  const page = await navigator.goToKycPage(pageName);
  
  return { page, navigator };
}

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
export async function navigateToCoreFactFindPage(browser: Browser, pageName: string): Promise<{ page: Page; navigator: PageNavigator }> {
  const navigator = new PageNavigator(browser);
  const page = await navigator.goToKycPage(pageName);
  
  return { page, navigator };
}

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
export async function navigateToRetirementFactFindPage(browser: Browser, pageName: string): Promise<{ page: Page; navigator: PageNavigator }> {
  const navigator = new PageNavigator(browser, 'Retirement Fact Find');
  const page = await navigator.goToKycPage(pageName);
  
  return { page, navigator };
}

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
export async function navigateToRetirementKycPage(browser: Browser, pageName: string): Promise<{ page: Page; navigator: PageNavigator }> {
  const navigator = new PageNavigator(browser);
  const page = await navigator.goToKycPage(pageName);
  
  return { page, navigator };
}

// ============================================================================
// BACKWARD COMPATIBILITY - For existing code that uses the old functions
// ============================================================================

/**
 * These are the old function names that existing code might use.
 * They work exactly the same as the new ones, so old code won't break.
 */

export interface IsolatedTestSetup extends TestClientInfo {}

export async function setupIsolatedTestClient(): Promise<TestClientInfo> {
  const manager = new SimpleTestManager();
  return await (manager as any).createTestClient();
}

export async function cleanupIsolatedTestClient(client: TestClientInfo): Promise<void> {
  if (client.id && client.api) {
    await client.api.cleanupClient(client.id);
  }
}

export function configureIsolatedTest(testName: string, testCode: () => void): void {
  setupIsolatedTest(testName, testCode);
}

export async function setupKycPageTest(browser: Browser, pageName: string): Promise<{ testBase: any; kycPage: Page }> {
  const { page, navigator } = await navigateToKycPage(browser, pageName);
  return { testBase: navigator, kycPage: page };
}

export async function cleanupKycPageTest(navigator: PageNavigator): Promise<void> {
  await navigator.cleanup();
}
