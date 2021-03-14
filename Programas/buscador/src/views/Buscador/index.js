//¿Componentes funcionales o de clase, cuál usamos?: Funcionales por ser más cheveres

/*¿Por qué otro index?... recuerda, ¡Piensa en compoenntes! antes de dividir el componente, es recoemdnable escribirlo directamente
* luego ya nos lo podemos llevar a donde queramos! */
/*import {useState} from 'react'; //1) Importamos el useState dado que vamos a hacer un componente Reactivo

//2) Creamos nuestro compoennte funcional
function Buscador() {
//3) Es reactivo por tanto declaramos variable de estado incial par ael input y su método setter
const [buscarTexto, setBuscarTexto] = useState(""); //Incialo aunque sea en vacio, al menos para lso inputs

return(
    <div>
        <div>
            <h1>Buscador personal</h1>
            <label>
                {/!*4) le vamos el valor de la variable que decalremos y un método onChange que toma el valro del imput*!/}
                <input value={buscarTexto} onChange={({target: {value}}) => setBuscarTexto(value)}/>
            </label>
            <button>Buscar</button>
        </div>

    </div>
);

}
export default Buscador;*/
/*5) Ahora, una vez que terminamos de crear nuestro componente necesitamos crear otro .js: Index en donde copiaremos todo este código!
O sea, copiamos lo de arriba ^ y lo... (mira el numero 6 en archivo BuscadoBox*/
//Al final este aarchvo queda:


import {useState} from 'react';
import data from "../../data/users";

import './styles.css'
import BuscadorBox from "./components/BuscadorBox/index";
import BuscadorResultados from "./components/BuscadorResultados"; {/*No olvides importar la hoja de estilos*/}


function Buscador() {
    const [isATop, setIsATop] = useState(false);
    const [userData, setUsersData] = useState(data);
    const [resultados, setResultados] = useState([]);

    const handleBuscarClick = (buscarTexto) => {
        setIsATop(true);

        if(userData?.length){
            const buscarTextoMin = buscarTexto.toLowerCase();
            const dataFiltred = userData.filter((value) => {
                return (
                    value.name.toLowerCase().includes(buscarTextoMin) ||
                    value.email.toLowerCase().includes(buscarTextoMin) ||
                    value.username.toLowerCase().includes(buscarTextoMin) ||
                    value.phone.toLowerCase().includes(buscarTextoMin)
                );
            });

        setResultados(dataFiltred);
        }
        console.log(resultados);
    };


    const handleCerrarClick = () => {
        setIsATop(false);
        setResultados([]);
     };

    return(
        <div className={(`buscador ${isATop ? "buscador-top" : "buscador-center"}`)}> {/*6es) este buscador box recibirá un CSS que afectará a sus hijos también! */}
            <BuscadorBox onBuscar={handleBuscarClick} onCerrar={handleCerrarClick}  estaBuscando={isATop}/>
            <BuscadorResultados resultados={resultados} estaBuscando={isATop}/>
        </div>
    );
}

export default Buscador;