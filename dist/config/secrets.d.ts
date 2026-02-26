/**
 * Centralized secrets management for test automation
 * This file handles secure access to credentials and sensitive data
 */
export declare class Secrets {
    private static instance;
    private constructor();
    static getInstance(): Secrets;
    /**
     * Get test user credentials for the current environment
     */
    getTestCredentials(): {
        username: string;
        password: string;
    };
    /**
     * Get admin credentials (if needed)
     * These should be set in environment variables as ADMIN_USERNAME and ADMIN_PASSWORD
     */
    getAdminCredentials(): {
        username: string;
        password: string;
    };
    /**
     * Get API key for external services
     */
    getApiKey(serviceName: string): string;
    /**
     * Get database connection string (if needed for test data setup)
     */
    getDatabaseUrl(): string;
    /**
     * Get JWT secret for token validation (if needed)
     */
    getJwtSecret(): string;
    /**
     * Utility method to safely get any environment variable
     */
    getEnvVar(key: string, required?: boolean): string | undefined;
    /**
     * Check if we're running in a secure environment
     */
    isSecureEnvironment(): boolean;
}
export declare const secrets: Secrets;
//# sourceMappingURL=secrets.d.ts.map