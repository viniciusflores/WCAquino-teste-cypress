/// <reference types="cypress"/>

describe('Helpers...', ()=>{
  it('Wrap', () =>{
    const obj = {nome: 'User', idade: 20}
    expect(obj).to.have.property('nome')
    cy.wrap(obj).should('have.property','nome')

    cy.visit('https://wcaquino.me/cypress/componentes.html')
    // cy.get('#formNome').then($el => {
    //   cy.wrap($el).type('Funciona via cypress')
    // })

    const promisse = new Promise((resolve,reject) => {
      setTimeout(()=> {
        resolve(10)
      }, 500)
    })

    cy.get('#buttonSimple').then(()=>console.log('First button'))
    cy.wrap(promisse).then(num => console.log(num))
    cy.get('#buttonList').then(()=>console.log('Second button'))

    
  })
})