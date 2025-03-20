const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    experimentalStudio: true,
    viewportWidth: 1280, // Set the desired width
    viewportHeight: 800, // Set the desired height
  },
});