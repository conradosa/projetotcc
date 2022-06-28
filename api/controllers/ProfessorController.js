/**
 * ProfessorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
    .populate('alunos').then((data) => {
      return res.view('pages/professor/alunos', {
        alunos: data.alunos
      });
    })
    .catch((erro) => {
      return res.serverError(erro);
    });
  },

};

