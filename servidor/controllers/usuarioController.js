const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario =  async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req); //aqui tiene los errores obtenido por el check
    if(!errores.isEmpty()){
        //  se mostrara todos los errores encontrados
        return res.status(400).json({errores : errores.array()})
    }


    // Extraer Email y Password 
    const {email, password} = req.body

    try {
        // Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email})

        // aqui es true si lo encontrol
        if (usuario) {
            return res.status(400).json({msg: 'El usuario ya existe'});
        }
        // crea el nuevo usuario
        usuario = new Usuario(req.body);

        // Hashear el password
        const salt =  await bcryptjs.genSalt(10); //para que tenga todas las contras esa cantidad de caracteres
        usuario.password = await bcryptjs.hash(password, salt)

        // guarda usuario 
        await usuario.save();

        // Crear y firmar el jwt
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
        res.status(400).send('Hubo un Error')
    }


}