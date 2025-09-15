const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  // "reporter": "mochawesome",
  // "reporterOptions": {
  //   "reportDir": "cypress/reports",
  //   "overwrite": false,
  //   "html": false,
  //   "json": true
  // },

  e2e: {
    baseUrl: 'https://practice.expandtesting.com/notes/app',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

