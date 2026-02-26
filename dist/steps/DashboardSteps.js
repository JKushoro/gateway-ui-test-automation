"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSteps = void 0;
const DashboardPage_1 = require("../pages/DashboardPage");
const AssertionHelper_1 = require("../helpers/AssertionHelper");
const WaitHelper_1 = require("../helpers/WaitHelper");
/**
 * DashboardSteps - Business logic for Development Dashboard functionality
 * Contains high-level methods for dashboard interactions and verifications
 */
class DashboardSteps {
    constructor(page) {
        this.page = page;
        this.dashboardPage = new DashboardPage_1.DashboardPage(page);
        this.assertionHelper = new AssertionHelper_1.AssertionHelper(page);
        this.waitHelper = new WaitHelper_1.WaitHelper(page);
    }
    /**
     * Navigate to dashboard and wait for it to load
     */
    async navigateToDashboard() {
        await this.dashboardPage.navigate();
        await this.dashboardPage.waitForPageLoad();
    }
    /**
     * Verify dashboard page is loaded and accessible
     */
    async verifyDashboardLoaded() {
        await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.dashboardTitle);
        await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.sideMenu);
        await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.searchInput);
        // Verify URL contains dashboard path
        const currentUrl = this.page.url();
        if (!currentUrl.includes('/dashboard/development/dash')) {
            throw new Error(`Expected dashboard URL, but got: ${currentUrl}`);
        }
    }
    /**
     * Verify all key dashboard metrics are displayed
     */
    async verifyDashboardMetrics() {
        const metrics = [
            this.dashboardPage.locators.totalLiveUsers,
            this.dashboardPage.locators.liveAdvisers,
            this.dashboardPage.locators.helpdeskUsers,
            this.dashboardPage.locators.clientsMetric,
            this.dashboardPage.locators.policies,
            this.dashboardPage.locators.documents
        ];
        for (const metric of metrics) {
            await this.assertionHelper.assertElementVisible(metric);
        }
    }
    /**
     * Verify side menu navigation items are present
     */
    async verifySideMenuItems() {
        const menuItems = [
            this.dashboardPage.locators.workAllocationRequests,
            this.dashboardPage.locators.activities,
            this.dashboardPage.locators.administration,
            this.dashboardPage.locators.advisers,
            this.dashboardPage.locators.clients,
            this.dashboardPage.locators.compliance
        ];
        for (const item of menuItems) {
            await this.assertionHelper.assertElementVisible(item);
        }
    }
    /**
     * Get all dashboard metric values
     */
    async getAllMetricValues() {
        return {
            totalLiveUsers: await this.dashboardPage.getMetricValue('Total Live Users'),
            liveAdvisers: await this.dashboardPage.getMetricValue('Live Advisers'),
            helpdeskUsers: await this.dashboardPage.getMetricValue('Helpdesk Users'),
            clients: await this.dashboardPage.getMetricValue('Clients'),
            policies: await this.dashboardPage.getMetricValue('Policies'),
            ids: await this.dashboardPage.getMetricValue('IDs'),
            riskProfiles: await this.dashboardPage.getMetricValue('Risk Profiles'),
            factFindsOpened: await this.dashboardPage.getMetricValue('Fact Finds Opened'),
            documents: await this.dashboardPage.getMetricValue('Documents'),
            unmappedDocuments: await this.dashboardPage.getMetricValue('Unmapped Documents')
        };
    }
    /**
     * Verify metric values are numeric and reasonable
     */
    async verifyMetricValuesAreValid() {
        const metrics = await this.getAllMetricValues();
        for (const [metricName, value] of Object.entries(metrics)) {
            // Remove commas and check if it's a valid number
            const numericValue = value.replace(/,/g, '');
            if (!/^\d+$/.test(numericValue)) {
                throw new Error(`Metric '${metricName}' has invalid value: '${value}' (expected numeric)`);
            }
            const num = parseInt(numericValue, 10);
            if (num < 0) {
                throw new Error(`Metric '${metricName}' has negative value: ${value}`);
            }
        }
    }
    /**
     * Search for specific term and verify search functionality
     */
    async performSearch(searchTerm) {
        await this.dashboardPage.search(searchTerm);
        // Wait for search results or navigation
        await this.waitHelper.waitForUrlToChangeFrom(this.page.url());
    }
    /**
     * Navigate to specific section and verify navigation
     */
    async navigateToSection(sectionName) {
        const currentUrl = this.page.url();
        switch (sectionName.toLowerCase()) {
            case 'work allocation requests':
                await this.dashboardPage.clickWorkAllocationRequests();
                break;
            case 'activities':
                await this.dashboardPage.clickActivities();
                break;
            case 'administration':
                await this.dashboardPage.clickAdministration();
                break;
            case 'advisers':
                await this.dashboardPage.clickAdvisers();
                break;
            case 'calendar':
                await this.dashboardPage.clickCalendar();
                break;
            case 'case management':
                await this.dashboardPage.clickCaseManagement();
                break;
            case 'clients':
                await this.dashboardPage.clickClients();
                break;
            case 'compliance':
                await this.dashboardPage.clickCompliance();
                break;
            case 'correspondence':
                await this.dashboardPage.clickCorrespondence();
                break;
            case 'reports':
                await this.dashboardPage.clickReports();
                break;
            default:
                throw new Error(`Unknown section: ${sectionName}`);
        }
        // Wait for navigation to complete
        await this.waitHelper.waitForUrlToChangeFrom(currentUrl);
    }
    /**
     * Verify user profile and logout functionality
     */
    async verifyUserProfileAccess() {
        await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.userProfile);
        // Check if user is logged in
        const isLoggedIn = await this.dashboardPage.isUserLoggedIn();
        if (!isLoggedIn) {
            throw new Error('User profile indicates user is not logged in');
        }
    }
    /**
     * Test dashboard responsiveness by checking key elements
     */
    async verifyDashboardResponsiveness() {
        // Check that all main sections are visible and clickable
        const elements = [
            this.dashboardPage.locators.dashboardTitle,
            this.dashboardPage.locators.searchInput,
            this.dashboardPage.locators.sideMenu,
            this.dashboardPage.locators.totalLiveUsers,
            this.dashboardPage.locators.policies
        ];
        for (const element of elements) {
            await this.assertionHelper.assertElementVisible(element);
            // Verify element is not only visible but also interactable
            const isEnabled = await element.isEnabled();
            if (!isEnabled && element !== this.dashboardPage.locators.dashboardTitle) {
                console.warn(`Element ${element} is visible but not enabled`);
            }
        }
    }
    /**
     * Verify charts and data visualizations are present
     */
    async verifyChartsAndVisualizations() {
        await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.submissionsByWeekChart);
        // Additional chart verifications can be added here
        // For example, checking if chart data is loaded, etc.
    }
    /**
     * Get dashboard page state for debugging
     */
    async getDashboardState() {
        const url = this.page.url();
        const title = await this.page.title();
        const isLoaded = await this.dashboardPage.isPageLoaded();
        const userLoggedIn = await this.dashboardPage.isUserLoggedIn();
        // Check if at least one metric is visible
        let metricsVisible = false;
        try {
            await this.assertionHelper.assertElementVisible(this.dashboardPage.locators.totalLiveUsers);
            metricsVisible = true;
        }
        catch {
            metricsVisible = false;
        }
        return {
            url,
            title,
            isLoaded,
            userLoggedIn,
            metricsVisible
        };
    }
}
exports.DashboardSteps = DashboardSteps;
//# sourceMappingURL=DashboardSteps.js.map