module.exports.routes = {

  '/': function (req, res) {
    res.redirect('/login');
  },

  'GET /etapa': {
    controller: 'aluno',
    action: 'etapa'
  },

  'POST /etapa': {
    controller: 'aluno',
    action: 'nav'
  },

  'GET /login': {
    //policy: 'naologado',
    view: 'pages/login',
    locals: {
      title: 'Login'
    }
  },

  'POST /login': {
    controller: 'usuario',
    action: 'login'
  },

  'GET /logout': {
    //policy: 'logado',
    controller: 'usuario',
    action: 'logout'
  },

  'GET /aluno': {
    //policy: 'logado',
    controller: 'aluno',
    action: 'index',
    locals: {
      title: 'Aluno'
    }
  },

  'GET /professor': {
    //policy: 'logado',
    view: 'pages/professor/index',
    locals: {
      title: 'Professor'
    }
  },

  'GET /status': {
    //policy: 'logado',
    controller: 'aluno',
    action: 'status',
    locals: {
      title: 'Status'
    }
  },

  'GET /etapa1': {
    //policy: 'logado',
    view: 'pages/aluno/etapas/etapa1',
    locals: {
      title: 'Etapa 1'
    }
  },

  'GET /etapa2': {
    //policy: 'logado',
    view: 'pages/aluno/etapas/etapa2',
    locals: {
      title: 'Etapa 2'
    }
  },

  'GET /etapa3': {
    //policy: 'logado',
    view: 'pages/aluno/etapas/etapa3',
    locals: {
      title: 'Etapa 3'
    }
  },

  'GET /etapa4': {
    //policy: 'logado',
    view: 'pages/aluno/etapas/etapa4',
    locals: {
      title: 'Etapa 4'
    }
  },

  'POST /upload': {
    //policy: 'logado',
    controller: 'aluno',
    action: 'upload'
  },

  'GET /a/c': {
    controller: 'usuario',
    action: 'insertAluno'
  },

  'GET /p/c': {
    controller: 'usuario',
    action: 'insertProfessor'
  },


  'GET /adm/criarADM': {
    //policy: 'admin',
    controller: 'administrador',
    action: 'criaADM'
  },

  'GET /adm/retornaADM': {
    //policy: 'admin',
    controller: 'administrador',
    action: 'retornaADM'
  }

};
