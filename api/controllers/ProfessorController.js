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
}
