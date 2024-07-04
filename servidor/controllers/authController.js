const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async ( req , res) => {
  // revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores : errores.array()})
    }
    // extraer el email y password
    const {email , password } =  req.body 
    try {
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email})
        if (!usuario) {
            return res.status(400).json({msg : 'El usuario no existe'})
        }

        // Revisar el password - comparara los passwords
        const passCorrecto = await bcryptjs.compare(password, usuario.password)
        if (!passCorrecto) {
            return res.status(400).json({msg: 'Password Incorrecto'})
        }

        // Si todo es correcto Crear y firmar el jwt
        const payload = {
            // es la informacion que va a guardar el jwt 
            usuario : {
                id: usuario.id //el(usuario.id) es el id del usuario que estamos creando , como vamos a tener un token con el id del usuario
                // nos ayudara cuando estamos haciendo consulta a bd traemos los proyectos creados por el si desencriptamos nos dara el id del usuario
            }
        };
        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600 //1 hora

        }, (error, token) => {
            if (error) throw error

            // Mensahe de confirmacion
            res.json({token });
            
        })



    } catch (error) {
        console.log(error)
    }

}

// Obtiene que el usaurio esta autenticado 
exports.usuarioAutenticado = async(req, res) => {
    console.log(req.usuario.id)
    try {
        // porque el password no lo queremos -password
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        console.log(usuario)
        res.json({usuario});

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'});
    }
}