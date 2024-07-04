//Rutas para autenticar usuarios
const express = require ('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

// Iniciar Session
// api/auth
router.post('/' ,
// Recuerda las reglas van en el routing pero el resultado va en controllador
//TODO Se elimina porque ya lo tienen en React
    // [
    //     check('email', 'Agrega un email valido').isEmail(),
    //     check('password' , 'El password debe ser minimo de 6 caracteres').isLength({min: 6 })
    // ],
    authController.autenticarUsuario
)
//Obtiene el usuari autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router
