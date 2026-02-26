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
exports.envManager = exports.EnvManager = void 0;
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
class EnvManager {
    constructor() {
        this.supportedBrowsers = [
            'chromium', 'chrome', 'firefox', 'webkit', 'safari', 'edge', 'msedge'
        ];
        this.environmentDefaults = {
            development: {
                timeout: 30000,
                headless: false,
                browser: 'chromium',
                slowMo: 0,
                enableScreenshots: true,
                enableVideo: true,
                enableTrace: true,
            },
            qa: {
                timeout: 45000,
                headless: false,
                browser: 'chromium',
                slowMo: 100,
                enableScreenshots: true,
                enableVideo: true,
                enableTrace: true,
            },
            production: {
                timeout: 60000,
                headless: true,
                browser: 'chromium',
                slowMo: 0,
                enableScreenshots: false,
                enableVideo: false,
                enableTrace: false,
            },
        };
        this.environment = this.getEnvironment();
        this.loadEnvironmentConfig();
        this.config = this.parseConfig();
    }
    static getInstance() {
        if (!EnvManager.instance) {
            EnvManager.instance = new EnvManager();
        }
        return EnvManager.instance;
    }
    // Method to reset the singleton instance (useful for testing or environment changes)
    static reset() {
        EnvManager.instance = undefined;
    }
    getEnvironment() {
        const env = process.env.TEST_ENV || process.env.NODE_ENV || 'qa';
        if (env === 'qa' || env === 'production' || env === 'development') {
            return env;
        }
        return 'qa';
    }
    loadEnvironmentConfig() {
        const envFile = `.env.${this.environment}`;
        const envPath = path.resolve(process.cwd(), envFile);
        dotenv.config({ path: envPath });
        // Also load default .env if it exists
        dotenv.config({ path: path.resolve(process.cwd(), '.env') });
    }
    parseConfig() {
        const defaults = this.environmentDefaults[this.environment];
        return {
            baseUrl: this.getRequiredEnvVar('BASE_URL'),
            apiUrl: this.getRequiredEnvVar('API_URL'),
            timeout: parseInt(this.getEnvVar('TIMEOUT', defaults.timeout.toString())),
            headless: this.getEnvVar('HEADLESS', defaults.headless.toString()) === 'true',
            browser: this.validateBrowser(this.getEnvVar('BROWSER', defaults.browser)),
            slowMo: parseInt(this.getEnvVar('SLOW_MO', defaults.slowMo.toString())),
            testUsername: this.getRequiredEnvVar('TEST_USERNAME'),
            testPassword: this.getRequiredEnvVar('TEST_PASSWORD'),
            enableScreenshots: this.getEnvVar('ENABLE_SCREENSHOTS', defaults.enableScreenshots.toString()) === 'true',
            enableVideo: this.getEnvVar('ENABLE_VIDEO', defaults.enableVideo.toString()) === 'true',
            enableTrace: this.getEnvVar('ENABLE_TRACE', defaults.enableTrace.toString()) === 'true',
        };
    }
    getRequiredEnvVar(key) {
        const value = process.env[key];
        if (!value) {
            throw new Error(`Required environment variable ${key} is not defined for environment: ${this.environment}`);
        }
        return value;
    }
    getEnvVar(key, defaultValue) {
        return process.env[key] || defaultValue;
    }
    validateBrowser(browser) {
        const normalizedBrowser = browser.toLowerCase();
        if (this.supportedBrowsers.includes(normalizedBrowser)) {
            return normalizedBrowser;
        }
        console.warn(`Unsupported browser: ${browser}. Supported browsers: ${this.supportedBrowsers.join(', ')}. Falling back to chromium.`);
        return 'chromium';
    }
    // Public getters
    getConfig() {
        return { ...this.config };
    }
    getCurrentEnvironment() {
        return this.environment;
    }
    getBaseUrl() {
        return this.config.baseUrl;
    }
    getApiUrl() {
        return this.config.apiUrl;
    }
    getTimeout() {
        return this.config.timeout;
    }
    isHeadless() {
        return this.config.headless;
    }
    getBrowser() {
        return this.config.browser;
    }
    getSlowMo() {
        return this.config.slowMo;
    }
    getTestCredentials() {
        return {
            username: this.config.testUsername,
            password: this.config.testPassword,
        };
    }
    shouldEnableScreenshots() {
        return this.config.enableScreenshots;
    }
    shouldEnableVideo() {
        return this.config.enableVideo;
    }
    shouldEnableTrace() {
        return this.config.enableTrace;
    }
    // Utility methods
    isDevelopment() {
        return this.environment === 'development';
    }
    isQA() {
        return this.environment === 'qa';
    }
    isProduction() {
        return this.environment === 'production';
    }
    // Get environment-specific defaults for documentation/reference
    getEnvironmentDefaults() {
        return { ...this.environmentDefaults[this.environment] };
    }
    // Get all supported browsers for validation/documentation
    getSupportedBrowsers() {
        return [...this.supportedBrowsers];
    }
}
exports.EnvManager = EnvManager;
// Reset and export singleton instance to ensure latest configuration
EnvManager.reset();
exports.envManager = EnvManager.getInstance();
//# sourceMappingURL=EnvManager.js.map