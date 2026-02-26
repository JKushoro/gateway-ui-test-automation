"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
exports.default = (0, test_1.defineConfig)({
    testDir: './projects/gateway-ui/tests',
    fullyParallel: false,
    retries: 0,
    workers: 1,
    reporter: [
        ['html', { open: 'always', outputFolder: 'playwright-report' }],
        ['json', { outputFile: 'test-results/results.json' }],
        ['junit', { outputFile: 'test-results/junit-results.xml' }],
        ['list'],
    ],
    use: {
        headless: false,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 60000,
        navigationTimeout: 60000,
        viewport: { width: 1920, height: 1080 },
    },
    timeout: 60000,
    outputDir: './test-results/gateway-ui',
    projects: [
        {
            name: "chromium",
            use: {
                ...test_1.devices["Desktop Chrome"],
                channel: 'chrome',
                launchOptions: {
                    args: [
                        "--disable-features=UseModernWindowsSSO",
                        "--inprivate",
                        "--disable-extensions",
                        "--no-default-browser-check",
                        "--disable-sync",
                        '--auth-server-allowlist="*"',
                    ],
                },
            },
        },
        // {
        //   name: "firefox",
        //   use: { ...devices["Desktop Firefox"] },
        // },
        //
        // {
        //   name: "webkit",
        //   use: { ...devices["Desktop Safari"] },
        // },
    ],
});
//# sourceMappingURL=playwright.config.js.map