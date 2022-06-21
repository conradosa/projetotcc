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
    let aluno = await Aluno.findOne({
      matricula: req.session.usuarioMatricula
    });
    if (aluno.status !== null) {
      req.session.alunoStatus = aluno.status;
    }
    req.session.etapa = aluno.etapa;
    return res.view('pages/aluno/index');
  },

  status: async function (req, res) {
    let etapa = await sails.helpers.etapaText.with({etapa: req.session.etapa});
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
    const profs = await Professor.find();

    return res.view('pages/aluno/etapas/etapa1', {
      professores: profs
    });
  },

  addOrientador: async function (req, res) {
    const user = await Aluno.findOne({id: req.params.id}).then(async (data) => {
      if (data === undefined) {
        res.status(404);
        return res.send('Aluno não encontrado!');
      } else {
        const user = await Aluno.updateOne({id: req.params.id}).set({...data, orientador: req.params.idOrientador});
        return res.ok(`Aluno ${user.nome} alterado!`);
      }
    }).catch((erro) => {
      return res.serverError(error);
    });
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

