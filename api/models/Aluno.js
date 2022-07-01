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
      type: 'number',
      defaultsTo: 1
    },
    status: {
      type: 'string', maxLength: 255
    },
    pendencia: {
      type: 'number',
      defaultsTo: 0
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

