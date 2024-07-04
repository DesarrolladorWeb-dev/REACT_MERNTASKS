import React, {useState, useContext, useEffect} from 'react'
import {Link , useNavigate}  from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = ()  => { 

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    // alerta inicia con null
    const {alerta , mostrarAlerta} = alertaContext;
    
    const authContext = useContext(AuthContext);
    const {mensaje,autenticado, registrarUsuario} = authContext

    
  const navigate = useNavigate(); // Utilizamos useNavigate para la redirección
    
    //En caso de que el usaurio se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        if(autenticado){ 
            navigate('/proyectos') //aqui nos movemos a /proyectos;
        }

        if(mensaje) { //si hay contenido de mensaje en el state mostrar
            mostrarAlerta( mensaje.msg , mensaje.categoria);
        }

      // eslint-disable-next-line react-hooks/exhaustive-deps

    },[mensaje, autenticado,navigate]) //props.histori es por la redireccion que se usara

    // State para iniciar sesion
    const [usuario, guardarUsuario] = useState({
        // Recordar que debe ser igual al nombre de lo input
        nombre: '',
        email: '',
        password: '',
        confirmar:''
    })
    // extraer de usuario 
    const {nombre,email, password, confirmar} = usuario

    const  onChange = e  => {
        // cada vez que escriba se ejecutara
            guardarUsuario({
                // tomamos una copia de usuario
                // para que lo que este escrito en el otro campo no sse rescriba
                ...usuario,
                [e.target.name] : e.target.value})}

    // Cuando el usuario quiere iniciar session
    const onSubmit = e => {
        e.preventDefault()

        // validar que no haya campos vacios
        if(nombre.trim() === '' ||
            email.trim() === '' || 
            password.trim() === '' || 
            confirmar.trim() === '' ){
            mostrarAlerta('todos los campos son obligatorios ', 'alerta-error');
            return //para que no se ejecute la siguiente linea
        }
        // password de min 6 caracters
        if(password.length < 6){
            mostrarAlerta('El password debe de ser almenos de 6 caracteres ', 'alerta-error');
            return
        }
        // 2 password iguales
        if(password !== confirmar){
            mostrarAlerta('Los passwords no son iguales ', 'alerta-error');
            return
        }

        // Pasarlo al action- esto llamara a la funcion en el authState
        registrarUsuario({
            nombre, 
            email,
            password
        });
    }


  return (
    <div className='form-usuario'>
        {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
        <div className='contenedor-form sombra-dark'>
            <h1>Ontener una cuenta</h1>
            
            <form
                onSubmit={onSubmit}
            >
                 <div className='campo-form'>
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        id='nombre'
                        placeholder='Tu Nombre'
                        value={nombre}
                        onChange={onChange}
                    />
                    
                </div>

                <div className='campo-form'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id='email'
                        placeholder='Tu Email'
                        value={email}
                        onChange={onChange}
                    />
                    
                </div>
               
                <div className='campo-form'>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id='password'
                        placeholder='Tu Password'
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <div className='campo-form'>
                    <label htmlFor="confirmar">Confirmar Password</label>
                    <input 
                        type="password" 
                        name="confirmar" 
                        id='confirmar'
                        placeholder='Repite tu password'
                        value={confirmar}
                        onChange={onChange}
                    />
                </div>
                <div className='campo-form'>
                    <input 
                        type="submit" 
                        className='btn btn-primario btn-block'

                        value="Registrarme"/>
                </div>
            </form>

            <Link  to={'/'} className='enlace-cuenta'>
                Volver a Iniciar Sesión
            </Link>

        </div>
        
    </div>
  )
}

export default NuevaCuenta