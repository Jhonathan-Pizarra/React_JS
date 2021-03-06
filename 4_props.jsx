/* En pocas palabras: valores que se puedne enviar desde un componente padre a un componente hijo
Las props (propeidades) son aquellos valores que podemos pasar cuando ponemos un componente (padre) dentro de otro (hijo)
Ten en cuenta que 
- Las props siempre son lanzadas desde un padre hacia un hijo
- Estas propiedades pueden cambiar, cuando cambian en el padre, cambian en el hijo
*/

//Vamos a ver estos 2 casos: 
function HolaMundo(props) { //Un compoente funcional tradicional que recibe un argumento. Todos los compoenntes funcionales reciben props como argumento
  return <h1>Hola, {props.name}</h1>; //O props.lastName
}

function HolaMundo({name}) { //estamso colocando el valor de name directamente 
  return <h1>Hola, {name}</h1>;
}
//Ambos son exactamente lo mismo, excepto que el el segundo pasa directamente una propiedad name o sea una propiedad de un objeto
//Esta segunda función me renderizaría lo que yo le envíe como parámetro:
//HolaMundo({name: "Jhoanthan"});

//Pero como tenemos JSX, lo podemos usar en forma de compoennte:
<div>
  <HolaMundo name="Jhonathan" lastName="Pizarra"/>
  <HolaMundo name="Dayana"/>
</div>
//Como usamos como componentes, las "props" se convierten en "atributos", los atributos son eviados como propiedades!
//Las propiedades siempre son pasadas de un padre a un hijo


/*
Pops
-Son solo de lectura: si quiere cambiar un valor debe cambiar en el padre y poner en lugar de "Jhonathan" a "Xavier", etc...
-Van de padre a hijo
-Puedes enviar cualquier tipo de dato como propiedad: nullo, arreglo de objetos, int, etc.
*/

//Otra manera de pasar propiedades (otra manera de pasar los atributos, es pasarlos a través de un objeto):
const props = {
  name: "Jhonathan Pizarra",
  lastName: "Pizarra xD"
};

<HolaMundo {...props}/>

//Es exactamente lo mismo que hacer:
//<HolaMundo name="Jhonathan" lastName="Pizarra"/>

//Se recomienda hacer "destructiring" (o sea la segunda forma) cuando tengamos muchos atributos
//Ejercicio: Saluda a 3 personas (Ver props de JSFIDLE): https://jsfiddle.net/

/* ======================================================================== */
//Componentes clases: es exactamete similiar a un componente funcional.
//Lo que lo diferencia es que no podemos mandar props dentro de render, para accederlo es con "this"
class Saludo extends React.Component {
  render(){
    return <h1>Hola, {this.props.name}</h1>;
  };
}

//Es exactamanete lo mismo que hacer 
function Saludo(props) {
  return <h2>Hola, {props.name}</h2>;
}

//Ojo, con el ";" es importante al final de cada instrucción!