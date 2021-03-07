/*Nos sirve para mosntrar u ocultar elementos en base a ciertas condiciones
Puedo tener un form:
*/

import {useState} from "react";

const App = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginClick = () => {
   
    };

    return (
    <div className="App">
      <div>
          <h2>Iniciar Sesión</h2>
          <label>
              Correo
              <input type="email" value={email} onChange={({target: {value}}) => setEmail}/> 
          </label>
          <label>
              Contraseña
              <input type="password" value={password} onChange={({target: {value}}) => setPassword}/>
          </label>
          <button onClick={handleLoginClick}>
              Enter
          </button>
      </div>
    </div>
  );
}

/*El componente funcional condicional puedo hacerlo así:
Dentro del return (si el compoennte está cargando y tofavía no quiero mostar lo de más abajo)
*/

import {useState} from 'react';

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //5) declaramos el un principio el estado del logeo
  const [isLogged, setIsLogged] = useState(false);

  //3) Cuando se de click esta funcion se llama
  const handleLoginClick = () => {
    //4) seteamos el nuevo valor, true
    setIslogged(true);
  };

  
  return (
    //1) Creamos nuestro formulario de logeo
  <div className="App">
    <div>
        <h2>Iniciar Sesión</h2>
        <label>
            Correo
            <input type="email" value={email} onChange={({target: {value}}) => setEmail(value)}/> 
        </label>
        <label>
            Contraseña
            <input type="password" value={password} onChange={({target: {value}}) => setPassword(value)}/>
        </label>
        <button onClick={handleLoginClick}> {/*2) establecemos una funcion que se llame al clickear */}
            Enter
        </button>
        {/*6) Si ese valor de logeo es true */}
        {isLogged ? <h2>Ingrso exitoso!</h2> : undefined} {/*el undefined no muestra nada en el DOM del naveagor */}
        
    </div>
  </div>
  );
}