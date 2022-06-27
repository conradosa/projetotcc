module.exports.routes = {

  '/': function (req, res) {
    res.redirect('/login');
  },

  'GET /etapa': {
    controller: 'etapas',
    action: 'etapa'
  },

  'POST /etapa': {
    controller: 'etapa',
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

  '/home': {
    //policy: 'logado',
    view: 'pages/home',
    locals: {
      title: 'Home'
    }
  },

  '/etapa1': {
    //policy: 'logado',
    view: 'pages/etapa1',
    locals: {
      title: 'Home'
    }
  },

  '/etapa2': {
    //policy: 'logado',
    view: 'pages/etapa2',
    locals: {
      title: 'Home'
    }
  },

  '/etapa3': {
    //policy: 'logado',
    view: 'pages/etapa3',
    locals: {
      title: 'Home'
    }
  },

  // '/criarAluno': {
  //   //policy: 'logado',
  //   view: 'pages/adm/criarAluno',
  //   locals: {
  //     title: 'Home'
  //   }
  // },

  // '/criarProfessor': {
  //   //policy: 'logado',
  //   view: 'pages/adm/criarProfessor',
  //   locals: {
  //     title: 'Home'
  //   }
  // },

  '/etapa4': {
    //policy: 'logado',
    view: 'pages/etapa4',
    locals: {
      title: 'Home'
    }
  },

  'POST /upload': {
    //policy: 'logado',
    controller: 'usuario',
    action: 'uploadDocumento'
  },

  'GET /user/remove': {
    controller: 'usuario',
    action: 'remove'
  },

  'GET /user/criar': {
    //policy: 'naologado',
    view: 'pages/adm/criarAluno',
    locals: {
      title: 'Criar Usuário'
    }
  },

  'POST /user/criar': {
    controller: 'usuario',
    action: 'insertAluno'
  },

  'GET /user/retorna': {
    controller: 'usuario',
    action: 'retorna'
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
