module.exports = async function (req, res, proceed) {

  if (req.session.tipo === 'professor') {
    return proceed();
  }

  req.session.erro = 'Apenas professores podem acessar isso!';
  return res.redirect('/');

};
