"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationHelper = void 0;
exports.createNavigationHelper = createNavigationHelper;
exports.gotoFactFindDirectly = gotoFactFindDirectly;
exports.gotoKYCFormDirectly = gotoKYCFormDirectly;
exports.gotoClientDirectly = gotoClientDirectly;
const Logger_1 = require("../utils/Logger");
/**
 * Navigation helper for direct access to application states
 * Bypasses UI navigation for faster, more reliable test execution
 */
class NavigationHelper {
    constructor(page) {
        this.page = page;
        this.logger = (0, Logger_1.createLogger)('NavigationHelper');
    }
    /**
     * Navigate directly to a fact find by ID, bypassing UI navigation
     * @param factFindId - The ID of the fact find to navigate to
     * @param baseUrl - Base URL (required)
     */
    async gotoFactFindDirectly(factFindId, baseUrl) {
        const factFindUrl = `${baseUrl}/clients/fact-finds/${factFindId}`;
        this.logger.info(`Navigating directly to fact find: ${factFindUrl}`);
        await this.page.goto(factFindUrl, {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        // Wait for the fact find page to load
        await this.page.waitForLoadState('domcontentloaded');
        this.logger.info(`Successfully navigated to fact find ${factFindId}`);
    }
    /**
     * Navigate directly to KYC form for a specific fact find
     * @param factFindId - The ID of the fact find
     * @param baseUrl - Base URL (required)
     */
    async gotoKYCFormDirectly(factFindId, baseUrl) {
        // Try different possible KYC URL patterns
        const possibleUrls = [
            `${baseUrl}/kyc/${factFindId}`,
            `${baseUrl}/clients/fact-finds/${factFindId}/kyc`,
            `${baseUrl}/fact-finds/${factFindId}/kyc`,
            `${baseUrl}/kyc?factFindId=${factFindId}`
        ];
        for (const kycUrl of possibleUrls) {
            try {
                this.logger.info(`Trying KYC URL: ${kycUrl}`);
                await this.page.goto(kycUrl, {
                    waitUntil: 'networkidle',
                    timeout: 15000
                });
                // Wait for page to load
                await this.page.waitForLoadState('domcontentloaded');
                // Check if we're on the right page by looking for KYC indicators
                const hasKycContent = await this.page.locator('text=Fact Find Details').or(this.page.locator('text=KYC')).or(this.page.locator('text=Personal Details')).first().isVisible({ timeout: 5000 }).catch(() => false);
                if (hasKycContent) {
                    this.logger.info(`Successfully navigated to KYC form for fact find ${factFindId} using URL: ${kycUrl}`);
                    return;
                }
                this.logger.warn(`URL ${kycUrl} did not load KYC content, trying next...`);
            }
            catch (error) {
                this.logger.warn(`Failed to load ${kycUrl}: ${error}`);
                continue;
            }
        }
        throw new Error(`Could not navigate to KYC form for fact find ${factFindId}. Tried URLs: ${possibleUrls.join(', ')}`);
    }
    /**
     * Navigate directly to client details page
     * @param clientId - The ID of the client
     * @param baseUrl - Base URL (required)
     */
    async gotoClientDirectly(clientId, baseUrl) {
        const clientUrl = `${baseUrl}/clients/${clientId}`;
        this.logger.info(`Navigating directly to client: ${clientUrl}`);
        await this.page.goto(clientUrl, {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await this.page.waitForLoadState('domcontentloaded');
        this.logger.info(`Successfully navigated to client ${clientId}`);
    }
    /**
     * Navigate to dashboard/home page
     * @param baseUrl - Base URL (required)
     */
    async gotoDashboard(baseUrl) {
        this.logger.info(`Navigating to dashboard: ${baseUrl}`);
        await this.page.goto(baseUrl, {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await this.page.waitForLoadState('domcontentloaded');
        this.logger.info('Successfully navigated to dashboard');
    }
    /**
     * Wait for page to be ready for interaction
     * @param timeout - Optional timeout in milliseconds
     */
    async waitForPageReady(timeout = 10000) {
        this.logger.info('Waiting for page to be ready...');
        // Wait for network to be idle
        await this.page.waitForLoadState('networkidle', { timeout });
        // Wait for any loading indicators to disappear
        try {
            await this.page.waitForSelector('[data-testid="loading"], .loading, .spinner', {
                state: 'hidden',
                timeout: 5000
            });
        }
        catch {
            // Loading indicators might not exist, which is fine
        }
        this.logger.info('Page is ready for interaction');
    }
    /**
     * Refresh the current page and wait for it to load
     */
    async refreshPage() {
        this.logger.info('Refreshing page...');
        await this.page.reload({
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await this.waitForPageReady();
        this.logger.info('Page refreshed successfully');
    }
}
exports.NavigationHelper = NavigationHelper;
/**
 * Convenience function to create a navigation helper
 * @param page - Playwright page instance
 * @returns NavigationHelper instance
 */
function createNavigationHelper(page) {
    return new NavigationHelper(page);
}
/**
 * Direct navigation functions for use in tests
 */
async function gotoFactFindDirectly(page, factFindId, baseUrl) {
    const helper = new NavigationHelper(page);
    await helper.gotoFactFindDirectly(factFindId, baseUrl);
}
async function gotoKYCFormDirectly(page, factFindId, baseUrl) {
    const helper = new NavigationHelper(page);
    await helper.gotoKYCFormDirectly(factFindId, baseUrl);
}
async function gotoClientDirectly(page, clientId, baseUrl) {
    const helper = new NavigationHelper(page);
    await helper.gotoClientDirectly(clientId, baseUrl);
}
//# sourceMappingURL=NavigationHelper.js.map