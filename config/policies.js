/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
 // '*': 'logado',
  '*': true,
 // 'usuario/login': true,
  //'usuario/insertAluno': true,
  //'usuario/insertProfessor': true,
};
