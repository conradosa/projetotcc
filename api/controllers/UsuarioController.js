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
    var user = await Aluno.create({
      matricula: '123',
      nome: 'Aluno',
      senha: '100b945c050b7d1f82b1fe84c6274553159c12cba0345bb2c63935095050c32c',
      email: '123@restinga.ifrs.edu.br',
      etapa: 1
    }).fetch();
    sails.log('Usuário criado, seu nome: ', user.nome);
    res.redirect('/login');
  },

  insertProfessor: async function (req, res) {
    //senha: senha123
    var user = await Professor.create({
      matricula: '456',
      nome: 'Professor',
      senha: '100b945c050b7d1f82b1fe84c6274553159c12cba0345bb2c63935095050c32c',
      email: '456@restinga.ifrs.edu.br',
      disponivel: 1
    }).fetch();
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

    let aluno = await Aluno.findOne({
      matricula: matricula,
      senha: senhabd
    });

    let professor = await Professor.findOne({
      matricula: matricula,
      senha: senhabd
    });

    if (!aluno && !professor) {
      req.session.erro = 'Usuário ou senha incorretos!';
      res.redirect('back');
    } else {
      if(aluno){
        req.session.logado = true;
        req.session.usuarioId = aluno.id;
        req.session.usuarioNome = aluno.nome;
        req.session.usuarioMatricula = aluno.matricula;
        req.session.usuarioEmail = aluno.email;
        req.session.usuarioTipo = 'aluno';
        res.redirect('/aluno');
      }
      if(professor){
        req.session.logado = true;
        req.session.usuarioId = professor.id;
        req.session.usuarioNome = professor.nome;
        req.session.usuarioMatricula = professor.matricula;
        req.session.usuarioEmail = professor.email;
        req.session.usuarioTipo = 'professor';
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

