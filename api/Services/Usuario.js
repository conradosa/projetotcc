const fs = require('fs');
const path = require('path');
const Joi = require('joi');

// Valida Criação do usuário
    const validar = Joi.object({
            nome:Joi.string().required().messages({'string.base':'Campo Nome é do tipo String','any.required':'Campo Nome obrigatório'}),
            email:Joi.string().required().email().messages({'string.base':'Campo Email é do tipo String','any.required':'Campo Email obrigatório',
            'string.email':'O email tem que ser válido'}),
            matricula:Joi.number().required().messages({'string.base':'Campo Matrícula é do tipo String','any.required':'Campo Matricula obrigatório'}),
            senha:Joi.string().required().messages({'string.base':'Campo Senha é do tipo String','any.required':'Campo Senha obrigatório'}),
            tipo:Joi.string().required().messages({'string.base':'Campo Tipo é do tipo String','any.required':'Campo Tipo obrigatório'}),
    })
    

const uploadDocumento =  (req, res) => {

    //transformar o inteiro em ‘string’ da matrícula

    let matriculastring = req.session.usuarioMatricula.toString();

    //criar diretórios

    try {
      fs.mkdirSync(path.join(sails.config.appPath, '/assets/usuarios/', matriculastring), {recursive: true});
    } catch (err) {
      req.session.erro = err.toString();
      res.redirect('back');
    }

    //upload dos arquivos

    req.file('documento').upload({
      maxBytes: 5000000,
      saveAs: 'documentonome.pdf',
      dirname: path.join(sails.config.appPath, '/assets/alunos/', matriculastring)
    }, (err, file) => {
      if (file.length === 0) {
        req.session.erro = 'Nenhum arquivo enviado!';
        return res.redirect('back');
      }
      if (file.length > 1) {
        if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentonome.pdf'))) {
          fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentonome.pdf'));
        }
        req.session.erro = 'Somente um arquivo pode ser enviado!';
        return res.redirect('back');
      }
      if (path.extname(file[0].filename) !== '.pdf') {
        if (fs.existsSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentonome.pdf'))) {
          fs.unlinkSync(path.join(sails.config.appPath, '/assets/alunos/', matriculastring, 'documentonome.pdf'));
        }
        req.session.erro = 'O arquivo enviado não é um pdf!';
        return res.redirect('back');
      }
      if (err) {
        req.session.erro = err.toString();
        return res.redirect('back');
      } else {
        req.session.sucesso = 'Arquivo enviado!';
        res.redirect('back');
      }
    });
}

module.exports = {
    validar,
    uploadDocumento
}