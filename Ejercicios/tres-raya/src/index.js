import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//1) Juego: Consta de 3 componentes: Square, Board y Game
//2) Este es el primer compoennte Square renderiza un simple <button>
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

//3)  Luego creamos Board que renderiza 9 cuadrados:
class Board extends React.Component {

    renderSquare(i) {
        return ( //agregamos paréntesis para que JavaScript no inserte un punto y coma después del return y rompa nuestro código.
            <Square //Dividimos el elemento retornado en múltiples líneas por legibilidad
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row"> {/*Una fila, que contendrá 3 columnas: */}
                    {this.renderSquare(0)} {/*Cada columna renderiza un cuadrado*/}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

//4) Finalmente creamos el compoennte Game
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        //Detente si alguien ya ganó
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //Con este cambio, “X”s y “O”s pueden tomar turnos. ¡Inténtalo!
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Ir a el movimiento #'+ move :
                'Ir al inicio';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner){
            status = 'Ganador: ' + winner;
        }else{
            status = 'Siguiente Jugador: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    /> {/*Mandamos a traer el tablero*/}
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(

    <React.StrictMode>
  {/*Llamamos a cada componente:
    <App />,
    <Square/>,
    <Board/>,  o simplemente al component Game, ya que el renderiza al componente Board que renderiza al componente Square*/}
    <Game/>,

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

/*5) Paso de datos entre compoenntes a través de props
En el componente Board, en el método:
    renderSquare(i) {
        return <Square />;
    }
Vamos a hacer el siguiente cambio:
    renderSquare(i){
        return<Square value={i] />
    }

Ahora cambia el método render del componente Square para mosntrar ese valor
Es decir cambia de esto:
return (
    <button className="square">
         //Some code
    </button>
);
A esto:
    return (
      <button className="square">
        {this.props.value}
      </button>
    );

¡Felicidades! Acabas de “pasar una prop” de un componente padre Board a un componente hijo Square.
Pasando props es cómo la información fluye en apps de React, de padres a hijos
 */

/* 6) Hacer un componente interactivo
¿Cómo es un componente interacivo? Cuando hay interacción con el usuario, y eso es basicamente acciones, en este caso
digamos que el usuario da clic en alguno de los recuadros, nuestra intención es que aparezca una "x"
Vamso al componente Square y cambiamos de esto:

      return (
           <button className="square">
               {this.props.value}
           </button>
         );
A esto:
    return (
      <button className="square" onClick={function() { alert('click'); }}>
        {this.props.value}
      </button>
    );
Aunque mejor, vamos a usar la sintaxis de funciones flecha para manejar eventos
Entonces pon:
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
con onClick={() => alert('click')}, estamos pasando una función como valor del prop onClick. React solo llamará a esta función después de un click. Olvidar () => y escribir onClick={alert('click')} es un error común, y ejecutaría la alerta cada vez que el componente se re-renderice.
 */

/* 7) Estados
Como un siguiente paso, queremos que el componente Square “recuerde” que fue clickeado, y se rellene con una marca de “X”. Para “recordar” cosas, los componentes usan estado.
Los componentes de React pueden tener estado estableciendo this.state en sus constructores.
this.state debe ser considerado como privado para un componente de React en el que es definido.

Entonces para almacenar el valor actual de un cuadrado en this.state, y cambiarlo cuando el cuadrado es clickeado. Primero, vamos a agregar el constructor a la clase para inicializar el estado:
Es decir, cambiamos de esto:
class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => alert('click')}>
                {this.props.value}
            </button>
        );
    }
}
A esto:
class Square extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

   render() {
       return (
           <button className="square" onClick={() => alert('click')}>
               {this.props.value}
           </button>
       );
   }
}

Ahora vamos a cambiar el método render de Square para mostrar el valor del estado actual cuando es clickeado:
¿Qué neceistamos?
 * Reemplaza this.props.value por this.state.value dentro de la etiqueta <button>.
 * Reemplaza el manejador de evento onClick={...} por onClick={() => this.setState({value: 'X'})}
 * Pon los props className y onClick en líneas separadas para mejor legibilidad.
Es decir debe quedar de esto (En el componente Square):
     return (
           <button className="square" onClick={() => alert('click')}>
               {this.props.value}
           </button>
         );

A esto:
return (
    <button
        className="square"
        onClick={() => this.setState({value: 'X})}
     >
        {this.state.value}
    </button>
    );


Llamando a this.setState desde el manejador onClick en el método render de Square,
decimos a React que re-renderice el cuadrado siempre que su <button> es clickeado.
Luego de la actualización, el this.state.value del cuadrado será 'X',
así que veremos X en el tablero de juego.
Si tu haces click en cualquier cuadrado, una X debería mostrarse en el mismo.

Cuando llamas setState en un componente, React actualiza automáticamente los componentes hijos dentro del mismo también.

 */

/*8) Analizando con lógica de React
Hasta este punto ya tenemos que cada vez que clcikeamos un cuadrado aparece una X, nos falta que aparezca una O y que el juego, termine cuando se formen 3 X o 3 O consecutivas.
Actualmente, cada componente Square mantiene el estado del juego.

Lo que yo digo:
    Bueno hasta aqui valdría de alguna manera hacer varios ifs en el componente Square e ir comparando que se cumplan los 3 consecutivos

Lo que dice React:
    Si, esto es posible pero no recomandable Jhonathan, el mejor enfoque es almacenar el estado del juego en el componente padre Board en vez de cada componente Square
    El componente Board puede decirle a cada cuadrado que mostrar pasándole un prop, tal y como hicimos en el paso 5

"Lo que necesitamos es recopilar datos de múltiples hijos o tener dos compoennte hijos comunicados entre si"
Por tanto, necesitas declarar el estado compartido en su componente padre.
El componente padre puede pasar el estado hacia los hijos usando props; esto mantiene los componentes hijos sincronizados entre ellos y con su componente padre.

Elevar el estado al componente padre es común cuando componentes de React son refactorizados
 */

/*9) Hacer un arreglo
Añade un constructor al Board y establece el estado inicial de Board para contener un arreglo con 9 valores null.
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null), { //Este médo es usado por React para crear un arreglo autorellenado con valores nulo. Estos 9 nulls corresponden a los 9 cuadrados:

        };
    }

 Al principio, pasamos el prop value desde el Board para mostrar los números de 0 a 8 en cada cuadrado.
 En un paso previo, reemplazamos los números con una marca “X” determinado por el estado del propio Square(De que si se le hace clicl entonces se pinta la X).
 Esto es porque el cuadrado actualmente ignora el prop value pasado por el Board.

Ahora usaremos el prop pasando el mecanismo otra vez. Modificaremos el Board para instruir cada Square con ('X', 'O', ó null)
 tenemos definido el arreglo squares en el constructor del Board, y modificaremos el método renderSquare para que lo lea desde allí.
 O sea cambiamos esto:
    renderSquare(i) {
        return <Square value={i} />;
    }

 por esto:
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
 */

/* 10) Funcion como promp (desde el padra al hijo)
Pasar una función desde el padre al hijo hace que el hijo llame a esa funcion cuando (en este caso) un cuadrado sea clickeado

necesitamos cambiar lo que sucede cuando un cuadrado es clickeado (O sea que en el primer click diga 'X' y el segundo click diga 'O'
Sabemos que El componenteard ahora mantiene qué cuadrados están rellenos. Entonces Necesitamos crear una forma para que el cuadrado actualice el estado del componente Board
Entonces cambiamos:
  renderSquare(i) {
        return <Square value={this.state.squares[i]} />;
    }
Por:
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
Ahora estamos pasando dos props desde Board a Square: value y onClick. El prop onClick es una función que Square puede llamar cuando sea clickeado

El estado es considerado privado al componente que lo define. por eso no podemos actualizar el estado de Board directamente desde Square.
 */

/* 11) Escuchador de evento
Haremos los siguientes cambios a Square:

* Reemplazar this.state.value por this.props.value en el método render de Square
* Reemplazar this.setState() por this.props.onClick() en el método render de Square
* Eliminar el constructor de Square porque el componente ya no hace seguimiento del estado del juego
Es decir de esto:
    class Square extends React.Component {
        constructor(props) { //Recuerda agregamos un constructor para darle un estado inicial
            super(props); // Todas las clases de componentes de React que tienen un constructor deben empezar con una llamada a super(props).
            this.state = {
                value: null,
            };
        }

        render() {
            return (
                <button
                    className="square"
                    onClick={() => this.setState({value: 'X'})}
                >
                    {this.state.value}
                </button>
            );
        }
    }

A esto:
class Square extends React.Component {

    render() {

        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}

Entonces qué sucede?
Cuando un cuadrado es clickeado, la función onClick (provista por el componente Board) es llamada.
El prop onClick en el componente <button> le dice a React para establecer un escuchador del evento click.
Cuando el botón es clickeado, React llamará al manejador de evento onClick que está definido en el método render() de Square.
Este manejador de evento llama a this.props.onClick(). El prop onClick del componente Square fue especificado por el componente Board.

Debido a que el Board pasó onClick={() => this.handleClick(i)} a Square, el componente Square llama a this.handleClick(i) cuando es clickeado.
No tenemos definido el método handleClick() aun, así que nuestro código falla. Si haces click ahora verás una pantalla roja de error que dice algo como “this.handleClick is not a function”

en la clase Board debemos agragar esto (Como normal es agragarlos bajo e constructor) :
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

Luego de estos cambios, podemos nuevamente clickear en los cuadrados para rellenarlos de la misma forma que lo hicimos antes. Sin embargo, ahora el estado está almacenado en el componente Board en lugar de cada componente Square
Debido a que el componente Square ahora no mantiene estado, los componentes Square reciben valores del componente Board e informan al mismo cuando son clickeados.
En términos de React, los componentes Square ahora son componentes controlados. El componente Board tiene control completo sobre ellos.

Nota cómo en handleClick, llamamos .slice() (En JS esto sirve para cortar una matriz) para crear una copia del array de squares para modificarlo en vez de modificar el array existente.

 */

/*12) Inmutabilidad
¿Por qué es importante la inmutabilidad?
Hay generalmente dos enfoques para cambiar datos.
El primer enfoque es mutar los datos directamente cambiando sus valores.
El segundo enfoque es reemplazar los datos con una nueva copia que tiene los cambios deseados.
Ver teoría: datosMutacion_vs Cambios

//Beneficios
*La inmutabilidad hace que funcionalidades complejas sean mucho más fácil de implementar.
"Viajar en el tiempo" una habilidad de deshacer y rehacer ciertas acciones es un requerimiento común en aplicaciones. Evitar la mutación de datos directamente nos permite mantener intacto versiones previas del historial del juego, y reusarlas luego.


*Detectar cambios
Detectar cambios en objetos mutables es difícil porque son modificados directamente. Esta detección requiere que los objetos mutables sean comparados a la copia previa del mismo y que el árbol entero del objeto sea recorrido.
Detectar cambios en objetos inmutables es considerablemente más sencillo. Si el objeto inmutable que está siendo referenciado es diferente del anterior, significa que el objeto ha cambiado.


*Determinar cuando re-renderizar en React
El beneficio principal de la inmutabilidad es que te ayuda a construir componentes puros en React. Con datos inmutables se puede determinar fácilmente si se han realizado cambios, lo que ayuda también a determinar cuando un componente requiere ser re-renderizado.
 */

/* 13) Componentes de función
Ahora cambiaremos el componente Square a ser un componente de función.

En React, componentes de función son una forma más simple de escribir componentes que solo contienen un método render y no tiene estado propio.
En lugar de definir una clase que extiende React.Component, podemos escribir una función que toma props como parámetros y retorna lo que se debe renderizar
Reemplaza la clase Square por esta función:
O sea de esto:
class Square extends React.Component {

    render() {
         return (
           <button
               className="square"
               onClick={() => this.props.onClick()}
           >
               {this.props.value}
           </button>
         );
    }
}

A esto:

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

Hemos cambiado this.props a props en ambas veces que aparece.
Cuando modificamos el componente Square a ser un componente de función,
también cambiamos onClick={() => this.props.onClick()} a una más corta onClick={props.onClick} (notar la falta de paréntesis en ambos lados).
 */

/*
En React, es una convención usar los nombres on[Evento] para props que representan eventos y handle[Event] para los métodos que manejan los eventos.
 */

/* 14) Tomando turnos

Estableceremos el primer movimiento a ser una “X” por defecto.
Podemos establecer el valor por defecto modificando el estado inicial en nuestro constructor del componente Board:
es decir, cambiamos de esto (Del componente Board):

  constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

A esto:
  constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true,
        };
  }


Cada vez que el jugador haga un movimiento, xIsNext (un booleano) será invertido para determinar qué jugador sigue y el estado del juego será guardado.
Osea true: es tuerno de X, false es turno de O, entonces nos falta cambiar de esto (en el componente Bpard):

    handleClick(i){
        const  squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
    }

 A esto:

   handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }


También vamos a cambiar el texto de “status” en el render del Board para que muestre qué jugador tiene el siguiente turno:
de esto:
    const status = 'Siguiente Jugador: X';
A esto:
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

 */

/* 15) Declarando un ganador
Ahora que mostramos de qué jugador es el siguiente turno, debemos también mostrar cuando alguien ganó el juego y si no hay más movimientos que hacer.
Esta funcion nos ayuda a verficar cuando hay un ganador, pégala bajo el método render de DOM:
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

Llamaremos a calculateWinner(squares) en el método render del componente Board para revisar si un jugador ha ganado.
Si un jugador ha ganado, podemos mostrar un texto como: “Winner: X” o “Winner: O”.
Reemplazaremos la declaración del status en el método render de Board con este código
Es decir cambiamso de esto:
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

A esto:
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


Aún así pasa que cuando ya tenemos un ganado todavía podemos seguir jugando
Podemos cambiar la función handleClick del componente Board para retornar rápidamente ignorando un click si alguien ha ganado el juego o si un cuadrado está ya rellenado:
Cambiando de esto:
    handleClick(i){
        const  squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //Con este cambio, “X”s y “O”s pueden tomar turnos. ¡Inténtalo!
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

A esto:
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
 */

/* 16) Viajando en el tiempo (Almacenar un historial de movimients)

Como ejercicio final, vamos a hacer posible “retroceder en el tiempo” al movimiento previo en el juego.
Si mutamos el array de squares, implementar viaje en el tiempo sería muy difícil.

Sin embargo, usamos slice() para crear una copia nueva del array de squares después de cada movimiento, y lo tratamos como inmutable.
Esto nos permite almacenar cada versión previa del array de squares, y navegar entre los turnos que ya han pasado.

Almacenaremos los pasados arrays de squares en otro array llamado history. El array history representa todos los estados del tablero, desde el primer movimiento hasta el último
Será más o menos así:
history = [
  // Antes del primer movimiento
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // Luego del primer movimiento
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // Luego del segundo movimiento
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]

Ahora nos queda decidir que componente será el dueño de este history
¿Por qué Game sería el componente ideal?
Básicamente porque queremos que este sea el que tenga una historial...
No el Board, peor aún los Squaeres

Tal como “elevamos el estado” del componente Square al componente Board, ahora elevaremos del Board al componente Game.
Esto dará al componente Game completo control sobre los datos de Board
Primero, vamos a establecer el estado inicial para el componente Game en su constructor:

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

Ahora haremos que el componente Board reciba los props squares y onClick del componente Game
Justo ahora, tenemos un solo manejador de click en Board para muchos Squares, necesitamos pasar la ubicación de cada Square en el manejador onClick para indicar qué cuadrado fue clickeado.
Entonces se debe:
* Eliminar el constructor en Board.
* Reemplazar this.state.squares[i] por this.props.squares[i] en el método renderSquare del componente Board.
* Reemplazar this.handleClick(i) por this.props.onClick(i) en el método renderSquare del componente Board.
Osea que quede de esto:
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i){
        const  squares = this.state.squares.slice();
        //Detente si alguien ya ganó
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //Con este cambio, “X”s y “O”s pueden tomar turnos. ¡Inténtalo!
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return ( //agregamos paréntesis para que JavaScript no inserte un punto y coma después del return y rompa nuestro código.
            <Square //Dividimos el elemento retornado en múltiples líneas por legibilidad
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {

        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Ganador!: ' + winner;
        } else {
            status = 'Siguiente jugador: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

A esto:
class Board extends React.Component {

    handleClick(i){
        const  squares = this.state.squares.slice();
        //Detente si alguien ya ganó
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //Con este cambio, “X”s y “O”s pueden tomar turnos. ¡Inténtalo!
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return ( //agregamos paréntesis para que JavaScript no inserte un punto y coma después del return y rompa nuestro código.
            <Square //Dividimos el elemento retornado en múltiples líneas por legibilidad
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Ganador!: ' + winner;
        } else {
            status = 'Siguiente jugador: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

Actualizaremos el método render del componente Game
para usar la entrada más reciente del historial
y de esa manera determinar y mostrar el estado del juego:
O sea cambiamos de esto:
render(){

    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div></div>
                <ol></ol>
            </div>
        </div>
    );
}

A esto:
 render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol></ol>
        </div>
    </div>
    );
}

Dado que el componente ahora está renderizando el estado del juego, podemos eliminar el código correspondiente del método render del Board
es decir cambiar el render del Board de esto:
render() {

    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
        status = 'Ganador!: ' + winner;
    } else {
        status = 'Siguiente jugador: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        </div>
    );
}
A esto:
render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
Por último, necesitamos mover el método handleClick del componente Board al componente Game.
Y modificarlo porque el estado del componente GAME está estructurado difernte
En el método handleClick de Game concatenamos la nueva entrada del hisotiral
Entonces:
  handleClick(i){
        const  squares = this.state.squares.slice();
        //Detente si alguien ya ganó
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //Con este cambio, “X”s y “O”s pueden tomar turnos. ¡Inténtalo!
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    (Oirginalmente estana en el compoennte Board)
 Ahora en el compoente GAME:
  handleClick(i){
        const history = this.state.history;
        const squares = current.squares.slice();
        const current = history[history.length - 1];
        //Detente si alguien ya ganó
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //Con este cambio, “X”s y “O”s pueden tomar turnos. ¡Inténtalo!
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }

A diferencia del método push() de los arrays que debes estar más familiarizado, el método concat() no muta el array original, por eso lo preferimos.
En este punto, el componente Board solo necesita los métodos renderSquare y render. El estado del juego y el método handleClick deberían estar en el componente Game.

 */

/* 17) Monstrando los movimiento santeriores (Mapeear el historial)
Desde que grabamos el historial del juego tic-tac-toe, ahora podemos mostrarlo al jugador como una lista de movimientos anteriores.
Para renderizar múltiples elementos en React, podemos usar un array de elementos de React.
En JavaScript, los arrays tienen un método map() que es comúnmente usado para mapear datos a otros datos

Usando el método map, podemos mapear nuestro historial de movimientos a elementos de React representando botones en la pantalla, y mostrando una lista de botones para “saltar” a movimientos anteriores.
esto se debe hacer en en el método render del componente Game:
Antes:
render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner){
        status = 'Ganador: ' + winner;
    }else{
        status = 'Siguiente Jugador: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{}</ol>
            </div>
        </div>
    );
 }

 Ahora:
render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Ir a el movimiento #'+ move :
                'Ir al inicio';
            return (
                <li>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner){
            status = 'Ganador: ' + winner;
        }else{
            status = 'Siguiente Jugador: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
               </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
            </div>
        );
    }

Por cada movimiento en el historial del juego de tic-tac-toe, creamos un elemento de lista <li> que contiene un botón <button>
El botón tiene un manejador onClick que invoca a un método llamado this.jumpTo(). (No hemos implementado el método jumpTo() aun)

Por ahora, debemos ver una lista de los movimientos que han ocurrido en el juego
y una advertencia en la consola de las herramientas de desarrollador que dice:

Atención: Cada hijo de un array o iterador debe tener una prop única “key”. Revisa el método render de “Game”.


 */

/* 18) Escogiendo una Key
Cuando renderizamos una lista, React almacena información acerca de cada elemento de la lista renderizado.
Cuando actualizamos una lista, React necesita determinar que ha cambiado.
Podríamos haber añadido, eliminado, reacomodado, o actualizado los elementos de la lista.

Imagina cambiar de:
Alexa: 7 tareas izuqieda
Ben: 5 tareas izquierda
a:
Ben: 9 tareas derecha
Claudia: 8 tareas izuquierda
Alexa: 5 tareas izquierda

Un humano sin problema diría: Se intercambiaron el orden y se añadió uno nuebo
Sin embargo, React es un programa de computadora y no sabe lo que intentamos
necesitamos especificar una propiedad key para cada elemento de la lista para diferenciar cada uno de sus hermanos.

Una opción sería usar los strings alexa, ben, claudia
O si estuvieramos monstrado datos de en una base de datos, los ids de Alexa, Ben y Clauda
esto en React sería:
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>

Cuando una lista es re-renderizada, React toma cada key del elemento de la lista y busca el elemento de la lista anterior que coincida el key. Si la lista actual tiene un key que no existía antes, React crea un componente
Si a la lista actual le falta un key que existía en la lista anterior, React destruye el componente previo
Si dos keys coinciden, el componente correspondiente es movido
Si el key de un componente cambia, el componente será destruido y re-creado con un nuevo estado.

Los keys le dicen a React acerca de la identidad de cada componente lo cual permite a React mantener su estado entre re-renderizados.

React automáticamente usa key para decidir qué componentes actualizar. Un componente no puede averiguar sobre su key.

Se recomienda fuertemente que uses keys apropiado cuando construyas listas dinámicas.

Si el key no está especificado, React presentará una advertencia y usará el índice del array como índice por defecto.
Usando el índice del array como un key es problemático cuando intentas reordenar los elementos de una lista ó insertar/eliminar elementos de la lista.
En concluión, úsalo, te beneficiará
 */

/* 19) Implemnetar viaje en el tiempo
En el historial del juego de tic-tac-toe, cada movimiento anterior tiene un ID único asociado; es el número secuencial del movimiento.
Los movimientos nunca son reordenados, eliminados, o cambiados de lugar,
así que es seguro usar los índices del movimiento como un key.

 En el método render del componente Game, podemos agregar el key:
 antes:
            return (
                <li>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );

 ahora:
 return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );

Ahora agregaremos stepNumber al estado del componente Game para indicar qué paso estamos viendo actualmente.
Antes:
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }
Ahora:
constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };


Pero igual tendrás error porque el método jump() no está definido
entones...definámoslo xD
Esto sería en el compoente Ganme, bajo el método handleClick(i)
o sea añade esto:
jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

El estado stepNumber que hemos añadido ahora refleja el movimiento mostrado al usuario
Después de hacer un nuevo movimiento, necesitamos actualizar stepNumber añadiendo stepNumber: history.length como parte del argumento de this.setState.
Esto asegura que no nos estanquemos mostrando el mismo movimiento después de uno nuevo realizado.
También necesitamos reemplazar
this.state.history por this.state.history.slice(0, this.state.stepNumber + 1). Esto asegura que si “volvemos en el tiempo” y luego hacemos un nuevo movimiento desde ese punto,
tiramos toda la historia “futura” que ahora sería incorrecta.
En resumen, cambiamos de esto:
    handleClick(i){
        const history = this.state.history;
        const squares = current.squares.slice();
        const current = history[history.length - 1];
        //Detente si alguien ya ganó
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //Con este cambio, “X”s y “O”s pueden tomar turnos. ¡Inténtalo!
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }

A esto:
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }


Finalmente, modificamos el render de modo que en lugar de siempre renderizar el último movimiento, se renderize el movimiento seleccionado actualmente de acuerdo a stepNumber
estoe es:
render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
//El resto sigue igual

por esto:
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
//El resto sige igal
 */

/* 20) Resultado
Si clickeamos en cualquier paso de la historia del juego, el tablero tic-tac-toe debería actualizarse inmediatamente para mostrar el tablero como se veía luego de que el paso ocurrió.

¡Felicitaciones! Has creado un juego de tic-tac-toe que:

* Te permite jugar tic-tac-toe,
* Indica cuando un jugador ha ganado el juego,
* Almacena el historial del juego como va progresando,
* Permite a los jugadores revisar el historial del juego y ver versiones anteriores del tablero de juego.

¡Buen trabajo! Esperamos que ahora te sientas que tienes un entendimiento decente sobre cómo funciona React.

Si tienes un tiempo extra o quieres practicar tus nuevas habilidades de React, aquí algunas ideas de mejoras que puedes hacer al juego de tic-tac-toe, las cuales están listadas en orden de dificultad creciente:

21) Muestra la ubicación para cada movimiento en el formato (columna, fila) en la lista del historial de movimientos.
22) Convierte en negrita el elemento actualmente seleccionado en la lista de movimientos.
23) Reescribe el Board para usar 2 ciclos para hacer los cuadrados en vez de escribirlos a mano.
24) Agrega un botón de switch que te permita ordenar los movimientos en orden ascendente o descendente.
25) Cuando alguien gana, resalta los 3 cuadrados que hicieron que gane.
26) Cuando nadie gana, muestra un mensaje acerca de que el resultado es un empate.

A lo largo de este tutorial, hemos abordado conceptos de React incluyendo elementos, componentes, props, y estado.
Para una explicación más detallada de cada uno de estos temas, revisa

 */


/* Referencias...
¡Felicidades! Ahora tienes un juego tic-tac-toe funcionando. Y también acabas de aprender lo básico de React. Así que eres probablemente el real ganador aquí!

 No olvides siempre es bueno revisar la documentación oficial pro si algunas dudaas
 https://es.reactjs.org/docs/hello-world.html
 */
