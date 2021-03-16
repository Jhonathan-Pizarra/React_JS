/*La información que obteníamos hasta ahora venía de un archivo 
sin embargo yo necesito que esa información venga de una API o una base de datos
dato que un backend puede llamar al API y mandarnos la información 

La información puede venir de 2 maneras
-De forma estática donde los datos no se modifican, 
-De forma dinámoica, donde los usuarios vienen de una base de datos que esté cambiando constantemente porque los usuarios están interactiando con el fornt-end

Vamos a ver este segundo caso, y conocemos a FETCH
FETCH es una utileria propia del objeto window, viene con el ambiente de JS, no tenemos que agregar peso extra a la APP
es una interfaz que nos permite a traves de su método fetch() realizar peticiones a la API (POST, GET, PUT, PATCH, DELETE...) para alimentar de información mi fornt-end. 
fetch() es el estándar incluido en los navegadores

Ejemplo: (Digamos que voy a llamar a un endpoint que tiene un JSON)
*/
fetch('http://example.com/movies.json') //fetch es una funcion que hay que llamar y no importar, porque viene dentro del objeto window (Url donde están los datos)
  .then(response => response.json()) //esto regresa una promesa, una respuesta que necesitamos convertir a JSON con response.json() que me regrea sa su vez otra promesa
  .then(data => console.log(data)); //esta promesa la cahchamos como data que va a estar convertida en .json y asi podemos guardar en una variable de estado! :D


//Fetch puede aceptar más parámetros:
// Ejemplo implementando el metodo POST:
async function postData(url = '', data = {}) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });


  //Este último tal ves no parezca muy clarom entonces lo podemos reescribir:
const requestOptions = {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: JSON.stringify(data) // body data type must match "Content-Type" header
};
fetch('url', requestOptions)
.then(response => response.json()) 
.then(data => setPostId(data.id)); 

//O si no quieres promesas:
const requestOptions = {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: JSON.stringify(data) // body data type must match "Content-Type" header
};
const response = await fetch("url", requestOptions);
const data = await response.json();




  //Vamos a ahcerlo para nuestro buscador
  //Misión: convertir buscador de estático a dinámico 
//Vamos a buscador_API/vistas/Buscador/index
//y copiamos bajo de las variables de estado:

/*Usando fetch...*/
useEffect(() => {
  const getUsers = async () => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
        .then(data => {
              console.log(data)
          })
  };
},[]);


//esto queda:
import {useEffect} from 'react';
import {useState} from 'react';
//import data from "../../data/users";
import './styles.css'
import BuscadorBox from "./components/BuscadorBox/index";
import BuscadorResultados from "./components/BuscadorResultados"; {/*No olvides importar la hoja de estilos*/}

function Buscador() {
    const [isATop, setIsATop] = useState(false);
    //const [userData, setUsersData] = useState(data);
    const [resultados, setResultados] = useState([]);

    const [data, setData] = useState([]); {/*Guaramos en una variable local*/}

    /*Usando fetch...*/
    useEffect(() => {
        const getUsers = async () => {
          fetch("https://jsonplaceholder.typicode.com/users")
          .then(response => response.json())
              .then(data => {
                    setData(data);
                });
        };
        getUsers().catch(null);
    },[]);

    const handleBuscarClick = (buscarTexto) => {
        setIsATop(true);

        if(data?.length){
            const buscarTextoMin = buscarTexto.toLowerCase();
            const dataFiltred = data.filter((value) => {
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

//Y podemos convertir de promesas a async y await:
useEffect(() => {
  const getUsers = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();

      setData(data);
  };
  getUsers().catch(null);
},[]);

//Siempre es recomendable usar un try-catch
useEffect(() => {
  const getUsers = async () => {
      try{
          const response = await fetch("https://jsonplaceholder.typicode.com/users");
          const data = await response.json();
          setData(data);
      }catch (err) {
          console.error(err);
      }
  };
  getUsers().catch(null);
},[]);