import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'; 


export default( state , action ) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                // vamos a tener una copia del state actual
                ...state,
                // se traera todos los que tienen el numero igual de id de tareas
                tareasproyecto : action.payload // * aqui ya estarian los resultado ya filtrados
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                // creamos un arreglo nuevo de tareas + la nueva
                // para que se agregen las tareas al inicio - action.payload
                tareasproyecto : [action.payload,...state.tareasproyecto],
                errortarea: false //para que no aparesca el error
            }
        case VALIDAR_TAREA : 
            return {
                ...state,
                errortarea : true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                // nos trae todos menor el que le enviamos y asi lo elimina
                tareasproyecto : state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:  // TODO la actualizacion - le pasaremos una tarea nueva modificada - y va a ser del objeto comleto  
            return {
                ...state,
                // iterara en cada una de las tareas y cuando encuentre el id  entonces ejecuta el codigo y cambia el estado
                // si no lo encuentra retorna la tarea como estee para que no la modifique
            
                tareasproyecto : state.tareasproyecto.map( tarea  => tarea._id === action.payload._id ? action.payload : tarea )
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                // se guardara la tarea completa
                tareaseleccionada : action.payload
            }
        case LIMPIAR_TAREA: 
            return {
                ...state,
                tareaseleccionada: null
            }

        default:
            return state;
    }
}