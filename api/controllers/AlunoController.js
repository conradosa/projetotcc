/**
 * AlunoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
const path = require('path');
module.exports = {

  index: async function (req, res) {
    let user = await Usuario.findOne({
      matricula: req.session.usuarioMatricula
    });
    if (user.status !== null) {
      req.session.alunoStatus = user.status;
    }
    req.session.etapa = user.etapa;
    return res.view('pages/aluno/index');
  },

  status: async function (req, res) {
    let etapa = '';
    switch (req.session.etapa) {
      case 1:
        etapa = 'Tema do TCC';
        break;
      case 2:
        etapa = 'Proposta do TCC';
        break;
      case 3:
        etapa = 'Prévia do TCC';
        break;
      case 4:
        etapa = 'Documentação do TCC';
        break;
      default:
        break;
    }
    return res.view('pages/aluno/status', {
      etapa: etapa
    });
  },

  etapa: async function (req, res) {

    const id = req.session.usuarioId;

    let user = await Aluno.findOne({
      id: id
    });

    const etapa = user.etapa;

    req.session.etapa = etapa;

    switch (etapa) {

      case 1:
        res.redirect('/etapa1');
        break;

      case 2:
        res.redirect('/etapa2');
        break;

      case 3:
        res.redirect('/etapa3');
        break;

      case 4:
        res.redirect('/etapa4');
        break;

      default:
        res.redirect('/aluno');
        break;

    }

  },

  etapa1: async function (req, res) {
    let profs = '';
    try {
      profs = await Usuario.find({tipo: 'Professor'});
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/aluno');
    }
    return res.view('pages/aluno/etapas/etapa1', {
      professores: profs
    });
  },

  tema: async function (req, res) {
    const aluno = await Aluno.findOne({usuario: req.session.usuarioId});
    const tema = await Tema.findOne({aluno: aluno.id});
    if (tema) {
      await Tema.destroy({aluno: aluno.id});
    }
    const tema_b = req.body;
    try {
      await Tema.create({
        nome: tema_b.nome,
        descricao: tema_b.descricao,
        aluno: req.session.usuarioId
      }).fetch();
      sails.log('Tema criado!');
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/aluno');
    }
    try {
      await Aluno.update({usuario: req.session.usuarioId}).set({orientador: tema_b.orientador});
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/aluno');
    }
    req.session.sucesso = 'Tema de TCC enviado!';
    res.redirect('/aluno');
  },

  etapa2: async function (req, res) {
    return res.view('pages/aluno/etapas/etapa2', {});
  },

  upload: function (req, res) {

    let valor = req.body;

    let docNome = valor.nomeDocumento;

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
      saveAs: docNome + '.pdf',
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

