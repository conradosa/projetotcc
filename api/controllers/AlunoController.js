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
        await Aluno.findOne({id:req.params.id}).then( async(data)=>{
            if(data === undefined){
              res.status(404);
              return res.send("Aluno não encontrado!");
            }else{
                const user = await Aluno.updateOne({id:req.params.id}).set({nomde,email,senha,matricula} = req.body);
                return res.ok(`Aluno ${user.nome} alterado!`);
            }
          }).catch(()=>{
            return res.serverError("Erro no servidor!")
          })
    
    },
    listarAll:  async function (req,res) {
        await Aluno.find().populateAll().then((data) => {
            return res.ok(data);
        })
    },
    listar:  async function (req,res) {
       
    },
    addOrientador: async function(req,res){
        const user = await Aluno.findOne({id:req.params.id}).then( async (data)=>{
            if(data === undefined){
                res.status(404);
                return res.send("Aluno não encontrado!");
              }else{
                  const user = await Aluno.updateOne({id:req.params.id}).set({...data,orientador:req.params.idOrientador});
                  return res.ok(`Aluno ${user.nome} alterado!`);
              }
        }).catch()
    }
};

