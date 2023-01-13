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
Cypress.Commands.add('fillMandatoryFieldAndSubmit', function (){
    cy.get('#firstName').type('aleaxndre')
    cy.get('#lastName').type('malaquias')
    cy.get('#email').type('alexandremos@gmail.com') 
    cy.get('#phone-checkbox').click()
    cy.get('#phone').type('98589259')
    cy.get('#open-text-area').type('teste')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

})