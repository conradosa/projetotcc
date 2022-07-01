module.exports = async function (req, res, proceed) {

  if (req.session.tipo === 'aluno') {
    return proceed();
  }

  req.session.erro = 'Apenas alunos podem acessar isso!';
  return res.redirect('/');

};
