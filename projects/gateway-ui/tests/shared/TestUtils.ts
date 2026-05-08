// projects/gateway-ui/tests/shared/TestUtils.ts
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginSteps } from '@steps/gateway/LoginSteps';
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
export class AuthenticatedTestFactory {
  static async create(browser: Browser, environment: TestEnvironment = 'qa') {
    const page = await browser.newPage();
    await LoginSteps.setupForEnvironment(page, environment);
    
    return {
      page,
      factFindSteps: new GatewayManagementSteps(page),
      sideNav: new SideNavService(page),
      navBar: new NavBarService(page),
      async cleanup() {
        await page?.close();
      }
    };
  }
}

/**
 * Factory for creating isolated test contexts (no authentication)
 * Single Responsibility: Creates clean browser contexts for UI validation tests
 */
export class IsolatedTestFactory {
  static async create(browser: Browser, _environment: TestEnvironment = 'qa') {
    const context = await browser.newContext({
      storageState: undefined, // Clean state, no stored authentication
    });
    
    const page = await context.newPage();
    
    return {
      context,
      page,
      async cleanup() {
        await context?.close();
      }
    };
  }
}

/**
 * Legacy support - maintained for backward compatibility
 * @deprecated Use AuthenticatedTestFactory.create() instead
 */
export async function setupTest(browser: Browser, environment: TestEnvironment = 'qa') {
  return AuthenticatedTestFactory.create(browser, environment);
}

/**
 * Legacy support - maintained for backward compatibility  
 * @deprecated Use IsolatedTestFactory.create() instead
 */
export async function setupLoginValidationTest(browser: Browser, environment: TestEnvironment = 'qa') {
  return IsolatedTestFactory.create(browser, environment);
}

/**
 * Base test class using composition pattern
 * Single Responsibility: Provides common test functionality through composition
 */
export class BaseTestContext {
  constructor(
    public readonly page: Page,
    public readonly factFindSteps: GatewayManagementSteps,
    public readonly sideNav: SideNavService,
    public readonly navBar: NavBarService
  ) {}
  
  static async create(browser: Browser, environment: TestEnvironment = 'qa'): Promise<BaseTestContext> {
    const setup = await AuthenticatedTestFactory.create(browser, environment);
    return new BaseTestContext(setup.page, setup.factFindSteps, setup.sideNav, setup.navBar);
  }

  static async createAuthenticated(browser: Browser, environment: TestEnvironment = 'qa'): Promise<BaseTestContext> {
    return this.create(browser, environment);
  }
  
  async cleanup(): Promise<void> {
    await this.page?.close();
  }
}

// Backward compatibility export
export default BaseTestContext;
