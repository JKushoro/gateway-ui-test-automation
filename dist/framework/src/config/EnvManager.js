"use strict";
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
exports.getEnvManager = exports.EnvManager = void 0;
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
/**
 * Simple Environment Manager for UI Automation Framework
 * Clean configuration management without browser control
 */
class EnvManager {
    constructor(environment) {
        this.environment = environment;
        this.loadEnvironmentConfig();
        this.config = this.parseConfig();
    }
    /**
     * Get instance for specific environment
     */
    static getInstance(environment) {
        if (!EnvManager.instances.has(environment)) {
            EnvManager.instances.set(environment, new EnvManager(environment));
        }
        return EnvManager.instances.get(environment);
    }
    /**
     * Reset all instances
     */
    static reset() {
        EnvManager.instances.clear();
    }
    loadEnvironmentConfig() {
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
            }
            catch (error) {
                // Continue to next path
            }
        }
    }
    parseConfig() {
        return {
            baseUrl: process.env.BASE_URL || 'http://localhost:3000',
            timeout: parseInt(process.env.TIMEOUT || '45000'),
            slowMo: parseInt(process.env.SLOW_MO || '0'),
        };
    }
    // Public getters
    getBaseUrl() {
        return this.config.baseUrl;
    }
    getTimeout() {
        return this.config.timeout;
    }
    getCurrentEnvironment() {
        return this.environment;
    }
    getSlowMo() {
        return this.config.slowMo;
    }
    validateConfig() {
        if (!this.config.baseUrl) {
            throw new Error('BASE_URL not configured for current environment');
        }
    }
}
exports.EnvManager = EnvManager;
EnvManager.instances = new Map();
// Export function to get instance for convenience
const getEnvManager = (environment) => EnvManager.getInstance(environment);
exports.getEnvManager = getEnvManager;
//# sourceMappingURL=EnvManager.js.map