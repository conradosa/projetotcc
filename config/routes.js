module.exports.routes = {

 
  '/': function (req, res) {
    res.redirect('/login');
  },

    // Rotas Usuário //

  'GET /usuario/:id': { action: 'usuario/listar' },
  'GET /usuario': { action: 'usuario/listarAll' },
  'POST /usuario': { policy: 'admin', action: 'usuario/criar' },
  'DELETE /usuario/:id': { action: 'usuario/deletar' },
  'PUT /usuario/:id': { action: 'usuario/atualizar' },
  
     // Rotas Professor //

  'GET /professor': { action: 'professor/listarAll' },
  'GET /professor/:id': { action: 'professor/listar' },
  'POST /professor': { action: 'professor/criar' },
  'DELETE /professor/:id': { action: 'professor/deletar' },
  'PUT /professor/:id': { action: 'professor/atualizar' },

     // Rotas Aluno //

  'GET /professor': { action: 'professor/listarAll' },
  'GET /professor/:id': { action: 'professor/listar' },
  'POST /professor': { action: 'professor/criar' },
  'DELETE /professor/:id': { action: 'professor/deletar' },
  'PUT /professor/:id': { action: 'professor/atualizar' },

// Rotas View

  '/home': {
    policy: 'logado',
    view: 'pages/home',
    locals: {
      title: 'Home'
    }
  },

  'POST /upload': {
    policy: 'logado',
    controller: 'usuario',
    action: 'uploadDocumento'
  },

  'GET /user/criar': {
    policy: 'admin',
    controller: 'usuario',
    action: 'insertTeste'
  },

  'GET /user/retorna': {
    policy: 'admin',
    controller: 'usuario',
    action: 'retornaUser'
  },

  'GET /adm/criarADM': {
    policy: 'admin',
    controller: 'administrador',
    action: 'criaADM'
  },

  'GET /adm/retornaADM': {
    policy: 'admin',
    controller: 'administrador',
    action: 'retornaADM'
  },

 'GET /login': {
  policy: 'naologado',
  view: 'pages/login',
  locals: {
    title: 'Login'
  }
},

'POST /login': {
  controller: 'login',
  action: 'login'
},

'GET /logout': {
  policy: 'logado',
  controller: 'login',
  action: 'logout'
},
  



};
