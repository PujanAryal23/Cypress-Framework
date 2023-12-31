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
    "reporter": "cypress-multi-reporters",
    "reporterOptions": {
      "reporterEnabled": "mochawesome, mocha-junit-reporter",
      "mochawesomeReporterOptions": {
        "reportDir": "cypress/results",
        "overwrite": true,
        "reportFilename": "TestResult",
        "reportTitle": "Automation Test Results",
        "charts": true,
        "code": true,
        "html": true,
        "json": false,
        "autoOpen": true,
        "embeddedScreenshots": true
      },
      "mochaJunitReporterReporterOptions": {
        "mochaFile": "cypress/results/results.xml"
      }
    },
   setupNodeEvents(on, config) {
      // implement node event listeners here
   },
  },
});
