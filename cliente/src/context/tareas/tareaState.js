
import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';



import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    // ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'; 
import clienteAxios from '../../config/axios'

const TareaState = props => {
    const initialState = {
        
        tareasproyecto : [], //se inicializa como array vacio porque se usara filter
        errortarea : false,
        // donde vamos a  guardar nuestra tarea al seleccionada
        tareaseleccionada: null

    }
    // Crear dispatch y state 
    const [state, dispatch] = useReducer(tareaReducer, initialState)


    // Crear las funciones

    // Obtener las tareas de un proyecto
    // se ejecutara cuando el usuario seleccione un proyecto
    const obtenerTareas = async proyecto => {
        try {
            
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}})
            console.log(resultado) 
            dispatch ({
                type: TAREAS_PROYECTO,
                payload : resultado.data.tareas
            }) 

        } catch (error) {
            console.log(error)
        }
    }

    // Agregar un tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const resultado =  await clienteAxios.post('/api/tareas', tarea)
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error)
        }
    }
    // Validar y muestra un error
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA

        })
    }
    // Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params : {proyecto}})

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

     // Edita o modifica una tarea 
     const actualizaTarea = async tarea => {
        console.log(tarea)
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            console.log(resultado)
            dispatch ({
                type: ACTUALIZAR_TAREA,
                payload : resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }


    // Extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch ({
            type: TAREA_ACTUAL,
            payload : tarea
        })
    }


    // Elimina la tareaseleccionada 
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }


    return (
        <TareaContext.Provider
            value = {{
                
                tareasproyecto : state.tareasproyecto,
                errortarea : state.errortarea,
                tareaseleccionada : state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizaTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;