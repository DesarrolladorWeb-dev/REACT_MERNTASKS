import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group';


const ListadoProyectos = () => {
    
    // Extrear proyectos de state inicial
    const proyectosContext = useContext(proyectoContext)
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext;

    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext

    // Tan pronto este componente cargue lo  veremos []
    useEffect(() => {
        //si hay un error
       if(mensaje){
        mostrarAlerta(mensaje.msg , mensaje.categoria)
       }

        // aqui se ingresara info de DB
        obtenerProyectos()
        // esliny-disable-next-line


    },[mensaje]);

    // revisar si proyectos tiene contenido
    if(proyectos.length === 0 ) return null


    return ( 
        <ul className='listado-proyectos'> 
        {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}
            <TransitionGroup>
            {proyectos.map(proyecto => (
                //TODO  EL KEY PASA A SER PARTE DE <CSSTransition>
                <CSSTransition
                // el guion bajo porque usamos mongo
                    key={proyecto._id}
                    timeout={200}
                    classNames="proyecto"
                >
                    <Proyecto
                    
                    proyecto={proyecto}
                />
                </CSSTransition>
            ) )}
            </TransitionGroup>
        </ul>


     );
}
 
export default ListadoProyectos;