/**
 * Sugestao.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 const moment = require('moment');

module.exports = {

  attributes: {
    nome: {
      type: 'string', required: true, maxLength: 255
    },
    descricao: {
      type: 'string', required: true
    },
    data_envio: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: moment().format("YYYY-MM-DD HH:mm:ss")
    },
    Professor: {
      model: 'Usuario',
      columnName: 'usuarioId'
    }
  },

};