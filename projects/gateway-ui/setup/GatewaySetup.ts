import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { LoginSteps } from '@steps/LoginSteps';
import { DashboardSteps } from '@steps/DashboardSteps';
import { Environment } from '@framework/types/Environment';
import * as path from 'path';
import * as fs from 'fs';

/**
 * GatewaySetup - Simple Gateway application setup
 * Navigate to environment, login, and verify dashboard
 */
export class GatewaySetup extends BasePage {
  private loginSteps: LoginSteps;
  private dashboardSteps: DashboardSteps;
  private envSettings: Record<string, string> = {};
  private environment: Environment;

  constructor(page: Page, environment: Environment) {
    super(page);
    this.loginSteps = new LoginSteps(page);
    this.dashboardSteps = new DashboardSteps(page);
    this.environment = environment;
    this.loadEnvironment(environment);
  }

  /**
   * Setup Gateway for testing - Navigate, login and verify dashboard
   */
  public static async setupForEnvironment(page: Page, environment: Environment): Promise<void> {
    // Running tests on environment: ${environment.toUpperCase()}
    const setup = new GatewaySetup(page, environment);
    await setup.navigate();
    await setup.login();
    await setup.verifyDashboard();
  }

  /**
   * Load environment settings from .env file
   */
  private loadEnvironment(environment: Environment): void {
    const envFile = path.join(__dirname, '..', 'environments', `.env.${environment}`);

    if (!fs.existsSync(envFile)) {
      throw new Error(`Environment file not found: .env.${environment}`);
    }

    const content = fs.readFileSync(envFile, 'utf8');

    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...parts] = trimmed.split('=');
        if (key && parts.length > 0) {
          this.envSettings[key.trim()] = parts.join('=').trim();
        }
      }
    });
  }

  /**
   * Navigate to the application with health check
   */
  private async navigate(): Promise<void> {
    const baseUrl = this.envSettings['BASE_URL'];
    if (!baseUrl) {
      throw new Error('BASE_URL not found in environment settings');
    }

    // Navigating to ${this.environment.toUpperCase()} environment: ${baseUrl}

    // Navigate to the page
    await this.page.goto(baseUrl);

    await this.wait.waitForLoadingToComplete();
  }

  /**
   * Perform login
   */
  private async login(): Promise<void> {
    const username = this.envSettings['USER_NAME'];
    const password = this.envSettings['PASSWORD'];
    
    if (!username || !password) {
      throw new Error('USER_NAME and PASSWORD must be set in environment file');
    }
    
    await this.loginSteps.clickLogin(username, password);
    await this.wait.waitForLoadingToComplete();
  }

  /**
   * Verify dashboard is loaded
   */
  private async verifyDashboard(): Promise<void> {
    await this.dashboardSteps.verifyDashboard();
  }
}
