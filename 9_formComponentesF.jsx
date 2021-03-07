//2) Vamos a hacer que este componente funcional sea dinámico, (un hook) o sea que manaje estados:
import {useState} from "react";

/*Login Forma #1: con componentne funcional*/
function App() {
    {/*3) Declaramos las constantes de estado
    //Recuerda que la estructura para declarar una constante de estado dentro de un componente es usando del "destructuring" de un arreglo donde:
    //Me regrelsa el primer valor (email) el valor tal cual, y el setEmail(una función que actualiza el estado) = a useState que me regresa el valor inicial del estado, vacío*/}
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    {/*6) Creamos nuestra función (en este caso flecha) que tendrá la misión de que cuando esté tecleando se setee el valor en el input: */}
    {/*7) Estas funciones reciben un parámetro que se llama evento, por default*/}
    const handleEmailChange = (event) => {
        {/*podemos usar un console.log(event); para ver qué hay en consola mientras escribimos*/}
        {/*podemos usar un console.log(event.target.value); para ver qué valores hay en el input (esos valores vienen dentro de target)mientras escribimos*/}
        {/*Seteamos el valor en el input (mostramos el valor de estado): */}
        setEmail(event.target.value);
    };

    {/*8) Creamos nuestra función para que se setee lo que escribimos en el input para contraseña*/}
    {/*Podemos manejarlo así:
    const handlePasswordChange = (event) => {
        console.log(event.target.value);
        setPassword(event.target.value);
    }

    o así(son lo mismo):
    */}
    const handlePasswordChange = ({target: {value}}) => {
        console.log(value);
        setPassword(value);
    };

    {/*11) Declaramos nuestra función*/}
    {/*Sin el event se actualizaría toda la página, y lo que qeremos es solamente se detenga al submit, no actualice la página por defecto*/}
    const handleFormSubmit = (event) => {
      console.log("Submit");
      alert('Usuario: '+(email)+' '+'Password: '+(password));
      event.preventDefault(); {/*Esta función evita que se actualize la página completa*/}
    };

    {/*13) Opcioanl: Esas funciónes flecha podríamos hacerla como  flecha evolucionad, esto es:
    handleEmailChange = ({target: {value}}) => setEmail(value); //Esto está chidori!
    handlePasswordChange = ({target: {value}}) => setPassword(value);
    */}

    return (
    <div className="App">
        {/* 1) Hacemos el HTML del Form */}
      <form onSubmit={handleFormSubmit}>{/*9) Establecemos el evento onSubmit={} que se va a llamar cuando lo que ocurra dentro de su contenido (cuando un submit sea presionado) se va a llamar*/}
          <h2>Iniciar Sesión</h2>
          {/*4) Ahora vamos a cambiar el valor inical, por tanto debo agregar dentro de los inputs el atributo valur={email o password o sea la constante de estado según corresponda}*/}
          <label>
              Correo
              {/*5) Los valores no están cambiando, no están siendo "reactivos", necesito darle un evento al input: onChange */}
              <input type="email" value={email} onChange={handleEmailChange}/> {/*onChange es el evento de una etiqueda input que se dispara cuando el usuario está escribiendo dentro del input */}
              {/*Es una buena práctica llamar los eventos que voy a manejar con la palabra handleEvento*/}
          </label>
          <label>
              Contraseña
              <input type="password" value={password} onChange={handlePasswordChange}/>
          </label>
          <button type="submit">{/*12) Establecemso el botón de tipo submit*/}
              Enter
          </button>
      </form>
    </div>
  );
}

export default App;
