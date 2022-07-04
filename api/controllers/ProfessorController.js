/**
 * ProfessorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { tema, proposta, documentacao } = require("./AlunoController");

module.exports = {

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
      .populate('alunos').then(async (data) => {
        for(var i = 0; i < data.alunos.length; i++) {
          let user = await Usuario.findOne({
            id: data.alunos[i].usuario
          });

          data.alunos[i].nome = user.nome;
          data.alunos[i].matricula = user.matricula;
          data.alunos[i].email = user.email;
        }

        sails.log(data.alunos);
        return res.view('pages/professor/alunos', {
          alunos: data.alunos
        })
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
      if(data.etapa == 1) {
        conteudo = await Tema.findOne({
          aluno: data.id
        });
      } else if(data.etapa == 2) {
        conteudo = await Proposta.findOne({
          aluno: data.id
        });
      } else if(data.etapa == 3) {
        conteudo = await Previa.findOne({
          aluno: data.id
        });

        conteudo.firstProf = Professor.findOne({
          id: conteudo.prof1
        });

        conteudo.secondProf = Professor.findOne({
          id: conteudo.prof2
        });
      } else if(data.etapa == 4) {
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
      })
    })
    .catch((erro) => {
      return res.serverError(erro);
    });
  },
}
