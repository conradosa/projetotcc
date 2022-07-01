/**
 * AlunoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
const path = require('path');
module.exports = {

  proxetapa: async function (req, res) {
    try {
      const aluno = await Aluno.findOne({ usuario: req.session.usuarioId });
      if(aluno.etapa === 4){
        await Aluno.update({ usuario: req.session.usuarioId }).set({ etapa: 1 });
        return res.redirect('/aluno');
      }
      await Aluno.update({ usuario: req.session.usuarioId }).set({ etapa: aluno.etapa + 1 });
      return res.redirect('/aluno');
    } catch (err) {
      req.session.erro = err.name;
      return res.redirect('/aluno');
    }
  },

  verificar: async function (req, res) {
    try {
      const aluno = await Aluno.findOne({ usuario: req.session.usuarioId });
      await Aluno.update({ usuario: req.session.usuarioId }).set({ etapa: aluno.etapa + 1, status: 'Aprovado', pendencia: 1 });
      return res.redirect('/aluno');
    } catch (err) {
      req.session.erro = err.name;
      return res.redirect('/aluno');
    }
  },

  index: async function (req, res) {
    let user = await Aluno.findOne({
      usuario: req.session.usuarioId
    });
    if (user.status !== null) {
      req.session.alunoStatus = user.status;
    }
    req.session.alunoEtapa = user.etapa;
    req.session.alunoPendencia = user.pendencia;
    return res.view('pages/aluno/index');

    /*
    switch (req.session.alunoEtapa) {
      case 1:
        return res.view('pages/aluno/index', {
          etapa: 'Definir Tema do TCC'
        });
      case 2:
          return res.view('pages/aluno/index', {
            etapa: 'Enviar Proposta do TCC'
          });
      case 3:
          return res.view('pages/aluno/index', {
            etapa: 'Enviar Prévia do TCC'
          });
      case 4:
          return res.view('pages/aluno/index', {
            etapa: 'Envio Final do TCC'
          });
      default:
        return res.view('pages/aluno/index', {
          etapa: 'Iniciar'
        });
    }
    */
  },

  pendencia: async function (req, res) {
    try {
      await Aluno.update({ usuario: req.session.usuarioId }).set({ pendencia: 0, status: '' });
      return res.redirect('/aluno');
    } catch (err) {
      req.session.erro = err.name;
      return res.redirect('/aluno');
    }
  },

  tentarnovamente: async function (req, res) {
    if(req.session.alunoPendencia === 0){
    await Aluno.update({ usuario: req.session.usuarioId }).set({ pendencia: 0, status: '' });
    return res.redirect('/aluno');
    }else{
      req.session.erro = 'Seu orientador avaliou seu envio. Cheque seu status antes de prosseguir.'
      return res.redirect('/aluno');
    }
  },

  status: async function (req, res) {
    const aluno = await Aluno.findOne({ usuario: req.session.usuarioId });
    req.session.alunoStatus = aluno.status;
    req.session.alunoPendencia = aluno.pendencia;
    let etapa = '';
    switch (req.session.alunoEtapa) {
      case 1:
        etapa = 'Tema do TCC';
        return res.view('pages/aluno/status', {
          etapa: etapa,
          diretorio: false
        });
      case 2:
        etapa = 'Proposta do TCC';
        const proposta = await Proposta.findOne({ aluno: aluno.id });
        if (proposta) {
          return res.view('pages/aluno/status', {
            etapa: etapa,
            diretorio: proposta.diretorio
          });
        } else {
          return res.view('pages/aluno/status', {
            etapa: etapa,
            diretorio: false
          });
        }
      case 3:
        etapa = 'Prévia do TCC';
        const previa = await Previa.findOne({ aluno: aluno.id });
        if (previa) {
          return res.view('pages/aluno/status', {
            etapa: etapa,
            diretorio: previa.diretorio
          });
        } else {
          return res.view('pages/aluno/status', {
            etapa: etapa,
            diretorio: false
          });
        }
      case 4:
        etapa = 'Documentação do TCC';
        const documentacao = await Documentacao.findOne({ aluno: aluno.id });
        if (documentacao) {
          return res.view('pages/aluno/status', {
            etapa: etapa,
            diretorio: documentacao.diretorio
          });
        } else {
          return res.view('pages/aluno/status', {
            etapa: etapa,
            diretorio: false
          });
        }
      default:
        return res.view('pages/aluno/status', {
          etapa: etapa,
          diretorio: false
        });
    }
  },

  etapa: async function (req, res) {

    const id = req.session.usuarioId;

    let user = await Aluno.findOne({
      usuario: id
    });

    const etapa = user.etapa;

    req.session.alunoEtapa = etapa;
    req.session.alunoPendencia = user.pendencia;

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
        req.session.erro = 'Nenhuma etapa válida encontrada!';
        res.redirect('/aluno');
        break;

    }

  },

  etapa1: async function (req, res) {
    let userProfs = '';
    let profs = '';
    try {
      userProfs = await Usuario.find({ tipo: 'Professor' });
      profs = await Professor.find();
      return res.view('pages/aluno/etapas/etapa1', {
        userProfessores: userProfs,
        professores: profs
      });
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/aluno');
    }
  },

  tema: async function (req, res) {
    try {
      const aluno = await Aluno.findOne({ usuario: req.session.usuarioId });
      const orientador = await Professor.findOne({ id: aluno.orientador });

      if (orientador) {
        await Professor.removeFromCollection(orientador.id, 'alunos')
          .members(aluno.id);
      }

      const tema = await Tema.findOne({ aluno: aluno.id });

      if (tema) {
        await Tema.destroy({ aluno: aluno.id });
      }
      const tema_b = req.body;

      await Tema.create({
        nome: tema_b.nome,
        descricao: tema_b.descricao,
        aluno: aluno.id
      }).fetch();

      await Aluno.update({ usuario: req.session.usuarioId }).set({
        orientador: tema_b.orientador,
        status: 'Aguardando aprovação do orientador.'
      });
      req.session.sucesso = 'Tema de TCC enviado!';
      return res.redirect('/aluno');
    } catch (err) {
      req.session.erro = err.name;
      return res.redirect('/aluno');
    }
  },

  etapa2: async function (req, res) {
    return res.view('pages/aluno/etapas/etapa2');
  },

  proposta: async function (req, res) {

    //transformar o inteiro em ‘string’ da matrícula

    let matriculastring = req.session.usuarioMatricula.toString();

    //criar diretórios

    try {
      fs.mkdirSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring), { recursive: true });
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/aluno');
    }

    //upload dos arquivos

    req.file('documento').upload({
      maxBytes: 5000000,
      saveAs: 'proposta.pdf',
      dirname: path.join(sails.config.appPath, '/assets/alunos/', matriculastring)
    }, async (err, file) => {
      if (file.length === 0) {
        req.session.erro = 'Nenhum arquivo enviado!';
        return res.redirect('/aluno');
      }
      if (file.length > 1) {
        if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'proposta.pdf'))) {
          fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'proposta.pdf'));
        }
        req.session.erro = 'Somente um arquivo pode ser enviado!';
        return res.redirect('/aluno');
      }
      if (path.extname(file[0].filename) !== '.pdf') {
        if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'proposta.pdf'))) {
          fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'proposta.pdf'));
        }
        req.session.erro = 'O arquivo enviado não é um pdf!';
        return res.redirect('/aluno');
      }
      if (err) {
        req.session.erro = err.toString();
        return res.redirect('/aluno');
      } else {

        try {

          const aluno = await Aluno.findOne({ usuario: req.session.usuarioId });
          const proposta = await Proposta.findOne({ aluno: aluno.id });

          if (proposta) {
            await Proposta.destroy({ aluno: aluno.id });
          }

          await Proposta.create({
            diretorio: '/alunos/' + matriculastring + '/proposta.pdf',
            aluno: aluno.id
          }).fetch();

          await Aluno.update({ usuario: req.session.usuarioId }).set({
            status: 'Aguardando aprovação do orientador.'
          });

        } catch (err) {
          if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'proposta.pdf'))) {
            fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'proposta.pdf'));
          }
          req.session.erro = err.name;
          res.redirect('/aluno');
        }

        req.session.sucesso = 'Arquivo enviado!';
        res.redirect('/aluno');
      }
    }
    );
  },
  etapa3: async function (req, res) {
    try {
      const orientadores = await Professor.find();
      const userOrientadores = await Usuario.find({ tipo: 'Professor' });
      return res.view('pages/aluno/etapas/etapa3', {
        userProfessores: userOrientadores,
        professores: orientadores
      });
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/aluno');
    }
  },

  previa: async function (req, res) {

    const value = req.body;

    //transformar o inteiro em ‘string’ da matrícula

    let matriculastring = req.session.usuarioMatricula.toString();

    //criar diretórios

    try {
      fs.mkdirSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring), { recursive: true });
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/aluno');
    }

    //upload dos arquivos

    req.file('documento').upload({
      maxBytes: 5000000,
      saveAs: 'previa.pdf',
      dirname: path.join(sails.config.appPath, '/assets/alunos/', matriculastring)
    }, async (err, file) => {
      if (file.length === 0) {
        req.session.erro = 'Nenhum arquivo enviado!';
        return res.redirect('/aluno');
      }
      if (file.length > 1) {
        if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'previa.pdf'))) {
          fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'previa.pdf'));
        }
        req.session.erro = 'Somente um arquivo pode ser enviado!';
        return res.redirect('/aluno');
      }
      if (path.extname(file[0].filename) !== '.pdf') {
        if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'previa.pdf'))) {
          fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'previa.pdf'));
        }
        req.session.erro = 'O arquivo enviado não é um pdf!';
        return res.redirect('/aluno');
      }
      if (err) {
        req.session.erro = err.toString();
        return res.redirect('/aluno');
      } else {

        try {

          const aluno = await Aluno.findOne({ usuario: req.session.usuarioId });
          const previa = await Previa.findOne({ aluno: aluno.id });

          if (previa) {
            await Previa.destroy({ aluno: aluno.id });
          }

          await Previa.create({
            diretorio: '/alunos/' + matriculastring + '/previa.pdf',
            prof1Id: value.professor1,
            prof2Id: value.professor2,
            aluno: aluno.id
          }).fetch();

          await Aluno.update({ usuario: req.session.usuarioId }).set({
            status: 'Aguardando aprovação do orientador.'
          });

        } catch (err) {
          if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'previa.pdf'))) {
            fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'previa.pdf'));
          }
          req.session.erro = err.name;
          res.redirect('/aluno');
        }

        req.session.sucesso = 'Arquivo enviado!';
        res.redirect('/aluno');
      }
    }
    );
  },
  etapa4: async function (req, res) {
    try {
      return res.view('pages/aluno/etapas/etapa4');
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/aluno');
    }
  },

  documentacao: async function (req, res) {

    //transformar o inteiro em ‘string’ da matrícula

    let matriculastring = req.session.usuarioMatricula.toString();

    //criar diretórios

    try {
      fs.mkdirSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring), { recursive: true });
    } catch (err) {
      req.session.erro = err.name;
      res.redirect('/aluno');
    }

    //upload dos arquivos

    req.file('documento').upload({
      maxBytes: 5000000,
      saveAs: 'documentacao.pdf',
      dirname: path.join(sails.config.appPath, '/assets/alunos/', matriculastring)
    }, async (err, file) => {
      if (file.length === 0) {
        req.session.erro = 'Nenhum arquivo enviado!';
        return res.redirect('/aluno');
      }
      if (file.length > 1) {
        if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentacao.pdf'))) {
          fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentacao.pdf'));
        }
        req.session.erro = 'Somente um arquivo pode ser enviado!';
        return res.redirect('/aluno');
      }
      if (path.extname(file[0].filename) !== '.pdf') {
        if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentacao.pdf'))) {
          fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentacao.pdf'));
        }
        req.session.erro = 'O arquivo enviado não é um pdf!';
        return res.redirect('/aluno');
      }
      if (err) {
        req.session.erro = err.toString();
        return res.redirect('/aluno');
      } else {

        try {

          const aluno = await Aluno.findOne({ usuario: req.session.usuarioId });
          const documentacao = await Documentacao.findOne({ aluno: aluno.id });

          if (documentacao) {
            await Documentacao.destroy({ aluno: aluno.id });
          }

          await Documentacao.create({
            diretorio: '/alunos/' + matriculastring + '/documentacao.pdf',
            aluno: aluno.id
          }).fetch();

          await Aluno.update({ usuario: req.session.usuarioId }).set({
            status: 'Aguardando aprovação do orientador.'
          });

        } catch (err) {
          if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentacao.pdf'))) {
            fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentacao.pdf'));
          }
          req.session.erro = err.name;
          res.redirect('/aluno');
        }

        req.session.sucesso = 'Arquivo enviado!';
        res.redirect('/aluno');
      }
    }
    );
  }
};

