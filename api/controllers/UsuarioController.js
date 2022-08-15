/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
const path = require('path');
const moment = require('moment');

module.exports = {

  insertAlunoTest: async function (req, res) {
    var user = await Usuario.create({
      matricula: '123',
      nome: 'Aluno Teste',
      senha: '100b945c050b7d1f82b1fe84c6274553159c12cba0345bb2c63935095050c32c',
      email: 'aluno.teste@teste.com',
      tipo: 'Aluno'
    }).fetch();
    await Aluno.create({usuario: user.id}).fetch();
    sails.log('Aluno criado, seu nome: ', user.nome);
    res.redirect('/login');
  },

  insertProfessorTest: async function (req, res) {
    var user = await Usuario.create({
      matricula: '456',
      nome: 'Professor Teste',
      senha: '100b945c050b7d1f82b1fe84c6274553159c12cba0345bb2c63935095050c32c',
      email: 'professor.teste@teste.com',
      tipo: 'Professor'
    }).fetch();
    await Professor.create({usuario: user.id}).fetch();
    sails.log('Professor criado, seu nome: ', user.nome);
    res.redirect('/login');
  },

  insertAluno: async function (req, res) {

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
    //senha: senha123
    var user = await Usuario.create({
      matricula: matricula,
      nome: valor.nome,
      senha: senhabd,
      email: valor.email,
      tipo: 'Aluno'
    }).fetch();
    await Aluno.create({usuario: user.id}).fetch();
    sails.log('Aluno criado, seu nome: ', user.nome);
    res.redirect('/login');
  },

  insertProfessor: async function (req, res) {

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
    //senha: senha123
    var user = await Usuario.create({
      matricula: matricula,
      nome: valor.nome,
      senha: senhabd,
      email: valor.email,
      tipo: 'Professor'
    }).fetch();
    await Professor.create({usuario: user.id, disponivel: 1}).fetch();
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
      if (user.tipo === 'adm') {
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
    });

    await Usuario.update({usuario: '<%= usuario.id; %>'}).set({});

  },

  logout: async function (req, res) {

    delete req.session.logado;
    delete req.session.usuarioId;
    delete req.session.usuarioNome;
    delete req.session.usuarioMatricula;
    delete req.session.usuarioEmail;
    delete req.session.usuarioTipo;

    res.redirect('/login');

  },

  painelUsuarios: async function (req, res) {
    const users = await Usuario.find();
    return res.view('pages/adm/painelUsuarios', {
      title: 'Painel dos Usuários',
      usuarios: users
    });
  },

  painelAlunos: async function (req, res) {
    const users = await Aluno.find();
    const alunosUser = await Usuario.find({where: {tipo: 'Aluno'}});
    for (let i = 0; i < Object.keys(users).length; i++) {
      switch (users[i].etapa) {
        case 1:
          users[i].etapaText = 'Tema do TCC';
          break;

        case 2:
          users[i].etapaText = 'Proposta do TCC';
          break;

        case 3:
          users[i].etapaText = 'Prévia do TCC';
          break;

        case 4:
          users[i].etapaText = 'Documentação do TCC';
          break;

        default:
          break;
      }
    }
    return res.view('pages/adm/painelAlunos', {
      alunos: users,
      usuarios: alunosUser
    });
  },

  painelProfessores: async function (req, res) {
    const users = await Aluno.find();
    const professorUser = await Usuario.find({where: {tipo: 'Professor'}});
    return res.view('pages/adm/painelProfessores', {
      professores: users,
      usuarios: professorUser
    });
  },

  editarView: async function (req, res) {
    const user = await Usuario.findOne({id: req.body.id});
    switch (user.tipo) {
      case 'Aluno':
        const aluno = await Aluno.findOne({usuario: user.id});
        return res.view('pages/adm/editarAluno', {
          id: user.id,
          matricula: user.matricula,
          nome: user.nome,
          email: user.email,
          etapa: aluno.etapa
        });

      case 'Professor':
        return res.view('pages/adm/editarProfessor', {
          id: user.id,
          matricula: user.matricula,
          nome: user.nome,
          email: user.email,
        });

      default:
        res.redirect('/adm/usuarios');
        break;
    }
  },

  editarAluno: async function (req, res) {
    try {
      const value = req.body;
      await Usuario.update({
        id: value.id
      }).set({
        matricula: value.matricula,
        nome: value.nome,
        email: value.email
      });
      const aluno = await Aluno.findOne({usuario: value.id});
      await Aluno.update({
        id: aluno.id
      }).set({
        etapa: value.etapa
      });
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/');
    }
    req.session.sucesso = 'Aluno editado!';
    return res.redirect('/adm/usuarios');
  },

  editarProfessor: async function (req, res) {
    try {
      const value = req.body;
      await Usuario.update({
        id: value.id
      }).set({
        matricula: value.matricula,
        nome: value.nome,
        email: value.email
      });
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/');
    }
    req.session.sucesso = 'Professor editado!';
    return res.redirect('/adm/usuarios');
  },

  deletarUsuario: async function(req, res){
    try {
      const user = await Usuario.findOne({id: req.body.id});
      switch (user.tipo) {
        case 'Aluno':
          await Aluno.destroy({usuario: user.id});
          await Usuario.destroy({id: user.id});
          req.session.sucesso = 'Usuário deletado!';
          return res.redirect('/adm/usuarios');

        case 'Professor':
          await Professor.destroy({usuario: user.id});
          await Usuario.destroy({id: user.id});
          req.session.sucesso = 'Usuário deletado!';
          return res.redirect('/adm/usuarios');

        default:
          res.redirect('/adm/usuarios');
          break;
      }
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/');
    }
  }

};
