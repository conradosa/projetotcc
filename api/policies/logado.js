module.exports = async function (req, res, proceed) {

  if (req.session.logado) {
    return proceed();
  }

  req.session.msg = 'Faça login para acessar isso!';
  return res.redirect('back');

};
