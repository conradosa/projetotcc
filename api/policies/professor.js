module.exports = async function (req, res, proceed) {

  if (req.session.usuarioTipo === 'Professor') {
    return proceed();
  }

  req.session.erro = 'Apenas professores podem acessar isso!';
  return res.redirect('/');

};
