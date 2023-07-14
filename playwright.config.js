const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 30 * 1000,
  expect:{
    timeout: 5000
  },

  use: {
    // trace: 'on-first-retry',
    browserName: 'chromium',//firefox,chromium,webkit
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  }
});

/*
- tag based execution
npx playwright test --grep=@Web
*/
