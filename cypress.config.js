const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'eq916x',
  e2e: {
    "watchForFileChanges": false,
    "baseUrl": "https://opensource-demo.orangehrmlive.com/",
    "env": {
      "username": "Admin",
      "password": "admin123"
    },
    "video": true,
    "screenshotOnRunFailure": true,
    "reporter": "mochawesome",
    "reporterOptions": {
      "reportDir": "cypress/results",
      "overwrite": true,
      "reportFilename": "TestResult",
      "cdn": true,
      "reportTitle": "Automation Test Results",
      "charts": true,
      "code": true,
      "html": true,
      "json": false,
      "autoOpen":true
    },
   setupNodeEvents(on, config) {
      // implement node event listeners here
   },
  },
});
