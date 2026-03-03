"use strict";
// projects/gateway-ui/utils/EnvironmentManager.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentManager = exports.EnvironmentManager = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/**
 * Shared Environment Manager for Gateway UI
 * Eliminates duplication between LoginSteps and LoginValidationSteps
 * Follows DRY principles and provides centralized environment configuration
 */
class EnvironmentManager {
    constructor() {
        this.envSettings = {};
        this.loadedEnvironment = null;
    }
    /**
     * Get singleton instance
     */
    static getInstance() {
        if (!EnvironmentManager.instance) {
            EnvironmentManager.instance = new EnvironmentManager();
        }
        return EnvironmentManager.instance;
    }
    /**
     * Load environment settings from .env.<environment>
     */
    loadEnvironment(environment = 'qa') {
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
            if (!trimmed || trimmed.startsWith('#'))
                return;
            const [key, ...parts] = trimmed.split('=');
            if (!key || parts.length === 0)
                return;
            this.envSettings[key.trim()] = parts.join('=').trim();
        });
        this.loadedEnvironment = environment;
    }
    /**
     * Ensure environment is loaded (lazy loading)
     */
    ensureEnvLoaded(environment = 'qa') {
        this.loadEnvironment(environment);
    }
    /**
     * Get environment variable value
     * Checks process.env first, then loaded environment file
     */
    getEnvValue(key, environment = 'qa') {
        this.ensureEnvLoaded(environment);
        return process.env[key] || this.envSettings[key];
    }
    /**
     * Get environment variable value or throw error if not found
     */
    getEnvValueOrThrow(key, environment = 'qa') {
        const value = this.getEnvValue(key, environment);
        if (!value) {
            throw new Error(`${key} must be set in environment file or process.env`);
        }
        return value;
    }
    /**
     * Get base URL for environment
     */
    getBaseUrl(environment = 'qa') {
        return this.getEnvValue('BASE_URL', environment) || 'https://qa-fairstonegateway.fairstone.co.uk';
    }
    /**
     * Get credentials for environment
     */
    getCredentials(environment = 'qa') {
        const username = this.getEnvValueOrThrow('ADVISOR_EMAIL', environment);
        const password = this.getEnvValueOrThrow('ADVISOR_PASSWORD', environment);
        return { username, password };
    }
    /**
     * Get advisor email for environment
     */
    getAdvisorEmail(environment = 'qa') {
        return this.getEnvValueOrThrow('ADVISOR_EMAIL', environment);
    }
    /**
     * Reset the instance (useful for testing)
     */
    static reset() {
        if (EnvironmentManager.instance) {
            EnvironmentManager.instance.envSettings = {};
            EnvironmentManager.instance.loadedEnvironment = null;
        }
    }
    /**
     * Get all environment settings (for debugging)
     */
    getAllSettings(environment = 'qa') {
        this.ensureEnvLoaded(environment);
        return { ...this.envSettings };
    }
}
exports.EnvironmentManager = EnvironmentManager;
// Export convenience function
const getEnvironmentManager = () => EnvironmentManager.getInstance();
exports.getEnvironmentManager = getEnvironmentManager;
//# sourceMappingURL=EnvironmentManager.js.map