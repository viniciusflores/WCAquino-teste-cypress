/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsConta'
import buildEnv from '../../support/buildEnv'

describe('Should test at a frontend level', () => {
  after(()=> {
    cy.clearLocalStorage()
  })
  
  beforeEach(()=> {
    buildEnv()
    cy.login('vini@vini','senhaErrada')
  })

  it('Should create an account', ()=> {
    cy.route({
      method: 'POST',
      url: '/contas',
      response: { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1},
    }).as('saveConta')

    cy.accessMenuAccount();
    cy.route({
      method: 'GET',
      url: '/contas',
      response: [
        { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
        { id: 2, nome: 'Banco', visivel: true, usuario_id: 1},
        { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1}
      ]
    }).as('ContasSave')
    cy.insertAccount('Conta de teste')
    cy.get(loc.MESSAGE.toast).should('contain', 'Conta inserida com sucesso')

  })

  it('Should update an account', () => {
    cy.route({
      method: 'PUT',
      url: '/contas/**',
      response: [
        { id: 1, nome: 'Conta alterada', visivel: true, usuario_id: 1},
      ]
    }).as('Contas')

    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.ACCOUNT).click()
    cy.xpath(loc.ACCOUNT.FN_XP_BTN_ALTERAR('Carteira')).click()
    cy.get(loc.ACCOUNT.NAME)
      .clear()
      .type('Conta alterada')
    cy.get(loc.ACCOUNT.BTN_SAVE).click()
    cy.get(loc.MESSAGE.toast).should('contain','Conta atualizada com sucesso')
  })

  it('Should not create an account with same name', () =>{
    cy.route({
      method: 'POST',
      url: '/contas',
      response: { "error": "Já existe uma conta com esse nome!"},
      status:400
    }).as('saveContaMesmoNome')

    cy.accessMenuAccount();
    cy.insertAccount('Conta mesmo nome')
    cy.get(loc.MESSAGE.toast).should('contain', 'code 400')
  })

  it('Should create a transaction', ()=> {
    cy.route({
      method: 'POST',
      url: '/transacoes',
      response: 
        {id:2,descricao:'desc',envolvido:'int',observacao:null,tipo:'REC',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'0.05',status:false,conta_id:2,usuario_id:1,transferencia_id:null,parcelamento_id:null}
    })

    cy.route({
      method: 'GET',
      url: '/extrato/**',
      response: 'fixture:movimentationSaved'
    })

    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.MOVIMENTATION).click()
    
    cy.get(loc.MOVIMENTATION.DESCRIPTION).type('desc')
    cy.get(loc.MOVIMENTATION.VALUE).type('123')
    cy.get(loc.MOVIMENTATION.INTERESTED).type('inter')
    cy.get(loc.MOVIMENTATION.ACCOUNT).select('Banco')
    cy.get(loc.MOVIMENTATION.STATUS).click()
    cy.get(loc.MOVIMENTATION.BTN_SAVE).click()

    cy.get(loc.MESSAGE.toast).should('contain','sucesso')
    cy.get(loc.EXTRACT.LINES).should('have.length',7)
  })

  it('Should get balance', ()=> {
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.HOME.FN_XP_HOME_BALANCE_ACCOUNT('Carteira'))
      .should('contain', '100,00')
  })

  it('Should remove a transaction', ()=> {
    cy.route({
      method: 'DELETE',
      url: '/transacoes/*',
      response: {},
      status: 204
    })
    cy.get(loc.MENU.EXTRACT).click()
    
    cy.xpath(loc.EXTRACT.FN_XP_REMOVE_ELEMENT('Movimentacao para exclusao')).click()
    cy.get(loc.MESSAGE.toast).should('contain','sucesso')
   })

   it.only('Should validate data send to create an account', ()=> {
    // const reqStub = cy.stub()
    
    cy.route({
      method: 'POST',
      url: '/contas',
      response: { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1},
      onRequest: req => {
        expect(req.request.body.name).to.be.not.empty
        expect(req.request.headers).to.have.property('Authorization')
      }
      // onRequest: reqStub
    }).as('saveConta')

    cy.accessMenuAccount();
    cy.route({
      method: 'GET',
      url: '/contas',
      response: [
        { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
        { id: 2, nome: 'Banco', visivel: true, usuario_id: 1},
        { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1}
      ],
    }).as('ContasSave')

    cy.insertAccount('{CTRL}')

    // cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')

    // cy.wait('@saveConta').then(() => {
    //   expect(reqStub.args[0][0].request.body.name).to.be.not.empty
    //   expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
    // })

    cy.get(loc.MESSAGE.toast).should('contain', 'Conta inserida com sucesso')

  })
})
