import { Page } from '@playwright/test';
/**
 * DashboardSteps - Business logic for Development Dashboard functionality
 * Contains high-level methods for dashboard interactions and verifications
 */
export declare class DashboardSteps {
    private page;
    private dashboardPage;
    private assertionHelper;
    private waitHelper;
    constructor(page: Page);
    /**
     * Navigate to dashboard and wait for it to load
     */
    navigateToDashboard(): Promise<void>;
    /**
     * Verify dashboard page is loaded and accessible
     */
    verifyDashboardLoaded(): Promise<void>;
    /**
     * Verify all key dashboard metrics are displayed
     */
    verifyDashboardMetrics(): Promise<void>;
    /**
     * Verify side menu navigation items are present
     */
    verifySideMenuItems(): Promise<void>;
    /**
     * Get all dashboard metric values
     */
    getAllMetricValues(): Promise<{
        totalLiveUsers: string;
        liveAdvisers: string;
        helpdeskUsers: string;
        clients: string;
        policies: string;
        ids: string;
        riskProfiles: string;
        factFindsOpened: string;
        documents: string;
        unmappedDocuments: string;
    }>;
    /**
     * Verify metric values are numeric and reasonable
     */
    verifyMetricValuesAreValid(): Promise<void>;
    /**
     * Search for specific term and verify search functionality
     */
    performSearch(searchTerm: string): Promise<void>;
    /**
     * Navigate to specific section and verify navigation
     */
    navigateToSection(sectionName: string): Promise<void>;
    /**
     * Verify user profile and logout functionality
     */
    verifyUserProfileAccess(): Promise<void>;
    /**
     * Test dashboard responsiveness by checking key elements
     */
    verifyDashboardResponsiveness(): Promise<void>;
    /**
     * Verify charts and data visualizations are present
     */
    verifyChartsAndVisualizations(): Promise<void>;
    /**
     * Get dashboard page state for debugging
     */
    getDashboardState(): Promise<{
        url: string;
        title: string;
        isLoaded: boolean;
        userLoggedIn: boolean;
        metricsVisible: boolean;
    }>;
}
//# sourceMappingURL=DashboardSteps.d.ts.map