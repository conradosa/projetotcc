/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const serviceUsuario = require('../Services/Usuario');

module.exports = {

  criar:  async function (req,res) {
      let user = null;
      serviceUsuario.validar.validateAsync(req.body).then( async ()=>{
      let user = await  Usuario.create(req.body).fetch();
      if(user.tipo === "Professor") user = await Professor.create( { usuario  : user.id} ).fetch();
      else if(user.tipo === "Aluno") user = await Aluno.create( { usuario  : user.id} ).fetch();  
      res.status(201);
      return res.send(user);
    }).catch((erro)=>{
      return res.serverError(erro.message);
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
    await Usuario.findOne({id:req.params.id}).then( async(data)=>{
      if(data === undefined){
        res.status(404);
        return res.send("Usário não encontrado!");
      }else{
          serviceUsuario.validar.validateAsync(req.body).then(async ()=> {
          const user = await Usuario.updateOne({id:req.params.id}).set({nomde,email,senha,matricula} = req.body);
          return res.ok(`Usuário ${user.nome} alterado!`);
         })
      }
    }).catch(()=>{
      return res.serverError("Erro no servidor!")
    })
  },

  listar:  async function (req,res) {
      const user = await Usuario.findOne({id:req.params.id}).then( async(data)=>{
        if(data === undefined){
          res.status(404);
          return res.send("Usário não encontrado!");
        }else{
          return res.ok(data);
        }
      }).catch(()=>{
        return res.serverError("Erro no servidor!")
      })
  },

  listarAll:  async function (req,res) {
    await Usuario.find().then((data)=>{
      return res.ok(data);
    }).catch((erro)=>{
      return res.serverError("Erro no servidor!")
    })
  },
};

