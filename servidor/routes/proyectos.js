const express = require('express')
const router = express.Router();
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middleware/auth')
const {check} = require('express-validator');

// Crear proyectos
// api/proyectos
router.post('/',
    auth,  //primero verificara todo lo que esta en el midelware
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)
// Obtener todos los proyectos
router.get('/',
    auth,  //primero verificara todo lo que esta en el midelware
    proyectoController.obtenerProyectos 
)
// Actualizar proyecto 
router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto

)
// Eliminar el Proyecto
router.delete('/:id', 
    auth,
    proyectoController.eliminarProyecto

)


module.exports = router;
