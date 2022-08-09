/**
 * SugestaoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const dayjs = require('dayjs');

const retornaSugestoes = async (req,res)=>{
    const sugestoes = await Sugestao.find({Professor: req.session.usuarioId});
    return res.view('pages/sugestoes',{
        dayjs: dayjs,
        sugestoes: sugestoes
    });
}
 module.exports = {

    listar: async function (req,res){
        retornaSugestoes(req,res);
    },
    
   criar: async function (req,res){
    let sugestao = req.body
    const t = await Sugestao.create({
        nome:sugestao.nome,
        descricao:sugestao.descricao,
        Professor:req.session.usuarioId
      }).fetch();
      return res.redirect('/sugestoes');
    },

    buscar: async function (req,res){
       let sugestao = await Sugestao.findOne({id:req.param('id')});
       return res.view('pages/editarSugestao', {
            sugestoes:sugestao
       });
    },

    excluir: async function (req,res){
        var sugestao = await Sugestao.destroyOne({id: req.param('id')})
        retornaSugestoes(req,res);
     },



    editar: async function (req,res){
        let sugestao = req.allParams()
        var updatesugestao = await Sugestao.updateOne({ id:sugestao.id }).set({
                nome:sugestao.nome,
                descricao:sugestao.descricao
            });
            retornaSugestoes(req,res);
     }

 }
