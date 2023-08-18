const _ = require('lodash');

function logTestComplete(testTitle, startTime) {
  const endTime = Date.now();
  const duration = endTime - startTime;

  const formattedTitle = _.startCase(testTitle);

  cy.task('log:test:complete', { testTitle: formattedTitle, startTime, endTime, duration }, { log: false }).then(() => {
    cy.task('log', `Test "${formattedTitle}" complete! Duration: ${duration}ms`, { log: false });
  });
}

// Validate specific required params like title/startTime
function validateParams(params) {
  if (!params.title) {
    throw new Error('Missing required parameter: title');
  }

  if (!params.startTime) {
    throw new Error('Missing required parameter: startTime');
  }

  // Add more validation logic if needed
}

// Export util as a default export
module.exports = {
  // Example util function
  someFunction: (params) => {
    validateParams(params);

    // Add your util logic here
  }
};

module.exports.logTestComplete = logTestComplete;
