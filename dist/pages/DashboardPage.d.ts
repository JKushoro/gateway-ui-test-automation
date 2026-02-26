import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * DashboardPage - Page Object Model for the main development dashboard
 * Contains all locators and interactions for the dashboard and side menu navigation
 */
export declare class DashboardPage extends BasePage {
    constructor(page: Page);
    get locators(): {
        dashboardTitle: import("playwright-core").Locator;
        userProfile: import("playwright-core").Locator;
        logoutButton: import("playwright-core").Locator;
        searchInput: import("playwright-core").Locator;
        totalLiveUsers: import("playwright-core").Locator;
        liveAdvisers: import("playwright-core").Locator;
        helpdeskUsers: import("playwright-core").Locator;
        clientsMetric: import("playwright-core").Locator;
        policies: import("playwright-core").Locator;
        ids: import("playwright-core").Locator;
        riskProfiles: import("playwright-core").Locator;
        factFindsOpened: import("playwright-core").Locator;
        documents: import("playwright-core").Locator;
        unmappedDocuments: import("playwright-core").Locator;
        sideMenu: import("playwright-core").Locator;
        workAllocationRequests: import("playwright-core").Locator;
        activities: import("playwright-core").Locator;
        administration: import("playwright-core").Locator;
        advisers: import("playwright-core").Locator;
        calendar: import("playwright-core").Locator;
        caseManagement: import("playwright-core").Locator;
        clients: import("playwright-core").Locator;
        compliance: import("playwright-core").Locator;
        correspondence: import("playwright-core").Locator;
        customerProgramme: import("playwright-core").Locator;
        fastrak: import("playwright-core").Locator;
        generalAdmin: import("playwright-core").Locator;
        intranet: import("playwright-core").Locator;
        investmentHub: import("playwright-core").Locator;
        knowledgeBase: import("playwright-core").Locator;
        productsProviders: import("playwright-core").Locator;
        reports: import("playwright-core").Locator;
        secureMessaging: import("playwright-core").Locator;
        supportHelpdesk: import("playwright-core").Locator;
        systemMIInformation: import("playwright-core").Locator;
        unmappedStore: import("playwright-core").Locator;
        submissionsByWeekChart: import("playwright-core").Locator;
        submissionsByAdviserChart: import("playwright-core").Locator;
    };
    /**
     * Navigate to dashboard page
     */
    navigate(): Promise<void>;
    /**
     * Wait for dashboard page to load
     */
    waitForPageLoad(): Promise<void>;
    /**
     * Check if we're on the dashboard page
     */
    isPageLoaded(): Promise<boolean>;
    /**
     * Search for clients, policies, or advisers
     */
    search(searchTerm: string): Promise<void>;
    /**
     * Click on Work Allocation Requests menu item
     */
    clickWorkAllocationRequests(): Promise<void>;
    /**
     * Click on Activities menu item
     */
    clickActivities(): Promise<void>;
    /**
     * Click on Administration menu item
     */
    clickAdministration(): Promise<void>;
    /**
     * Click on Advisers menu item
     */
    clickAdvisers(): Promise<void>;
    /**
     * Click on Calendar menu item
     */
    clickCalendar(): Promise<void>;
    /**
     * Click on Case Management menu item
     */
    clickCaseManagement(): Promise<void>;
    /**
     * Click on Clients menu item
     */
    clickClients(): Promise<void>;
    /**
     * Click on Compliance menu item
     */
    clickCompliance(): Promise<void>;
    /**
     * Click on Correspondence menu item
     */
    clickCorrespondence(): Promise<void>;
    /**
     * Click on Customer Programme menu item
     */
    clickCustomerProgramme(): Promise<void>;
    /**
     * Click on Fastrak menu item
     */
    clickFastrak(): Promise<void>;
    /**
     * Click on General Admin menu item
     */
    clickGeneralAdmin(): Promise<void>;
    /**
     * Click on Intranet menu item
     */
    clickIntranet(): Promise<void>;
    /**
     * Click on Investment Hub menu item
     */
    clickInvestmentHub(): Promise<void>;
    /**
     * Click on Knowledge Base menu item
     */
    clickKnowledgeBase(): Promise<void>;
    /**
     * Click on Products / Providers menu item
     */
    clickProductsProviders(): Promise<void>;
    /**
     * Click on Reports menu item
     */
    clickReports(): Promise<void>;
    /**
     * Click on Secure Messaging menu item
     */
    clickSecureMessaging(): Promise<void>;
    /**
     * Click on Support Helpdesk menu item
     */
    clickSupportHelpdesk(): Promise<void>;
    /**
     * Click on System MI Information menu item
     */
    clickSystemMIInformation(): Promise<void>;
    /**
     * Click on Unmapped Store menu item
     */
    clickUnmappedStore(): Promise<void>;
    /**
     * Get metric value by name
     */
    getMetricValue(metricName: string): Promise<string>;
    /**
     * Logout from the application
     */
    logout(): Promise<void>;
    /**
     * Check if user is logged in
     */
    isUserLoggedIn(): Promise<boolean>;
}
//# sourceMappingURL=DashboardPage.d.ts.map