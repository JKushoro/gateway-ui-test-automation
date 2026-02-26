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
            retries: process.env.CI ? 2 : 1,
            workers: 1,
            reporter: [
                ['html', { open: 'never', outputFolder: 'playwright-report' }],
                ['json', { outputFile: 'test-results/results.json' }],
                ['junit', { outputFile: 'test-results/junit-results.xml' }],
                ['list']
            ],
            use: {
                headless: process.env.CI ? true : false,
                channel: 'chrome',
                trace: 'on-first-retry',
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
                actionTimeout: 45000,
                navigationTimeout: 45000,
                viewport: { width: 1920, height: 1080 },
                launchOptions: {
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--no-first-run',
                        '--no-zygote',
                        '--disable-features=UseModernWindowsSSO',
                        '--disable-extensions',
                        '--no-default-browser-check',
                        '--disable-sync',
                        '--auth-server-allowlist="*"',
                        '--disable-web-security',
                        '--disable-features=VizDisplayCompositor'
                    ]
                }
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
                launchOptions: {
                    ...baseConfig.use.launchOptions,
                    ...projectSpecificConfig?.use?.launchOptions,
                    args: [
                        ...baseConfig.use.launchOptions.args,
                        ...(projectSpecificConfig?.use?.launchOptions?.args || [])
                    ]
                }
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
exports.default = PlaywrightConfigBuilder;
//# sourceMappingURL=PlaywrightConfigBuilder.js.map