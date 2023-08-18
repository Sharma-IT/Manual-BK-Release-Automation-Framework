// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const CI_login_URL = Cypress.env('CI_login_URL');
const username = Cypress.env('username');
const password = Cypress.env('password');

const { logTestComplete } = require('./logUtils');

before(() => {
  cy.visit(CI_login_URL);
  cy.get('#login_email').type(username);
  cy.get('#login_password').type(password).type('{enter}');
});

after(() => {
  const testTitle = Cypress.mocha.getRunner().suite.ctx.currentTest.title;
  const startTime = Date.now();

  logTestComplete(testTitle, startTime);
});

