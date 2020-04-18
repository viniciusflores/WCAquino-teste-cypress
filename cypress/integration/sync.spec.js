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

  it('Should do retrys', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo')
      .should('exist')
      .type('funciona')
  })


  it('Should use find', () => {
    cy.get('#buttonList').click()
    cy.get('#lista li')
      .find('span')
      .should('contain', 'Item 1')
    cy.get('#lista li')
      //.find('span')
      .should('contain', 'Item 2')
  })

  it('Should use timeout', () =>{
    cy.get('#buttonDelay').click()
    //cy.get('#novoCampo', {timeout: 1000}).should('exist')
    cy.get('#novoCampo').should('exist')
  })  

  it('Should vs Then', ()=> {
    cy.get('#buttonListDOM').click()
    // cy.get('#lista li span').should($el => {
    //   console.log($el)
    //   expect($el).to.have.length(1)
    // })
    cy.get('#lista li span').then($el => {
      console.log($el)
      expect($el).to.have.length(1)
    })
  })

})