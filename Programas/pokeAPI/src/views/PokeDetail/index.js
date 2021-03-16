import {useParams} from 'react-router-dom';
import {useEffect} from "react";
import {useContext} from "react";

import PokemonContext from "../../context/pokemons";
import PokeStats from "./components/PokeStats";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function PokeDetail() {
    const {id} = useParams();
    const {getPokemonDetail, pokemonDetail, isLoading, hasError, errorMessage} = useContext(PokemonContext);

    useEffect(() => {
        getPokemonDetail(id).catch(null);
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
            {hasError ? <ErrorMessage message={errorMessage}/> : (
                 <>
                    <p> {`Name: ${pokemonDetail?.name}`}</p>
                    <p> {`Peso: ${pokemonDetail?.weight} kg`}</p>
                    <p> {`Altura: ${pokemonDetail?.height} ft`}</p>
                    <div>
                    <h3>Habilidades</h3>
                    <PokeStats stats={pokemonDetail?.stats ?? []}/>
                    </div>
                </>
            )}
        </div>
    );

}

export default PokeDetail;