// projects/gateway-ui/steps/gateway/LoginSteps.ts
import {
  Page,
  BasePage,
  FrameworkConfig,
  Environment,
  AuthenticationService,
  AuthenticationOptions,
} from '../../shared/SharedImports';
import { DashboardSteps } from '@steps/gateway/DashboardSteps';

/**
 * LoginSteps - Orchestrates complete authentication flows
 * 
 * Single Responsibility: Coordinates authentication workflows only
 * Delegates actual authentication logic to AuthenticationService
 */
export class LoginSteps extends BasePage {
  private readonly dashboardSteps: DashboardSteps;
  private readonly authService: AuthenticationService;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.dashboardSteps = new DashboardSteps(page);
    this.authService = new AuthenticationService(page, config);
  }

  /**
   * Navigate to Gateway application landing page
   */
  async navigateToApplication(environment: Environment = 'qa'): Promise<void> {
    await this.authService.navigateToApplication(environment);
  }

  /**
   * Start AAD login flow
   */
  async startMicrosoftLogin(): Promise<void> {
    await this.authService.startMicrosoftLogin();
  }

  /**
   * Perform complete login flow with optional credentials and OTP control
   */
  async login(
    username?: string, 
    password?: string, 
    environment: Environment = 'qa',
    skipOtp = false
  ): Promise<void> {
    const options: AuthenticationOptions = {
      environment,
      skipOtp,
      customCredentials: username && password ? { username, password } : undefined
    };

    await this.authService.performLogin(options);
  }

  /**
   * Complete authentication flow: Navigate + Login + Verify
   */
  async performCompleteLogin(environment: Environment = 'qa'): Promise<void> {
    await this.authService.authenticateUser({ environment });
    await this.verifyDashboard();
  }

  /**
   * Verify dashboard is accessible after authentication
   */
  async verifyDashboard(): Promise<void> {
    await this.dashboardSteps.verifyDashboard();
  }

  /**
   * Static factory method for test setup
   * Creates instance, performs complete login, and returns configured page
   */
  static async setupForEnvironment(page: Page, environment: Environment = 'qa'): Promise<void> {
    const loginSteps = new LoginSteps(page);
    await loginSteps.performCompleteLogin(environment);
  }
}