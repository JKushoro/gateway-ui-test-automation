// projects/gateway-ui/utils/EnvironmentManager.ts

import { Environment } from '@framework/types/Environment';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Shared Environment Manager for Gateway UI
 * Eliminates duplication between LoginSteps and LoginValidationSteps
 * Follows DRY principles and provides centralized environment configuration
 */
export class EnvironmentManager {
  private static instance: EnvironmentManager;
  private envSettings: Record<string, string> = {};
  private loadedEnvironment: Environment | null = null;

  private constructor() {}

  /**
   * Get singleton instance
   */
  public static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager();
    }
    return EnvironmentManager.instance;
  }

  /**
   * Load environment settings from .env.<environment>
   */
  private loadEnvironment(environment: Environment = 'qa'): void {
    // Skip if already loaded for this environment
    if (this.loadedEnvironment === environment && Object.keys(this.envSettings).length > 0) {
      return;
    }

    const envFile = path.join(__dirname, '..', 'environments', `.env.${environment}`);

    if (!fs.existsSync(envFile)) {
      throw new Error(`Environment file not found: .env.${environment}`);
    }

    const content = fs.readFileSync(envFile, 'utf8');

    // Clear previous settings
    this.envSettings = {};

    content.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const [key, ...parts] = trimmed.split('=');
      if (!key || parts.length === 0) return;

      this.envSettings[key.trim()] = parts.join('=').trim();
    });

    this.loadedEnvironment = environment;
  }

  /**
   * Ensure environment is loaded (lazy loading)
   */
  public ensureEnvLoaded(environment: Environment = 'qa'): void {
    this.loadEnvironment(environment);
  }

  /**
   * Get environment variable value
   * Checks process.env first, then loaded environment file
   */
  public getEnvValue(key: string, environment: Environment = 'qa'): string | undefined {
    this.ensureEnvLoaded(environment);
    return process.env[key] || this.envSettings[key];
  }

  /**
   * Get environment variable value or throw error if not found
   */
  public getEnvValueOrThrow(key: string, environment: Environment = 'qa'): string {
    const value = this.getEnvValue(key, environment);
    if (!value) {
      throw new Error(`${key} must be set in environment file or process.env`);
    }
    return value;
  }

  /**
   * Get base URL for environment
   */
  public getBaseUrl(environment: Environment = 'qa'): string {
    return this.getEnvValue('BASE_URL', environment) || 'https://qa-fairstonegateway.fairstone.co.uk';
  }

  /**
   * Get credentials for environment
   */
  public getCredentials(environment: Environment = 'qa'): { username: string; password: string } {
    const username = this.getEnvValueOrThrow('ADVISOR_EMAIL', environment);
    const password = this.getEnvValueOrThrow('ADVISOR_PASSWORD', environment);
    return { username, password };
  }

  /**
   * Get advisor email for environment
   */
  public getAdvisorEmail(environment: Environment = 'qa'): string {
    return this.getEnvValueOrThrow('ADVISOR_EMAIL', environment);
  }

  /**
   * Reset the instance (useful for testing)
   */
  public static reset(): void {
    if (EnvironmentManager.instance) {
      EnvironmentManager.instance.envSettings = {};
      EnvironmentManager.instance.loadedEnvironment = null;
    }
  }

  /**
   * Get all environment settings (for debugging)
   */
  public getAllSettings(environment: Environment = 'qa'): Record<string, string> {
    this.ensureEnvLoaded(environment);
    return { ...this.envSettings };
  }
}

// Export convenience function
export const getEnvironmentManager = (): EnvironmentManager => EnvironmentManager.getInstance();