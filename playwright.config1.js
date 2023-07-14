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
  retries:1,
  workers:3, //default - 5
  timeout: 100 * 1000,
  expect:{
    timeout: 5000
  },

//npx playwright test tests/ClientApp.spec.js --config playwright.config1.js
//npx playwright test tests/ClientApp.spec.js --config playwright.config1.js --project=safari
////npx playwright test tests/ClientApp.spec.js --config playwright.config1.js --project=chrome
  projects:[
    {
      name:'safari',
      use: {
        // trace: 'on-first-retry',
        browserName: 'webkit',//firefox,chromium,webkit
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        // ...devices["iPhone 11"] //select device view port
      }
    },
    {
      name:"chrome",  
      use: {
        // trace: 'on-first-retry',
        browserName: 'chromium',//firefox,chromium,webkit
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        // viewport:{width:720,height:720} //to control window size
        // ...devices["Pixel 5"]
        ignoreHTTPSErrors:true,
        permissions:['geolocation'],
        video:"retain-on-failure"
      }
    }
  ]

  // use: {
  //   // trace: 'on-first-retry',
  //   browserName: 'webkit',//firefox,chromium,webkit
  //   headless: true,
  //   screenshot: 'only-on-failure',
  //   trace: 'retain-on-failure'
  // }
});

