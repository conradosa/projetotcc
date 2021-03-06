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
    let conteudo = {};
    await Aluno.findOne({
      usuario: req.params.id
    }).then(async (data) => {
      if (data.etapa == 1) {
        conteudo = await Tema.find({
          where: { aluno: data.id },
          sort: 'id DESC'
        });
      } else if (data.etapa == 2) {
        conteudo = await Proposta.find({
          where: { aluno: data.id },
          sort: 'id DESC'
        });
      } else if (data.etapa == 3) {
        conteudo = await Previa.find({
          where: { aluno: data.id },
          sort: 'id DESC'
        });

        conteudo.firstProf = Professor.findOne({
          id: conteudo.prof1
        });

        conteudo.secondProf = Professor.findOne({
          id: conteudo.prof2
        });
      } else if (data.etapa == 4) {
        conteudo = await Documentacao.find({
          where: { aluno: data.id },
          sort: 'id DESC'
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
    try {
      const aluno = await Aluno.findOne({
        id: req.params.id
      });

      if (req.body.result === 'approve') {
        await Aluno.update({
          id: aluno.id
        }).set({
          etapa: ++aluno.etapa,
          status: 'Aprovado',
          pendencia: 1,
        });
      } else if (req.body.result === 'reprove') {

        /*var attStatus = '';
        if(aluno.etapa === 1){
          attStatus = 'Tema do TCC';
          sails.log("chegou");
        } else if (aluno.etapa === 2){
          attStatus = 'Proposta do TCC';
          sails.log("chegou2");
        } else if (aluno.etapa === 3) {
          attStatus = 'Prévia do TCC';
          sails.log("chegou3");
        } else if (aluno.etapa === 4) {
          attStatus = 'Documentação do TCC';
          sails.log("chegou4");
        }
        Não excluir log do ultimo envio (reprovado) para mostrar pro professor futuramente
        */

        await Aluno.update({
          id: aluno.id
        }).set({
          status: 'Reprovado',
          pendencia: 1,
        });
      }

      return res.redirect('/professor/alunos');
    } catch (err) {
      req.session.erro = err.name;
      return res.redirect('/professor/alunos');
    }
  },
};
