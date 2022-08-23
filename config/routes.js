
const { proxetapa } = require('../api/controllers/AlunoController');

module.exports.routes = {

  'GET /': {
    policy: 'home',
    view: 'pages/login'
  },

  'GET /aluno-ajuda': {
    view: 'pages/aluno/ajuda'
  },

  'GET /sugestoesAluno': {
    policy: 'logado',
    controller: 'sugestao',
    action: 'listarAll'
  },



  'GET /sugestoes': {
    policy: 'logado',
    controller: 'sugestao',
    action: 'listar'
  },

  'GET /editarSugestoes/:id': {
    view: 'pages/editarSugestao',
    controller: 'sugestao',
    action: 'buscar'
  },


  'GET /excluirSugestoes/:id': {
    controller: 'sugestao',
    action: 'excluir'
  },

  'POST /criarSugestao': {
    policy: 'logado',
    controller: 'sugestao',
    action: 'criar'
  },


  'POST /editarSugestao': {
    policy: 'logado',
    controller: 'sugestao',
    action: 'editar'
  },

  'GET /criarSugestao': {
    view: 'pages/criarSugestao'
  },


  'GET /pendencia': {
    policy: 'logado',
    controller: 'aluno',
    action: 'pendencia'
  },

  // Rotas Usuário //
  'GET /cadastro': {
    view: 'pages/aluno/cadastro'
  },

  // Rotas Usuário //
  'GET /prox': {controller: 'aluno', action: 'proxetapa'},
  'GET /verificar': {controller: 'aluno', action: 'verificar'},

  // Rotas Professor //
  'GET /professor': {policy: 'professor', controller: 'professor', action: 'index'},
  'POST /professor/disponivel': {policy: 'professor', controller: 'professor', action: 'disponivel'},
  'GET /professor/alunos': {policy: 'professor', controller: 'professor', action: 'listarAlunos'},
  'GET /professor/alunos/:id': {policy: 'professor', controller: 'professor', action: 'verAluno'},
  'POST /professor/alunos/:id': {policy: 'professor', controller: 'professor', action: 'avaliarTrabalho'},


  // Rotas ADM //


  // Rotas Admin

  'GET /adm/criarProfessor': {
    policy: 'admin',
    view: 'pages/adm/criarProfessor',
    locals: {
      title: 'Criar Usuário'
    }
  },

  'POST /adm/criarProfessor': {
    policy: 'admin',
    controller: 'usuario',
    action: 'insertProfessor'
  },

  'GET /adm/criarAluno': {
    policy: 'admin',
    view: 'pages/adm/criarAluno',
    locals: {
      title: 'Criar Usuário'
    }
  },

  'POST /adm/criarAluno': {
    policy: 'admin',
    controller: 'usuario',
    action: 'insertAluno'
  },

  'GET /adm/usuarios': {
    policy: 'admin',
    controller: 'usuario',
    action: 'painelUsuarios'
  },

  'GET /adm/usuarios/:id': {
    policy: 'admin',
    controller: 'usuario',
    action: 'verUsuario'
  },

  'GET /adm/alunos': {
    policy: 'admin',
    controller: 'usuario',
    action: 'painelAlunos'
  },

  'GET /adm/professores': {
    policy: 'admin',
    controller: 'usuario',
    action: 'painelProfessores'
  },

  'POST /adm/editar-usuario': {
    policy: 'admin',
    controller: 'usuario',
    action: 'editarView'
  },

  'POST /adm/deletar-usuario': {
    policy: 'admin',
    controller: 'usuario',
    action: 'deletarUsuario'
  },

  'POST /adm/editar-aluno': {
    policy: 'admin',
    controller: 'usuario',
    action: 'editarAluno'
  },

  'POST /adm/editar-professor': {
    policy: 'admin',
    controller: 'usuario',
    action: 'editarProfessor'
  },

  'GET /adm/procurarUsuario': {
    policy: 'admin',
    view: 'pages/adm/procurarUsuario',
    locals : {
      title: 'Procurar Usuário'
    }
  },

  'POST /adm/procurarUsuario':{
    policy: 'admin',
    controller: 'usuario',
    action: 'findUsuario'
  },

  'GET /adm/painelUsuario': {
    policy: 'admin',
    view: 'pages/adm/painelUsuario',
    locals: {
      title: 'Painel do Usuario'
    }
  },

  'GET /adm/editarUsuario': {
    policy: 'admin',
    view: 'pages/adm/editarUsuario',
    locals: {
      title: 'Editar Usuário'
    }
  },

  'GET /adm': {
    policy: 'admin',
    view: 'pages/adm/index'
  },

  'GET /adm/criarADM': {
    //policy: 'admin',
    controller: 'administrador',
    action: 'criaAdm'
  },

  'GET /adm/paineltcc': {
    //policy: 'admin',
    controller: 'tcc',
    action: 'painelTcc'
  },
  'POST /adm/paineltccs': {
    //policy: 'admin',
    controller: 'tcc',
    action: 'filtrar',
    view: 'pages/adm/filtrarTccs'
  },


  // 'GET /adm/retornaADM': {
  //   //policy: 'admin',
  //   controller: 'administrador',
  //   action: 'retornaADM'
  // },


  // Rotas Aluno //

  'GET /tentarNovamente': {policy: 'logado', controller: 'aluno', action: 'tentarNovamente'},

  // Rotas Etapas Aluno //

  'GET /etapas': {
    policy: 'logado',
    view: 'pages/aluno/etapas'
  },

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

  'GET /status': {
    policy: 'logado',
    controller: 'aluno',
    action: 'status'
  },

  // Rotas para Testes

  'GET /a/c': {
    controller: 'usuario',
    action: 'insertAlunoTest'
  },

  'GET /p/c': {
    controller: 'usuario',
    action: 'insertProfessorTest'
  },

};
