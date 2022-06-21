/**
 * Aluno.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    usuario:{
      model:'usuario',
      columnName:'idUsuario',
      required:true
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
    orientador: {
      model: 'professor',
      columnName: 'idProfessor'
    }

  },

};

