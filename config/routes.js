
const { proxetapa } = require('../api/controllers/AlunoController');

module.exports.routes = {

  'GET /': {
    policy: 'home',
    view: 'pages/login'
  },

  'GET /aluno-ajuda': {
    view: 'pages/aluno/ajuda'
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

  'POST /adm/alterarUsuario' : {
    controller: 'usuario',
    action: 'alterarUsuario',
  },

  'POST /adm/alterarMatricula' : {
    controller: 'usuario',
    action: 'alterarMatricula',
  },
  'POST /adm/alterarNome' : {
    controller: 'usuario',
    action: 'alterarNome',
  },
  'POST /adm/alterarEmail' : {
    controller: 'usuario',
    action: 'alterarEmail',
  },
  'POST /adm/alterarSenha' : {
    controller: 'usuario',
    action: 'alterarSenha',
  },

  'GET /adm/painelUsuario': {
    view: 'pages/adm/painelUsuario',
    locals: {
      title: 'Painel do Usuario'
    },
    controller: 'usuario',
    action: 'findUsuario'
  },

  'GET /adm/editarUsuario': {
    view: 'pages/adm/editarUsuario',
    locals: {
      title: 'Editar Usuário'
    }
  },

  'GET /adm/filtro': {
    view: 'pages/adm/filtro',
    locals: {
      title: 'Filtro'
    },
    controller: 'usuario',
    action: 'findProfessores'
  },

  'GET /adm': {
    view: 'pages/adm/index'
  },

  'GET /adm/criarADM': {
    //policy: 'admin',
    controller: 'administrador',
    action: 'criaAdm'
  },

  'GET /adm/email': {
    controller:'usuario',
    action:'enviarEmail'
  },


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
