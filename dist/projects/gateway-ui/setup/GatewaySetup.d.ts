import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { Environment } from '@framework/types/Environment';
/**
 * GatewaySetup - Simple Gateway application setup
 * Navigate to environment, login, and verify dashboard
 */
export declare class GatewaySetup extends BasePage {
    private loginSteps;
    private dashboardSteps;
    private envSettings;
    private environment;
    constructor(page: Page, environment: Environment);
    /**
     * Setup Gateway for testing - Navigate, login and verify dashboard
     */
    static setupForEnvironment(page: Page, environment: Environment): Promise<void>;
    /**
     * Load environment settings from .env file
     */
    private loadEnvironment;
    /**
     * Navigate to the application with health check
     */
    private navigate;
    /**
     * Perform login
     */
    private login;
    /**
     * Verify dashboard is loaded
     */
    private verifyDashboard;
}
//# sourceMappingURL=GatewaySetup.d.ts.map