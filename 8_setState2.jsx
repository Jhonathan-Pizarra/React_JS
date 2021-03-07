/*Ahora vamos a enfocarnos en los setState en lso componentes funcionaels (o hooks)
Analiemos el siguiente código:
*/
import {useState} from "react"; //useState es una función conocida como hook, porque me permite manejar el estado de un componente, es decir hacer reactivo un componente (que cambie)

function App() {
  const [name, setName] = useState(""); //Esta función useState nos va a regresar un arreglo, por eso usamos la técnica de ECMA para hacer array-destructing (o sea por eso declaramos así las variable) 
                                        //recibe un argumento que puede o no ser mandado
                                        //En la posición 0 me va a regresar el valor actual del estado
                                        //Este valor lo podemos usar únicamente dentro de este componente
                                        //Luego tenemos al [, setName] es una función que setea el valor actual a la variable 
  const [age] = useState(); //No es necesario el segundo argumento (la función), si unicament queremos el valor y no setearlo entonces es así
  const [, setSomething] = useState("Hey!"); //Esta en cambio hace lo contrario, espera que alguien cambie el valor de "Hey!" a otro, quién sea


  const handleHeyClick = () =>{
    setName("Jhonathan!");

  };

  return (
      <div className="App">
          <h2>Hola Mundo!</h2>
          <p>{age}</p>
          <button onClick={handleHeyClick}>Hey</button>
      </div>
  );
}
