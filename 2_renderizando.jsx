/*Para que funciones se recomienda:
*/
//Tenemos un contenedor de HTML: toda la app va estar colgada en un contenedor
<div id="root"></div>

//Ahora tenemos un elemento con JSX: traspilacion es tener HTML+JS y convertirlo a React
const element = <h1>Hola mundo!</h1>

//Así lo mostramos al contenedor con id root: Proceso en l cual React va a renderizar los elementos que el usuario verá
ReactDOM.render(element, document.getElementById('root'));

//En react los elementos son inmutables, no pueden ser cambiados
//Ejemplo:
function tick() {
  const element = (
    <div>
      <h1>Hola Mundo!</h1>
      <h2>La hora es {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
 ReactDOM.render(element, document.getElementById('root'));
}
setInterval(tick, 1000);
//Esta funcion está siendo llamada como un intervalo, cada 1 segundo
//Está mandando a llamar a ReactDOM una y otra vez, esta es la única manera que tenemos para actualizar nuestros componentes

//!Para verlo copia el <div id="root"></div> en HTML la función ejemplo en el JS de https://codepen.io/pen/
