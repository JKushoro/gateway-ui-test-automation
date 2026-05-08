// projects/gateway-ui/steps/gateway/LoginSessionManager.ts
import { Page } from '@playwright/test';
import { LoginPage } from '@pages/auth/LoginPageLocators';
import { Environment, getEnvironmentManager } from '../../shared/SharedImports';

/**
 * Manages login session state and navigation
 * Single Responsibility: Session state management only
 */
export class LoginSessionManager {
  private readonly envManager = getEnvironmentManager();

  constructor(
    private readonly page: Page,
    private readonly loginPage: LoginPage
  ) {}

  async navigateToApplication(environment: Environment = 'qa'): Promise<void> {
    const baseUrl = this.envManager.getBaseUrl(environment);
    await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  }

  async isUserLoggedIn(): Promise<boolean> {
    const indicators = await Promise.allSettled([
      this.loginPage.getDashboardIndicatorLocator().isVisible(),
      this.loginPage.getUserMenuIndicatorLocator().isVisible(),
      this.loginPage.getLogoutButtonLocator().isVisible()
    ]);

    return indicators.some(result => 
      result.status === 'fulfilled' && result.value === true
    );
  }

  async logoutIfLoggedIn(): Promise<void> {
    if (!(await this.isUserLoggedIn())) {
      return;
    }

    await this.loginPage.getLogoutButtonLocator().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  getAdvisorEmail(environment: Environment = 'qa'): string {
    return this.envManager.getAdvisorEmail(environment);
  }
}