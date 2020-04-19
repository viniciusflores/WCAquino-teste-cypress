const locators = {
  LOGIN: {
    USER: '[data-test=email]',
    PASSWORD: '[data-test=passwd]',
    BTN_LOGIN: '.btn'
  },
  MENU: {
    SETTINGS:'[data-test=menu-settings]',
    ACCOUNT:'[href="/contas"]',
    MOVIMENTATION: '[data-test=menu-movimentacao]',
    RESET:'[href="/reset"]',
    HOME: '[data-test=menu-home]',
    EXTRACT: '[data-test=menu-extrato]'
  },
  ACCOUNT: {
    NAME: '[data-test=nome]',
    BTN_SAVE: '.btn',
    FN_XP_BTN_ALTERAR: nome => `//table//td[contains(.,'${nome}')]/..//i[@class='far fa-edit']`
  },
  MOVIMENTATION: {
    DESCRIPTION: '[data-test=descricao]',
    VALUE: '[data-test=valor]',
    INTERESTED: '[data-test=envolvido]',
    ACCOUNT: '[data-test=conta]',
    STATUS: '[data-test=status]',
    BTN_SAVE: '.btn-primary'
  },
  HOME: {
    FN_XP_HOME_BALANCE_ACCOUNT: nome => `//td[contains(.,'${nome}')]/../td[2]`
  },
  EXTRACT: {
    LINES: '.list-group > li',
    FN_XP_FIND_ELEMENT: (desc, value) => `//span[contains(.,'${desc}')]/following-sibling::small[contains(.,'${value}')]`,
    FN_XP_REMOVE_ELEMENT: conta => `span[contains(.,'${conta}')]/../../..//i[@class='far fa-trash-alt']`,
  },
  MESSAGE: {
    toast: '.toast-message'
  }
}

export default locators;