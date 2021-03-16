/*Podemos hacer más compacto el llamado a las APIs mediante los proivers que vimos la sesión anterior
dando chance a acceder a los datos desde donde se necesite 

vamos a user el endpoint de pokemon:  https://pokeapi.co/

luego en nuestro proyecto en src creamos una carptea: api y dentro un archivo index.js

ese archivo tendrá una función generica, con la idea de que vaya y llame al API por mi cada vez que se requiera
por tanto necesitamos pasarle como argumento: url, método="get"(que get sea pro defecto en caso de que no se especifique), body, headers,
*/
async function apiCall({
  url,
  method = "get",
  body,
  headers,

}) {
  try{
      /*Le paso el primer parámetro url, luego los opcionales, que no importa si no están definidos no pasa nada*/
      const response = await fetch(url, {
          method,
          body,
          headers,
      });
      return (response.json()); //retorno la respuesta en formato de json
      
  } catch (err) {
      Promise.reject(err); //Reject tira un error en el lugar donde haga la llamada al API
  }
}

export default apiCall;

//Esta función me va a llamar al API de manera generica, sea GET, PUT, PATCH, POST, O DELETE


//Nos movemos al provider y codificamos:
import {useState} from "react";
import PokemonContext from "./index";
import apiCall from "../../api"; /*1) imporamos nuestra función generica*/

function PokemonProvider({children}) {

    /*3) los pokemosn lso vamos a guardar en un estado de este componente compartido por todos */
    const [pokemons, setPokemons] = useState([]);

    /*2) creamos una función para get */
    const getPokemons = async () => {
      try {
        const pokemonsResult = await apiCall({
            url: "https://pokeapi.co/api/v2/pokemon?limit=100",
        });
          setPokemons(pokemonsResult);
      } catch (err) {
          setPokemons([]); //si hay un error regresalo a mi estado inciial, vacío
      }
    };
    
    return(
        /*4) Mandamos la función como valor*/
        <PokemonContext.Provider value={{getPokemons}}>
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonProvider;

//Por último en el HOME:
import {useContext} from "react";
import {useEffect} from "react";
import PokemonContext from "../../context/pokemons";

function Home() {
    const {getPokemons} = useContext(PokemonContext);

    console.log(getPokemons); //Si ves en consola se está llamando a todos los pokemosn del api

    useEffect(() => {
        getPokemons().catch(null); //null para que cargue en el estado del contexto
    }, []);

    return(
        <div>
            <h2>Home</h2>
        </div>
    );
}

export default Home;


//Ahora vamos no solo a mostrarlo en consola sino en pantalla, por lo que
//1) creo una nueva carpeta en src/viws/Home y le pondré: components
//dentro de esa un archivo: PokemonList.js
function PokemonList() {

  return(
      <div>
          Lista de Pokemons...
      </div>
  );
  
}

export default PokemonList;

//Volvemos a Home en su index, y llamamos ese componente:
import PokemonList from "./components/PokemonList";

function Home() {
    const {getPokemons} = useContext(PokemonContext);

    console.log(getPokemons); 

    useEffect(() => {
        getPokemons().catch(null); 
    }, []);

    return(
        <div>
            <PokemonList/> {/*Retornamos nuestro componente*/}
        </div>
    );
}

export default Home;


//Para poder renderizar el listado necesitamos mandarle un apropiedad:
//PokemonList.js:

function PokemonList({pokemons}) { //la propiedad pokemons
  return(
      <div>
        {/* Si es un arreglo, trae un "valor" y un index 
        {pokemons?.map() ((value, index) =>(  */}
          {pokemons?.map() (({name}, index) =>( /*Le hago destructir dado que name siempre viene! */
             {/* este div tiene infom de cada pokemon! */}
            <div key={index}>
              <p>{name}</p>
            </div>
          ))}
      </div>
  );
  
}

export default PokemonList;

//Pasamos la propiedad:
//Volvemos a Home en su index, y llamamos ese componente:
import PokemonList from "./components/PokemonList";

function Home() {
    const {getPokemons} = useContext(PokemonContext);

    console.log(getPokemons); 

    useEffect(() => {
        getPokemons().catch(null); 
    }, []);

    return(
        <div>
            <PokemonList pokemons={pokemons}/> {/*Regresa el valor que viene del contexto*/}
        </div>
    );
}

export default Home;

//hasta qui estaría, lo siguiente sería hacer lo mismo para un getbyID, y algunas validaciones, véase el proyecto terminado en "programas-apiPokemon"