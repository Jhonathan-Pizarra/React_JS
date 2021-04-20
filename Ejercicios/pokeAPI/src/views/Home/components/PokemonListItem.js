import {Link} from "react-router-dom";
function PokemonListItem({name, url}) {

    const getId = () => url.split("/")[6]; //Agarra el id está en la posición 6

    return(
        <>
            <p>{name}</p>
            <button>
                <Link to={`/pokemon/${getId()}`}>
                    Ver detalle
                </Link>
            </button>
        </>
    );

}

export default PokemonListItem;