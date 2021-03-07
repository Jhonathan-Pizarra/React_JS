/*Al contrario de lo que pienes esto tiene que ver con el ciclo de vida de los compoentnes funcionales
en el archivo anterior repasamos el ciclo de vida de un compoennte de clase, pero en los componentes funcionales
no existe el didUpdate, ni el constructor, ni los demás
entonces cómo vemos el ciclo de vida? con useEddect

useEffect es una función (un hook como setState) que me permite cachar esos métdos de ciclo de vida
pero este es genérico, es decir que unicamente va a cambiar cuando nosotros se lo indiquemos
"practicamente simulamos los métodos de ciclo de vida"
podemos simular principalmente dos: 
*/

//useEffect(() => {}, [siCambiaEstoEntra])
//Es una función tal cual, que recibe como argumento 2 cosas: callback, y un arreglo de valores

//calback: el código que se va ejecutar una vez que cambie lo que le mandamos en el segundo argumento
//arreglo de valores: aqui le decimos, que si cambia a,b,y c entonces entra al callback

/*
useEffect siempre la vamos a trabajar con comonentes funcionales, y que necesitemos actualizar algo si es que algun valor 
dentro del compoente cambia o una de sus propiedades cambia
*/

/*
callback es una función que siempre debemos declararla aqui adentro, 
[n cantidad de valores, es un arreglo]
*/

/*El component didMount en un componente funcional sería:
useEffect(() => {}, []) mandamos un arreglo vació, y este callback se va a llamar cuando este componente se monte!

El componente componenteDidUpdate en u ncomponente funcional sería:
useEffect(() => {}) a veces será necesario cuando cambiamos algun valor, no pasando el segundo argumento este callback se va a llamar en cada re-renderizado (actualización de mi componente)

el cmponente WillUnmount en compontent funcional sería:
useEffect(() => {return () => {/* * /}}), lo que hace es que cuando se va desmontar este componente, se ejecuta, 
Dentro del callback mandamos un return, y dentro va a ejecutarse si y solo si el componente se va a desmontar


este último sirve para evitar problemas de performance, siempre se tienen si no se desmontan, y nos causan bajo rendimiento
*/

/* A continuación vamos a tranformar el componente de clase del anterior archivo a componente funcional */
import {useState} from 'react';

const App = () => {
    const [name, setName] = useState("");
    return (
      <div>
        <h3>Hola</h3>
        <input value={name} onChange={({ target: {value}}) => setName(value) }/>
      </div>
      
    );
}
//Básicament:
/*
* Borramos el constructor
* borramos el me´todo render
* (si tenemos variables de estado, las declaramos así: const []= useState())
* y cambiamos class App extends Component por const App = () =>
*/

/* ======================================================================== */
//Vamos a probar useEffect:
import { useState, useEffect } from "react"; //importamos useEffect

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  //Declaramos las funcione:
  //Componente didiUpdate
  useEffect(() => {
    console.log("didUpdate effect");
  }); //Este método se llama en cada que cambie o se renderize mi compoennte (un botón, un imput, algo que me provoque un re-renderizado)

  //Componente didMount
  useEffect(() => {
    console.log("didMount effect");
  }, []); //Este método se llama cuando el componente se monte, 

  useEffect(() => {
    console.log("name ha cambiado!");
    //console.log("name o edad ha cambiado!");
  }, [name]); //Ahora le hemos puesto un valor dentro del compoente, se llama justo cuando se ejecuta didUpdate
  //Es decir, si el nomnbre cambia, se ejecuta este método, ahora digamos que tengo también edad. Mientras yo no le pase así [name, age], pasa que
  // puedo estar cambia y cambia  la edad pero este método no se ejecutará, ya que solo se llamaa lo que cambie el nombre.
  //si alguno de los dos cambia, el useEffect funcionará!

  //Componente didMount
  useEffect(() => {
    return () => {
      console.log("didUnMount effect");
    }
  }, []); //Este método se llama cuando el componente se desmonte, aqui irá los clean iterval,s timers, etc cosas que debamos remover

  return (
    <div>
      <h3>Hola</h3>
      <input value={name} onChange={({ target: {value}}) => setName(value) }/>
      <br/>
      <br/>
      <input value={age} onChange={({ target: {value}}) => setAge(value) }/>

    </div>
    
  );
}