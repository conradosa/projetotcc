module.exports.routes = {

  '/': { view: 'pages/login' },

  'POST /login': {
    controller: 'usuario',
    action: 'login'
  },

  'GET /user/criar': {
    controller: 'usuario',
    action: 'insertTeste'
  },

  'GET /user/retorna': {
    controller: 'usuario',
    action: 'retornaUser'
  },

  'GET /adm/criarADM': {
    controller: 'administrador',
    action: 'criarADM'
  },

  'GET /adm/retornaADM': {
    controller: 'administrador',
    action: 'retornaADM'
  }

};
