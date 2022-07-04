/**
 * AdministradorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


//Senha adm: admin123 (salt 42)

module.exports = {

  criaAdm: async function (req,res) {
    let adm = await Usuario.create({
      matricula: 12345,
      nome: 'Administrador',
      senha: 0000,
      email: 'administrador@restinga.ifrs.edu.br',
      tipo: 'adm'
    }).fetch();
    await Administrador.create({usuario: adm.id})
    sails.log('Administrador criado, seu id: ', adm.id);
    res.redirect('/login');
  },

  retornaADM: async function () {
    let adm = await Usuario.findOne({
      id: 1
    });
    if (!adm) {
      sails.log('Usuário não encontrado');
    } else {
      sails.log('Administrador existe, seu id: ', adm.id);
    }
  }

};

