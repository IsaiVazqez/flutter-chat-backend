const {response} = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;

    try {

    const existeEmail = await Usuario.findOne({email});
    if(existeEmail) {
        return res.status(400).json({
            ok:false,
            msg: 'El correo ya está registrado'
        });
    }
        
    const usuario = new Usuario(req.body);

    //Encriptar contaseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    const token = await generarJWT(usuario.id)


        res.json({
            ok: true,
            usuario,
            token
        });

            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});
        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                smg: 'Email no encontrado'
            });
        }

        //Validar Password

        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if (!validPassword){
            return res.status(404).json({
                ok: false,
                smg: 'La contraseña no es valida'
            });
        }

        //Genarar el jwt

        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'login'
        })
    }

}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    //generar un nuevo JWT
    const token = await generarJWT(uid);

    //obtener el ussuario por el uid
    const usuario = await Usuario.findById(uid);


    res.json({
        ok: true,
        usuario,
        token
    })
}



module.exports = {
    crearUsuario,
    login,
    renewToken
}

/*     const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();
 */