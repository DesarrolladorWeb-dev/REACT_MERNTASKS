import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';
// NO COLOCAR COMENTARIOS DENTRO DE EL SWITCH- puede llegar a fallar el return 

export default (state, action) => {
    switch(action.type) {
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            // localStorage.setItem('token', action.payload.token); // no funciona esta linea 
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false,
                token: action.payload.token
            }
        case OBTENER_USUARIO: 
            return {
                ...state,
                autenticado: true,
                usuario: action.payload, 
                cargando: false
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload, 
                cargando: false
            }
        
        default:
            return state;
    }
}