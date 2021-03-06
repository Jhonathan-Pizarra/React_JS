/*Los compoentnes permiten separar la interfaz de usuario en piezas independientes
reutilizables y pensar en cada pieza de forma aislada
*/

const { func } = require("prop-types");

/* En React hay 2 cosas que se conocen como componentes:
1) Las funciones (O componentes funcionales), son piezas que pueden conjugar una pieza o UI
2) las clases componente
*/

//Componente funcional
function HolaMundo(props) { //Por default recibe propiedades, suponiendo que este componente va a ser descendiente de un componente padre
  return <h1>Hola, {props.name}</h1> //Al final únicamente regresamos algo, tal como las funciones de toda la vida
  //Uno de estos puede regresar un nodo o nada (en tal caso el componente crashea)
}

//Compoente funcional (usando función flecha) es exactamente lo mismo
const HolaMundo = ({name}) => <h1>Hola, {props.name}</h1>

//Función flecha escrito de otra forma (Si tuvieramos más cosas que renderizar)
const HolaMundo = ({name}) => (
  <div>
    <h1>Hola, {props.name}</h1>
  </div>
);

//Toman el nombre de "Hook" si pueden manejar su propio estado.

/* ======================================================================== */
//Componetes clases
//El nombre puede ser cualquierda, Welcome, Bye, Gato, GatoGordo, lo que sea pero descriptivo
class Welcome extends React.Component { //React.Componente es un gestor de paquetes que estamso importando
  //Aqui irá todo lo que compone un componente, el más imporante es render(). 
  render(){ //Es un método que es propio de una clase (o componente clase) y siempre tiene que regresar algo
    return <h1>Hola, {this.props.name}}</h1> //Nosotros accedemos a propiedades a traves de "this" para hacer referencia a todo el componente "Welcome"
  }
}


/* ======================================================================== */

/*Dado que React se bada en padres-hijos, hijos y más hijos
tendrémos un componente padre, ese es un contendor que tendrá los compoentnes, así

<div>
  <HolaMundo/>
  <Welcome/> 
</div>

De esa manera estaríamos mostrando nuestros componentes, como si fueran bloques en la pantalla

O también:

ReactDOM.render(
  HolaMundo,
  document.getElementById('root')
);

Nunca dupliques componentes, o sea nunca hagas 2 componentes con el mismo nombre.

*/


//Piensa en componentes!
function MainComponent() {
  return (
    <div> {/*Siempre debe haber un padre (div) que englobe a todo*/}
      <div>
        <img src="" alt=""/>
        <p>Nombre</p>
      </div>
      <div>
        <p>Username</p>
      </div>
      <div>
        <h2>Form</h2>
      </div>
      <p>Errores</p>
      <footer>
        <p>Un footer</p>
        <div>Referencias</div>
      </footer>
    </div>
  );
}

//Como podemos usar HTML dentro de nuestro render, tenemos un componente MainComponente y un formulario en él
//Pero debemos romper ese componente en subcomponentes para que pueda ser reusado en diferentes archivos, entoncs:
//Es decir toooda esa funció ahora quedó dividia en 3 partes
function MainComponent() {
  return(
    <div>
      <Avatar/>
      <Form/>
      <Errors/> 
      <Footer/>
    </div>
  );
}

//Siendo los componentes en su forma dividida:
function Avatar() {
  return (
    <div>
      <img src="" alt=""/>
      <p>Nombre</p>
    </div>
  );
}

function Form() {
  return (
    <div>
      <div>
        <p>Username</p>
      </div>
      <div>
        <h2>Form</h2>
      </div>
    </div>
  );
}

function Errors() {
  return (
    <div>
        <p>Errores</p>
    </div>
  );
}

function Footer(params) {
  return (
    <div>
    <footer>
            <p>Un footer</p>
            <div>Referencias</div>
          </footer>
    </div>
  );
}

//Es mucho más legible descomponer en componentes, pensando en componentes!