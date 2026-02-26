import { defineConfig } from '@playwright/test';

export default defineConfig({
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
  timeout: 60_000,
  outputDir: './test-results/gateway-ui',

  use: {
    headless: false,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 60_000,
    navigationTimeout: 60_000,

    viewport: null,
    launchOptions: {
      args: [
        '--start-maximized',
        '--disable-features=UseModernWindowsSSO',
        '--inprivate',
        '--disable-extensions',
        '--no-default-browser-check',
        '--disable-sync',
        '--auth-server-allowlist="*"',
      ],
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { channel: 'chrome' },
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
