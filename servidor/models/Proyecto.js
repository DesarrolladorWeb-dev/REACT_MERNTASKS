const mongoose = require('mongoose')

const ProyectoSchema = mongoose.Schema({
    nombre:{
        type: String,
        require : true,
        trim : true
    },
    // NO ES OBLIGATORIO creador 
    creador:{
        // cada usuario tiene un id - para hacer la referencia entre el Proyecto y el Usuario
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' // de esta forma sabemos a quien pertenece el object id que le estamos pasando en el type 

    },
    creado: {
        type: Date,
        default : Date.now()
    }
})
module.exports = mongoose.model('Proyecto', ProyectoSchema)