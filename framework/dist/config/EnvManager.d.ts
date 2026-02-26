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
export declare class EnvManager {
    private static instances;
    private readonly config;
    private readonly environment;
    private constructor();
    /**
     * Get instance for specific environment
     */
    static getInstance(environment: Environment): EnvManager;
    /**
     * Reset all instances
     */
    static reset(): void;
    private loadEnvironmentConfig;
    private parseConfig;
    getBaseUrl(): string;
    getTimeout(): number;
    getCurrentEnvironment(): Environment;
    getSlowMo(): number;
    validateConfig(): void;
}
export declare const getEnvManager: (environment: Environment) => EnvManager;
//# sourceMappingURL=EnvManager.d.ts.map