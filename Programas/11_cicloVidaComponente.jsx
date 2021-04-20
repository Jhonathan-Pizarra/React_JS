/*Voy a mandar un console.log para que veas el orden en el que se renderiza o se monta cada compoennte */
import {useState, Component} from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
    };
    console.log("Constructor"); //El primer componente que se renderiza es el constrcutor
  } //El constructor se lo debe declarar si vamos a declarar variables de estado, de lo contrario el constructor es opcional

  componentDidMount(){ //Cuando un compoennte se monta y se muestra en pantalla se llama este método
    console.log("did Mount");
  } //Este método debemos usarlo para hacer llamadas a la API, llamar a una función, pero nunca actualices el estado dentro de estos métodos!

  //Método 
  componentDidUpdate(){ //Se ejecuta cada vez que se actualiza un estado, como cuando se clickea el botón y cambia el nombre
    console.log("did Update"); 
  }//Este método unicamente se ejecuta cuando actualizamos un compoennte

  shouldComponentUpdate(){ //Re-renderizamos los componentes con neuvos valores que van a aparecr en la pantalla
    return true;
  }//Este método permite que se actualice, en "false" prevenimos re-renderizaciones innecesarios

  getSnapshotBeforeUpdate(prevProvs, prevState){ //Aqui lo que renderizamos va como argumento a la función didUpdate
    console.log('prevProvs, prevState');
  }//Este método trae las propiedades y estdos previos, únicamnete para ver que propiedades había antes de que fuera actualizado


  render(){
    return (
      <div>
        <h3>Hola</h3>
        {/*¿Recuerdas que no se te cambiaba el input en el compoennte de Clase en el Login? bueno, la forma correcta es así: */}
        <input value={this.state.name} onChange={({ target: {value}}) => this.setState({name: value}) }/>
      </div>
      
    );
  }


}