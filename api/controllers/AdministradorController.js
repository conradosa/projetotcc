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
  
  //Senha adm: admin123 (salt 42)

  criaAdm: async function (req, res) {
    let adm = await Usuario.create({
      id: 1,
      matricula: '0000000000',
      nome: 'Administrador',
      // senha: '2f81a89d6f6e531a24d98451c3f60760b6440369306e4f37b4d79b091f9ef9c5',
      senha: 'admin123',
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

