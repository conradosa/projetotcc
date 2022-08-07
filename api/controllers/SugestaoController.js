/**
 * SugestaoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const retornaSugestoes = async (req,res)=>{
    await Sugestao.query(
        'SELECT id,nome,descricao,usuarioId,(SELECT DATE_FORMAT(data_envio,"%d/%m/%Y")) as data_envio FROM sails.sugestao Where usuarioId=$1'
        ,[req.session.usuarioId],(err,result)=>{
            return res.view('pages/sugestoes', {
                sugestoes: result.rows
            });
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