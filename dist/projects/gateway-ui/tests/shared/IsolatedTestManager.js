"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageNavigator = exports.SimpleTestManager = void 0;
exports.setupIsolatedTest = setupIsolatedTest;
exports.navigateToKycPage = navigateToKycPage;
exports.navigateToRetirementPage = navigateToRetirementPage;
exports.navigateToCoreFactFindPage = navigateToCoreFactFindPage;
exports.navigateToRetirementFactFindPage = navigateToRetirementFactFindPage;
exports.navigateToRetirementKycPage = navigateToRetirementKycPage;
exports.setupIsolatedTestClient = setupIsolatedTestClient;
exports.cleanupIsolatedTestClient = cleanupIsolatedTestClient;
exports.configureIsolatedTest = configureIsolatedTest;
exports.setupKycPageTest = setupKycPageTest;
exports.cleanupKycPageTest = cleanupKycPageTest;
const test_1 = require("@playwright/test");
const TestIsolationApiClient_1 = require("@framework/utils/TestIsolationApiClient");
const TestUtils_1 = __importDefault(require("./TestUtils"));
const ActionHelper_1 = require("@framework/helpers/ActionHelper");
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
class SimpleTestManager {
    /**
     * CONSTRUCTOR - Sets up the manager with default settings
     *
     * @param customSettings - Optional custom settings (if you want to change defaults)
     */
    constructor(customSettings = {}) {
        // Set up default settings, but allow custom ones to override
        this.settings = {
            environment: customSettings.environment || 'qa',
            storageState: customSettings.storageState || 'playwright/.auth/user.json',
            timeout: customSettings.timeout || 300000 // 5 minutes
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
    setupIsolatedTest(testName, testCode) {
        test_1.test.describe(testName, () => {
            // Tell Playwright to use our login information
            test_1.test.use({ storageState: this.settings.storageState });
            // BEFORE ALL TESTS: Create a test client
            test_1.test.beforeAll(async () => {
                this.clientInfo = await this.createTestClient();
            });
            // AFTER ALL TESTS: Clean up the test client
            test_1.test.afterAll(async () => {
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
    async createTestClient() {
        // Connect to the API
        const api = new TestIsolationApiClient_1.TestIsolationApiClient(this.settings.environment);
        // Create a unique email (uses current time to make it unique)
        const email = `testuser${Date.now()}@example.com`;
        // Create the client in the system
        const response = await api.api.createClient({
            forename: 'Pipeline', // First name
            surname: 'Automation', // Last name
            emailAddress: email, // Email we just created
            migrated: true, // Technical setting
        });
        // Package up the client information
        const clientInfo = {
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
    async cleanupTestClient() {
        // Only clean up if we have a client to clean up
        if (this.clientInfo?.id && this.clientInfo?.api) {
            await this.clientInfo.api.cleanupClient(this.clientInfo.id);
        }
    }
}
exports.SimpleTestManager = SimpleTestManager;
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
class PageNavigator {
    /**
     * CONSTRUCTOR - Sets up the navigator
     *
     * @param browser - The browser instance from Playwright
     * @param factFindType - Which type of fact find to create (Core Fact Find, Retirement Fact Find, etc.)
     */
    constructor(browser, factFindType = 'Core Fact Find') {
        this.browser = browser;
        this.factFindType = factFindType;
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
    async goToKycPage(pageName) {
        try {
            // Step 1: Open the application
            this.testBase = await TestUtils_1.default.create(this.browser, 'qa');
            // Step 2: Navigate to the fact find section
            await this.testBase.factFindSteps.addClientAndNavigateToFactFindTab(this.testBase.sideNav, this.testBase.navBar);
            // Step 3: Create the specified type of fact find
            this.currentPage = await this.testBase.factFindSteps.createAndLaunchNewFactFind(this.factFindType);
            // Step 4: Go to the specific page you want
            const actionHelper = new ActionHelper_1.ActionHelper(this.currentPage);
            await actionHelper.selectCustomRadioOptionByLabel(pageName);
            return this.currentPage;
        }
        catch (error) {
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
    async cleanup() {
        // Close the current page (if we have one)
        if (this.currentPage) {
            try {
                await this.currentPage.close();
            }
            catch (error) {
                console.warn('Could not close page:', error);
            }
        }
        // Clean up the test base (if we have one)
        if (this.testBase) {
            try {
                await this.testBase.cleanup();
            }
            catch (error) {
                console.warn('Could not clean up test base:', error);
            }
        }
    }
}
exports.PageNavigator = PageNavigator;
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
function setupIsolatedTest(testName, testCode) {
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
async function navigateToKycPage(browser, pageName) {
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
async function navigateToRetirementPage(browser, pageName) {
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
async function navigateToCoreFactFindPage(browser, pageName) {
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
async function navigateToRetirementFactFindPage(browser, pageName) {
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
async function navigateToRetirementKycPage(browser, pageName) {
    const navigator = new PageNavigator(browser);
    const page = await navigator.goToKycPage(pageName);
    return { page, navigator };
}
async function setupIsolatedTestClient() {
    const manager = new SimpleTestManager();
    return await manager.createTestClient();
}
async function cleanupIsolatedTestClient(client) {
    if (client.id && client.api) {
        await client.api.cleanupClient(client.id);
    }
}
function configureIsolatedTest(testName, testCode) {
    setupIsolatedTest(testName, testCode);
}
async function setupKycPageTest(browser, pageName) {
    const { page, navigator } = await navigateToKycPage(browser, pageName);
    return { testBase: navigator, kycPage: page };
}
async function cleanupKycPageTest(navigator) {
    await navigator.cleanup();
}
//# sourceMappingURL=IsolatedTestManager.js.map