module.exports = async function (req, res, proceed) {

  if (req.session.usuarioTipo === 'adm') {
    return proceed();
  }

  req.session.erro = 'Apenas o administrador pode acessar isso!';
  return res.redirect('/');

};
