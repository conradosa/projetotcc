module.exports = async function (req, res, proceed) {

  if (req.session.usuarioTipo === 'Aluno') {
    return proceed();
  }

  req.session.erro = 'Apenas alunos podem acessar isso!';
  return res.redirect('/');

};
