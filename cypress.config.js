const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'i1fh85',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
