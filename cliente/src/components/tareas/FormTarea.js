import React, { useContext , useState , useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {


        
    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext)
    const {proyecto} = proyectosContext;

    // obtener la funcion del context tarea 
    const tareasContext = useContext(tareaContext)
    const {tareaseleccionada , errortarea , agregarTarea , validarTarea , obtenerTareas , actualizaTarea, limpiarTarea} = tareasContext;



    // Effect que detecta si hay una tarea seleccionada 
    useEffect(() => {
        // si en tarea seleccionada esta la tarea 
        if (tareaseleccionada !== null ) {
            guardarTarea(tareaseleccionada)
        }else {
            guardarTarea({
                nombre : ''
            })
        }
    }, [tareaseleccionada])  //revisa si cambio tareaseleccionada



    // State del formulario
    const [tarea ,guardarTarea] = useState({
        nombre: ''
    })

    // extraer el nombre del proyecto
    const {nombre} = tarea


    // Si no hay proyecto seleccionado
    if(!proyecto) return null

    // Array destrucuring para extraer el proyecto actual 
    const [proyectoActual] = proyecto

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        // validar 
        if(nombre.trim() === ''){
            validarTarea();
            return
        }

        // Si es edicion o si es nueva tarea 
        if(tareaseleccionada === null) {
            //todo tarea nueva 
            // agregar la nueva tarea al state de tareas
            // proyectoActual.id  -> todo el objeto del proyecto
            tarea.proyecto = proyectoActual._id   //NOTA SE TIENE QUE ENVIAR COMO PROYECTO tarea.proyecto 
            // tarea.estado = false (se generara automaticamente)
            agregarTarea(tarea)  //le pasamos la nueva tarea
        }else{
            //todo actualizar Tarea existente
            actualizaTarea(tarea)

            // Elimina tareaseleccionada del state
            limpiarTarea()
        }


        // Obtener y filtrar las tareas del proyecto actual
        // con esta linea se muestra la tarea - en la lista de tareas
        obtenerTareas(proyectoActual.id); 

        // Reiniciar el form
        guardarTarea({
            nombre : ''
        })
    }



    return (
        <div className='formulario'>
            <form
                onSubmit={onSubmit}

            >
                <div className='contenedor-input'>
                    <input 
                        type="text" 
                        className='input-text'
                        placeholder='Nombre Tarea'
                        name="nombre" 
                        value={nombre}
                        onChange={handleChange}
                    />
                    </div>
                    <div className='contenedor-input'>
                        <input 
                            type="submit" 
                            className='btn btn-primario btn-submit btn-block'
                            value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea' }
                            
                            />
                    </div>
            </form>
            {errortarea ? <p className='mensaje error'>El nombre de la tarea e obligatorio</p>: null}
        </div> 

     );
}
 
export default FormTarea;