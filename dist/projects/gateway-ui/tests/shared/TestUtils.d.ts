import { Browser, BrowserContext, Page } from '@playwright/test';
import { GatewayManagementSteps } from '@steps/gateway/GatewayManagementSteps';
import { SideNavService } from '@steps/components/SideNav';
import { NavBarService } from '@steps/components/NavBar';
/**
 * Test environment configuration
 */
export type TestEnvironment = 'qa' | 'dev';
/**
 * Factory for creating authenticated test contexts
 * Single Responsibility: Creates authenticated browser contexts for E2E tests
 */
export declare class AuthenticatedTestFactory {
    static create(browser: Browser, environment?: TestEnvironment): Promise<{
        page: Page;
        factFindSteps: GatewayManagementSteps;
        sideNav: SideNavService;
        navBar: NavBarService;
        cleanup(): Promise<void>;
    }>;
}
/**
 * Factory for creating isolated test contexts (no authentication)
 * Single Responsibility: Creates clean browser contexts for UI validation tests
 */
export declare class IsolatedTestFactory {
    static create(browser: Browser, _environment?: TestEnvironment): Promise<{
        context: BrowserContext;
        page: Page;
        cleanup(): Promise<void>;
    }>;
}
/**
 * Legacy support - maintained for backward compatibility
 * @deprecated Use AuthenticatedTestFactory.create() instead
 */
export declare function setupTest(browser: Browser, environment?: TestEnvironment): Promise<{
    page: Page;
    factFindSteps: GatewayManagementSteps;
    sideNav: SideNavService;
    navBar: NavBarService;
    cleanup(): Promise<void>;
}>;
/**
 * Legacy support - maintained for backward compatibility
 * @deprecated Use IsolatedTestFactory.create() instead
 */
export declare function setupLoginValidationTest(browser: Browser, environment?: TestEnvironment): Promise<{
    context: BrowserContext;
    page: Page;
    cleanup(): Promise<void>;
}>;
/**
 * Base test class using composition pattern
 * Single Responsibility: Provides common test functionality through composition
 */
export declare class BaseTestContext {
    readonly page: Page;
    readonly factFindSteps: GatewayManagementSteps;
    readonly sideNav: SideNavService;
    readonly navBar: NavBarService;
    constructor(page: Page, factFindSteps: GatewayManagementSteps, sideNav: SideNavService, navBar: NavBarService);
    static create(browser: Browser, environment?: TestEnvironment): Promise<BaseTestContext>;
    static createAuthenticated(browser: Browser, environment?: TestEnvironment): Promise<BaseTestContext>;
    cleanup(): Promise<void>;
}
export default BaseTestContext;
//# sourceMappingURL=TestUtils.d.ts.map