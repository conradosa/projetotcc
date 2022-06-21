module.exports = async function (req, res, proceed) {

  if (!req.session.logado) {
    return proceed();
  }

  return res.redirect('/');

};
