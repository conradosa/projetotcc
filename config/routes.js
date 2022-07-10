const { proxetapa } = require("../api/controllers/AlunoController");

module.exports.routes = {

  'GET /': {
    // policy: 'home',
    view: 'pages/login'
  },

  'GET /pendencia': {
    // policy: 'logado',
    controller: 'aluno',
    action: 'pendencia'
  },

  // Rotas Usuário //

  'GET /prox': {
    controller: 'aluno', action: 'proxetapa'
  },

  'GET /verificar': {
    controller: 'aluno', action: 'verificar'
  },

  'GET /usuarios/:id': {
    action: 'usuario/listar'
  },

  'GET /usuarios': {
    action: 'usuario/listarAll'
  },

  'POST /usuarios': {
    policy: 'admin', action: 'usuario/criar'
  },

  'DELETE /usuarios/:id': {
    action: 'usuario/deletar'
  },

  'PUT /usuarios/:id': {
    action: 'usuario/atualizar'
  },


  // Rotas Professor //

  'GET /professor/alunos': {
    action: 'professor/listarAlunos'
  },

  'GET /professores': {
    action: 'professor/listarAll'
  },

  'GET /professores/:id': {
    action: 'professor/listar'
  },

  'POST /professores': {
    action: 'professor/criar'
  },

  'DELETE /professores/:id': {
    action: 'professor/deletar'
  },

  'PUT /professores/:id': {
    action: 'professor/atualizar'
  },

  

  // Rotas Admin

  'GET /adm/criarProfessor': {
    //policy: 'naologado',
    view: 'pages/adm/criarProfessor',
    locals: {
      title: 'Criar Usuário'
    }
  },

  'POST /adm/criarProfessor': {
    controller: 'usuario',
    action: 'insertProfessor'
  },






  'GET /adm/criarAluno': {
    //policy: 'naologado',
    view: 'pages/adm/criarAluno',
    locals: {
      title: 'Criar Usuário'
    }
  },

  'POST /adm/criarAluno': {
    controller: 'usuario',
    action: 'insertAluno'
  },





  'GET /adm/procurarUsuario': {
    // policy:'naologado',
    view: 'pages/adm/procurarUsuario',
    locals : {
      title: 'Procurar Usuário'
    }
  },

  'POST /adm/procurarUsuario':{
    controller: 'usuario',
    action: 'findUsuario'
  },

  'GET /adm/editarUsuario': {
    view: 'pages/adm/editarUsuario',
    locals: {
      title: 'Editar Usuário'
    }
  },





  'GET /adm/index': {
    policy: 'naologado',
    view: 'pages/adm/index'
  },

  // 'GET /adm/criarADM': {
  //   //policy: 'admin',
  //   controller: 'administrador',
  //   action: 'criaAdm'
  // },

  // 'GET /adm/retornaADM': {
  //   //policy: 'admin',
  //   controller: 'administrador',
  //   action: 'retornaADM'
  // },

  


  // Rotas Aluno //

  'GET /alunos': {
    action: 'aluno/listarAll'
  },
  
  'GET /alunos/:id': {
    action: 'aluno/listar'
  },
  
  'POST /alunos/:id/orientador/:idOrientador': {
    action: 'aluno/addOrientador'
  },
  
  'POST /alunos': {
    action: 'aluno/criar'
  },
  
  'DELETE /alunos/:id': {
    action: 'aluno/deletar'
  },
  
  'PUT /alunos/:id': {
    action: 'aluno/atualizar'
  },
  
  'GET /tentarnovamente': {
    policy: 'logado', controller: 'aluno', action: 'tentarnovamente'
  },


  
  

  // Rotas Etapas Aluno //

  'GET /etapa': {
    policy: 'logado',
    controller: 'aluno',
    action: 'etapa'
  },

  'GET /etapa1': {
    policy: 'logado',
    controller: 'aluno',
    action: 'etapa1'
  },

  'POST /etapa1': {
    policy: 'logado',
    controller: 'aluno',
    action: 'tema'
  },

  'GET /etapa2': {
    policy: 'logado',
    controller: 'aluno',
    action: 'etapa2'
  },

  'POST /etapa2': {
    policy: 'logado',
    controller: 'aluno',
    action: 'proposta'
  },

  'GET /etapa3': {
    policy: 'logado',
    controller: 'aluno',
    action: 'etapa3'
  },

  'POST /etapa3': {
    policy: 'logado',
    controller: 'aluno',
    action: 'previa'
  },

  'GET /etapa4': {
    policy: 'logado',
    controller: 'aluno',
    action: 'etapa4'
  },

  'POST /etapa4': {
    policy: 'logado',
    controller: 'aluno',
    action: 'documentacao'
  },

  // Rotas Login //

  'GET /login': {
    policy: 'naologado',
    view: 'pages/login'
  },

  'POST /login': {
    controller: 'usuario',
    action: 'login'
  },

  'GET /logout': {
    policy: 'logado',
    controller: 'usuario',
    action: 'logout'
  },

  'GET /aluno': {
    policy: 'logado',
    controller: 'aluno',
    action: 'index'
  },

  'GET /professor': {
    policy: 'logado',
    view: 'pages/professor/index'
  },

  '/etapa4': {
    //policy: 'logado',
    view: 'pages/etapa4',
    locals: {
      title: 'Home'
    }
  },

  'POST /upload': {
    policy: 'logado',
    controller: 'aluno',
    action: 'upload'
  },

  // Rotas para Testes

  

  'GET /p/c': {
    controller: 'usuario',
    action: 'insertProfessor'
  },


  

};
