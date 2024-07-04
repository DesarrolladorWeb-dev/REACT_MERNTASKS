import React from 'react'

import { Route, BrowserRouter as Router , Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';


import ProyectoState from './context/proyectos/proyectoState'
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/rutaPrivada';

// Revisar si tenemos un token - SOLUCIONANDO EL PROBLEMA DE RECARGA Y PERDER LOS DATOS DEL USUARIO
const token = localStorage.getItem('token');
if(token){
  // Aqui envia via header que sirve para validar
  tokenAuth(token)
}

/* Aqui se veran en todas las paginas - fuera de Swicht */
/*cada una de las diferentes paginas  */
/* este componente es un "all auth" que toma el componente proyectos denro de el */

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL)

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
                <Routes> 

                <Route exact path='/' Component={Login}/>
                <Route exact path='/nueva-cuenta' Component={NuevaCuenta}/>
                {/* <RutaPrivada exact path = "/proyectos" Component={Proyectos}/> */}
                <Route exact path = "/proyectos" element={<RutaPrivada><Proyectos/></RutaPrivada>}/>
                
                </Routes>
            
          </Router>
        </AuthState>
        </AlertaState>
      </TareaState>
  </ProyectoState>
  );
}

export default App;
