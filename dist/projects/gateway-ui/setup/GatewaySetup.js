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
exports.GatewaySetup = void 0;
const BasePage_1 = require("@framework/core/BasePage");
const LoginSteps_1 = require("@steps/LoginSteps");
const DashboardSteps_1 = require("@steps/DashboardSteps");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/**
 * GatewaySetup - Simple Gateway application setup
 * Navigate to environment, login, and verify dashboard
 */
class GatewaySetup extends BasePage_1.BasePage {
    constructor(page, environment) {
        super(page);
        this.envSettings = {};
        this.loginSteps = new LoginSteps_1.LoginSteps(page);
        this.dashboardSteps = new DashboardSteps_1.DashboardSteps(page);
        this.environment = environment;
        this.loadEnvironment(environment);
    }
    /**
     * Setup Gateway for testing - Navigate, login and verify dashboard
     */
    static async setupForEnvironment(page, environment) {
        // Running tests on environment: ${environment.toUpperCase()}
        const setup = new GatewaySetup(page, environment);
        await setup.navigate();
        await setup.login();
        await setup.verifyDashboard();
    }
    /**
     * Load environment settings from .env file
     */
    loadEnvironment(environment) {
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
    async navigate() {
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
    async login() {
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
    async verifyDashboard() {
        await this.dashboardSteps.verifyDashboard();
    }
}
exports.GatewaySetup = GatewaySetup;
//# sourceMappingURL=GatewaySetup.js.map