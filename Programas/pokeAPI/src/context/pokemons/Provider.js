import {useState} from "react";
import PokemonContext from "./index";
import apiCall from "../../api"; /*1) imporamos nuestra función generica*/

function PokemonProvider({children}) {

    /*3) los pokemosn lso vamos a guardar en un estado de este componente compartido por todos */
    const [pokemons, setPokemons] = useState([]);
    const [pokemonDetail, setPokemonDetail] = useState({});
    const [isLoading, setIsloading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);

    /*2) creamos una función para get */
    const getPokemons = async () => {
      try {
          setIsloading(true);
          setErrorMessage("");
          setHasError(false);

        const pokemonsResult = await apiCall({url: "https://pokeapi.co/api/v2/pokemon?limit=100"});
          setPokemons(pokemonsResult.results);
      } catch (err) {
          setPokemons([]); //si hay un error regresalo a mi estado inciial, vacío
          setErrorMessage("Algo ha pasado...");
          setHasError(false);
      }finally {
          setIsloading(false);
      }
    };

    /*x) creamos una función para get por id */
    const getPokemonDetail = async (id) => {
        if (!id){
            Promise.reject("Id es requerido!");
        }
        try{
            setIsloading(true);
            setErrorMessage("");
            setHasError(false);

            const pokemonDetail = await apiCall({url: `https://pokeapi.co/api/v2/pokemon/${id}`});
            setPokemonDetail(pokemonDetail);
        }catch (err) {
            setPokemonDetail([]);
            setErrorMessage("Algo ha pasado...");
            setHasError(false);
        }finally {
            setIsloading(false);
        }
    };

    return(
        /*4) Mandamos la función como valor*/
        <PokemonContext.Provider value={{getPokemons, pokemons, getPokemonDetail, pokemonDetail, isLoading, errorMessage, hasError}}>
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonProvider;