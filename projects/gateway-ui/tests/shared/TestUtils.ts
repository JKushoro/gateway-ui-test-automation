// projects/gateway-ui/tests/shared/TestUtils.ts
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginSteps } from '@steps/gateway/LoginSteps';
import { GatewayManagementSteps } from '@steps/gateway/GatewayManagementSteps';
import { SideNavService } from '@steps/components/SideNav';
import { NavBarService } from '@steps/components/NavBar';

/**
 * Base test class to eliminate all duplicated code patterns
 * Usage: class MyTest extends BaseTest { ... }
 */
export default class BaseTest {
  public page: Page;
  public factFindSteps: GatewayManagementSteps;
  public sideNav: SideNavService;
  public navBar: NavBarService;

  constructor(page: Page) {
    this.page = page;
    this.factFindSteps = new GatewayManagementSteps(page);
    this.sideNav = new SideNavService(page);
    this.navBar = new NavBarService(page);
  }

  static async create(browser: Browser, environment: 'qa' | 'dev' = 'qa'): Promise<BaseTest> {
    const page = await browser.newPage();
    await LoginSteps.setupForEnvironment(page, environment);
    return new BaseTest(page);
  }

  async cleanup(): Promise<void> {
    await this.page?.close();
  }
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

export async function setupTest(browser: Browser, environment: 'qa' | 'dev' = 'qa'
): Promise<SetupTestResult> {
  const page = await browser.newPage();
  await LoginSteps.setupForEnvironment(page, environment);

  const factFindSteps = new GatewayManagementSteps(page);
  const sideNav = new SideNavService(page);
  const navBar = new NavBarService(page);

  return { page, factFindSteps, sideNav, navBar };
}

type SetupLoginValidationResult = {
  context: BrowserContext;
  page: Page;
};

export async function setupLoginValidationTest(browser: Browser,
  _environment: 'qa' | 'dev' = 'qa'
): Promise<SetupLoginValidationResult> {
  const context = await browser.newContext({
    storageState: undefined,
  });

  const page = await context.newPage();

  return { context, page };
}

