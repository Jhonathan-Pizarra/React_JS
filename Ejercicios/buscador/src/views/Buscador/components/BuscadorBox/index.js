/* 6) Lo pegamos aqui*/
import {useState} from 'react';
/*Desde ahora los pasos que involucren estilos serán numeados 1es, 2es, 3es, para evitar confucion*/
/*1es) Ahora para aplicar estilos vamos a imporar nuestro css que está en este nivel*/
import "./style.css";

//Notice that este componente funcional tiene otro nombre, por lo tanto el export default es para este compoente
function BuscadorBox({onBuscar, onCerrar, estaBuscando}) {
    const [buscarTexto, setBuscarTexto] = useState(""); //Incialo aunque sea en vacio, al menos para lso inputs

    const handleCerrarClick = () => {
        setBuscarTexto("");
        onCerrar();
    };

    return(
        <div className="buscador-box">{/*2es) Le agregamos un classname que tenga un nombre acorde al componente*/}
            {/*2es consideraciones: todo elemento debe tener una etiqueta html, y cuidado con confundir class con className, en react no se usa class sino className*/}
                <h1 className="buscador-box-title">Buscador personal</h1>
                <div className="buscador-box-button">
                    <label>
                        {/*3es) Al input también le vamos a dar estilo entonces le agregamos un className*/}
                        <input
                            className="buscador-box-input"
                            value={buscarTexto}
                            onChange={({target: {value}}) => setBuscarTexto(value)}/>
                    </label> {/*4es) Listo entonces vamos a modificar un css, vamos a components/styles y busca el punto styles, 5es)! */}
                    <button onClick={() => onBuscar(buscarTexto)} disabled={!buscarTexto.length}>Buscar</button>
                    {estaBuscando && <button onClick={handleCerrarClick} disabled={!buscarTexto.length}>Cerrar</button>}
                </div>
        </div>
    );

}

export default BuscadorBox;
//Entonces este componete será exportado para ser imporado en el index de nivel components, y luego ese será importado en el App.js