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
        await Aluno.find().populateAll().then((data) => {
            return res.ok(data);
        })
    },
    listar:  async function (req,res) {
       
    },
    vincularOrientador: async function(req,res){

    }
};

