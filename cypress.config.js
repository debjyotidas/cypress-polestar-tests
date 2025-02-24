const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    e2e: {
      chromeWebSecurity: false,
      experimentalModifyObstructiveThirdPartyCode: true,
      defaultCommandTimeout: 10000,
      pageLoadTimeout: 30000
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1280, // Set the desired width
    viewportHeight: 720, // Set the desired height
  },
});
