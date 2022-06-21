module.exports = {

  friendlyName: 'Etapa to Text',

  description: '',

  inputs: {
    etapa: {
      description: 'O número referente a etapa desejada',
      example: 1,
      type: 'number',
      required: true
    }
  },

  fn: async function (inputs, exits) {
    if (!inputs.etapa) {
      return exits.error(new Error('etapa não encontrada'));
    }
    let etapa = '';
    switch (inputs.etapa) {
      case 1:
        etapa = 'Tema do TCC';
        return exits.success(etapa);

      case 2:
        etapa = 'Proposta do TCC';
        return exits.success(etapa);

      case 3:
        etapa = 'Prévia do TCC';
        return exits.success(etapa);

      case 4:
        etapa = 'Documentação do TCC';
        return exits.success(etapa);

      default:
        break;
    }
  }
};

