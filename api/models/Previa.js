/**
 * Previa.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const moment = require('moment');

module.exports = {

  attributes: {
    diretorio: {
      type: 'string', required: true, maxLength: 255
    },
    prof1Id: {
      type: 'number', required: true
    },
    prof2Id: {
      type: 'number', required: true
    },
    data_envio: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    data_aprovacao: {
      type: 'ref',
      columnType: 'datetime'
    },
    data_reprovacao: {
      type: 'ref',
      columnType: 'datetime'
    },
    motivo_reprovacao: {
      type: 'string',
    },
    aluno: {
      model: 'aluno',
      columnName: 'alunoId'
    }
  },

};

