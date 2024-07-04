import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const  Tarea = ({tarea})  => {

    // Extrae un proyecto si esta activo - (estara activo porque estara seleccionado)
    const proyectosContext = useContext(proyectoContext)
    // ? este proyecto nos retorna un arreglo
    const {proyecto} = proyectosContext;

    // obtener la funcion del context tarea 
    const tareasContext = useContext(tareaContext)
    const {eliminarTarea , obtenerTareas, actualizaTarea , guardarTareaActual} = tareasContext;

    // Extraer el proyecto - usando array destructuring
    const [proyectoActual] = proyecto  // [{}]

    // Funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea 
    const tareaEliminar = id => {
        // Se eliminara 
        eliminarTarea(id , proyectoActual._id)
        // Y se volvera a llamar a obtener tareas para actualizar la lista 
        obtenerTareas(proyectoActual.id)
    }

    // Funcion que modifica el estado de las tareas 
    const cambiarEstado  = tarea => {
      if(tarea.estado) {
        tarea.estado = false
      }else{
        tarea.estado = true
      }
      // a estas altura ya estara modificada
      actualizaTarea (tarea)
    }

    // Agregar una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
      guardarTareaActual(tarea)
    }


      return (
        <li className = 'tarea sombra'>
      <p>{tarea.nombre}</p>
      <div className='estado'>
        {tarea.estado
          ?
          (
            <button
              type='button'
              className='completo'
              onClick={() => cambiarEstado(tarea)}
            >Completo</button>
          )
          :
          (
            <button
              type='button'
              className='incompleto'
              onClick={() => cambiarEstado(tarea)}
            >Incompleto</button>
          )
        }
      </div>

        <div className='acciones'>
          <button 
            type="button"
            className='btn btn-primario'
            onClick ={ () => seleccionarTarea(tarea)}
          >Editar</button>
          <button 
            type="button"
            className='btn btn-secundario'
            onClick={() => tareaEliminar(tarea._id)}
          >Eliminar </button>
          
        </div>

    </li>
  )
}

export default Tarea