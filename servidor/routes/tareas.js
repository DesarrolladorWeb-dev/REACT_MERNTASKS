const express = require('express')
const router = express.Router();
const tareaController = require('../controllers/tareaController')
const auth = require('../middleware/auth')
const {check} = require('express-validator');

// Crear una tarea
// api/tareas
router.post('/' , 
    auth,
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty(),
    ],
    tareaController.crearTarea
)

// Obtener las tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
)

// Actualizat tarea - pasando el estado a true y despues editar
router.put('/:id',
    auth,
    tareaController.actualizarTarea
)

// Eliminar tarea 
router.delete('/:id',
    auth,
    tareaController.eliminarTarea,
)

module.exports = router;