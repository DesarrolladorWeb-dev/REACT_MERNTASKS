import React, { useReducer } from "react";
// creamos el context y reducer
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import { 
        FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        PROYECTO_ERROR,
} from '../../types'

import clienteAxios from '../../config/axios'




// agregamos el state inicial lo que es la administracion del proyecto , creacion , eliminacion ...
const ProyectoState = props => {


    // cuando se le de click en Agregar Proyecto se mostrara pasando a true
    const initialState = {
        proyectos : [],
        formulario : false,  //cuando esta con true se mostrara el formulario
        errorformulario: false,
        proyecto: null, //no hay ningun proyecto seleccionado , al agregar pasara a ser [{}]
        mensaje: null
    }

    // Dispatch para ejecutar las acccions
    // es igual que el state te retorna es state y dispach ejecutas las acciones
    // TODO al ejecutar dispatch se ejecutara lo que se encuentra en proyectoReducer - para cambiar el state
    const [state , dispatch] = useReducer(proyectoReducer,initialState)   //extraemos de use reducer tanto state como dispatch

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Ontener los proyectos
    // toda la funcion de paramentro va a ser el payload
    const obtenerProyectos = async ()  => {
       try {
            const resultado = await clienteAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })

       } catch (error) {
        const alerta = {
            msg : 'Hubo un error',
            categoria: 'alerta-error'
        }
        dispatch({
            type : PROYECTO_ERROR,
            payload: alerta
        })
    }
    }

    // Agregar nuevo proyecto 
    const agregarProyecto = async proyecto => {
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado)
            // Insertar el proyecto en el State
            dispatch({ //luego proyecto lo pasamos al dispatch que se le enviara con el payload a proyectoReducer
                type : AGREGAR_PROYECTO,
                // el payload para cambiar el state
                payload: resultado.data //el resultado.data se encuentra el proyecto agregado 
        })
        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type : PROYECTO_ERROR,
                payload: alerta
            })
        }
        

    }
    // validar el formulario por errores 
    const mostrarError = () => {
        dispatch({
            type :VALIDAR_FORMULARIO 
        })
    }

    // Selecciona el Proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    // Eliminar un proyecto 
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
            dispatch({
                type : ELIMINAR_PROYECTO,
                payload : proyectoId
            })            
        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type : PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Serie de funciones para el CRUD 
    return(
        // los diferentes hijos{props.children} que sean de <proyectoContext.Provider> se pasen los datos atraves de diferentes componentes
        <proyectoContext.Provider
            //TODO si esta como true el formulario se mostrara
            value = {{ 
                // Nota diferencialos de esta manera , funcion mostrarFormulario es minus y mayu
                proyectos : state.proyectos,
                formulario : state.formulario,
                errorformulario : state.errorformulario,
                proyecto : state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto,
             }}

        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState;