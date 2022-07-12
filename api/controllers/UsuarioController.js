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

    const valor = req.body

    const matricula = valor.matricula

    if (isNaN(matricula)) {
      req.session.erro = 'O campo matrícula deve ser um número!';
      return res.redirect('back');
    }

    const senha = valor.senha

    const crypto = require('crypto')

    const salt = 'TFpYLRSwvkM-'

    const senhasalted = senha + salt

    const senhabd = crypto.createHash('sha256').update(senhasalted).digest('hex');
    //senha: senha123
    var user = await Usuario.create({
      matricula: matricula,
      nome: valor.nome,
      senha: senhabd,
      email: valor.email,
      tipo: 'Aluno'
    }).fetch();
<<<<<<< HEAD
    await Aluno.create({usuario: user.id}).fetch();
=======
    await Aluno.create({ usuario: user.id }).fetch();
>>>>>>> main
    sails.log('Aluno criado, seu nome: ', user.nome);
    res.redirect('/login');
  },

  insertProfessor: async function (req, res) {

    const valor = req.body

    const matricula = valor.matricula

    if (isNaN(matricula)) {
      req.session.erro = 'O campo matrícula deve ser um número!';
      return res.redirect('back');
    }

    const senha = valor.senha

    const crypto = require('crypto')

    const salt = 'TFpYLRSwvkM-'

    const senhasalted = senha + salt

    const senhabd = crypto.createHash('sha256').update(senhasalted).digest('hex');
    //senha: senha123
    var user = await Usuario.create({
      matricula: matricula,
      nome: valor.nome,
      senha: senhabd,
      email: valor.email,
      tipo: 'Professor'
    }).fetch();
<<<<<<< HEAD
    await Professor.create({usuario: user.id, disponivel: 1}).fetch();
=======
    await Professor.create({ usuario: user.id, disponivel: 1 }).fetch();
>>>>>>> main
    sails.log('Professor criado, seu nome: ', user.nome);
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
      return res.redirect('back');
    } else {
      req.session.logado = true;
      req.session.usuarioId = user.id;
      req.session.usuarioNome = user.nome;
      req.session.usuarioMatricula = user.matricula;
      req.session.usuarioEmail = user.email;
      req.session.usuarioTipo = user.tipo;
      if (user.tipo === 'Aluno') {
        req.session.alunoEtapa = user.etapa;
        return res.redirect('/aluno');
      } 
      if (user.tipo === 'Professor') {
        return res.redirect('/professor');
      } 
      if(user.tipo === 'adm') {
        return res.redirect('/adm');
      }
      return res.redirect('back');
    }
  },

  findUsuario: async function (req, res) {

    const valor = req.body;

    const matricula = valor.matricula;

    // let user = await Usuario.findOne({
    //   matricula: matricula
    // })

    let users = await Usuario.find();

    if (!users) {
      req.session.erro = 'Nenhum usuário não encontrado.';
      res.redirect('index');
    } else {
      return res.view('pages/adm/painelUsuario', {
        usuario: users
      });
    }
  },

  alterarNome: async function (req, res) {
    const valor = req.body;

    const matricula = valor.matricula;

    const nome = valor.nome;

    let user = await Usuario.findOne({
      matricula: matricula
    })

    await Usuario.update({ usuario: '<%= usuario.id; %>' }).set({

    })

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
