/**
 * TccController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { tema } = require("./AlunoController");



module.exports = {
  

    painelTcc: async function (req, res) {
        const temas = await Tema.find().populate('aluno');
        const users = await Usuario.find();
        const professores = await Professor.find().populate('usuario');


        const t = temas.map((t)=>{
            t.aluno.usuario = users.filter((a)=>{
                if(a.id = t.aluno.usuario) return a;
            })
            t.aluno.orientador = professores.filter((a)=>{
                if(a.id = t.aluno.orientador) return a;
            })
            
            return t;
        })

        console.log(t)

        return res.view('pages/adm/painelTccs', {
          title: 'Painel dos TCCs',
          tccs: t
        });
      },
    


};

