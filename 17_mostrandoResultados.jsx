/*Listo! ya tenemos los datos que queremos que se vean, ahora debemos mostrarlos */
/*En este punto crearemos la carpeta BuscarResultados en la caerptea views/componentes/
dentro de él haremos un archivo index.js y creamos un componente funcional BuscarResultados
*/
function BuscadorResultados() {
  return(
      <div>
          
      </div>
  );

}
export default BuscadorResultados;

//Mientras en el padre lo vamos a establecer como uno de eus hijos
function Buscador() {
  //Code...

  return(
      <div className={(`buscador ${isATop ? "buscador-top" : "buscador-center"}`)}> 
          <BuscadorBox onBuscar={handleBuscarClick} onCerrar={handleCerrarClick}/>
          {/*1) <BuscadorResultados/> *Aqui estaríamos añadiendo un nuevo hijo*/}
          <BuscadorResultados resultados={resultados}/> {/* Tenemos que mostrar lo que filtramos, entonces le pasamos como parámetro eso */}
      </div>
  );
}

//Al yo pasarle como parametro lo que filtré em veo en la necesidad de ir a este hijo y hacerle recibir el parámetro
//Volvemos al hijo 2:
function BuscadorResultados({resultados}) {
  return(
      <div>
          {/*{resultados?.map()} /* Renderizamos esos resultados .map() porque es un arreglo. Todo esto me regresa un componente por tanto es un callbak*/}
          {/* {resultados?.map((value) => Aqui solo hay un true or false, pero necesitamos el return para que me muestre un valor nuevo personalizado*
            return (
              <div> 

              </div>
            );
          })*/} 

          {resultados?.map((value) => {
            return (
              <div key={value.id}>{/*Necesitamos un key porque nuestro JSON tiene su id único para distingui los elementos que vengan */}
                  <p>{value.name}</p>{/* Mostramos el valor */}             
                  <p>{value.email}</p>
              </div>
            );
          })}
      </div>
  );

}

//Y por último le vamos a dar estilos, crearé un estilo y se lo aplicaré a este compoennte
//Listo!

//Listo ahora vamos a hacer unos arreglitos por ejemplo cuando se escribe un nombre que no existe en la data, podemos manejarlo así:
//Volvemos al hijo:
{/*2) hacemos otra propiedad "estáBuscando"para que no se muestre el (1) cuando aún se esté en la pantalla de buscar */}
function BuscadorResultados({resultados, estaBuscando}) {
  return(
      <div>
        {/*1) Entonces vamos a establecer esa condición (renderizado condicional) de que  */}
        {!resultados?.length && <p style={{color: "#e8e7e7"}}>No existen resultados</p>  } {/*Si resultados no es correcto no existe, entonces que me muestre un parrafo "No existen resultados"  */}
        {/*Eso último que ves style={{}} es una alternativa por si no quieres usar un className: pero ten en cuenta que debemos mandarle como objeto y que todos los valroes deben ser strings */}

          {resultados?.map((value) => {
            return (
              <div key={value.id}>
                  <p>{value.name}</p>          
                  <p>{value.email}</p>
              </div>
            );
          })}
      </div>
  );

}

//Entonces volvemso al padre y le tenemos que mandar la nueva propoediedad
function Buscador() {
  //Code...
  return(
      <div className={(`buscador ${isATop ? "buscador-top" : "buscador-center"}`)}> 
          <BuscadorBox onBuscar={handleBuscarClick} onCerrar={handleCerrarClick}/>
          <BuscadorResultados resultados={resultados} estaBuscando={isATop}/> {/*Le mandamos el está buscando como propiedad de que si está arriba muestrese esta propiedad condiciona (1)*/}
      </div>
  );
}


//Desactivando botones
//También deberíamos controlar de que algunos botones se activen en determinadas situaciones, entonces para eso vamos al componente que tiene los botones:
function BuscadorBox({onBuscar, onCerrar}) {
  const [buscarTexto, setBuscarTexto] = useState(""); 
  const handleCerrarClick = () => {
      setBuscarTexto("");
      onCerrar();
  };

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
                  {/*<button onClick={() => onBuscar(buscarTexto)} disabled={}>Buscar</button> {/*1) Le pasamos una propiedad "disabled" que será condicional */}
                  <button onClick={() => onBuscar(buscarTexto)} disabled={!buscarTexto.length}>Buscar</button>{/*la condicion es que si buscarTexto (el input) está vacío este botón está desabilidato */}
                  <button onClick={handleCerrarClick} disabled={!buscarTexto.length}>Cerrar</button>{/*2) hacemos lo mismo para cerrar */}
              </div>
      </div>
  );

}

//Desapareciendo botones
/*En este caso el botón cerrar no debería aparecer en mi pantalla principal, lo voy a esconder, para eso, puedo pasar una propieda nueva o usar la que ya tengo, la que hace que
cuando se de a buscar se vaya para arriba "estáBuscando":*/
function BuscadorBox({onBuscar, onCerrar, estaBuscando}) { {/*1) pasamos la propiedad para renderizado condicional */}
  const [buscarTexto, setBuscarTexto] = useState(""); 
  const handleCerrarClick = () => {
      setBuscarTexto("");
      onCerrar();
  };

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
                  <button onClick={() => onBuscar(buscarTexto)} disabled={!buscarTexto.length}>Buscar</button>
                  {/*2) Hacemos un render condicional; si está buscando, muestralo!*/}
                  {estaBuscando && <button onClick={handleCerrarClick} disabled={!buscarTexto.length}>Cerrar</button>}
              </div>
      </div>
  );

}

//Pero si te fijas en este punto al darle click a buscar y mandar arriba el buscador, no aparece el botón cerrar
//Entonces volvemso al padre y le tenemos que mandar la nueva propoediedad
function Buscador() {
  //Code...
  return(
      <div className={(`buscador ${isATop ? "buscador-top" : "buscador-center"}`)}> 
          <BuscadorBox 
          onBuscar={handleBuscarClick} 
          onCerrar={handleCerrarClick} 
          estaBuscando={isATop} {/*1) Lo ponemos aqui tambie´n*/}
          /> 

          <BuscadorResultados 
          resultados={resultados} 
          estaBuscando={isATop}/> 
      </div>
  );
}
