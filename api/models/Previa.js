/**
 * Previa.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

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
    aluno_id: {
      type: 'number', required: true
    },
    aluno: {
      model: 'aluno',
      unique: true
    }
  },

};

