import React, { useContext, useEffect } from 'react'
// el autcontext - aqui estaran todas las funciones que declaramos en el authstate
import AuthContext from '../../context/autenticacion/authContext'


const Barra = ()  => {

  
  // Extra la informacion de autenticacion
  const authContext = useContext(AuthContext)
  //usamos usuarioAutenticado cuando el usuario ya esta autenticado
  const {usuario , usuarioAutenticado, cerrarSesion } = authContext

  useEffect(() => {
    // Cuando recargo sigo teniendo mi session - con ayuda de App.js para que envie el token a header
      usuarioAutenticado();
      //eslint-disable-next-line
  }, [])

  return (
    <header className='app-header'>
      {usuario ? <p className='nombre-usuario'> Hola <span>{usuario.nombre}</span> </p>  : null}
        <nav className='nav-principal'>
            <button
              className='btn btn-blank cerrar-sesion'
              onClick={() => cerrarSesion() }
            >Cerrar Sesion</button>
            
        </nav>
        
    </header>
  )
}

export default Barra