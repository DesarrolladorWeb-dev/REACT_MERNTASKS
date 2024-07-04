import React, {useContext, useEffect} from 'react'
import Sidebar from '../layout/Sidebar'
import Barra  from '../layout/Barra'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'
import AuthContext from '../../context/autenticacion/authContext'


const Proyectos = () =>  {

  // Extra la informacion de autenticacion
  const authContext = useContext(AuthContext)
  //usamos usuarioAutenticado cuando el usuario ya esta autenticado
  const {usuarioAutenticado} = authContext

  useEffect(() => {
    // Cuando recargo sigo teniendo mi session - con ayuda de App.js para que envie el token a header
    // TODO SOLUCIONANDO EL PROBLEMA DE RECARGA Y PERDER LOS DATOS DEL USUARIO
      usuarioAutenticado();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div className='contenedor-app'>
        <Sidebar/>

        <div className='seccion-principal'>
            <Barra/>
            
            <main>
              <FormTarea/>
                <div className='contenedor-tareas'>
                    <ListadoTareas/>
                </div>
            </main>
        </div>

        
    </div>
  )
}

export default Proyectos