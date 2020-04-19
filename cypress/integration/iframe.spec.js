/// <reference types="cypress"/>

describe('Work with iframe', () => {
  before(()=>{
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  beforeEach(()=> {
    cy.reload()
  })

  it('iframe', ()=> {
    cy.get('#frame1').then(iframe => {
      const body = iframe.contents().find('body')
      cy.wrap(body).find('#tField')
        .type('Funciona?')
        .should('have.value', 'Funciona?')
    })
  })
  
  it('iframe', ()=> {
    cy.get('#frame1').then(iframe => {
      const body = iframe.contents().find('body')
      cy.wrap(body).find('#tField')
        .type('Funciona?')
        .should('have.value', 'Funciona?')

      cy.on('window:alert', msg => {
          expect(msg).to.be.equal('Alert Simples')
      })
      //cy.wrap(body).find('#otherButton').click()
    })

  })

  it('Should direct test in frame', () => {
    cy.visit('https://wcaquino.me/cypress/frame.html')
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Click OK!')
    })
    cy.get('#otherButton').click()
    
  })
})