module.exports.routes = {

 
  '/': function (req, res) {
    res.redirect('/login');
  },

    // Rotas Usuário //

  'GET /usuarios/:id': { action: 'usuario/listar' },
  'GET /usuarios': { action: 'usuario/listarAll' },
  'POST /usuarios': { policy: 'admin', action: 'usuario/criar' },
  'DELETE /usuarios/:id': { action: 'usuario/deletar' },
  'PUT /usuarios/:id': { action: 'usuario/atualizar' },
  
     // Rotas Professor //

  'GET /professores': { action: 'professor/listarAll' },
  'GET /professores/:id': { action: 'professor/listar' },
  'POST /professores': { action: 'professor/criar' },
  'DELETE /professores/:id': { action: 'professor/deletar' },
  'PUT /professores/:id': { action: 'professor/atualizar' },

     // Rotas Aluno //

  'GET /alunos': { action: 'aluno/listarAll' },
  'GET /alunos/:id': { action: 'aluno/listar' },
  'POST /alunos': { action: 'aluno/criar' },
  'DELETE /alunos/:id': { action: 'aluno/deletar' },
  'PUT /alunos/:id': { action: 'aluno/atualizar' },

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
