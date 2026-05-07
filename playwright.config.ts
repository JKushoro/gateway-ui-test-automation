import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './projects/gateway-ui/tests',
  fullyParallel: true,
  retries: 0,
  workers: process.env.CI ? 2 : undefined, // Use 2 workers in CI, auto-detect locally
  globalSetup: './playwright/global-setup.ts',
  
  reporter: [
    [
      'html',
      {
        open: process.env.CI ? 'never' : 'always',
        outputFolder: 'playwright-report',
      },
    ],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    ['list', { printSteps: true }],
  ],
  timeout: 180_000, // 3 minutes - appropriate for end-to-end tests
  outputDir: './test-results/gateway-ui',

  use: {
    headless: false,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 60_000,
    navigationTimeout: 60_000,
    storageState: './playwright/.auth/user.json',

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
