/**
 * AlunoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    criar: async function (req,res) {

   },
    deletar:  async function (req,res) {

    
    },
    atualizar:  async function (req,res) {
   
    
    },
    listarAll:  async function (req,res) {
        let users = await Professor.find().fetch()
        return res.ok(users);
    },
    listar:  async function (req,res) {
        let users = await Professor.find();
        return res.ok(users);
    }
};

