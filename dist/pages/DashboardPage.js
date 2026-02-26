"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPage = void 0;
const BasePage_1 = require("../core/BasePage");
/**
 * DashboardPage - Page Object Model for the main development dashboard
 * Contains all locators and interactions for the dashboard and side menu navigation
 */
class DashboardPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    // Locators
    get locators() {
        return {
            // Dashboard header
            dashboardTitle: this.locatorHelper.getByText('Development Dashboard'),
            userProfile: this.locatorHelper.getByTestId('user-profile') ||
                this.locatorHelper.getLocator('.user-profile'),
            logoutButton: this.locatorHelper.getByText('Log out'),
            // Search functionality
            searchInput: this.locatorHelper.getInputByPlaceholder('Search For Clients,Policies,Advisers') ||
                this.locatorHelper.getByTestId('search-input'),
            // Dashboard metrics cards
            totalLiveUsers: this.locatorHelper.getByText('Total Live Users').locator('..'),
            liveAdvisers: this.locatorHelper.getByText('Live Advisers').locator('..'),
            helpdeskUsers: this.locatorHelper.getByText('Helpdesk Users').locator('..'),
            clientsMetric: this.locatorHelper.getByText('Clients').locator('..'),
            policies: this.locatorHelper.getByText('Policies').locator('..'),
            ids: this.locatorHelper.getByText('IDs').locator('..'),
            riskProfiles: this.locatorHelper.getByText('Risk Profiles').locator('..'),
            factFindsOpened: this.locatorHelper.getByText('Fact Finds Opened').locator('..'),
            documents: this.locatorHelper.getByText('Documents').locator('..'),
            unmappedDocuments: this.locatorHelper.getByText('Unmapped Documents').locator('..'),
            // Side menu navigation items
            sideMenu: this.locatorHelper.getByTestId('side-menu') ||
                this.locatorHelper.getLocator('.sidebar, .side-menu'),
            // Main navigation items
            workAllocationRequests: this.locatorHelper.getByText('Work Allocation Requests'),
            activities: this.locatorHelper.getByText('Activities'),
            administration: this.locatorHelper.getByText('Administration'),
            advisers: this.locatorHelper.getByText('Advisers'),
            calendar: this.locatorHelper.getByText('Calendar'),
            caseManagement: this.locatorHelper.getByText('Case Management'),
            clients: this.locatorHelper.getByText('Clients'),
            compliance: this.locatorHelper.getByText('Compliance'),
            correspondence: this.locatorHelper.getByText('Correspondence'),
            customerProgramme: this.locatorHelper.getByText('Customer Programme'),
            fastrak: this.locatorHelper.getByText('Fastrak'),
            generalAdmin: this.locatorHelper.getByText('General Admin'),
            intranet: this.locatorHelper.getByText('Intranet'),
            investmentHub: this.locatorHelper.getByText('Investment Hub'),
            knowledgeBase: this.locatorHelper.getByText('Knowledge Base'),
            productsProviders: this.locatorHelper.getByText('Products / Providers'),
            reports: this.locatorHelper.getByText('Reports'),
            secureMessaging: this.locatorHelper.getByText('Secure Messaging'),
            supportHelpdesk: this.locatorHelper.getByText('Support Helpdesk'),
            systemMIInformation: this.locatorHelper.getByText('System MI Information'),
            unmappedStore: this.locatorHelper.getByText('Unmapped Store'),
            // Chart sections
            submissionsByWeekChart: this.locatorHelper.getByText('Submissions By Week'),
            submissionsByAdviserChart: this.locatorHelper.getByText('Submissions By Adviser'),
        };
    }
    /**
     * Navigate to dashboard page
     */
    async navigate() {
        await this.navigateToPath('/dashboard/development/dash');
    }
    /**
     * Wait for dashboard page to load
     */
    async waitForPageLoad() {
        await this.waitHelper.waitForElement(this.locators.dashboardTitle);
        await this.waitHelper.waitForElement(this.locators.sideMenu);
        await this.waitHelper.waitForElement(this.locators.searchInput);
    }
    /**
     * Check if we're on the dashboard page
     */
    async isPageLoaded() {
        try {
            await this.waitForPageLoad();
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Search for clients, policies, or advisers
     */
    async search(searchTerm) {
        await this.actionHelper.fillInputByPlaceholder('Search For Clients,Policies,Advisers', searchTerm);
        await this.page.keyboard.press('Enter');
    }
    /**
     * Click on Work Allocation Requests menu item
     */
    async clickWorkAllocationRequests() {
        await this.actionHelper.clickLocator(this.locators.workAllocationRequests);
    }
    /**
     * Click on Activities menu item
     */
    async clickActivities() {
        await this.actionHelper.clickLocator(this.locators.activities);
    }
    /**
     * Click on Administration menu item
     */
    async clickAdministration() {
        await this.actionHelper.clickLocator(this.locators.administration);
    }
    /**
     * Click on Advisers menu item
     */
    async clickAdvisers() {
        await this.actionHelper.clickLocator(this.locators.advisers);
    }
    /**
     * Click on Calendar menu item
     */
    async clickCalendar() {
        await this.actionHelper.clickLocator(this.locators.calendar);
    }
    /**
     * Click on Case Management menu item
     */
    async clickCaseManagement() {
        await this.actionHelper.clickLocator(this.locators.caseManagement);
    }
    /**
     * Click on Clients menu item
     */
    async clickClients() {
        await this.actionHelper.clickLocator(this.locators.clients);
    }
    /**
     * Click on Compliance menu item
     */
    async clickCompliance() {
        await this.actionHelper.clickLocator(this.locators.compliance);
    }
    /**
     * Click on Correspondence menu item
     */
    async clickCorrespondence() {
        await this.actionHelper.clickLocator(this.locators.correspondence);
    }
    /**
     * Click on Customer Programme menu item
     */
    async clickCustomerProgramme() {
        await this.actionHelper.clickLocator(this.locators.customerProgramme);
    }
    /**
     * Click on Fastrak menu item
     */
    async clickFastrak() {
        await this.actionHelper.clickLocator(this.locators.fastrak);
    }
    /**
     * Click on General Admin menu item
     */
    async clickGeneralAdmin() {
        await this.actionHelper.clickLocator(this.locators.generalAdmin);
    }
    /**
     * Click on Intranet menu item
     */
    async clickIntranet() {
        await this.actionHelper.clickLocator(this.locators.intranet);
    }
    /**
     * Click on Investment Hub menu item
     */
    async clickInvestmentHub() {
        await this.actionHelper.clickLocator(this.locators.investmentHub);
    }
    /**
     * Click on Knowledge Base menu item
     */
    async clickKnowledgeBase() {
        await this.actionHelper.clickLocator(this.locators.knowledgeBase);
    }
    /**
     * Click on Products / Providers menu item
     */
    async clickProductsProviders() {
        await this.actionHelper.clickLocator(this.locators.productsProviders);
    }
    /**
     * Click on Reports menu item
     */
    async clickReports() {
        await this.actionHelper.clickLocator(this.locators.reports);
    }
    /**
     * Click on Secure Messaging menu item
     */
    async clickSecureMessaging() {
        await this.actionHelper.clickLocator(this.locators.secureMessaging);
    }
    /**
     * Click on Support Helpdesk menu item
     */
    async clickSupportHelpdesk() {
        await this.actionHelper.clickLocator(this.locators.supportHelpdesk);
    }
    /**
     * Click on System MI Information menu item
     */
    async clickSystemMIInformation() {
        await this.actionHelper.clickLocator(this.locators.systemMIInformation);
    }
    /**
     * Click on Unmapped Store menu item
     */
    async clickUnmappedStore() {
        await this.actionHelper.clickLocator(this.locators.unmappedStore);
    }
    /**
     * Get metric value by name
     */
    async getMetricValue(metricName) {
        const metricLocator = this.locatorHelper.getByText(metricName).locator('..');
        const valueElement = metricLocator.locator('.metric-value, .count, .number').first();
        return await this.actionHelper.getTrimmedText(valueElement);
    }
    /**
     * Logout from the application
     */
    async logout() {
        await this.actionHelper.clickLocator(this.locators.logoutButton);
    }
    /**
     * Check if user is logged in
     */
    async isUserLoggedIn() {
        return await this.actionHelper.isVisible(this.locators.userProfile.toString());
    }
}
exports.DashboardPage = DashboardPage;
//# sourceMappingURL=DashboardPage.js.map