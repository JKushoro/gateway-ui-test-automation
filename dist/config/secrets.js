"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secrets = exports.Secrets = void 0;
const EnvManager_1 = require("./EnvManager");
/**
 * Centralized secrets management for test automation
 * This file handles secure access to credentials and sensitive data
 */
class Secrets {
    constructor() { }
    static getInstance() {
        if (!Secrets.instance) {
            Secrets.instance = new Secrets();
        }
        return Secrets.instance;
    }
    /**
     * Get test user credentials for the current environment
     */
    getTestCredentials() {
        return EnvManager_1.envManager.getTestCredentials();
    }
    /**
     * Get admin credentials (if needed)
     * These should be set in environment variables as ADMIN_USERNAME and ADMIN_PASSWORD
     */
    getAdminCredentials() {
        const username = process.env.ADMIN_USERNAME;
        const password = process.env.ADMIN_PASSWORD;
        if (!username || !password) {
            throw new Error('Admin credentials not configured in environment variables');
        }
        return { username, password };
    }
    /**
     * Get API key for external services
     */
    getApiKey(serviceName) {
        const envKey = `${serviceName.toUpperCase()}_API_KEY`;
        const apiKey = process.env[envKey];
        if (!apiKey) {
            throw new Error(`API key for ${serviceName} not found in environment variable ${envKey}`);
        }
        return apiKey;
    }
    /**
     * Get database connection string (if needed for test data setup)
     */
    getDatabaseUrl() {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) {
            throw new Error('Database URL not configured in environment variables');
        }
        return dbUrl;
    }
    /**
     * Get JWT secret for token validation (if needed)
     */
    getJwtSecret() {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT secret not configured in environment variables');
        }
        return jwtSecret;
    }
    /**
     * Utility method to safely get any environment variable
     */
    getEnvVar(key, required = false) {
        const value = process.env[key];
        if (required && !value) {
            throw new Error(`Required environment variable ${key} is not set`);
        }
        return value;
    }
    /**
     * Check if we're running in a secure environment
     */
    isSecureEnvironment() {
        return EnvManager_1.envManager.isProduction() || EnvManager_1.envManager.isQA();
    }
}
exports.Secrets = Secrets;
// Export singleton instance
exports.secrets = Secrets.getInstance();
//# sourceMappingURL=secrets.js.map