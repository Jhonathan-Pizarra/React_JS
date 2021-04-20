import './styles.css'; {/*No olvides importar la hoja de estilos*/}

function BuscadorResultadosItem({name, email}) {
    return (
        <div className="resultados">
            <p>{name}</p>
            <p>{email}</p>
        </div>
    );

}
export default BuscadorResultadosItem;