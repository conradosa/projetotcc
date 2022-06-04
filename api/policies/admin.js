module.exports = async function (req, res, proceed) {

  if (req.session.tipo === 'adm') {
    return proceed();
  }

  req.session.msg = 'Apenas o administrador pode acessar isso!';
  return res.redirect('back');

};
