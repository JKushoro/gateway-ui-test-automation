"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaywrightConfigBuilder = void 0;
/**
 * PlaywrightConfigBuilder - Clean, reusable Playwright configuration
 * Works with any browser and provides standardized settings
 */
class PlaywrightConfigBuilder {
    /**
     * Build standard Playwright configuration
     */
    static buildConfig(projectSpecificConfig) {
        const baseConfig = {
            fullyParallel: false,
            forbidOnly: !!process.env.CI,
            retries: 1,
            workers: 1,
            reporter: [
                ['html', { open: 'always', outputFolder: 'playwright-report' }],
                ['json', { outputFile: 'test-results/results.json' }],
                ['junit', { outputFile: 'test-results/junit-results.xml' }],
                ['list']
            ],
            use: {
                headless: false,
                channel: 'chrome',
                trace: 'on',
                screenshot: 'on',
                video: 'retain-on-failure',
                actionTimeout: 45000,
                navigationTimeout: 45000,
                viewport: { width: 1920, height: 1080 },
            },
            testDir: './tests',
            outputDir: './test-results',
        };
        // Merge with project-specific configuration
        return {
            ...baseConfig,
            ...projectSpecificConfig,
            use: {
                ...baseConfig.use,
                ...projectSpecificConfig?.use,
            },
            reporter: projectSpecificConfig?.reporter || baseConfig.reporter,
        };
    }
    /**
     * Quick config for projects
     */
    static quickConfig(projectName) {
        return this.buildConfig({
            outputDir: `./test-results/${projectName}`,
        });
    }
}
exports.PlaywrightConfigBuilder = PlaywrightConfigBuilder;
//# sourceMappingURL=PlaywrightConfigBuilder.js.map