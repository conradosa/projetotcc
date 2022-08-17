/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer')


module.exports = {

  insertAlunoTest: async function (req, res) {
    var user = await Usuario.create({
      matricula: '123',
      nome: 'Aluno Teste',
      senha: '100b945c050b7d1f82b1fe84c6274553159c12cba0345bb2c63935095050c32c',
      email: 'aluno.teste@teste.com',
      tipo: 'Aluno'
    }).fetch();
    await Aluno.create({ usuario: user.id }).fetch();
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
    await Professor.create({ usuario: user.id }).fetch();
    sails.log('Professor criado, seu nome: ', user.nome);
    res.redirect('/login');

  },

  enviarEmail: async function(req,res){
    //transporter vai ser o email do admin, provavelmente do yuri
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth:({
        user:"2019005201@restinga.ifrs.edu.br",
        pass: "92096055"
      })
    })

    let options = {
      from: "2019005201@restinga.ifrs.edu.br",
      to: "grdsilva@restinga.ifrs.edu.br",
      subject: "Email teste",
      text:"primeiro teste de email"
    };

    transporter.sendMail(options, function(err, info){
      if(err){
        sails.log(err);
        return;
      }
      sails.log("Sent: "+info.response);
    })
  },

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
    await Aluno.create({ usuario: user.id }).fetch();
    sails.log('Aluno criado, seu nome: ', user.nome);
    res.redirect('/login');

    // ------------ Enviar Email ---------------
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth:({
        user:"2019005201@restinga.ifrs.edu.br",
        pass: "92096055"
      })
    })

    let options = {
      from: "2019005201@restinga.ifrs.edu.br",
      to: valor.email,
      subject: "Email da criação do seu usuário.",
      text:`Seu login no sistema de TCC foi criado. Seu login é a sua matricula e a sua senha é ${senha}.`
    };

    transporter.sendMail(options, function(err, info){
      if(err){
        sails.log(err);
        return;
      }
      sails.log("Sent: "+info.response);
    })

    this.enviarEmail();


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
    await Professor.create({ usuario: user.id, disponivel: 1 }).fetch();
    sails.log('Professor criado, seu nome: ', user.nome);
    res.redirect('/login');

    // ------------ Enviar Email ---------------
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth:({
        user:"2019005201@restinga.ifrs.edu.br",
        pass: "92096055"
      })
    })

    let options = {
      from: "2019005201@restinga.ifrs.edu.br",
      to: valor.email,
      subject: "Email da criação do seu usuário.",
      text:`Seu login no sistema de TCC foi criado. Seu login é a sua matricula e a sua senha é ${senha}.`
    };

    transporter.sendMail(options, function(err, info){
      if(err){
        sails.log(err);
        return;
      }
      sails.log("Sent: "+info.response);
    })
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

    // const matricula = valor.matricula;

    // let user = await Usuario.findOne({
    //   matricula: matricula
    // })

    let users = await Usuario.find();

    if (users.length == 0) {
      req.session.erro = 'Nenhum usuário não encontrado.';
      res.redirect('/adm');
    } else {
      return res.view('pages/adm/painelUsuario', {
        usuario: users
      });
    }
  },

  findProfessores: async function(req, res){
    let userProfs = '';
    let profs = '';
    try {
      userProfs = await Usuario.find({ tipo: 'Professor' });
      profs = await Professor.find();
      sails.log(userProfs);
      if(userProfs.length == 0){
        sails.log('Nao Houve professores')
        
      }else if(userProfs > 0){
        sails.log('houve professores')
      }
      return res.view('pages/adm/filtro ', {
        userProfessores: userProfs,
        professores: profs
      });
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/painelUsuario');
      sails.log('nao houve professores')
    }
  },

  alterarUsuario: async function (req, res) {
    const valor = req.body;

    const user = await Usuario.findOne({id:valor.id});

    switch(valor.action) {
      case 'matricula':
        return res.view('pages/adm/edicoes/alterarMatricula', 
        {
          user:user
        });
        
      case 'nome':
        return res.view('pages/adm/edicoes/alterarNome',
        {
          user:user
        });

      case 'email':
        return res.view('pages/adm/edicoes/alterarEmail',
        {
          user:user
        });

      case 'senha':
        return res.view('pages/adm/edicoes/alterarSenha',
        {
          user:user
        });
      
      
    }

    

  },

  alterarMatricula: async function(req,res) {
    const valor = req.body;

    try{
      await Usuario.update({id: valor.id}).set({
        matricula: valor.matricula
      });
    }catch(err){
      req.session.erro = err.name;
        return res.redirect('/adm');
    }
    req.session.sucesso = 'Matricula alterada!';
    return res.redirect('/adm/painelUsuario')
  },

  alterarNome: async function(req,res) {
    const valor = req.body;

    try{
      await Usuario.update({id: valor.id}).set({
        nome: valor.nome
      });
    }catch(err){
      req.session.erro = err.name;
        return res.redirect('/adm');
    }
    req.session.sucesso = 'Nome alterado!';
    return res.redirect('/adm/painelUsuario')
  },

  alterarEmail: async function(req,res) {
    const valor = req.body;

    try{
      await Usuario.update({id: valor.id}).set({
        email: valor.email
      });
    }catch(err){
      req.session.erro = err.name;
        return res.redirect('/adm');
    }
    req.session.sucesso = 'Email alterado!';
    return res.redirect('/adm/painelUsuario')
  },

  alterarSenha: async function(req,res) {
    const valor = req.body;

    //encriptação de senha
    const senha = valor.senha;
    const crypto = require('crypto');
    const salt = 'TFpYLRSwvkM-';
    const senhasalted = senha + salt;
    const senhabd = crypto.createHash('sha256').update(senhasalted).digest('hex');
    //------------------------------------------------------

    try{
      await Usuario.update({id: valor.id}).set({
        senha: senhabd
      });
    }catch(err){
      req.session.erro = err.name;
        return res.redirect('/adm');
    }
    req.session.sucesso = 'Senha alterada!';
    return res.redirect('/adm/painelUsuario')
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
