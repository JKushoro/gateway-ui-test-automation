"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const EnvManager_1 = require("../config/EnvManager");
/**
 * Global setup that runs once before all tests
 * Used for environment preparation and validation
 */
async function globalSetup(config) {
    console.log('🚀 Starting global setup...');
    console.log(`📍 Environment: ${EnvManager_1.envManager.getCurrentEnvironment()}`);
    console.log(`🌐 Base URL: ${EnvManager_1.envManager.getBaseUrl()}`);
    console.log(`Projects configured: ${config.projects.map(p => p.name).join(', ')}`);
    // Validate environment configuration
    try {
        const testConfig = EnvManager_1.envManager.getConfig();
        console.log('✅ Environment configuration validated');
    }
    catch (error) {
        console.error('❌ Environment configuration error:', error);
        throw error;
    }
    // Check if the application is accessible
    if (EnvManager_1.envManager.getBaseUrl()) {
        console.log('🔍 Checking application accessibility...');
        const browser = await test_1.chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        try {
            const response = await page.goto(EnvManager_1.envManager.getBaseUrl(), {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            });
            if (response && response.status() < 400) {
                console.log('✅ Application is accessible');
            }
            else {
                console.warn(`⚠️ Application returned status: ${response?.status()}`);
            }
        }
        catch (error) {
            console.error('❌ Application accessibility check failed:', error);
            if (EnvManager_1.envManager.isProduction()) {
                throw error; // Fail in production if app is not accessible
            }
        }
        finally {
            await context.close();
            await browser.close();
        }
    }
    // Create test results directories
    const fs = require('fs');
    const path = require('path');
    const directories = [
        'test-results',
        'test-results/screenshots',
        'test-results/videos',
        'test-results/traces',
        'test-results/html-report',
        'test-results/artifacts'
    ];
    directories.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`📁 Created directory: ${dir}`);
        }
    });
    // Log test configuration
    console.log('⚙️ Test Configuration:');
    console.log(`   - Headless: ${EnvManager_1.envManager.isHeadless()}`);
    console.log(`   - Screenshots: ${EnvManager_1.envManager.shouldEnableScreenshots()}`);
    console.log(`   - Video: ${EnvManager_1.envManager.shouldEnableVideo()}`);
    console.log(`   - Trace: ${EnvManager_1.envManager.shouldEnableTrace()}`);
    console.log(`   - Timeout: ${EnvManager_1.envManager.getTimeout()}ms`);
    console.log(`   - Slow Motion: ${EnvManager_1.envManager.getSlowMo()}ms`);
    // Environment-specific setup
    if (EnvManager_1.envManager.isDevelopment()) {
        console.log('🔧 Development mode setup complete');
    }
    else if (EnvManager_1.envManager.isQA()) {
        console.log('🧪 QA mode setup complete');
    }
    else if (EnvManager_1.envManager.isProduction()) {
        console.log('🚀 Production mode setup complete');
    }
    console.log('✅ Global setup completed successfully\n');
}
exports.default = globalSetup;
//# sourceMappingURL=global-setup.js.map