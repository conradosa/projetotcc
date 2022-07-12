/**
 * AdministradorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


//Senha adm: admin123 (salt 42)

module.exports = {

  // criaAdm: async function (req,res) {
  //   let adm = await Usuario.create({
  //     id: 1,
  //     matricula: '0000000000',
  //     nome: 'Administrador',
  //     senha: 0000,
  //     email: 'administrador@restinga.ifrs.edu.br',
  //     tipo: 'adm'
  //   }).fetch();
  //   await Administrador.create({usuario: adm.id}).fetch()
  //   sails.log('Administrador criado, seu id: ', adm.id);
  //   res.redirect('/login');
  // },
  
  //Senha (senha123) -> (senha + salt -> TFpYLRSwvkM-) -> 100b945c050b7d1f82b1fe84c6274553159c12cba0345bb2c63935095050c32c

  criaAdm: async function (req, res) {
    let adm = await Usuario.create({
      matricula: '0',
      nome: 'Administrador',
      senha: '100b945c050b7d1f82b1fe84c6274553159c12cba0345bb2c63935095050c32c',
      //senha: 'admin123',
      email: 'administrador@restinga.ifrs.edu.br',
      tipo: 'adm'
    }).fetch();
    sails.log('Usuário criado, seu id: ', adm.id);
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
