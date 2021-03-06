/* this.setState, es un elemento propio de "this" y this hace refencia a la clase
this.setState es una función que me permite actulizar el estado inicial de this.state

¿Esto qué significa? significa que se produce un re-renderizado
es decir, lo que está dentro de la función render se vuelve a ejecutar
*/

//Para este ejemplo necesitamos de un botón, harémos un método pero enfócate en entender el this.setState. Para eso, se recomienda ver el resultado primero
class Prender extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      isToggleOn: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  //No le pares bola, mira más abajo!
  handleClick(){
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }


  render(){
    console.log(this.setState); //Si vemos la consola, veremos que este es una función que me permite cambiar el estado de true a false
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'On' : 'Off'}
      </button>
    );
  }
}

ReactDOM.render(
  <Prender/>, 
  document.getElementById('root')
);

/* ======================================================================== */ 
class Prender extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      isToggleOn: true
    };
    
    //Esto no le pares bola
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    //this.setState({}) //Básicamente es una función que recibe como argumento un objeto, el objeto tiene que estar con los "key" que vengan o hayamos inicializado en el this.state del constructor
    //this.setState({isToggleOn: false}); //esta actualización hará que siempre al presionar el botón sea "off"
    this.setState({isToggleOn: !this.state.isToggleOn}); //Esto hará que cambie al valor que está pero lo contrario es decir si está true se cambia a false y así
    //Entonces re-renderiza mi componente! :D
  }

  render(){
    console.log(this.setState); //Si vemos la consola, veremos que este es una función que me permite cambiar el estado de true a false
    return (
      <button onClick={this.handleClick}>{/* Esto no le pares bola*/}
        {this.state.isToggleOn ? 'On' : 'Off'} {/*Aqui vemos que el valor ahora es true o es false*/}
      </button>
    );
  }
}

ReactDOM.render(
  <Prender/>, 
  document.getElementById('root')
);


//¿Qué puedo actualizar dentro del setStare?
//Lo que sea mientras esté dentro del this.state del constructor:

class Prender extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      isToggleOn: true,
      name: "Jhonathan",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
     this.setState({
        isToggleOn: !this.state.isToggleOn,
        name: this.state.isToggleOn ? "Jhonathan" : "Xavier",
      }); 
  }

  render(){
    console.log(this.setState); //Si vemos la consola, veremos que este es una función que me permite cambiar el estado de true a false
    return (
      <div>
        <h2>{this.state.name}</h2>
        <button onClick={this.handleClick}> {/* Esto no le pares bola*/}
          {this.state.isToggleOn ? 'On' : 'Off'} {/*Aqui vemos que el valor ahora es true o es false*/}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Prender/>, 
  document.getElementById('root')
);


/* ======================================================================== */ 
//Ahora vamos a volver a analizar la función del principio
class Prender extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      isToggleOn: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  //Ahora si párale bola:
  handleClick(){
    //El this.setState puede recibir un Callback; este Callback básicamente lo que envía es un argumento: prevState
    this.setState(prevState => ({ //PrevState es el estado actual antes de que cambie o antes de que se ejecute lo que viene aqui abajo:
      isToggleOn: !prevState.isToggleOn
    }));
  }

  //Entonces prevState va a traer el objeto inicial (el que está en el this.state del constructor) O, si ya lo mutó alguien, entonces ese es el estado actual de mi componente
  //Entonces si vieramos un console log sería que: click: On, click: Off y así cada vez que le de clcik

  render(){
    console.log(this.setState); //Si vemos la consola, veremos que este es una función que me permite cambiar el estado de true a false
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'On' : 'Off'}
      </button>
    );
  }
}

ReactDOM.render(
  <Prender/>, 
  document.getElementById('root')
);

//setState puede ser llamado desde cualquier evento, desde cualquier método. Pero algo para tomar en cuenta:
//NUNCA, hagas el setState en el constructor ni en el render() porque lo que va a provocar es un bucle infinito. CUIDADO, tu máquina morirá si lo haces


//Felicidades, ahora iremos aprendiendo a partir de la práctica! ¡Vamos a nuestro repo y vamos a ispeccionar! :D
https://github.com/Jhonathan-Pizarra/React_JS
