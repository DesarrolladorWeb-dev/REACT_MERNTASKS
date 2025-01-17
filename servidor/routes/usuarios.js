//Rutas para crear usuarios
const express = require ('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const { check } = require('express-validator')

// Crear un usuario
// api/usuarios
router.post('/' ,
// Recuerda las reglas van en el routing pero el resultado va en controllador
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password' , 'El password debe ser minimo de 6 caracteres').isLength({min: 6 })
    ],
    usuarioController.crearUsuario
)
module.exports = router
