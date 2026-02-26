"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiSetup = exports.mobileSetup = exports.sharedTeardown = exports.adminSetup = exports.legacyAuthenticatedSetup = exports.authenticatedSetup = exports.authSetup = exports.contactSetup = exports.loginSetup = exports.sharedSetup = exports.testSetupManager = exports.TestSetupManager = void 0;
const EnvManager_1 = require("../config/EnvManager");
const secrets_1 = require("../config/secrets");
const AuthSteps_1 = require("../steps/AuthSteps");
const DashboardSteps_1 = require("../steps/DashboardSteps");
const ContactSteps_1 = require("../steps/ContactSteps");
class TestSetupManager {
    constructor() { }
    static getInstance() {
        if (!TestSetupManager.instance) {
            TestSetupManager.instance = new TestSetupManager();
        }
        return TestSetupManager.instance;
    }
    /**
     * Create a new browser context and page
     */
    async createContext(browser) {
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 },
            ignoreHTTPSErrors: true,
            acceptDownloads: true,
            permissions: ['geolocation', 'notifications'],
            recordVideo: EnvManager_1.envManager.shouldEnableVideo() ? {
                dir: 'test-results/videos/',
                size: { width: 1920, height: 1080 }
            } : undefined,
            recordHar: EnvManager_1.envManager.isDevelopment() ? {
                path: 'test-results/har/trace.har'
            } : undefined,
        });
        // Set up tracing if enabled
        if (EnvManager_1.envManager.shouldEnableTrace()) {
            await context.tracing.start({
                screenshots: true,
                snapshots: true,
                sources: true
            });
        }
        return context;
    }
    /**
     * Create a new page from context
     */
    async createPage(context) {
        const page = await context.newPage();
        // Set up console logging in development
        if (EnvManager_1.envManager.isDevelopment()) {
            page.on('console', msg => {
                console.log(`[${msg.type()}] ${msg.text()}`);
            });
            page.on('pageerror', error => {
                console.error('Page error:', error);
            });
            page.on('requestfailed', request => {
                console.error('Request failed:', request.url(), request.failure()?.errorText);
            });
        }
        return page;
    }
    /**
     * Basic setup - creates context and page, navigates to base URL
     */
    async sharedSetup(browser) {
        const context = await this.createContext(browser);
        const page = await this.createPage(context);
        // Navigate to base URL
        await page.goto(EnvManager_1.envManager.getBaseUrl(), {
            waitUntil: 'domcontentloaded',
            timeout: EnvManager_1.envManager.getTimeout()
        });
        return {
            page,
            context,
            browser
        };
    }
    /**
     * Setup with login functionality (legacy - kept for backward compatibility)
     */
    async loginSetup(browser) {
        const baseSetup = await this.sharedSetup(browser);
        // Since LoginSteps was removed, we'll use AuthSteps for login functionality
        const loginSteps = new AuthSteps_1.AuthSteps(baseSetup.page);
        return {
            ...baseSetup,
            loginSteps
        };
    }
    /**
     * Setup with contact form functionality
     */
    async contactSetup(browser) {
        const baseSetup = await this.sharedSetup(browser);
        // Create ContactSteps instance
        const contactSteps = new ContactSteps_1.ContactSteps(baseSetup.page);
        return {
            ...baseSetup,
            contactSteps
        };
    }
    /**
     * Setup for OAuth authentication tests
     */
    async authSetup(browser) {
        const baseSetup = await this.sharedSetup(browser);
        // Create AuthSteps and DashboardSteps instances
        const authSteps = new AuthSteps_1.AuthSteps(baseSetup.page);
        const dashboardSteps = new DashboardSteps_1.DashboardSteps(baseSetup.page);
        return {
            ...baseSetup,
            authSteps,
            dashboardSteps
        };
    }
    /**
     * Setup for authenticated user tests (OAuth flow)
     */
    async authenticatedSetup(browser) {
        const setup = await this.authSetup(browser);
        // Auto-authenticate using OAuth flow
        await setup.authSteps.authenticateUser();
        return setup;
    }
    /**
     * Legacy setup for authenticated user tests (keeping for backward compatibility)
     */
    async legacyAuthenticatedSetup(browser) {
        const setup = await this.loginSetup(browser);
        // Auto-login with test credentials (if login steps still exist)
        try {
            const credentials = secrets_1.secrets.getTestCredentials();
            await setup.loginSteps.loginSuccessfully(credentials.username, credentials.password);
        }
        catch (error) {
            console.warn('Legacy login method failed, this is expected if using OAuth flow');
            throw error;
        }
        return setup;
    }
    /**
     * Setup for admin user tests (OAuth flow)
     */
    async adminSetup(browser) {
        const setup = await this.authSetup(browser);
        // Auto-authenticate using OAuth flow (admin and regular users use same OAuth)
        await setup.authSteps.authenticateUser();
        return setup;
    }
    /**
     * Teardown - cleanup context and save traces
     */
    async sharedTeardown(setup) {
        // Handle case where setup failed and is undefined
        if (!setup || !setup.page || !setup.context) {
            console.warn('Teardown called with invalid setup, skipping cleanup');
            return;
        }
        const { page, context } = setup;
        try {
            // Save trace if enabled
            if (EnvManager_1.envManager.shouldEnableTrace()) {
                await context.tracing.stop({
                    path: `test-results/traces/trace-${Date.now()}.zip`
                });
            }
            // Take final screenshot if enabled
            if (EnvManager_1.envManager.shouldEnableScreenshots()) {
                await page.screenshot({
                    path: `test-results/screenshots/final-${Date.now()}.png`,
                    fullPage: true
                });
            }
            // Clear storage
            await this.clearBrowserStorage(page);
            // Close context (this also closes all pages)
            await context.close();
        }
        catch (error) {
            console.error('Error during teardown:', error);
            // Force close context even if there's an error
            try {
                await context.close();
            }
            catch (closeError) {
                console.error('Error closing context:', closeError);
            }
        }
    }
    /**
     * Clear browser storage
     */
    async clearBrowserStorage(page) {
        try {
            // Clear cookies
            await page.context().clearCookies();
            // Clear local and session storage
            await page.evaluate(() => {
                localStorage.clear();
                sessionStorage.clear();
            });
            // Clear any remaining pages in context
            const allPages = page.context().pages();
            for (const p of allPages) {
                if (p !== page && !p.isClosed()) {
                    await p.close();
                }
            }
        }
        catch (error) {
            console.error('Error clearing browser storage:', error);
        }
    }
    /**
     * Setup for mobile testing
     */
    async mobileSetup(browser, device) {
        const { devices } = await Promise.resolve().then(() => __importStar(require('@playwright/test')));
        const deviceConfig = device ? devices[device] : devices['iPhone 12'];
        const context = await browser.newContext({
            ...deviceConfig,
            ignoreHTTPSErrors: true,
            acceptDownloads: true,
        });
        const page = await context.newPage();
        await page.goto(EnvManager_1.envManager.getBaseUrl());
        return {
            page,
            context,
            browser
        };
    }
    /**
     * Setup for API testing (headless context)
     */
    async apiSetup(browser) {
        const context = await browser.newContext({
            ignoreHTTPSErrors: true,
            extraHTTPHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const page = await context.newPage();
        return {
            page,
            context,
            browser
        };
    }
    /**
     * Setup with custom viewport
     */
    async customViewportSetup(browser, width, height) {
        const context = await browser.newContext({
            viewport: { width, height },
            ignoreHTTPSErrors: true,
            acceptDownloads: true,
        });
        const page = await context.newPage();
        await page.goto(EnvManager_1.envManager.getBaseUrl());
        return {
            page,
            context,
            browser
        };
    }
    /**
     * Setup with geolocation
     */
    async geolocationSetup(browser, latitude, longitude) {
        const context = await browser.newContext({
            geolocation: { latitude, longitude },
            permissions: ['geolocation'],
            ignoreHTTPSErrors: true,
        });
        const page = await context.newPage();
        await page.goto(EnvManager_1.envManager.getBaseUrl());
        return {
            page,
            context,
            browser
        };
    }
    /**
     * Setup with timezone
     */
    async timezoneSetup(browser, timezone) {
        const context = await browser.newContext({
            timezoneId: timezone,
            ignoreHTTPSErrors: true,
        });
        const page = await context.newPage();
        await page.goto(EnvManager_1.envManager.getBaseUrl());
        return {
            page,
            context,
            browser
        };
    }
    /**
     * Setup with locale
     */
    async localeSetup(browser, locale) {
        const context = await browser.newContext({
            locale: locale,
            ignoreHTTPSErrors: true,
        });
        const page = await context.newPage();
        await page.goto(EnvManager_1.envManager.getBaseUrl());
        return {
            page,
            context,
            browser
        };
    }
}
exports.TestSetupManager = TestSetupManager;
// Export singleton instance and convenience functions
exports.testSetupManager = TestSetupManager.getInstance();
// Convenience functions for common setups
const sharedSetup = (browser) => exports.testSetupManager.sharedSetup(browser);
exports.sharedSetup = sharedSetup;
const loginSetup = (browser) => exports.testSetupManager.loginSetup(browser);
exports.loginSetup = loginSetup;
const contactSetup = (browser) => exports.testSetupManager.contactSetup(browser);
exports.contactSetup = contactSetup;
const authSetup = (browser) => exports.testSetupManager.authSetup(browser);
exports.authSetup = authSetup;
const authenticatedSetup = (browser) => exports.testSetupManager.authenticatedSetup(browser);
exports.authenticatedSetup = authenticatedSetup;
const legacyAuthenticatedSetup = (browser) => exports.testSetupManager.legacyAuthenticatedSetup(browser);
exports.legacyAuthenticatedSetup = legacyAuthenticatedSetup;
const adminSetup = (browser) => exports.testSetupManager.adminSetup(browser);
exports.adminSetup = adminSetup;
const sharedTeardown = (setup) => exports.testSetupManager.sharedTeardown(setup);
exports.sharedTeardown = sharedTeardown;
const mobileSetup = (browser, device) => exports.testSetupManager.mobileSetup(browser, device);
exports.mobileSetup = mobileSetup;
const apiSetup = (browser) => exports.testSetupManager.apiSetup(browser);
exports.apiSetup = apiSetup;
//# sourceMappingURL=TestSetup.js.map