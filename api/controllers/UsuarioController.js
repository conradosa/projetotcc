/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
const path = require('path');

module.exports = {

  remove: async function () {
    const destroy = await Usuario.destroy({});
    sails.log('Todos os usuários foram removidos');
  },

  retorna: async function () {
    const user = await Usuario.findOne({
      nome: 'Conrado'
    });
    if (!user) {
      sails.log('Usuário não encontrado');
    } else {
      sails.log('Usuário existe, sua senha: ', user.senha);
    }
  },

  insert: async function () {
    //senha: senha123
    var user = await Usuario.create({
      matricula: '2019001650',
      nome: 'Conrado',
      senha: '100b945c050b7d1f82b1fe84c6274553159c12cba0345bb2c63935095050c32c',
      email: '2019001650@restinga.ifrs.edu.br',
      tipo: 'admin'
    }).fetch();
    sails.log('Usuário criado, seu nome: ', user.nome);
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
      req.session.usuarioNome = user.nome;
      req.session.usuarioMatricula = user.matricula;
      req.session.usuarioEmail = user.email;
      req.session.usuarioTipo = user.tipo;
      res.redirect('/home');
    }
  },

  logout: async function (req, res) {

    delete req.session.logado;
    delete req.session.usuarioNome;
    delete req.session.usuarioMatricula;
    delete req.session.usuarioEmail;
    delete req.session.usuarioTipo;

    res.redirect('/login');

  },

  uploadDocumento: function (req, res) {

    //transformar o inteiro em ‘string’ da matrícula

    let matriculastring = req.session.usuarioMatricula.toString();

    //criar diretórios

    try {
      fs.mkdirSync(path.join(sails.config.appPath, '/assets/usuarios/', matriculastring), {recursive: true});
    } catch (err) {
      req.session.erro = err.toString();
      res.redirect('back');
    }

    //upload dos arquivos

    req.file('documento').upload({
      maxBytes: 5000000,
      saveAs: 'documentonome.pdf',
      dirname: path.join(sails.config.appPath, '/assets/alunos/', matriculastring)
    }, (err, file) => {
      if (file.length === 0) {
        req.session.erro = 'Nenhum arquivo enviado!';
        return res.redirect('back');
      }
      if (file.length > 1) {
        if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentonome.pdf'))) {
          fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentonome.pdf'));
        }
        req.session.erro = 'Somente um arquivo pode ser enviado!';
        return res.redirect('back');
      }
      if (path.extname(file[0].filename) !== '.pdf') {
        if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentonome.pdf'))) {
          fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentonome.pdf'));
        }
        req.session.erro = 'O arquivo enviado não é um pdf!';
        return res.redirect('back');
      }
      if (err) {
        req.session.erro = err.toString();
        return res.redirect('back');
      } else {
        req.session.sucesso = 'Arquivo enviado!';
        res.redirect('back');
      }
    });
  }

};
