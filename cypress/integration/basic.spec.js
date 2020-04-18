/// <reference types="cypress" />

describe('Cypress basic', () => {
  it.only('Should visit a page and assert title', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    let syncTitle
    //cy.pause();
    
    // cy.title().should('be.equal', 'Campo de Treinamento')
    // cy.title().should('contain', 'Campo').debug()
    cy.title()
      .should('be.equal', 'Campo de Treinamento')
      .should('contain', 'Campo')


    cy.title().then(title => {
      console.log(title)

      cy.get('#formNome').type(`page title is: ${title}`)
      syncTitle = title
    })

    console.log(syncTitle)

    cy.get('[data-cy=dataSobrenome]').then($el => {
      $el.val(syncTitle)
    })
    
    cy.get('#elementosForm\\:sugestoes').then($el => {
      cy.wrap($el).type(syncTitle)
    })


  
  })

  it('Should find and interact with an element', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    cy.get('#buttonSimple')
      .click()
      .should('have.value', 'Obrigado!')

  })

})