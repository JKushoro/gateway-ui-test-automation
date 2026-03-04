// projects/gateway-ui/steps/LoginSteps.ts

import {
  Page,
  BasePage,
  FrameworkConfig,
  Environment,
  AuthenticationService,
  AuthenticationOptions,
  getEnvironmentManager
} from '../../shared/SharedImports';
import { LoginPageLocators } from '@pages/gatewayElementLocators/LoginPageLocators';
import { DashboardSteps } from '@steps/gateway/DashboardSteps';

type Credentials = { username: string; password: string };

/**
 * LoginSteps - Complete Login Engine and Setup
 * - Loads environment settings
 * - Resolves BASE_URL
 * - Performs Microsoft login flow (AAD) with OTP support
 * - Provides complete setup functionality (replaces GatewaySetup)
 */
export class LoginSteps extends BasePage {
  private readonly loginPage: LoginPageLocators;
  private readonly dashboardSteps: DashboardSteps;
  private readonly envManager = getEnvironmentManager();
  private readonly authService: AuthenticationService;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.loginPage = new LoginPageLocators(page, config);
    this.dashboardSteps = new DashboardSteps(page);
    this.authService = new AuthenticationService(page, config);
  }

  /* -------------------- Environment Management -------------------- */

  /**
   * Resolve base URL from env file.
   */
  private getBaseUrl(environment: Environment = 'qa'): string {
    return this.envManager.getBaseUrl(environment);
  }

  /**
   * Get credentials from environment or process.env
   * Uses ADVISOR_EMAIL and ADVISOR_PASSWORD only
   */
  private getCredentials(environment: Environment = 'qa'): Credentials {
    return this.envManager.getCredentials(environment);
  }

  /* -------------------- Navigation -------------------- */

  /**
   * Navigate to Gateway application landing page.
   */
  public async navigateToApplication(environment: Environment = 'qa'): Promise<void> {
    await this.authService.navigateToApplication(environment);
  }

  /* -------------------- Login Flow -------------------- */

  /**
   * Start AAD login flow by clicking app login button.
   */
  public async startMicrosoftLogin(): Promise<void> {
    await this.authService.startMicrosoftLogin();
  }

  /**
   * Perform a full login with OTP support.
   * If username/password not provided, uses env credentials.
   */
  public async login(username?: string, password?: string, environment: Environment = 'qa'): Promise<void> {
    const options: AuthenticationOptions = {
      environment,
      customCredentials: username && password ? { username, password } : undefined
    };

    await this.authService.performLogin(options);
  }

  /**
   * Convenience: Navigate + login using env credentials with OTP support.
   */
  public async performValidLogin(environment: Environment = 'qa'): Promise<void> {
    await this.authService.authenticateUser({ environment });
  }

  /**
   * Login with OTP support
   */
  public async loginWithOtp(username?: string, password?: string, environment: Environment = 'qa'): Promise<void> {
    const options: AuthenticationOptions = {
      environment,
      skipOtp: false,
      customCredentials: username && password ? { username, password } : undefined
    };

    await this.authService.performLogin(options);
  }

  /**
   * Login without OTP (skip OTP step)
   */
  public async loginWithoutOtp(username?: string, password?: string, environment: Environment = 'qa'): Promise<void> {
    const options: AuthenticationOptions = {
      environment,
      skipOtp: true,
      customCredentials: username && password ? { username, password } : undefined
    };

    await this.authService.performLogin(options);
  }

  /* -------------------- Complete Setup (replaces GatewaySetup) -------------------- */

  /**
   * Complete Gateway setup for testing - Navigate, login and verify dashboard
   * This replaces the old GatewaySetup.setupForEnvironment method
   */
  public static async setupForEnvironment(page: Page, environment: Environment = 'qa'): Promise<void> {
    const loginSteps = new LoginSteps(page);
    await loginSteps.navigateToApplication(environment);
    await loginSteps.login(undefined, undefined, environment);
    await loginSteps.verifyDashboard();
  }

  /**
   * Verify dashboard is loaded after login
   */
  public async verifyDashboard(): Promise<void> {
    await this.dashboardSteps.verifyDashboard();
  }

  /* -------------------- Legacy Support -------------------- */

  /**
   * Legacy method for backward compatibility
   * @deprecated Use login() instead
   */
  public async clickLogin(username?: string, password?: string): Promise<void> {
    await this.login(username, password);
  }
}