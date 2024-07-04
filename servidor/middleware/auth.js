const jwt = require('jsonwebtoken');

module.exports = function(req, res , next) {
    // leer el token del header
    const token = req.header('x-auth-token');
    console.log(`desde el servidor ${token}`)

    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({msg : 'NO hay token, permiso no valido'})
    }

    // validar el token
    try {
        // en caso de que sea correcto - en este token esta el id del usuario - este token se crea en el logueo
        const cifrado = jwt.verify(token, process.env.SECRETA)
        // TODO vamos a agregar el usuario en una parte del request en la cual podremos acceder al id
        // TODO cifrado.usuario : es usuario por que en el usuarioController.js - le pasamos asi en el payload
        // *la cual podremos acceder al id del usuario
        req.usuario = cifrado.usuario; 
        next();

    } catch (error) {
        res.status(401).json({msg : 'Token no valido'})
    }

}