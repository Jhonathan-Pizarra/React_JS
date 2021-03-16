/*Vismo como funcionaban componentes, mandar propiedades de hijo a otro
pero lo normal es que cuando entremos a un sitio web lo normal es navegar entre rutas, cambiar la pantalla.
Esto ayuda para no sobrecargar un archivo-

React Router es una libreria usada para implemntar el routing en las apps

Istalar: 
crear un proyecto nuevo y a continuación:
 npm install -S react-router-dom
 el -S es para que se instale en el package-json

 ¿En dónde colocamos el ruteo?
 creamos una nueva carpeta a nivel de src: routes
 una vez hecho eso creamos un index.js 
 este archivo es donde pondremos todas las rutas de nuestra app

 nos dirigimos a nuestro archivo App.js y lo improtamos, y luego en el return mandamos "Routes" así:
 */
 import logo from './logo.svg';
 import './App.css';
 
 import Routes from "./routes"; /*1) Importamos nuestras rutas*/
 
 function App() {
   return (
     <Routes/>
   );
 }
 
 export default App;

 /* Con esto nuestra pantalla va a cargar la ruta que esté definida en Routes "Aqui es donde definimos qué rutas van en nuestro proyecto y mandamos este componente  al componente App"
 pantallas como Home, Sign in, Login, etc... 
 vamosa a nuestro Routes/index
 */
 import {BrowserRouter as Router} from "react-router-dom"; //Importamos BrouseRouter con el alias de Router

 function Routes() {
     return(
         <Router>
            {/*No tenemos una ruta definida todavía! */}
         </Router>
     );
 }
 
 export default Routes;

 /*Creamos una nueva carpeta en src: views
 y dentro de views, creamos una carpeta: home (mi ruta principal)
 (Hágase lo mismo para rutas login y signin y etc si se tiene en su app)
 luego en esa carpeta voy a crear un index.js

 Una vez creado le procedo a armar el compoente:
 */
 function Home() {
  return(
      <div>
          <h2>Home</h2>
      </div>
  );
}

export default Home;

//Ahora regresamos a routes e importamos ese home que creamos:
//Como este archivo es un compoennte vamosa tener que definirlo dentro de una ruta, entonces también importos "Route";
import {BrowserRouter as Router} from "react-router-dom";
import  Route from "react-router-dom";
import Home from "../views/Home";

function Routes() {
    return(
        <Router>
          {/*Ya tenemos nuestra ruta definida y en una ruta, entonces colocamos: */}
          <Route>
            <Home/> 
          </Route>
        </Router>
    );
}

export default Routes;


//Listo ahi tenemo snuestra primer ruta definida

//Cabe señalar que si se quiere una por defecto(o sea la priemra ruta que quiero que cargue) sería:
import {BrowserRouter as Router} from "react-router-dom";
import  Route from "react-router-dom";
import Home from "../views/Home";

function Routes() {
    return(
      <Router>
        <Route path="/" exact> {/*Exact es un parametro que pasamos en caso de que queremos que si el usuario tipea una ruta que no es no se muestre nada */}
            <Home/> 
          </Route>
        </Router>
    );
}

export default Routes;

//Tarea: Hágase lo mismo pero para un Error 404 no encontrado que tenga como mensaje: 
/*Not Found
The requested URL was not found on this server.

Additionally, a 404 Not Found error was encountered while trying to use an ErrorDocument to handle the request.
*/
//Solución: He seguido los pasos hasta el punto donde iporto el Error404 que he creado sin embargo me topo con un problema...
//Qué hacer cuanto tengo 2 o más componentes por mostrar? ... La solución es un Switch!
//con eso hacemos un control sobre la ruta a la que queremos acceder
//Entonces, quedaría, mi componete Error:
function Error404() {
  return(
      <div>
          <h2>Not Found</h2>
          <h3>The requested URL was not found on this server.</h3>
          <br/>
          <h3>Additionally, a 404 Not Found error was encountered while trying to use an ErrorDocument to handle the request.</h3>

      </div>
  );
}

export default Error404;

//Mientras el Routes:
import {BrowserRouter as Router} from "react-router-dom";
import  {Route} from "react-router-dom";
import {Switch} from "react-router-dom";

import Home from "../views/Home";
import Error404 from "../views/Error404";

function Routes() {
    return(
        <Router>
            <Switch> {/*Aplicamos Swuitch para controlar la ruta a la que se accede, si no es a home, es a Error 404 */}
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route> {/*Nótese que no necesitamos los parámetros path porque la idea es que si el usuario ingresa a una ruta que no existe (calquiera no especificada) le mande este error */}
                    <Error404/>
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;
