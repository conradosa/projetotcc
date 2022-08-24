/**
 * AlunoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//Senha (senha123): 100b945c050b7d1f82b1fe84c6274553159c12cba0345bb2c63935095050c32c

const fs = require('fs');
const path = require('path');
module.exports = {

  proxetapa: async function (req, res) {
    try {
      const aluno = await Aluno.findOne({ usuario: req.session.usuarioId });
      if (aluno.etapa === 4) {
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
      await Aluno.update({ usuario: req.session.usuarioId }).set({
        etapa: aluno.etapa + 1,
        status: 'Aprovado',
        pendencia: 1
      });
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
      if (user.status !== '') {
        req.session.alunoStatus = user.status;
        return res.redirect('/status');
      }
    }
    req.session.alunoEtapa = user.etapa;
    req.session.alunoPendencia = user.pendencia;
    return res.view('pages/aluno/index');
  },

  pendencia: async function (req, res) {
    try {
      await Aluno.update({ usuario: req.session.usuarioId }).set({ pendencia: 0, status: '' });
      delete req.session.alunoStatus;
      return res.redirect('/aluno');
    } catch (err) {
      req.session.erro = err.name;
      return res.redirect('/aluno');
    }
  },

  tentarNovamente: async function (req, res) {
    if (req.session.alunoPendencia === 0) {
      await Aluno.update({ usuario: req.session.usuarioId }).set({ pendencia: 0, status: '' });
      return res.redirect('/etapa');
    } else {
      req.session.erro = 'Seu orientador avaliou seu envio. Cheque seu status antes de prosseguir.';
      return res.redirect('/aluno');
    }
  },

  status: async function (req, res) {
    const aluno = await Aluno.findOne({ usuario: req.session.usuarioId });
    req.session.alunoStatus = aluno.status;
    req.session.alunoPendencia = aluno.pendencia;
    req.session.alunoEtapa = aluno.etapa;
    let etapa = '';
    switch (req.session.alunoEtapa) {
      case 1:
        etapa = 'Tema do TCC';
        return res.view('pages/aluno/status', {
          etapaText: etapa,
          etapa: req.session.alunoEtapa,
          diretorio: false
        });
      case 2:
        etapa = 'Proposta do TCC';
        const proposta = await Proposta.find({
          where: { aluno: aluno.id  },
          sort: 'id DESC'
        });
        if (proposta[0]) {
          return res.view('pages/aluno/status', {
            etapaText: etapa,
            etapa: req.session.alunoEtapa,
            diretorio: proposta[0].diretorio
          });
        } else {
          return res.view('pages/aluno/status', {
            etapaText: etapa,
            etapa: req.session.alunoEtapa,
            diretorio: false
          });
        }
      case 3:
        etapa = 'Prévia do TCC';
        const previa = await Previa.find({
          where: { aluno: aluno.id  },
          sort: 'id DESC'
        });
        if (previa[0]) {
          return res.view('pages/aluno/status', {
            etapaText: etapa,
            etapa: req.session.alunoEtapa,
            diretorio: previa[0].diretorio
          });
        } else {
          return res.view('pages/aluno/status', {
            etapaText: etapa,
            etapa: req.session.alunoEtapa,
            diretorio: false
          });
        }
      case 4:
        etapa = 'Documentação do TCC';
        const documentacao = await Documentacao.find({
          where: { aluno: aluno.id  },
          sort: 'id DESC'
        });
        if (documentacao[0]) {
          return res.view('pages/aluno/status', {
            etapaText: etapa,
            etapa: req.session.alunoEtapa,
            diretorio: documentacao[0].diretorio
          });
        } else {
          return res.view('pages/aluno/status', {
            etapaText: etapa,
            etapa: req.session.alunoEtapa,
            diretorio: false
          });
        }
      default:
        return res.view('pages/aluno/status', {
          etapaText: etapa,
          etapa: req.session.alunoEtapa,
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
    req.session.alunoStatus = user.status;
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

      const tema = req.body;

      await Tema.create({
        nome: tema.nome,
        descricao: tema.descricao,
        aluno: aluno.id
      }).fetch();

      await Aluno.update({ usuario: req.session.usuarioId }).set({
        orientador: tema.orientador,
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

    const aluno = await Aluno.findOne({ usuario: req.session.usuarioId });

    const propostas = await Proposta.find({
      where: { aluno: aluno.id  },
      sort: 'id DESC'
    });

    let idTopo = 1;

    if(Object.keys(propostas).length > 0){
      idTopo = propostas[0].id + 1;
    }


    const proposta = await Proposta.create({
      diretorio: '/alunos/' + matriculastring + '/' + 'proposta' + idTopo + '.pdf',
      aluno: aluno.id
    }).fetch();

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
      saveAs: 'proposta' + proposta.id + '.pdf',
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

    const aluno = await Aluno.findOne({ usuario: req.session.usuarioId });

    const previas = await Previa.find({
      where: { aluno: aluno.id  },
      sort: 'id DESC'
    });

    let idTopo = 1;

    if(Object.keys(propostas).length > 0){
      idTopo = previas[0].id + 1;
    }

    const previa = await Previa.create({
      diretorio: '/alunos/' + matriculastring + '/' + 'previa' + idTopo + '.pdf',
      prof1Id: value.professor1,
      prof2Id: value.professor2,
      aluno: aluno.id
    }).fetch();

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
      saveAs: 'previa' + previa.id + '.pdf',
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

    const aluno = await Aluno.findOne({ usuario: req.session.usuarioId });

    const documentacoes = await Documentacao.find({
      where: { aluno: aluno.id  },
      sort: 'id DESC'
    });


    let idTopo = 1;

    if(Object.keys(propostas).length > 0){
      idTopo = documentacoes[0].id + 1;
    }

    const documentacao = await Documentacao.create({
      diretorio: '/alunos/' + matriculastring + '/' + 'documentacao' + idTopo + '.pdf',
      aluno: aluno.id
    }).fetch();

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
      saveAs: 'documentacao' + documentacao.id + '.pdf',
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

