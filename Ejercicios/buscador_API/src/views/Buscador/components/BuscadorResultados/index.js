import './styles.css';
import BuscadorResultadosItem from "./BuscarResultadosItem"; {/*No olvides importar el hijo*/}

function BuscadorResultados({resultados, estaBuscando}) {
    return(
        <div className={"general"}>
            {!resultados?.length && estaBuscando && <p style={{color: "#e8e7e7"}}>No existen resultados</p> }

            {resultados?.map((value) =>
                  <BuscadorResultadosItem key={value.id} name={value.name} email={value.email} />
            )}

        </div>
    );

}
export default BuscadorResultados;