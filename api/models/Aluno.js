/**
 * Aluno.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
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
    etapa: {
      type: 'number', required: true
    },
    status: {
      type: 'string', maxLength: 255
    },
    tema: {
      collection: 'tema',
      via: 'aluno'
    },
    proposta: {
      collection: 'proposta',
      via: 'aluno'
    },
    previa: {
      collection: 'previa',
      via: 'aluno'
    },
    documentacao: {
      collection: 'documentacao',
      via: 'aluno'
    },
    professor: {
      model: 'professor'
    }
  },

};

