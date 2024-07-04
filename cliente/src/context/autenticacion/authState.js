import React, {useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token'

import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {
    const initialState ={
        // token: localStorage.getItem('token'),
        token: null || localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // Las Funciones para validar
    const registrarUsuario = async datos => { //los datos vienen de NuevaCuenta
        try {

            // le envia con post toda la info que esta en datos
            const respuesta = await clienteAxios.post('/api/usuarios',datos);
            console.log(respuesta.data)
            
            // en caso que todo haya salido bien registro exitoso
            dispatch({
                type : REGISTRO_EXITOSO,
                payload: respuesta.data
            });
            // TODO  localStorage.setItem('texto', 'contenido');
            // TODO  Aqui lo declaro porque no se podia leer en el authReducer.js
            localStorage.setItem('token', respuesta.data.token);

            usuarioAutenticado()
            
            
        } catch (error) {
            // en el response estara 
            console.log(error.response.data.msg)

            const alerta = {
                msg : error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload : alerta
            })
        }

    }

    //Retorna el usuario autenticado 
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        // TODO  const tokenReduce = localStorage.getItem('token')
        // TODO console.log('desde el tockenReduce  ',tokenReduce)

        if(token) {
            // console.log(token)
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            // console.log(respuesta);

            dispatch({
                type: OBTENER_USUARIO,
                payload : respuesta.data.usuario
            })

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }
    //Cuando el usuario inicia sesion
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            localStorage.setItem('token', respuesta.data.token);

            //Obtener el usuario
            usuarioAutenticado()

        } catch (error) {
            console.log(error.response.data.msg)

            const alerta = {
                msg : error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload : alerta
            })
        }
    }

    // Cierra la sesion del usuario
    const cerrarSesion = () => {
        dispatch({
            type:CERRAR_SESION
        })
    }


    return (
        <AuthContext.Provider
            value = {{
                token: state.token,
                autenticado : state.autenticado,
                usuario : state.usuario,
                mensaje : state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado, //lo usamos cuando un usuario ya esta autenticado
                cerrarSesion,

            }}
        >{props.children}
        </AuthContext.Provider>
    )
}
export default  AuthState ;