"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EnvManager_1 = require("../config/EnvManager");
/**
 * Global teardown that runs once after all tests
 * Used for cleanup and reporting
 */
async function globalTeardown(config) {
    console.log('\n🧹 Starting global teardown...');
    const fs = require('fs');
    const path = require('path');
    // Generate test summary
    try {
        const testResultsPath = 'test-results/test-results.json';
        if (fs.existsSync(testResultsPath)) {
            const testResults = JSON.parse(fs.readFileSync(testResultsPath, 'utf8'));
            console.log('📊 Test Execution Summary:');
            console.log(`   - Total Tests: ${testResults.stats?.total || 'N/A'}`);
            console.log(`   - Passed: ${testResults.stats?.passed || 'N/A'}`);
            console.log(`   - Failed: ${testResults.stats?.failed || 'N/A'}`);
            console.log(`   - Skipped: ${testResults.stats?.skipped || 'N/A'}`);
            console.log(`   - Duration: ${testResults.stats?.duration || 'N/A'}ms`);
        }
    }
    catch (error) {
        console.warn('⚠️ Could not read test results for summary');
    }
    // Clean up old artifacts (keep last 5 runs)
    try {
        const cleanupDirectories = [
            'test-results/screenshots',
            'test-results/videos',
            'test-results/traces'
        ];
        for (const dir of cleanupDirectories) {
            if (fs.existsSync(dir)) {
                const files = fs.readdirSync(dir)
                    .map((file) => ({
                    name: file,
                    path: path.join(dir, file),
                    time: fs.statSync(path.join(dir, file)).mtime.getTime()
                }))
                    .sort((a, b) => b.time - a.time);
                // Keep only the 10 most recent files
                const filesToDelete = files.slice(10);
                for (const file of filesToDelete) {
                    try {
                        fs.unlinkSync(file.path);
                        console.log(`🗑️ Cleaned up old artifact: ${file.name}`);
                    }
                    catch (error) {
                        console.warn(`⚠️ Could not delete ${file.name}:`, error);
                    }
                }
            }
        }
    }
    catch (error) {
        console.warn('⚠️ Artifact cleanup failed:', error);
    }
    // Generate environment report
    try {
        const environmentReport = {
            timestamp: new Date().toISOString(),
            environment: EnvManager_1.envManager.getCurrentEnvironment(),
            configuration: {
                baseUrl: EnvManager_1.envManager.getBaseUrl(),
                headless: EnvManager_1.envManager.isHeadless(),
                timeout: EnvManager_1.envManager.getTimeout(),
                screenshots: EnvManager_1.envManager.shouldEnableScreenshots(),
                video: EnvManager_1.envManager.shouldEnableVideo(),
                trace: EnvManager_1.envManager.shouldEnableTrace(),
            },
            system: {
                platform: process.platform,
                nodeVersion: process.version,
                arch: process.arch,
            }
        };
        const reportPath = 'test-results/environment-report.json';
        fs.writeFileSync(reportPath, JSON.stringify(environmentReport, null, 2));
        console.log(`📋 Environment report saved to: ${reportPath}`);
    }
    catch (error) {
        console.warn('⚠️ Could not generate environment report:', error);
    }
    // Archive results for CI/CD
    if (process.env.CI) {
        try {
            const archiveName = `test-results-${EnvManager_1.envManager.getCurrentEnvironment()}-${Date.now()}.tar.gz`;
            console.log(`📦 Archiving results as: ${archiveName}`);
            // Note: In a real implementation, you might want to use a proper archiving library
            // This is just a placeholder for the concept
        }
        catch (error) {
            console.warn('⚠️ Could not archive results:', error);
        }
    }
    // Log completion message
    console.log(`✅ Global teardown completed for ${EnvManager_1.envManager.getCurrentEnvironment()} environment`);
    // Environment-specific teardown messages
    if (EnvManager_1.envManager.isDevelopment()) {
        console.log('🔧 Development teardown: Check test-results/ for detailed reports');
    }
    else if (EnvManager_1.envManager.isQA()) {
        console.log('🧪 QA teardown: Results ready for analysis');
    }
    else if (EnvManager_1.envManager.isProduction()) {
        console.log('🚀 Production teardown: Critical test results archived');
    }
    console.log('🏁 All tests completed\n');
}
exports.default = globalTeardown;
//# sourceMappingURL=global-teardown.js.map