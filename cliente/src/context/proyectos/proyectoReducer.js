import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR,
} from '../../types'

// lo unico que hace el reducer es cambiar el state
// TODO : siempre estara la copia del ...state  en todas las condiciones que revices


// el reducer funciona igual a redux
export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                // lo que este lo deje como esta , es por eso que utilizamos la copia
                ...state,
                formulario : true //cambie a true
            }
        case OBTENER_PROYECTOS:
            return{
                ...state,
                proyectos: action.payload //de esta forma lo que lo mandamos como payload se va a asignar como state

            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                // TODO  action.payload -> (vendria siendo el objeto nuevo) pero se va a agregar al arreglo de objetos (...state.proyectos)
                // action es el -> proyecto pasado por el payload
                proyectos: [...state.proyectos, action.payload],
                // para que se oculte el input de nuevo proyecto
                formulario:false,
                errorformulario : false
            }
        case VALIDAR_FORMULARIO:
            return{
                // copia del state para que lo que haigue lo mantenga
                ...state, 
                errorformulario : true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                // el proyecto precionado del aside extrae el que tenga el id igual 
                proyecto : state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                // que me traiguen todos menos el que le envio y se guardaran en proyectos - y asi lo eliminara
                proyectos : state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                // para que quede limpio la seccion de proyecto y no tenga la info de lo eliminado
                proyecto : null
            }
        case PROYECTO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}