module.exports = async function (req, res, proceed) {

  if (!req.session.usuarioTipo) {
    return proceed();
  } else {
    if (req.session.usuarioTipo === 'Aluno') {
      return res.redirect('/aluno');
    }
    if (req.session.usuarioTipo === 'Professor') {
      return res.redirect('/professor');
    }
    if (req.session.usuarioTipo === 'adm') {
      return res.redirect('/adm');
    }
  }

};
