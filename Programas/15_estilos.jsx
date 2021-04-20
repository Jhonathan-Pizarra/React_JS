/*En esta ocación digamos que tenemos un archivo .css ya hecho
Para aplciarlo a nuesto componente necesitamos importar el css e nuestro componete js
*/

import "./style.css"; //Suponiendo que la hoja de estilo está al mismo nivel de nuestro js o si no
import "../folder/style.css"; //Suponiendo que está en una carpeta 2 niveles más arriba

//En HTML para dar estilos hacíamos:
<h1 class="Saludo"></h1> //Esto era para que el .css vea que elemento tiene la clase saludo y le aplique estilo
//Sin embargo para componentes de React:
<h1 className="Saludo"></h1>
//En react todo elemento debe tener una etiqueta html, y no se debe con confundir class con className, en react no se usa class sino className

/* Si tenemos un elemento con más atributos, es una buena práctica sepaaralos: 
Al input también le vamos a dar estilo entonces le agregamos un className */

 <input
 className="buscador-box-input"
 value={buscarTexto}
 onChange={({target: {value}}) => setBuscarTexto(value)}/>

 //Listo, después de analizar cuales elementos tendrán estilos debemos crear el CSS
 //Aqui ten en cuenta que se puede aplicar CSS a un elemento o a todo un componente
 //Es frecuente que los estilos del compoennte padre afecten también a los hijos
 //Si miras el archivo programas/buscador/views/Buscador/components verás 2 archivos 
 //el style.css es un estilo padre que se aplica al componente BuscadorBox, (Si ves el index de Buscador (No BuscadorBoX) VERÁS UN className = "buscador", este se está aplicando a el hijo! (BuscadorBox))

 //Cabe señalar entonces, que cada componente puede tener su estilo, pero debemos tener presente que su padre también les puede estar aplciadno estilos
 //Y es mejor que cada componente tenga su estilo

 //Y la pregunta ahora es... Si es mejro que cada componente tenga su estilo, ¿Para qué un estilo del padre a los hijos?
 //Lo que sucede es que a veces se desembocarán eventos que requieren que se cambie todo de manera general a que se modifiquen elemento por elemento
 //"El hijo es el que tiene que mandarle al padre la comunicación y decirle oye, quiero que me pase esto"
 //¿Cómo hacemos eso? Con propiedades! 
 
 //En el caso del buscador por ejemplo,
 //Este es el padre de que tiene como hijo a BuscadorBox
 return(
  <div className="buscador"> {/*6es) este buscador box recibirá un CSS que afectará a sus hijos también! */}
      {/*<BuscadorBox/> /*Le vamso a mandar propiedadses, de las que va a poder hacer uso! */}
      <BuscadorBox onBuscar={handleBuscarClick} onCerrar={handleCerrarClick} /> 
  </div>
);
//Esto que acabmos de hacer es pasar "pops de funciones", y por tanto suceden dos cosas:
//1) En el padre creamos los métodos respectivos
import BuscadorBox from "./components/BuscadorBox/index";
import './styles.css'; {/*No olvides importar la hoja de estilos*/}

function Buscador() {

    const handleBuscarClcik = () => {
        alert("Funciona!");
    };

    const handleCerrarClick = () => {

    };

    return(
        <div className="buscador">
            <BuscadorBox onBuscar={handleBuscarClcik} onCerrar={handleCerrarClick}/>
        </div>
    );
}

export default Buscador;

//2) En el hijo pasamos los props de funcioes:
/* 6) Lo pegamos aqui*/
import {useState} from 'react';
import "./style.css";

function BuscadorBox({onBuscar, onCerrar}) { /*Aqui, irían los "onAccion" que te indiquen*/
/* Si tienes una acción onBuscar en este componente se van a confundir y habrá conflicto, cuidado! */
    const [buscarTexto, setBuscarTexto] = useState(""); 

    return(
        <div className="buscador-box">
                <h1 className="buscador-box-title">Buscador personal</h1>
                <div className="buscador-box-button">
                    <label>
                        <input
                            className="buscador-box-input"
                            value={buscarTexto}
                            onChange={({target: {value}}) => setBuscarTexto(value)}/>
                    </label>
                    <button onClick={onBuscar}>Buscar</button>
                    <button onClick={onCerrar}>Cerrar</button>
                </div>
        </div>
    );

}

export default BuscadorBox;

/* ======================================================================== */
/*Ahora que aprendimso a darle estilos y comunicar hijos con padres, vamso a jugar con los estilos */
/*Estilos condicionales!! */
//Para eso declaramos una variable de estado para "hay que estar así o no hay que estar así" (true or false)

import BuscadorBox from "./components/BuscadorBox/index";
import {useState} from 'react'; {/*No olvides importar*/}
import './styles.css'; 

function Buscador() {
  //1) Variable de estado:
  const [isAtTop, setIsATop] = useState(false);

    const handleBuscarClcik = () => {
      //3) Seteamos el estado para cuando se presione Search
        setIsATop(!isAtTop); //Se haría lo contrario a lo que está !isAtop
    };

    const handleCerrarClick = () => {
      setIsATop(!isATop);
    };

    return(
        <div className={(`buscador ${isATop ? "buscador-top" : "buscador-center"}`)}> {/*2)  Para usar condicionales en estilos, necesitamos tener clases condicionales*/}
        {/*Lo que hicimos es concatenarle una clase para que se muestre un css dependiendo de la clase (Por ende tenemos que crear un estilo en css para cada caso) */}
        {/*Recuerda que ens JS lsa Template Literals"  no requieren comilla simple sino comilla simple inversa(`  `) para evaluar las expresiones*/}
            <BuscadorBox onBuscar={handleBuscarClcik} onCerrar={handleCerrarClick}/>
        </div>
    );
}

export default Buscador;

/*Eventos genéricos*/
//Te fiste cuenta que handleBuscarClcik y handleCerrarClick tienen exactamente lo mismo?
//En estos casos podemos usar una función genérica para tratar a ambos...! :D
import BuscadorBox from "./components/BuscadorBox/index";
import {useState} from 'react'; {/*No olvides importar*/}
import './styles.css'; 

function Buscador() {
  const [isAtTop, setIsATop] = useState(false);

  //Esta función genérica sirve para el vento de buscar o cerrar en el sentido de que se reestiliza el componente!
    const handleBuscarCerrarClick = () => {
        setIsATop(!isAtTop); 
    };

    return(
        <div className={(`buscador ${isATop ? "buscador-top" : "buscador-center"}`)}> {/*2)  Para usar condicionales en estilos, necesitamos tener clases condicionales*/}
            <BuscadorBox onBuscar={handleBuscarCerrarClick} onCerrar={handleBuscarCerrarClick}/> {/*No olvides cambiar el handleClick por tu función generica */}
        </div>
    );
}

export default Buscador;


//Limpiando los imputs
/*Esto requiere que sucedan 2 cosas, una es que al botón donde se le quiera limpiar se le pase una fucnión */
import {useState} from 'react';
import "./style.css";

function BuscadorBox({onBuscar, onCerrar}){
    const [buscarTexto, setBuscarTexto] = useState(""); 

    /*2) Definimos esta funcion */
    const handleCerrarClick = () => {
      setBuscarTexto(""); //seteamos el input a vacío
      onCerrar(); //La mandamos a llmaar a la propiedad (Nota que aqui debemos usar los parentesis porque no está en el return del render)
    }; //Es básicamente, va a cerrarlo y además limpiar el imput

    return(
        <div className="buscador-box">
                <h1 className="buscador-box-title">Buscador personal</h1>
                <div className="buscador-box-button">
                    <label>
                        <input
                            className="buscador-box-input"
                            value={buscarTexto}
                            onChange={({target: {value}}) => setBuscarTexto(value)}/>
                    </label>
                    <button onClick={onBuscar}>Buscar</button>
                    <button onClick={handleCerrarClick}>Cerrar</button> {/*1) Se le pasa una función! ya no una propiedad */}
                </div>
        </div>
    );

}