const Usuario = require('../models/usuario');

const usuarioConectado = async ( uid = '' ) => {

  const usuario  =  Usuario.findById(uid);
  const update = { online : true}
  await usuario.updateOne(update);
  return usuario;
}

const usuarioDesconectado = async ( uid = '' ) => {
  const usuario  =  Usuario.findById(uid);
  const update = { online : false}
  await usuario.updateOne(update);
  return usuario;
}




module.exports = {
    usuarioConectado,
    usuarioDesconectado
}