/**
 * Professor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    isCoordenador:{
      type:'boolean',
      defaultsTo: false
    },

    usuario:{
      model:'usuario',
      columnName:'idUsuario',
      required:true
    },

    disponivel: {
      type: 'boolean', 
      defaultsTo: true
    },

    alunos: {
      collection: 'aluno',
      via: 'orientador'
    }

  },
};

