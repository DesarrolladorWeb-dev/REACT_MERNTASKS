import React , {Fragment , useContext, useState} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';


const NuevoProyecto = () => {

    // Obtener el state del formulario
    // vemos que podremos consumir ese valor false del context sin usar el props a lo largo del arbol 
    const proyectosContext = useContext(proyectoContext)
    // ? orden primero los state y luego las funciones 
    const {formulario,errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;



    //  State para Proyecto
    const [proyecto , guardarProyecto] = useState({
        nombre: ''
    });
    //Extraer el nombre del proyecto
    const {nombre } = proyecto; 



    // leer los contenido del input 
    const onChangeProyecto = e => {
        guardarProyecto ( {
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }
    // cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault()

        // validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }

        // agregar el state
        agregarProyecto(proyecto)
        
        // Reiniciar el form
        guardarProyecto({
            // esto va a reiniciar el formulario para que al precionar nuevo proyecto no este escrito del anterior
            nombre : ''
        })


    } 

    // Mostrar el Formulario
    const onClickFormulario = () => {
        mostrarFormulario()
    }

    return ( 
        // cuando se retorna mas de dos elementos usar fragment
        <Fragment> 
        <button 
        type="button"
        className='btn btn-block btn-primario'
        onClick={onClickFormulario}
        >Nuevo Proyecto</button>
        {
            // si formulario esta true
            formulario 
            ? (
                <form 
                    className='formulario-nuevo-proyecto'
                    onSubmit={onSubmitProyecto}
                >
                <input 
                    type="text"
                    className='input-text'
                    placeholder='Nuevo Proyecto'
                    name="nombre" 
                    value={nombre}
                    onChange={onChangeProyecto}
                />

                <input 
                type="submit" 
                className='btn btn-primario btn-block'
                
                value="Agregar Proyecto"
                />

                </form>
            ) : null }

            {errorformulario ? <p className='mensaje error'>El nombre de Proyecto es obligatorio</p> : null}
        </Fragment>


     );
}
 
export default NuevoProyecto;