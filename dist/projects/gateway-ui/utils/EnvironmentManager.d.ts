import { Environment } from '@framework/types/Environment';
/**
 * Shared Environment Manager for Gateway UI
 * Eliminates duplication between LoginSteps and LoginValidationSteps
 * Follows DRY principles and provides centralized environment configuration
 */
export declare class EnvironmentManager {
    private static instance;
    private envSettings;
    private loadedEnvironment;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): EnvironmentManager;
    /**
     * Load environment settings from .env.<environment>
     */
    private loadEnvironment;
    /**
     * Ensure environment is loaded (lazy loading)
     */
    ensureEnvLoaded(environment?: Environment): void;
    /**
     * Get environment variable value
     * Checks process.env first, then loaded environment file
     */
    getEnvValue(key: string, environment?: Environment): string | undefined;
    /**
     * Get environment variable value or throw error if not found
     */
    getEnvValueOrThrow(key: string, environment?: Environment): string;
    /**
     * Get base URL for environment
     */
    getBaseUrl(environment?: Environment): string;
    /**
     * Get credentials for environment
     */
    getCredentials(environment?: Environment): {
        username: string;
        password: string;
    };
    /**
     * Get advisor email for environment
     */
    getAdvisorEmail(environment?: Environment): string;
    /**
     * Reset the instance (useful for testing)
     */
    static reset(): void;
    /**
     * Get all environment settings (for debugging)
     */
    getAllSettings(environment?: Environment): Record<string, string>;
}
export declare const getEnvironmentManager: () => EnvironmentManager;
//# sourceMappingURL=EnvironmentManager.d.ts.map