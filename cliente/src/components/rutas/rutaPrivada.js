import React , {useContext, useEffect} from 'react'
import { Navigate  } from 'react-router-dom'
import AuthContext from '../../context/autenticacion/authContext'
// import AuthState from '../../context/autenticacion/authState';

// de esta manera se crea el "all auth" order component
// Esto quiere decir : que RutaPrivada tendra otro componente dentro
// como vamos a tener una serie de props, vamos a tomar una copia de esos props y se lo vamos a pasar dentro del componente
// vamos podemos usar el props muchas veces , vamos a crear copia de props para pasarle al componente hijo , puedes crear un conole.log(props)


const RutaPrivada = ({ children , ...props}) => {
    
    
    const authContext = useContext(AuthContext);
    const {autenticado, cargando ,usuarioAutenticado} = authContext
    
    useEffect(() => {
        usuarioAutenticado()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // console.log('aqui esta el autenticado',autenticado)
    // console.log('aqui esta el cargando',cargando)


    //  
    if (!autenticado && !cargando ) {
        // el cargando cuando es null ya no se mostrara el login - con cuando cargando esta en null
        return  <Navigate  to="/" /> 
    }
    // console.log("ya me pase")

    return children
   
}
 
export default RutaPrivada;


// BLOCK - de lo que esta ocurriendo aqui 

// aqui lo que hacemos es crear el componente que toma un input de otro componente , otro 
// compontente toma otro componente dentro de el 

// y revisamo : ¿este usuario esta autenticado?
// props => !autenticado ?
// y si es no lo enviamos a  <Redirect to="/" /> 
// caso contrario lo mandamos al componente que lo esta mandando a llamar