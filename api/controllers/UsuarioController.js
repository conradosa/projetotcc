/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const serviceUsuario = require('../Services/Usuario');

module.exports = {

  criar:  async function (req,res) {
      let  params = req.allParams();
      let user = null;
      delete req.body.tipo;
      serviceUsuario.validar.validateAsync(req.body).then( async ()=>{
      let user = await  Usuario.create(req.body).fetch();
      if(params.tipo === "Professor") user = await Professor.create( { usuario  : user.id} ).fetch();
      else if(params.tipo === "Aluno") user = await Aluno.create( { usuario  : user.id} ).fetch();  
      res.status(201);
      return res.send(user);
    }).catch((erro)=>{
      return res.badRequest(erro.message);
    });
  },

  deletar:  async function (req,res) {
    const user = await Usuario.destroy({id:req.params.id}).fetch();
      if(user.length === 0){
        res.status(404);
        return res.send("Usário não encontrado!");
      }else{
        return res.ok(`Usuário ${user[0].nome} Apagado!`);
      }
  },
  atualizar:  async function (req,res) {
    serviceUsuario.validar.validateAsync(req.body).then( async ()=>{
     const user = await Usuario.updateOne({id:req.params.id}).set({nomde,email,senha,matricula} = req.body);
     console.log(user);
     return res.ok("Usuário alterado!");
    }).catch((erro)=>{
      return res.badRequest(erro.message);
    });
  },

  listar:  async function (req,res) {

      const user = await Usuario.findOne({id:req.params.id});
      return res.ok(user)

  },

  listarAll:  async function (req,res) {
    await Usuario.find().then((data)=>{
      return res.ok(data);
    }).catch((erro)=>{
      return res.badRequest(erro.message)
    })
  },
};

