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
    "reporter": "mochawesome",
    "reporterOptions": {
      "reportDir": "cypress/results",
      "overwrite": false,
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
