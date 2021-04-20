/*En este punto ya mostramos en pantalla los resultados, pero, podemos hacer que nuestro componente sea más dinámico!
dentor de la carpeta BuscarResultado creamos un nuevo archivo BuscarResultadosItem.js que es un componete funcional */

/*Siempre es bueno: primero hacer dentro del componente y luego hacerlo en otro por separado */
//Copiamos de el hijo (BuscarResultados) :
function BuscarResultadosItem({name, email}) { /*1) Propiedades que va a recibir dado que este componente es un hijo */
    return (
        <div className={"resultados"}> {/* 2) El hijo del hijo, o sea este componente no tiene que tener el key, se lo tiene que colocar directamente donde tenemos que llamar a este componente */}
            <p>{name}</p> {/*Ya no es necesario value.name ni value.email */}
            <p>{email}</p>
        </div>
    );
}
//Y este sería ya un compoennte dinámico! que se va y se pinta una y otra vez

//Luego nos movemos al padre de este componente:
//3) import BuscarResultadosItem from "./BuscarResultados";
function BuscadorResultados({resultados}) {
    return(
        <div className={"general"}>
            {!resultados?.length && <p style={{color: "#e8e7e7"}}>No existen resultados</p> }

            {resultados?.map((value) => {
                return (
                  {/*<BuscarResultadosItem/> {/*1) Y en lugar de renderizar todo, le mandamos lo que va a retornar el compoennte que renderiza*/}
                  <BuscarResultadosItem key={value.id}/> {/*2) Le colocamos su respectivo key, sin embargo, necesitamos las propiedades de "name" e "email" */}
                  <BuscarResultadosItem key={value.id} name={value.name} email={value.email}/> 
                );
            })}
        </div>
    );

}

//Como estamso descomponiendo en otro componente ese return anidado no es necesario, por tanto:
function BuscadorResultados({resultados}) {
    return(
        <div className={"general"}>
            
            {!resultados?.length && <p style={{color: "#e8e7e7"}}>No existen resultados</p> }
            {resultados?.map((value) => 
                 
                  {/*<BuscarResultadosItem key={value.id} name={value.name} email={value.email}/> {/*Peor qué pasaría si tuveramos más propiedades no solo name y email, sino 15, 20 prioiedades...? Entonces: */}
                  <BuscarResultadosItem key={value.id} {...value}/> {/*Fácil, hacemos un spret! con eso le pasamos tooodas las 1000 propiedades que vengan en value  */} 
            )}

        </div>
    );

}