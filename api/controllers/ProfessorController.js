/**
 * ProfessorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const {tema, proposta, documentacao} = require('./AlunoController');

module.exports = {

  index: async function (req, res) {
    const professor = await Professor.findOne({usuario: req.session.usuarioId});
    return res.view('pages/professor/index', {
      disponivel: professor.disponivel
    });
  },

  disponivel: async function (req, res) {
    const professor = await Professor.findOne({usuario: req.session.usuarioId});
    try {
      if (professor.disponivel) {
        await Professor.update({usuario: req.session.usuarioId}).set({
          disponivel: false
        });
        return res.redirect('/professor');
      } else {
        await Professor.update({usuario: req.session.usuarioId}).set({
          disponivel: true
        });
        return res.redirect('/professor');
      }
    } catch (err) {
      req.session.erro = err.name;
      return res.redirect('/professor');
    }
  },

  listarAll: async function (req, res) {
    await Professor.find().populateAll().then((data) => {
      return res.ok(data);
    }).catch((erro) => {
      return res.serverError(erro);
    });
  },

  listarAlunos: async function (req, res) {
    await Professor
    .findOne({
      usuario: req.session.usuarioId
    })
    .populate('alunos').then((data) => {
      return res.view('pages/professor/alunos', {
        alunos: data.alunos
      });
    })
    .catch((erro) => {
      return res.serverError(erro);
    });
  },

  listarAlunos: async function (req, res) {
    await Professor
      .findOne({
        usuario: req.session.usuarioId
      })
      .populate('alunos').then(async (data) => {
        for (var i = 0; i < data.alunos.length; i++) {
          let user = await Usuario.findOne({
            id: data.alunos[i].usuario
          });
          let etapaText = '';
          switch (data.alunos[i].etapa) {
            case 1:
              data.alunos[i].etapaText = 'Tema do TCC';
              break;
      
            case 2:
              data.alunos[i].etapaText = 'Proposta do TCC';
              break;
      
            case 3:
              data.alunos[i].etapaText = 'Prévia do TCC';
              break;
      
            case 4:
              data.alunos[i].etapaText = 'Documentação do TCC';
              break;
      
            default:
              break;
          }

          data.alunos[i].nome = user.nome;
          data.alunos[i].matricula = user.matricula;
          data.alunos[i].email = user.email;
        }

        sails.log(data.alunos);
        return res.view('pages/professor/alunos', {
          alunos: data.alunos
        });
      })
      .catch((erro) => {
        return res.serverError(erro);
      });
  },

  verAluno: async function (req, res) {
    var conteudo = {};

    await Aluno.findOne({
      usuario: req.params.id
    }).then(async (data) => {
      if (data.etapa == 1) {
        conteudo = await Tema.findOne({
          aluno: data.id
        });
      } else if (data.etapa == 2) {
        conteudo = await Proposta.findOne({
          aluno: data.id
        });
      } else if (data.etapa == 3) {
        conteudo = await Previa.findOne({
          aluno: data.id
        });

        conteudo.firstProf = Professor.findOne({
          id: conteudo.prof1
        });

        conteudo.secondProf = Professor.findOne({
          id: conteudo.prof2
        });
      } else if (data.etapa == 4) {
        conteudo = await Documentacao.findOne({
          aluno: data.id
        });
      }

      let user = await Usuario.findOne({
        id: data.id
      });

      data.nome = user.nome;
      data.email = user.email;
      data.matricula = user.matricula;

      return res.view('pages/professor/aluno', {
        aluno: data,
        conteudo: conteudo
      });
    })
      .catch((erro) => {
        return res.serverError(erro);
      });
  },

  avaliarTrabalho: async function (req, res) {
    await Aluno.find({
      id: req.params.id
    }).then(async (data) => {
      sails.log(req.body);

      if (req.body.approve === 'approve') {
        //do stuff
        sails.log('aprova');
      } else if (req.body.result === 'reprove') {
        //do stuff
        sails.log('reprova');
      }

      return res.redirect('back');
    }).catch((erro) => {
      return res.serverError(erro);
    });
  },
};
