import loc from './locators'

Cypress.Commands.add('accessMenuAccount', () => {
  cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.ACCOUNT).click()
})

Cypress.Commands.add('insertAccount', (conta) =>{
  cy.get(loc.ACCOUNT.NAME).type(conta)
    cy.get(loc.ACCOUNT.BTN_SAVE).click()
})