/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsConta'

describe('Should test at a functional level', () => {
  before(()=> {
    cy.login('vini@vini','vini')
    cy.resetApp()
  })

  it('Should create an account', ()=> {
    cy.accessMenuAccount();
    cy.insertAccount('Conta de teste')
    cy.get(loc.MESSAGE.toast).should('contain', 'Conta inserida com sucesso')

  })

  it('Should update an account', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.ACCOUNT).click()
    cy.xpath(loc.ACCOUNT.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
    cy.get(loc.ACCOUNT.NAME)
      .clear()
      .type('Conta alterada')
    cy.get(loc.ACCOUNT.BTN_SAVE).click()
    cy.get(loc.MESSAGE.toast).should('contain','Conta atualizada com sucesso')
  })

  it('Should not create an account with same name', () =>{
    cy.accessMenuAccount();
    cy.insertAccount('Conta mesmo nome')
    cy.get(loc.MESSAGE.toast).should('contain', 'code 400')
  })

  it('Should create a transaction', ()=> {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.MOVIMENTATION).click()
    
    cy.get(loc.MOVIMENTATION.DESCRIPTION).type('desc')
    cy.get(loc.MOVIMENTATION.VALUE).type('123')
    cy.get(loc.MOVIMENTATION.INTERESTED).type('inter')
    cy.get(loc.MOVIMENTATION.ACCOUNT).select('Conta para movimentacoes')
    cy.get(loc.MOVIMENTATION.STATUS).click()
    cy.get(loc.MOVIMENTATION.BTN_SAVE).click()

    cy.get(loc.MESSAGE.toast).should('contain','sucesso')
  })

  it('Should get balance', ()=> {
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.HOME.FN_XP_HOME_BALANCE_ACCOUNT('Conta para saldo'))
      .should('contain', '534,00')
  })

  it('Should remove a transaction', ()=> {
    cy.get(loc.MENU.EXTRACT).click()
    cy.xpath(loc.EXTRACT.FN_XP_REMOVE_ELEMENT('Movimentacao para exclusao')).click()
    cy.get(loc.MESSAGE.toast).should('contain','sucesso')
  })
})
