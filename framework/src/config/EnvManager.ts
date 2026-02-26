import * as dotenv from 'dotenv';
import * as path from 'path';
import { Environment } from '../types/Environment';

export interface EnvironmentConfig {
  baseUrl: string;
  timeout: number;
  slowMo: number;
}

/**
 * Simple Environment Manager for UI Automation Framework
 * Clean configuration management without browser control
 */
export class EnvManager {
  private static instances: Map<Environment, EnvManager> = new Map();
  private readonly config: EnvironmentConfig;
  private readonly environment: Environment;

  private constructor(environment: Environment) {
    this.environment = environment;
    this.loadEnvironmentConfig();
    this.config = this.parseConfig();
  }

  /**
   * Get instance for specific environment
   */
  public static getInstance(environment: Environment): EnvManager {
    if (!EnvManager.instances.has(environment)) {
      EnvManager.instances.set(environment, new EnvManager(environment));
    }
    return EnvManager.instances.get(environment)!;
  }

  /**
   * Reset all instances
   */
  public static reset(): void {
    EnvManager.instances.clear();
  }

  private loadEnvironmentConfig(): void {
    const envFile = `.env.${this.environment}`;
    const possiblePaths = [
      path.resolve(process.cwd(), 'environments', envFile),
      path.resolve(process.cwd(), envFile),
      path.resolve(process.cwd(), 'projects', 'gateway-ui', 'environments', envFile),
    ];

    for (const envPath of possiblePaths) {
      try {
        dotenv.config({ path: envPath });
        console.log(`Loaded environment config from: ${envPath}`);
        break;
      } catch (error) {
        // Continue to next path
      }
    }
  }

  private parseConfig(): EnvironmentConfig {
    return {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      timeout: parseInt(process.env.TIMEOUT || '45000'),
      slowMo: parseInt(process.env.SLOW_MO || '0'),
    };
  }

  // Public getters
  public getBaseUrl(): string {
    return this.config.baseUrl;
  }

  public getTimeout(): number {
    return this.config.timeout;
  }

  public getCurrentEnvironment(): Environment {
    return this.environment;
  }

  public getSlowMo(): number {
    return this.config.slowMo;
  }

  public validateConfig(): void {
    if (!this.config.baseUrl) {
      throw new Error('BASE_URL not configured for current environment');
    }
  }
}

// Export function to get instance for convenience
export const getEnvManager = (environment: Environment) => EnvManager.getInstance(environment);