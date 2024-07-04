
const Proyecto = require('../models/Proyecto')
const {validationResult} = require('express-validator')


exports.crearProyecto = async(req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores : errores.array()})
    }

    try {
        // Crear un nuevo proyecto 
        const proyecto = new Proyecto(req.body);
        
        // Guardar el creador usando el  JWT  desde el auth.js
        proyecto.creador = req.usuario.id;

        // guardamos el proyecto
        proyecto.save()
        res.json(proyecto)

    } catch (error) { 
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {
        // Obtenermos los proyectos de un usuario
        // para cambiar el orden de como se muestran los proyectos  usamos sort({creado: -1}) por la fecha la mas actual se mostrara primero
        const proyectos = await Proyecto.find({creador : req.usuario.id}).sort({creado: -1})
        res.json({proyectos});
        // console.log(req.usuario) //obtendre el id del usuario

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

// Actualizar un proyecto
exports.actualizarProyecto = async(req, res ) => {
  // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores : errores.array()})
    }
    // Extrear la informacion del proyecto
    const {nombre} = req.body
    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre
    }
    try {
        // Revisar el Id
        let proyecto = await Proyecto.findById(req.params.id)

        // si el proyecto existe o no 
        if(!proyecto){
            return res.status(404).json({msg : 'Proyecto no encontrado'})
        }
        // verificar si esa persona es quien la creo
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'})
        }
        // actualizar 
        // le decimos que lo vamos a actualizar en el id  . where en un sql : {_id:req.params.id}
        // {$set : nuevoProyecto}  : donde se agregara la nueva informacion
        proyecto = await Proyecto.findByIdAndUpdate({_id:req.params.id}, {$set : nuevoProyecto},{new: true})
        res.json({proyecto})


    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }

}

// Elimina un proyecto por su id
exports.eliminarProyecto = async ( req , res ) => {
        try {
            // Revisar el Id
            let proyecto = await Proyecto.findById(req.params.id)

            // si el proyecto existe o no 
            if(!proyecto){
                return res.status(404).json({msg : 'Proyecto no encontrado'})
            }
            // verificar si esa persona es quien la creo
            if (proyecto.creador.toString() !== req.usuario.id) {
                return res.status(401).json({msg: 'No Autorizado'})
            }
            
            // Eliminar el Proyecto
            // await Proyecto.findOneAndRemove({ _id : req.params.id})
            await Proyecto.findOneAndDelete({ _id : req.params.id})
            res.json({
                msg : 'Proyecto eliminado'
            })


        } catch (error) {
            console.log(error)
            res.status(500).send('Error en el servidor')
        }
}
