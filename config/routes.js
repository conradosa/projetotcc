module.exports.routes = {

  '/': function (req, res) {
    res.redirect('/login');
  },

  'GET /login': {
    policy: 'naologado',
    view: 'pages/login'
  },

  'POST /login': {
    controller: 'usuario',
    action: 'login'
  },

  'GET /logout': {
    policy : 'logado',
    controller: 'usuario',
    action: 'logout'
  },

  '/home': {
    policy : 'logado',
    view: 'pages/home'
  },

  'GET /user/criar': {
    policy : 'admin',
    controller: 'usuario',
    action: 'insertTeste'
  },

  'GET /user/retorna': {
    policy : 'admin',
    controller: 'usuario',
    action: 'retornaUser'
  },

  'GET /adm/criarADM': {
    policy : 'admin',
    controller: 'administrador',
    action: 'criarADM'
  },

  'GET /adm/retornaADM': {
    policy : 'admin',
    controller: 'administrador',
    action: 'retornaADM'
  }

};
