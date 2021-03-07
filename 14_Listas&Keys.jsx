/* 
Crear,renderizar, mostrar componentes en forma de lista, muchas veces vamos a tener información de esta manera
Un arreglo de objetos es casi lo que siempre manda un backend, cuando necesita un listado
un arreglo de objetos es también llamado "listas", tienen el aspecto así:
*/

import {useEffect, useState} from 'react';

//Esta estructura se compone de elementos que vienen como keys dentro de las posicones del arreglo, la idea es mostar estso datos en pantalla!
//JSON es quien une a los backend con los front end
const jsonData = [{
  key: "1",
  name: "Juan",
}, {
  key: "2",
  name: "Jhonathan",
}, {
  key: "3",
  name: "Dayana",
}];


const App = () => {
  return(
    <div>
      Hola!
    </div>
  );
}

/* ======================================================================== */
//¿Cómo puedo mostar la información...? Cliclando o mapeando cada uno de los elementos! :D
import {useState} from 'react';

const jsonData = [{
  key: "1",
  name: "Juan",
}, {
  key: "2",
  name: "Jhonathan",
}, {
  key: "3",
  name: "Dayana",
}];


const App = () => {
  return(
    <div>
      {/*Vamos a usar codigo de JS en nuestro render, para eso uso "{}"" */}
      {/*{jsonData.map(value, index)} /*Map es una funcion, tiene 2 elementos, el valor, y el index, y vendría siendo un callback, que recibe un valor y la pocision el elemento con ese valor*/}  
      {jsonData.map((value, index) => { {/*Decimos que es una callbakc, pues va a regresar algo */}
        //Puede retornar lo que sea, pero a mi me interesa que me regrese "otro componente" para que esto de aqui abajo venga y se acle directamente como hijo del return de arriba, etnonces
        return(
          <div>
            <p>{value.name}</p>{/*Va a contener el valor que yo quiero mostar de los elementos de la lista */}
          </div>
        );

      })}
    </div>
  );
}

//¿Pero cómo distingue JS  si cada uno de los elementos en un futura manejan su propio estado..? con su key! ,
//Si vemos que los hijos serán deinamicos manejamos un "key", es la propiedad de todos los elementos de HTML para darle un valor y que React lo pueda actualizar cuando se necesite

import {useState} from 'react';

const jsonData = [{
  key: "1",
  name: "Juan",
}, {
  key: "2",
  name: "Jhonathan",
}, {
  key: "3",
  name: "Dayana",
}];


const App = () => {
  return(
    <div>
      {jsonData.map((value, index) => {
        return(
          <div key={value.key}> {/*El key que tenemos aqui va a servir para que React identifique ese hijo, cualquiera de los 1000 */}
                                {/*en este caso veo que mi json tiene key como atributo y que es unico, pero si el jsonData tuviera un id entonces sería key={id}*/}
                                {/*Index pondríamos en caso de que queramos referirnos a la pocion en la que se encuentra el elemento dentro del arreglo en este hijo*/}
            <p>{value.name}</p>
          </div>
        );

      })}
    </div>
  );
}

/* ======================================================================== */
//key no es visible en el DOM del usuario, o sea que si abres el inspector y ves una lista no verás su key
//Vamos a modificar un poco más la función a fin de "validar" de que si el arreglo es indefinido, lo ignore
import {useState} from 'react';

const jsonData = [{
  key: "1",
  name: "Juan",
}, {
  key: "2",
  name: "Jhonathan",
}, {
  key: "3",
  name: "Dayana",
}];


const App = () => {
  return (
    <div>
      {/*Vamos a validar el arreglo,y eliminar el index que no es necesario ya que tengo el key*/}
      {jsonData?.map((value) => (
          <div key={value.key}>  
            <p>{value.name}</p>
          </div>
      ))} 
      {/*Dado que esta funcion unicamente regresa algo, podemos teenerla así */}
    </div> 
  );
}

//Una buena práctica es sacarlo dentro del render, ya que únicamente estamos mapeando, y me está regresando un arreglo de compoentes, 
//preo también puedo hacer:
import {useState} from 'react';

const jsonData = [{
  key: "1",
  name: "Juan",
}, {
  key: "2",
  name: "Jhonathan",
}, {
  key: "3",
  name: "Dayana",
}];


const App = () => {
  //Declarar la función renderData() y más abajo llamarla
  const renderData = () => {
    return jsonData?.map((value) => (
      <div key={value.key}>  
        <p>{value.name}</p>
      </div>
    ));
  }; //Esto es una buena práctica de optimización


  return (
    <div>
      {renderData()}
    </div> 
  );
}

/* ======================================================================== */
//Por último vamos renderizarCondicionalmente para practicar:
import {useState} from 'react';

const jsonData = [{
  key: "1",
  name: "Juan",
}, {
  key: "2",
  name: "Jhonathan",
}, {
  key: "3",
  name: "Dayana",
}];


const App = () => {
  const [isloading, setIsLoading] = useState(true); //Creamos una constante de estado con su setter que en una primera instancia será true

  //Componente didiUpdate (Si no te acuerdas velo en el archivo 12.)
  useEffect(() => {
    //hacemos una función para que al pasar un tiempo n, se ejecute lo que se especifique aqui abajO:
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  const renderData = () => {
    /*Si está cargando(Puedo hacerlo aqui o usando operador ternario):
    if(isloading){
      return <h2>Cargando...</h2>
    }*/

    return jsonData?.map((value) => (
      <div key={value.key}>  
        <p>{value.name}</p>
      </div>
    ));
  }; 


  return (
    <div>
      {isloading ? <h2>Cargando...</h2> : renderData()} {/*Aqui estamos usando operador ternario para exactamente lo mismo */}
    </div> 
  );
}

/*Listo, con los conocimientos que tenemos hasta el momento haremos nuestro primer proyecto: Buscador! 
puedes verlo aquí: https://github.com/Jhonathan-Pizarra/React_JS en programas -> buscador  */