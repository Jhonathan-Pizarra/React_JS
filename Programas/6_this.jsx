/*This es sólo para componentes de clase*/

class MiPrimerInput extends React.Component {

  render() {
    return (
      <div>
        Hola!
      </div>
    );
  }
}


ReactDOM.render(
  //Como es un componente de clase debemos llamarlo en RectDOM.render como etiqueta
  <MiPrimerInput/>, 
  document.getElementById('root')
);

/* ======================================================================== */

//Si nosotros hablamos de compoentes, clases y herencia, debemos también tener presentes a "los contructores"
//Cada uno de los componentes tiene que tener un constructor
class MiPrimerInput extends React.Component {
  constructor(props){ //Mandar como parámetro a "props" tanto en el constrcutor como en el super, esto para acceder a los props dentro del constructor
    super(props); //necesario e indispensable para mandar a llamar al contructor de React.Component
    //Este constructor es llamado en una primera instancia cuando el componente se monta

    this.state = {
      name: "Jhonathan",
      lastName: "Pizarra",
    }; //Siempre el estado será un objeto

  }

  render() {
    console.log(this.state); //vemos que valores están llegando y podemos usar. Siempre deben estar dentro de algún método
    return (
      <div>
        Hola {this.state.name + " " + this.state.lastName} ! {/*Para acceder a las constantes, variables, usamos la notación de llames: {} */}
      </div>
    );
  }
}


ReactDOM.render(
  //Como es un componente de clase debemos llamarlo en RectDOM.render como etiqueta
  <MiPrimerInput/>, 
  document.getElementById('root')
);


/* ======================================================================== */
class MiPrimerInput extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      name: "Jhonathan",
      lastName: "Pizarra",
    }; 

  }

  render() {
    //También podemos hacer decosntruing (siempre y cuando todo el mi objeto this.state esté definido)
    const {name, lastName} = this.state;   
    return (
      <div>
        Hola {name + " " + lastName} ! 
      </div>
    );
  }
}


ReactDOM.render(
  <MiPrimerInput/>, 
  document.getElementById('root')
);

//Purébalo en https://jsfiddle.net/

