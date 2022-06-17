/**
 * ProfessorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    
    criar: async function (req, res) {

    },
    deletar: async function (req, res) {

    },
    atualizar: async function (req, res) {

    },

    listar: async function (req, res) {
        let users = await Professor.findOne({ id: req.body.id });
        return res.ok(users);
    },
    listarAll: async function (req, res) {
        let users = await Professor.find();
        return res.ok(users);
    },
};

