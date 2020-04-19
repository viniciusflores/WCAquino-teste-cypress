/// <reference types="cypress"/>

describe('Dinamic Tests', () => {
  beforeEach(()=>{
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  const foods = ['Carne','Frango','Pizza','Vegetariano']

  foods.forEach(food =>{
    it(`Cadastro com comida variada: ${food}`, ()=> {
      cy.get('#formNome').type('usuario')
      cy.get('[data-cy=dataSobrenome]').type('qualquer')
      cy.get(`[name=formSexo][value=M]`).click()
      cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
      cy.get('[data-test=dataEscolaridade]').select('Doutorado')
      cy.get('[data-testid=dataEsportes]').select('Corrida')
      cy.get('#formCadastrar').click()
      cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado!')
    })
  })

  
})