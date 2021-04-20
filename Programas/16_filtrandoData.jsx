/*Haremos uso de un archivo JSON que se encutra en Programas/buscador/data/src/ data.json 
Lo que haremos será usar los datos de nombre, username, mail, y teléfono para este ejercicio

Vamos al padre:
*/
import { useState } from "react";
import data from "../../data/users"; {/* Importamos el data */}

//data me va a traer la data del JSON, entonces guardamos en una cosntante de estado
const [userData, setUsersData] = useState(data); //Nota que mandamos como valor inicial la data ! 

//Cuando yo busque, lo que necesito es una función que me busque en base a la string que el usuario esté accediendo
//Es decir si yo busque Juan, me busque todas la data que tenga coincidencia o contenga "Jhonathan"


//Entonces dentro del hijo:
import {useState} from 'react';
import "./style.css";

function BuscadorBox({onBuscar, onCerrar}) {
    const [buscarTexto, setBuscarTexto] = useState(""); 

    const handleCerrarClick = () => {
        setBuscarTexto("");
        onCerrar();
    };

    return(
        <div className="buscador-box">
                <h1 className="buscador-box-title">Buscador personal</h1>
                <div className="buscador-box-button">
                    <label>
                        <input
                            className="buscador-box-input"
                            value={buscarTexto}
                            onChange={({target: {value}}) => setBuscarTexto(value)}/>
                    </label> 
                    {/*<button onClick={() => onBuscar()}>Buscar</button> {/* Ya no lo llamamos así: {onBuscar} sino algo más explicito! */}
                    {/*<button onClick={() => onBuscar(buscarTexto)}>Buscar</button> {/* Le pasamos un argumento, para que el componente padre mediante la comunicación de padrea-hijo (a través de una llamada a una función) me mande el texto que el usuario está buscando para hacer la lógica dentro de "Buscar" (El padre) */}
                    {/*<button onClick={() => onBuscar(buscarTexto)}>Buscar</button> {/* La lógica sería: que cuando yo mande a buscar me mande el texto que he pusto en el input (Esta lógica está en el padre) */}
                    <button onClick={() => onBuscar()}>Buscar</button> 
                    <button onClick={handleCerrarClick}>Cerrar</button>
                </div>
        </div>
    );

}

//Volvemos al padre e implementamos la lógica:
import BuscadorBox from "./components/BuscadorBox/index";
import {useState} from 'react';
import data from "../../data/users";
import './styles.css'; 

function Buscador() {
    const [isATop, setIsATop] = useState(false);
    const [userData, setUsersData] = useState(data)

    //4) ya con la data filtrada vamos a declarar una variable para esos resultados
    const [resultados, setResultados] = useState([]); //En principio un arreglo vació

     const handleBuscarCerrarClick = () => {
         setIsATop(!isATop);
     };
     //2) Esta función va a traer un argumento del hijo: buscarTexto (Pueden ser más)
     const handleBuscarClick = (buscarTexto) => {
       //3) Validamos la data
       if(userData?.length){ //Esta validación es necesaria para ver si existe el key, entonces es un arreglo, si iteramos algo que no existe o que es indefinido va a tronar la interfaz
        //El simbolo "?" me hace la valdiación a ver si existe el método .lenght, si existe esto es un arreglo, si tiene logitud entonces que entre
        //4) Iteramos todo el arreglo del user data (esto va a regresarme un nuevo arreglo, el que cumpla con las condiciones que yo le especifique: )
        //userData.filter(value);
        //Pero es un callback! (una función) o sea que me regresaría el valor de cada uno de los items que tiene ese arreglo
        /*userData.filter((value) => {
          return true; //si retorna true eso quiere decir que se regresa un nuevo arreglo
        });*/
        /*Por tanto como regresa un arreglo yo guaro en una varaible, de lo contrario se perdería 
        const dataFiltrada = userData.filter((value) => {
          return true; 
       });*/
       //Pero no quiero que me regrese todos los valores, sólo algunos:
       /*const dataFiltrada = userData.filter((value) => {
        return (
          //Aqui filtramos únicamente la infomación que contega esta condición: el nombre, email, username o phone y solo esos datos se me van a filtrar 
          value.name.includes(buscarTexto) || 
          value.email.includes(buscarTexto) ||
          value.username.includes(buscarTexto) ||
          value.phone.includes(buscarTexto)
          )
       });*/
       //Pero todavía no acaba, proque debemos hacer la validación de que si escriben en minúscula también se filtre
       const buscarTextoMin = buscarTexto.toLowerCase(); //Declaramos esta variable que convierte todo a mins
       const dataFiltrada = userData.filter((value) => {
        return (
          value.name.toLoerCase().includes(buscarTextoMin) || /* Convertimos todo lo que escriba a minuscula y hacemos la comparativa con el texto que también viene en minúscual con la constante que declaramos buscarTextoMin */
          value.email.toLoerCase().includes(buscarTextoMin) ||
          value.username.toLoerCase().includes(buscarTextoMin) ||
          value.phone.toLoerCase().includes(buscarTextoMin) 
          )
       });

     };

    return(
        <div className={(`buscador ${isATop ? "buscador-top" : "buscador-center"}`)}> 
            <BuscadorBox onBuscar={handleBuscarClick} onCerrar={handleBuscarCerrarClick}/> {/* 1) Entonces cambiamos el método que estoy usando, ya no puede ser genérico */}
        </div>
    );
}

//Por último debemos renombrar esa funcion genérica que está solo siendo usada por un botón y nadie mas
//Esto es en el padre:
function Buscador() {
  const [isATop, setIsATop] = useState(false);
  const [userData, setUsersData] = useState(data)
  const [resultados, setResultados] = useState([]); 

  //2) cambiamos el nombre  y además, los resultados se vacian!
   const handleCerrarClick = () => {
       setIsATop(false); /*Poniendo false le decimos que unicamente cierre */
       setResultados([]);
   };

   const handleBuscarClick = (buscarTexto) =>{
    setIsATop(true);
    if(userData?.length){
        const buscarTextoMin = buscarTexto.toLowerCase();
        const dataFiltred = userData.filter((value) =>{
            return (
                value.name.toLowerCase().includes(buscarTexto) ||
                value.email.toLowerCase().includes(buscarTexto) ||
                value.username.toLowerCase().includes(buscarTexto) ||
                value.phone.toLowerCase().includes(buscarTexto)
            );
        });
    }
    console.log(resultados); //3) Mira la consola 
};

  return(
      <div className={(`buscador ${isATop ? "buscador-top" : "buscador-center"}`)}> {
          <BuscadorBox onBuscar={handleBuscarCerrarClick} onCerrar={handleCerrarClick}/> {/*1) Renombramos la función handleBuscarCerrarClick a handleCerrarClick */}
      </div>
  );
}
