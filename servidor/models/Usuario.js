const mongoose = require('mongoose')


const UsuarioSchema = mongoose.Schema({
    nombre : {
        type : String,
        required: true,
        trim : true //elimina los espacios en blanco
    },
    email: {
        type : String,
        required: true,
        trim : true,
        unique: true
    },
    password: {
        type : String,
        required: true,
        trim : true
    },
    registro: {
        type: Date,
        default : Date.now() //se generara un fecha del momento en que se realize un registro
    }
    
});
module.exports = mongoose.model('Usuario', UsuarioSchema)