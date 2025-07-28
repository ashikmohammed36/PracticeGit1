import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
//dotenv.config({ 
// path: process.env.ENV_NAME ?`./env-files/.env.${process.env.ENV_NAME}`:`./env-files/.env.demo'`
//})
if (process.env.ENV_NAME) {
  const path = `env-files/.env.${process.env.ENV_NAME}`;
  dotenv.config({ path });
  console.log(`✅ Loaded ${path}`);
} else {
  console.log(`🟡 No ENV_NAME set — skipping env file load`);
}


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  globalSetup: './tests/ui-tests/global.setup.ts',
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /*    */
  expect: { timeout: 30000 },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'always' }], // 'html',
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // headless: false,// Show browser window (set true for CI)
    headless: process.env.CI ? true : false,  // ✅ force headless on CI
    viewport: null,  // disables default viewport and uses real screen size
    baseURL: process.env.API_BASE_URL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },

  },

  /* Configure projects for major browsers */
  projects: [
    //{
    //  name: 'Setup',
    //  testMatch: 'global.setup.ts'
    // },
    {
      name: 'chromium',
      dependencies: ['Setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: './playwright/.auth/auth.json'
      },

    },
    {
      name: 'apiTest',
      testDir: './tests/api-tests'

    },
    /*{
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
          },
      
          {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
          },*/


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
