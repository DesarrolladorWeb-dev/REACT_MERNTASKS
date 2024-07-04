import clienteAxios from "./axios";

const tokenAuth = token =>{


    if(token){
        //en el caso de que exista un token lo vamos a pasar al header
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
        

    }else{
        //si no hay token lo elimina - para que no este en el objeto del cliente axios
        delete clienteAxios.defaults.headers.common['x-auth-token']
        console.log("no se encuentra el token")
    }
}

export default tokenAuth;