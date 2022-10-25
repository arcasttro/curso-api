const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://marvel-qa-cademy.herokuapp.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  "video": false
});
