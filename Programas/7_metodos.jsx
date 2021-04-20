/*Vimos en el archivo 6_this que se incorporaban métodos como el constructor
tmbién tenemos al render, esos métodos son propios de un componente de clase
y se tienen que declara así si o sí, pero ¿Qué pasa si quiero mis propios métodos...?
*/

class MiPrimerInput extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      name: "Jhonathan",
      lastName: "Pizarra",
    }; 

  }

  //Mi propia función: 
  getFullName = () => {
    const {name, lastName} = this.state;   
    return name + " " + lastName;
  };//Estas son conocidas como funciones flecha!

  render() {
    return (
      <div>
        Hola {this.getFullName()} !{/* //Ahora llamaremos a mi función! :3
        //Cuidado! poner solo this.getFullName no hará que tu función sea accedida*/}
      </div>
    );
  }
}

ReactDOM.render(
  <MiPrimerInput/>, 
  document.getElementById('root')
);

//Otra forma de hacerlo es con la función tradicional:
class MiPrimerInput extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      name: "Jhonathan",
      lastName: "Pizarra",
    }; 
  }

  //Mi propia función: 
  getFullName() {
    const {name, lastName} = this.state;   
    return name + " " + lastName;
  };

  render() {
    return (
      <div>
        Hola {this.getFullName()} ! 
      </div>
    );
  }
}


ReactDOM.render(
  <MiPrimerInput/>, 
  document.getElementById('root')
);

/* ======================================================================== */

//O también con La función flecha evolucionada:
class MiPrimerInput extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      name: "Jhonathan",
      lastName: "Pizarra",
    }; 

  }

  //Mi propia función: 
  getFullName = () => this.state.name + " "+ this.state.lastName; //Esto está chidori!   
    
  render() {
    return (
      <div>
        Hola {this.getFullName()} ! //Ahora llamaremos a mi función! :3
        //Cuidado! poner solo this.getFullName no hará que tu función sea accedida
      </div>
    );
  }
}

/* ======================================================================== */

//Ahora vamos a ha hacerlo con componentes funcionales
function MyInput() {
  //En estos componentes declaramos "constantes" de estado pero ralmente tienden a ser modificadas:
  //Una de las diferencias que encontramos es que no tenemos constructor!
  //Luego estas variables son de estado:
  /*
  const [name] = useState();
  const [lastName] = useState();
  */
  //En los componentes de clase inicializabamos un valor de estado en el constructor (this.state), pero en los componentes funcionales:
  const [name] = React.useState("Jhonathan");
  const [lastName] = React.useState("Pizarra");

  return (
    <div>
      Hola! {name + " " + lastName}
    </div>
  );
}

ReactDOM.render(
  <MyInput/>, 
  document.getElementById('root')
);

//Entonces, la diferencia entre un componente funcional con un componente de clase para acceder al estado, es que "name" y "lastname"
//son directamente valores que son accedidos a lo largo de este componente

//Incluso podríamos usar nuestros porpios métodos
// ...  El resto sigue igual....
const [name] = React.useState("Jhonathan");
const [lastName] = React.useState("Pizarra");
const getFullName = () => name + " "+ lastName; //Realmente podríamos haberla escrito en cualquiera de las 3 formas, digamos por ejemplo:
function getAnotherName() {
  return name + " " + lastName;
};
// ...  El resto sigue igual....

//Y para accederlo:

<div>
  Hola! {getFullName()} {/*Ya no refeenciamos con this y podría ser getAnotherName() da lo mismo*/}
</div>
