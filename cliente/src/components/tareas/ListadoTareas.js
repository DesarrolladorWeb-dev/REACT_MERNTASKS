import React, {Fragment, useContext} from 'react'
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


const ListadoTareas = ()  => {

        
    // Extrear proyectos de state inicial
    const proyectosContext = useContext(proyectoContext)
    const {proyecto, eliminarProyecto} = proyectosContext;

    // obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext)
    const {tareasproyecto} = tareasContext;

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    // Array destrucuring para extraer el proyecto actual 
    const [proyectoActual] = proyecto


    // Eliminar un proyecto
    const onClickEliminar = () => {
        // proyecto actual porque esta asi [{}] en el state
        eliminarProyecto(proyectoActual._id)
    }

    
    console.log("aqu9i esta tareaproyecto : ", tareasproyecto)
  return (
    <Fragment>
        <h2>Proyecto : {proyectoActual.nombre}</h2>

        <ul className='listado-tareas'>
            { tareasproyecto.length === 0 
                ?   (<li className='tarea'><p>No hay tareas</p></li>) 
                :   
                <TransitionGroup>
                {tareasproyecto.map(tarea => {
                    // console.log('Tarea:', tarea);
                    return (
                        <CSSTransition
                            key={tarea._id}
                            timeout={200}
                            classNames='tarea'
                        >
                            <Tarea tarea={tarea} />
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
            } 
        </ul>
        <button 
                type="button"
                className='btn btn-eliminar'
                // nota on click nunca entreparentesis cuando no recibe nada
                onClick={onClickEliminar}
                > Eliminar Proyecto &times;</button>
       
    </Fragment>
  )
}

export default ListadoTareas