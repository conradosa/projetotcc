/**
 * EtapasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  etapa: async function (req, res) {

    const id = req.session.usuarioId;

    let user = await Usuario.findOne({
      id: id
    });

    const etapa = user.etapa;

    req.session.etapa = etapa;

    switch (etapa) {

      case 0:
        res.redirect('/status');
        break;

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

    }

  },

  nav: async function (req, res) {
    const valor = req.body;
    const etapa = valor.etapa;

    const id = req.session.usuarioId;

    let user = await Usuario.findOne({
      id: id
    });

    if(etapa === user.etapa){

    }

  }

};

