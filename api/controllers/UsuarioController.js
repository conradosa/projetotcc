/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  retornaUser: async function () {
    var user = await Usuario.findOne({
      nome: 'Conrado'
    });
    if (!user) {
      sails.log('Usuário não encontrado');
    } else {
      sails.log('Usuário existe, sua senha: ', user.senha);
    }
  },

  insertTeste: async function () {
    var user = await Usuario.create({
      matricula: '2019001650',
      nome: 'Conrado',
      senha: '2f81a89d6f6e531a24d98451c3f60760b6440369306e4f37b4d79b091f9ef9c5',
      email: '2019001650@restinga.ifrs.edu.br',
      tipo: 'aluno'
    }).fetch();
    sails.log('Usuário criado, seu nome: ', user.nome);
  },

  login: async function (req, res) {

    const valor = req.body;

    const matricula = valor.matricula;

    const senha = valor.senha;

    var crypto = require('crypto');

    const senhasalted = senha + '42';

    const senhabd = crypto.createHash('sha256').update(senhasalted).digest('hex');

    let user = await Usuario.findOne({
      matricula: matricula,
      senha: senhabd
    });

    if (!user) {
      sails.log('Usuário não encontrado');
    } else {
      sails.log('Você está logado');
      res.view('pages/home', {
        user: {
          nome: user.nome
        }
      });
    }

  }

};

