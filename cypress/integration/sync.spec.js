/// <reference types="cypress"/>

describe('Waiters...', () => {
  before(()=>{
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  beforeEach(()=> {
    cy.reload()
  })


  it('Should wait for element is visible', () => {
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').type('funcionou')
  })







})