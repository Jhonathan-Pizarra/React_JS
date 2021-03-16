import {useContext} from "react";
import {useEffect} from "react";

import PokemonContext from "../../context/pokemons";
import PokemonList from "./components/PokemonList";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function Home() {
    const {getPokemons, pokemons, isLoading,  hasError, errorMessage} = useContext(PokemonContext);

    useEffect(() => {
        getPokemons().catch(null); //null para que cargue en el estado del contexto
    }, []);

    if(isLoading){
        return (
            <div>
                <Loading title="Cargando..."/>
            </div>
        );
    }

    return(
        <div>
            {hasError ? <ErrorMessage message={errorMessage}/> : <PokemonList pokemons={pokemons}/>}
        </div>
    );
}

export default Home;