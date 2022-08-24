/**
 * ProfessorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment');

const {tema, proposta, documentacao} = require('./AlunoController');

module.exports = {

  index: async function (req, res) {
    const professor = await Professor.findOne({usuario: req.session.usuarioId});
    return res.view('pages/professor/index', {
      disponivel: professor.disponivel
    });
  },

  disponivel: async function (req, res) {
    const professor = await Professor.findOne({usuario: req.session.usuarioId});
    try {
      if (professor.disponivel) {
        await Professor.update({usuario: req.session.usuarioId}).set({
          disponivel: false
        });
        return res.redirect('/professor');
      } else {
        await Professor.update({usuario: req.session.usuarioId}).set({
          disponivel: true
        });
        return res.redirect('/professor');
      }
    } catch (err) {
      req.session.erro = err.name;
      return res.redirect('/professor');
    }
  },

  listarAlunos: async function (req, res) {
    await Professor
      .findOne({
        usuario: req.session.usuarioId
      })
      .populate('alunos').then(async (data) => {
        for (var i = 0; i < data.alunos.length; i++) {
          let user = await Usuario.findOne({
            id: data.alunos[i].usuario
          });
          let etapaText = '';
          switch (data.alunos[i].etapa) {
            case 1:
              data.alunos[i].etapaText = 'Tema do TCC';
              break;

            case 2:
              data.alunos[i].etapaText = 'Proposta do TCC';
              break;

            case 3:
              data.alunos[i].etapaText = 'Prévia do TCC';
              break;

            case 4:
              data.alunos[i].etapaText = 'Documentação do TCC';
              break;

            default:
              break;
          }

          data.alunos[i].nome = user.nome;
          data.alunos[i].matricula = user.matricula;
          data.alunos[i].email = user.email;
        }

        sails.log(data.alunos);
        return res.view('pages/professor/alunos', {
          alunos: data.alunos
        });
      })
      .catch((erro) => {
        return res.serverError(erro);
      });
  },

  verAluno: async function (req, res) {
    let aux = null;
    let conteudo = [];
    sails.log(req.params.id);
    await Aluno.findOne({
      usuario: req.params.id
    }).then(async (data) => {
      sails.log(data);
      if (data.etapa == 1 || data.etapa > 1) {
        aux = await Tema.find({
          where: { aluno: data.id },
          sort: 'id DESC'
        });
        conteudo.unshift(aux);
      } if (data.etapa == 2 || data.etapa > 2) {
        aux = await Proposta.find({
          where: { aluno: data.id },
          sort: 'id DESC'
        });
        conteudo.unshift(aux);
      } if (data.etapa == 3 || data.etapa > 3) {
        aux = await Previa.find({
          where: { aluno: data.id },
          sort: 'id DESC'
        });

        aux.firstProf = Professor.findOne({
          id: aux.prof1
        });

        aux.secondProf = Professor.findOne({
          id: aux.prof2
        });

        conteudo.unshift(aux);
      } if (data.etapa == 4) {
        conteudo = await Documentacao.find({
          where: { aluno: data.id },
          sort: 'id DESC'
        });

        conteudo.unshift(aux);
      }

      let user = await Usuario.findOne({
        id: data.usuario
      });

      data.nome = user.nome;
      data.email = user.email;
      data.matricula = user.matricula;
      sails.log("conteudo");
      sails.log(conteudo);

      return res.view('pages/professor/aluno', {
        aluno: data,
        conteudo: conteudo
      });
    })
      .catch((erro) => {
        return res.serverError(erro);
      });
  },

  avaliarTrabalho: async function (req, res) {
    try {
      let conteudo = {};

      await Aluno.findOne({
        usuario: req.params.id
      }).then(async (data) => {
        if(data.etapa == 1){
          sails.log('entrou');

          conteudo = await Tema.find({
            where: { aluno: data.id, data_aprovacao: null, data_reprovacao: null },
            sort: 'id DESC'
          });

          sails.log(conteudo);

          if (req.body.situation === 'approve'){
            await Tema.update({
              id: conteudo.id
            }).set({
              data_aprovacao: moment().format('YYYY-MM-DD HH:mm:ss')
            });

            // ----------- Envio de Email 
            let user = await Usuario.findOne({id: data.usuario})
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth:({
                user:"2019005201@restinga.ifrs.edu.br",
                pass: "92096055"
              })
            })
        
            let options = {
              from: "2019005201@restinga.ifrs.edu.br",
              to: user.email,
              subject: "Email de atualização de status",
              text:"Seu tema foi aprovado, agora você está na etapa 2."
            };
        
            transporter.sendMail(options, function(err, info){
              if(err){
                sails.log(err);
                return;
              }
              sails.log("Sent: "+info.response);
            });
          } else {
            await Tema.update({
              id: conteudo.id
            }).set({
              data_reprovacao: moment().format('YYYY-MM-DD HH:mm:ss'),
              motivo_reprovacao: req.body.description
            });

             // ----------- Envio de Email 
            let user = await Usuario.findOne({id: data.usuario})
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth:({
                user:"2019005201@restinga.ifrs.edu.br",
                pass: "92096055"
              })
            })
        
            let options = {
              from: "2019005201@restinga.ifrs.edu.br",
              to: user.email,
              subject: "Email de atualização de status",
              text:"Seu tema foi reprovado, favor rever seu documento."
            };
        
            transporter.sendMail(options, function(err, info){
              if(err){
                sails.log(err);
                return;
              }
              sails.log("Sent: "+info.response);
            });
          }

        } else if (data.etapa == 2){
          conteudo = await Proposta.find({
            where: { aluno: data.id, data_aprovacao: null, data_reprovacao: null },
            sort: 'id DESC'
          });

          if (req.body.situation === 'approve'){
            await Proposta.update({
              id: conteudo.id
            }).set({
              data_aprovacao: moment().format('YYYY-MM-DD HH:mm:ss')
            });

             // ----------- Envio de Email 
            let user = await Usuario.findOne({id: data.usuario})
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth:({
                user:"2019005201@restinga.ifrs.edu.br",
                pass: "92096055"
              })
            })
        
            let options = {
              from: "2019005201@restinga.ifrs.edu.br",
              to: user.email,
              subject: "Email de atualização de status",
              text:"Sua proposta foi aprovada, agora você está na etapa 3."
            };
        
            transporter.sendMail(options, function(err, info){
              if(err){
                sails.log(err);
                return;
              }
              sails.log("Sent: "+info.response);
            });
          } else {
            await Proposta.update({
              id: conteudo.id
            }).set({
              data_reprovacao: moment().format('YYYY-MM-DD HH:mm:ss'),
              motivo_reprovacao: req.body.description
            });

            // ----------- Envio de Email 
            let user = await Usuario.findOne({id: data.usuario})
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth:({
                user:"2019005201@restinga.ifrs.edu.br",
                pass: "92096055"
              })
            })
        
            let options = {
              from: "2019005201@restinga.ifrs.edu.br",
              to: user.email,
              subject: "Email de atualização de status",
              text:"Sua proposta foi reprovada, favor rever sua proposta com seu orientador."
            };
        
            transporter.sendMail(options, function(err, info){
              if(err){
                sails.log(err);
                return;
              }
              sails.log("Sent: "+info.response);
            });
          }
        } else if (data.etapa == 3) {
          conteudo = await Previa.find({
            where: { aluno: data.id, data_aprovacao: null, data_reprovacao: null },
            sort: 'id DESC'
          });

          if (req.body.situation === 'approve'){
            await Previa.update({
              id: conteudo.id
            }).set({
              data_aprovacao: moment().format('YYYY-MM-DD HH:mm:ss')
            });

            // ----------- Envio de Email 
            let user = await Usuario.findOne({id: data.usuario})
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth:({
                user:"2019005201@restinga.ifrs.edu.br",
                pass: "92096055"
              })
            })
        
            let options = {
              from: "2019005201@restinga.ifrs.edu.br",
              to: user.email,
              subject: "Email de atualização de status",
              text:"Sua previa foi aprovada, agora você está na etapa 4."
            };
        
            transporter.sendMail(options, function(err, info){
              if(err){
                sails.log(err);
                return;
              }
              sails.log("Sent: "+info.response);
            });
          } else {
            await Previa.update({
              id: conteudo.id
            }).set({
              data_reprovacao: moment().format('YYYY-MM-DD HH:mm:ss'),
              motivo_reprovacao: req.body.description
            });

            // ----------- Envio de Email 
            let user = await Usuario.findOne({id: data.usuario})
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth:({
                user:"2019005201@restinga.ifrs.edu.br",
                pass: "92096055"
              })
            })
        
            let options = {
              from: "2019005201@restinga.ifrs.edu.br",
              to: user.email,
              subject: "Email de atualização de status",
              text:"Sua previa foi reprovada, favor rever sua previa com seu orientador."
            };
        
            transporter.sendMail(options, function(err, info){
              if(err){
                sails.log(err);
                return;
              }
              sails.log("Sent: "+info.response);
            });
          }
        } else if (data.etapa == 4) {
          conteudo = await Documentacao.find({
            where: { aluno: data.id, data_aprovacao: null, data_reprovacao: null },
            sort: 'id DESC'
          });

          if (req.body.situation === 'approve'){
            await Documentacao.update({
              id: conteudo.id
            }).set({
              data_aprovacao: moment().format('YYYY-MM-DD HH:mm:ss')
            });

            // ----------- Envio de Email 
            let user = await Usuario.findOne({id: data.usuario})
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth:({
                user:"2019005201@restinga.ifrs.edu.br",
                pass: "92096055"
              })
            })
        
            let options = {
              from: "2019005201@restinga.ifrs.edu.br",
              to: user.email,
              subject: "Email de atualização de status",
              text:"Sua documentação foi aprovada!."
            };
        
            transporter.sendMail(options, function(err, info){
              if(err){
                sails.log(err);
                return;
              }
              sails.log("Sent: "+info.response);
            });
          } else {
            await Documentacao.update({
              id: conteudo.id
            }).set({
              data_reprovacao: moment().format('YYYY-MM-DD HH:mm:ss'),
              motivo_reprovacao: req.body.description
            });
            
            // ----------- Envio de Email 
            let user = await Usuario.findOne({id: data.usuario})
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth:({
                user:"2019005201@restinga.ifrs.edu.br",
                pass: "92096055"
              })
            })
        
            let options = {
              from: "2019005201@restinga.ifrs.edu.br",
              to: user.email,
              subject: "Email de atualização de status",
              text:"Sua documentação foi reprovada, favor rever com seu orientador."
            };
        
            transporter.sendMail(options, function(err, info){
              if(err){
                sails.log(err);
                return;
              }
              sails.log("Sent: "+info.response);
            });
          }
        }

        if (req.body.situation === 'approve') {
          await Aluno.update({
            id: data.id
          }).set({
            etapa: ++data.etapa,
            status: 'Aprovado',
            pendencia: 1,
          });
        } else if (req.body.situation === 'reprove') {
          sails.log(req.body.description);
          await Aluno.update({
            id: data.id
          }).set({
            status: 'Reprovado',
            pendencia: 1,
          });
        }
      });

      return res.redirect('/professor/alunos');
    } catch (err) {
      req.session.erro = err.name;
      return res.redirect('/professor/alunos');
    }
  },
};
