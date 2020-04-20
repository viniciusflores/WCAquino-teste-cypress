const buildEnv = () => {
  cy.server()

  cy.route({
    method: 'POST',
    url: '/signin',
    response: {
      id: 7200,
      nome: 'Usuário do Mockê',
      token: 'Mockê aga tetê pe essi ok'
    }
  }).as('signin')

  cy.route({
    method: 'GET',
    url: '/saldo',
    response: [
      {
      conta_id: 999,
      conta: 'Carteira',
      saldo: '100.00'
      },
      {
      conta_id: 1999,
      conta: 'Banco',
      saldo: '10000.00'
      },{
      conta_id: 2999,
      conta: 'Poupança',
      saldo: '10.00'
      },
    ]
  }).as('saldo')

  cy.route({
    method: 'GET',
    url: '/contas',
    response: [
      { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
      { id: 2, nome: 'Banco', visivel: true, usuario_id: 1},
    ]
  }).as('Contas')

  cy.route({
    method: 'GET',
    url: '/extrato/**',
    response: [
      {conta:'Conta para movimentacoes',id:91355,descricao:'Movimentacao para exclusao',envolvido:'AAA',observacao:null,tipo:'DESP',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'-1500.00',status:true,conta_id:108548,usuario_id:9638,transferencia_id:null,parcelamento_id:null},
      {conta:'Conta com movimentacao',id:91356,descricao:'Movimentacao de conta',envolvido:'BBB',observacao:null,tipo:'DESP',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'-1500.00',status:true,conta_id:108549,usuario_id:9638,transferencia_id:null,parcelamento_id:null},
      {conta:'Conta para saldo',id:91357,descricao:'Movimentacao 1, calculo saldo',envolvido:'CCC',observacao:null,tipo:'REC',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'3500.00',status:false,conta_id:108550,usuario_id:9638,transferencia_id:null,parcelamento_id:null},
      {conta:'Conta para saldo',id:91358,descricao:'Movimentacao 2, calculo saldo',envolvido:'DDD',observacao:null,tipo:'DESP',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'-1000.00',status:true,conta_id:108550,usuario_id:9638,transferencia_id:null,parcelamento_id:null},
      {conta:'Conta para saldo',id:91359,descricao:'Movimentacao 3, calculo saldo',envolvido:'EEE',observacao:null,tipo:'REC',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'1534.00',status:true,conta_id:108550,usuario_id:9638,transferencia_id:null,parcelamento_id:null},
      {conta:'Conta para extrato',id:91360,descricao:'Movimentacao para extrato',envolvido:'FFF',observacao:null,tipo:'DESP',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'-220.00',status:true,conta_id:108551,usuario_id:9638,transferencia_id:null,parcelamento_id:null}
    ]
  })
}

export default buildEnv;