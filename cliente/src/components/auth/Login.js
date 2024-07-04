import React, {useContext, useState, useEffect} from 'react'
import {Link, useNavigate}  from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'


const Login = ()  => {

    
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    // alerta inicia con null
    const {alerta , mostrarAlerta} = alertaContext;
    
    const authContext = useContext(AuthContext);
    const {mensaje,autenticado, iniciarSesion} = authContext

    const navigate = useNavigate(); // Utilizamos useNavigate para la redirección
    //en caso de que el password o usuario no exista
    
    useEffect(() => {
        if(autenticado){ 
            navigate('/proyectos') //aqui nos movemos a /proyectos;
        }

        if(mensaje) { //si hay contenido de mensaje en el state mostrar
            mostrarAlerta( mensaje.msg , mensaje.categoria);
        }
        // se agrego mostrarAlerta


    },[mensaje, autenticado,navigate , mostrarAlerta]) //props.histori es por la redireccion que se usara


    // State para iniciar sesion
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    })
    // extraer de usuario 
    const {email, password} = usuario

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
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }
        // Pasarlo al action
        iniciarSesion({email, password});
    }


  return (
    <div className='form-usuario'>
        {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
        <div className='contenedor-form sombra-dark'>
            <h1>Iniciar Session</h1>
            
            <form
                onSubmit={onSubmit}
            >
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
                    <input 
                        type="submit" 
                        className='btn btn-primario btn-block'

                        value="Iniciar Session"/>
                </div>
            </form>

            <Link  to={'/nueva-cuenta'} className='enlace-cuenta'>
                Obtener Cuenta    
            </Link>

        </div>
        
    </div>
  )
}

export default Login