/*
Esto es lo que da la mágia! los estados hacen que React unicamente actualice lo que tiene que actualizar
*/

//Supongamso que tenemos un compoennte de función
function MyComponent() {
  const name = "Jhonathan"; //Esto es JS, es una costante
  return (
    <div>{'Hola ${name}'}</div>
  );
}

//O lo que es lo mismo:
class Saludo extends React.Component {
  render(){
    const name = "Jhonathan"; //Esto es JS, es una costante
    return (
      <div>{'Hola ${name}'}</div>
    );
  };
}

//Qué pasa si en un imput el usuario cambia el valor de esta entrada?... No funcionaría!
//Gracias a que React maneja estados, el componente puede cambiar su estado interno
//¿Cómo hacemos al componente dinámico?

function MyInput() {
  let myValue; //Esto es JS, declarado con let para el alcance de esta funcion

  return( //Esta funcion regresa un imput
    <input type="text" value={myValue}/>
  );
}

//Gracias a React, podemos usar técnicas para un componnte funcionales y no funcionales(de clase)

//El componten funcional importa o manjea "useState", 
//es similar a tener una variable, pero es una función "hook" porque nos está regresando algo y nosotros unicamnete le pasamos un argumento:
import {useState} from 'react';

function MyComponent() {
  const [name, setName] = useState("Jhonathan"); //Aqui la declaramos como constante
                                                //El argumento es el valor inicial que asignamos a la variable que puede ser mutada más adelant

  // useState es una funcion que me regresa 2 cosas, valor(name) y setName
  return( 
      <div>{'Hola ${name}'}</div>
  );
}

//Luego si queremos setear un nuevo valor:
setName("otro nombre");

//Un estado es una variable que tienede a cambiar :D, tener variables y cambiarlas de manera dinámica

/* ======================================================================== */


//El componente de clase (o no funcional) usa un constructor
class Saludo extends React.Component {
  constructor(){
    super();
    this.state = { //tenemos que hacer referencia al estado de este componente con "this"
      name: "Jhonathan" //Cada uno de los keys serán los valores del estado
    };
  }
  render(){
    return (
      <div>{'Hola ${this.state.name}'}</div> //Aqui estaríamos accediendo a "Jhonathan"
    );
  }
}

//O con descontructing!
class Saludo extends React.Component {
  constructor(){
    super();
    this.state = { 
      name: "Jhonathan" ,
      lastName: "Pizarra" //Si tuvieramos más atributos, sería separando con ","
    };
  }
  render(){
    const {name} = this.state; //Con esto ya no es necesario hacer this.state.nombre

    return (
      <div>{'Hola ${name}'}</div> 
    );
  }
}


//¿Como cambiamos?
this.setState({comment: 'Hello'}); //Le pasamos la propiedad y su nuevo valor!
this.setState({comment: 'Hello', name: "Vero"}); //Unicamente va actualizar lo qu ele indiquemos
/*Y esto que es? lo veremos en los sguientes arhcivos...*/