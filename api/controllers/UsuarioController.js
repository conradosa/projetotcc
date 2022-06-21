/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
const path = require('path');

module.exports = {

  insertAluno: async function (req, res) {
    //senha: senha123
    var user = await Usuario.create({
      matricula: '123',
      nome: 'Aluno',
      senha: '100b945c050b7d1f82b1fe84c6274553159c12cba0345bb2c63935095050c32c',
      email: '123@restinga.ifrs.edu.br',
      tipo: 'Aluno'
    }).fetch();
    await Aluno.create({usuario: user.id, etapa: 1}).fetch();
    sails.log('Usuário criado, seu nome: ', user.nome);
    res.redirect('/login');
  },

  insertProfessor: async function (req, res) {
    //senha: senha123
    var user = await Usuario.create({
      matricula: '456',
      nome: 'Professor',
      senha: '100b945c050b7d1f82b1fe84c6274553159c12cba0345bb2c63935095050c32c',
      email: '456@restinga.ifrs.edu.br',
      tipo: 'Professor'
    }).fetch();
    await Professor.create({usuario: user.id, disponivel: 1}).fetch();
    sails.log('Usuário criado, seu nome: ', user.nome);
    res.redirect('/login');
  },

  login: async function (req, res) {

    const valor = req.body;

    const matricula = valor.matricula;

    if (isNaN(matricula)) {
      req.session.erro = 'O campo matrícula deve ser um número!';
      return res.redirect('back');
    }

    const senha = valor.senha;

    const crypto = require('crypto');

    const salt = 'TFpYLRSwvkM-';

    const senhasalted = senha + salt;

    const senhabd = crypto.createHash('sha256').update(senhasalted).digest('hex');

    let user = await Usuario.findOne({
      matricula: matricula,
      senha: senhabd
    });

    if (!user) {
      req.session.erro = 'Usuário ou senha incorretos!';
      res.redirect('back');
    } else {
      req.session.logado = true;
      req.session.usuarioId = user.id;
      req.session.usuarioNome = user.nome;
      req.session.usuarioMatricula = user.matricula;
      req.session.usuarioEmail = user.email;
      req.session.usuarioTipo = user.tipo;
      if (user.tipo === 'Aluno') {
        req.session.etapa = user.etapa;
        res.redirect('/aluno');
      } else {
        res.redirect('/professor');
      }
    }
  },

  logout: async function (req, res) {

    delete req.session.logado;
    delete req.session.usuarioId;
    delete req.session.usuarioNome;
    delete req.session.usuarioMatricula;
    delete req.session.usuarioEmail;
    delete req.session.usuarioTipo;

    res.redirect('/login');

  }

};

