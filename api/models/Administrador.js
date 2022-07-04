/**
 * Administrador.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'number', autoIncrement: true
    },
    matricula: {
      type: 'number', required: true
    },
    nome: {
      type: 'string', required: true, maxLength: 255
    },
    senha: {
      type: 'string', required: true, maxLength: 100
    },
    email: {
      type: 'string', required: true, maxLength: 255
    },
    tipo: {
      type: 'string', required: true, maxLength: 50
    },
  },

};

