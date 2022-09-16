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

function findColumnText(text, columnSelector,tableSelector) {
    cy.intercept({
        method: 'POST',
        url:'wwv_flow.ajax**'
    }).as('tableToLoad')
  return cy
    .get(tableSelector)
    .should("be.visible")
    .then(($container) => {
      if ($container.find(`${columnSelector}:contains(${text})`).length) {
        return true;
      } else {
        return false;
      }
    })
    .then((found) => {
      if (found) {
        cy.log(`found employee : ${text}`);
        return cy.get(`${columnSelector}:contains(${text})`);
      } else if (
        Cypress.$(`${tableSelector} .a-IRR-pagination button[aria-label='Next']`)
          .length
      ) {
        cy
          .get(`${tableSelector} .a-IRR-pagination button[aria-label='Next']`)
          
            .click();
          cy.wait('@tableToLoad')
        cy.get(
          `${tableSelector} .a-IRR-pagination button[aria-label='Previous']`
        ).should("be.visible");

        return findColumnText(text,columnSelector,tableSelector);
      } else {
        throw new Error(`Couldn't find employee "${text}" on any page`);
      }
    });
}

Cypress.Commands.add("findEmployeeNumber", (text, columnSelector,tableSelector) => {
    findColumnText(text, columnSelector,tableSelector);
});
