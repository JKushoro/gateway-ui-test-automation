import { Browser, BrowserContext, Page } from '@playwright/test';
import { GatewayManagementSteps } from '@steps/gateway/GatewayManagementSteps';
import { SideNavService } from '@steps/components/SideNav';
import { NavBarService } from '@steps/components/NavBar';
/**
 * Base test class to eliminate all duplicated code patterns
 * Usage: class MyTest extends BaseTest { ... }
 */
export default class BaseTest {
    page: Page;
    factFindSteps: GatewayManagementSteps;
    sideNav: SideNavService;
    navBar: NavBarService;
    constructor(page: Page);
    static create(browser: Browser, environment?: 'qa' | 'dev'): Promise<BaseTest>;
    cleanup(): Promise<void>;
}
/**
 * Simple utility function (kept for backward compatibility)
 */
type SetupTestResult = {
    page: Page;
    factFindSteps: GatewayManagementSteps;
    sideNav: SideNavService;
    navBar: NavBarService;
};
export declare function setupTest(browser: Browser, environment?: 'qa' | 'dev'): Promise<SetupTestResult>;
type SetupLoginValidationResult = {
    context: BrowserContext;
    page: Page;
};
export declare function setupLoginValidationTest(browser: Browser, _environment?: 'qa' | 'dev'): Promise<SetupLoginValidationResult>;
export {};
//# sourceMappingURL=TestUtils.d.ts.map