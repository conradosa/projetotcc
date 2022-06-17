
module.exports = {
    
  login: async function (req, res) {

    const valor = req.body;
    
    const matricula = valor.matricula;
    
    if (isNaN(matricula)) {
      req.session.erro = 'O campo matrícula deve ser um número!';
      return res.redirect('back');
    }
    
    const senha = valor.senha;
    
    const crypto = require('crypto');
    
    const senhasalted = senha + '42';
    const senhabd = crypto.createHash('sha256').update(senhasalted).digest('hex');
    
    let user = await Usuario.findOne({
      matricula: matricula,
      senha: senhabd
    });
    
    if (!user) {
      req.session.erro = 'Usuário ou senha incorretos!';
      return res.redirect('back');
    } else {
      req.session.logado = true;
      req.session.usuarioNome = user.nome;
      req.session.usuarioMatricula = user.matricula;
      req.session.usuarioEmail = user.email;
      req.session.usuarioTipo = user.tipo;
      res.redirect('/home');
    }
  },
    
  logout: async function (req, res) {
    
    delete req.session.logado;
    delete req.session.usuarioNome;
    delete req.session.usuarioMatricula;
    delete req.session.usuarioEmail;
    delete req.session.usuarioTipo;
    
    res.redirect('/login');
    
  },

}
