/*Si quisieramos pasarle información de un nodo A a un nodo Z sería dificil pasarse props a el padre del padre del abuelo del tatarabuelo... 
En lugar de eso usamos los stageManaments, que son basicamete concnetrar la infor en un lugar y unicamente referirnos a ella
esos stageManagments (manejadores de estado) se manejan con algunas librerias, una de ellas es context-API

context-API
Nos ayuda a pasarle la ifnormación a todos los hijos para poder consultarlos desde cualquier comopoente
no es necesario que el componente sea hermano, padre o hijo
es decir:
tengo una app con varios componentes, un componente X tiene información que necestio en otro lugar, por ejemplo un token de autenticación
esa información debe guardarse en algún lugar, "provider"
basicamente es un componente que tenga información y métodos(funciones) que puede ser accedida desde cualquier lado
para eso debe haber una "subscripción"

¿Cuándo utilizar context-api? en proyectos pequeños-medianos
*/
//Vamos a hacer un proyecto: pokemonAPI en donde iremos plasmando los conceptos 
/*1) voy a crear una carpeta: context en donde voy a guardar todos los providers que necesite
entonces creo mi contexto: pokemo y dentro mi index

Este archivo va a contener el compoennte que podrá ser utilizado en cualquiera de los nodos
en cualquier lado de la app (velo como global) entonces yo puedo establecerlo a que inicie desde cualqiier punto, en mi caso desde el App (ancestro comun) */

//Entonces en primera isntancia este contexto de pokemosn es:
import {createContext} from "react";

const PokemonContext = createContext("pokemons");

export default PokemonContext;

//Ahora vamos a crear los providers; creamos un archivo Providers.js dentro del context/pokemos, 
//el provider es quien va a contener información que va ir dentro del App.js, es decir el componente que elgloba a los componentes que queiro que utilizen el contexto
import PokemonContext from "./index";
function PokemonProvider() {

    return(
        <PokemonContext/> {/*Retornamos el contexto!*/}
    );
}

export default PokemonProvider;

//Lo convertimos en un provider:
import PokemonContext from "./index";
function PokemonProvider() {

    return(
        <PokemonContext.Provider>
            
        </PokemonContext.Provider>
    );
}

export default PokemonProvider;
//Le pasamos la propiedad "children" una propiedad que es todo lo que tega la etiqueta en la que esté englobado
//Es decir cuando utilize PokeomonProvider dentro de App.js normalemnte lo ahcemos así:
<PokemonProvider>
  todo lo que le pasemos aqui, se le llama children o contenido hijo!
  lo que viene como hijo son todos los componentes a los que este provider va a englobar

</PokemonProvider>
//Entonces al final este compoennte provider queda:
import PokemonContext from "./index";
function PokemonProvider({children}) {

    return(
        <PokemonContext.Provider>
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonProvider;

//AHora ¿esos valores que tenemos como globales, dónde se van a guardar?
//provider tiene la propiedad "value", puede ser un objeto vacio, métodos que llamen a la API, etc

//Vamos a hacer un ejercicio en tu provider crea una funcion que mande una alerta de "Provider!"

//Solución: En el provider
import PokemonContext from "./index";
function PokemonProvider({children}) {

    return(
        <PokemonContext.Provider value={{showAlert: () => alert("Provider!")}}>
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonProvider;

//En el App.js:
import './App.css';

import Routes from "./routes";
import PokemonProvider from "./context/pokemons/Provider";

function App() {
  return (
      <PokemonProvider>
        <Routes/>    
      </PokemonProvider>
  );
}

export default App;

//¿Cómo accedo dentro de las rutas al valor que acabo de hacer dentro del provider ( a mi función) ?
//Vamos al Home:
import {useContext} from "react"; //importamos!
import {useEffect} from "react";
import PokemonContext from "../../context/pokemons";

function Home() {
    const {showAlert} = useContext(PokemonContext); //declaramos una variable de estado

    console.log(showAlert); //Si ves en consola se está llamando esa función de showAlert que hice en mi compoennte provider

    /*Esta funcion utilizo para que a lo que carge el Home se mande a llamar la función que hice en providers*/
    useEffect(() => {
        showAlert();
    }, []);

    return(
        <div>
            <h2>Home</h2>
        </div>
    );
}

export default Home;

//Entonces, como Rutas está dentro de PokemonProvider, los compoenntes Error, y Home tendrán acceso a este contexto :3 :D 
