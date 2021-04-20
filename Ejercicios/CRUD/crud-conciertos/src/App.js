import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalTitle, ModalBody, ModalFooter} from "react-bootstrap";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import React, {useEffect, useState} from "react";

function App() {

  const urlFestivales = "http://localhost/API_beta/";
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [data, setData] = useState([]);
  const [festival, setFestival] = useState({
    nombre: "",
    descripcion: ""
  });

  /*Inputs*/
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFestival((prevState) => ({...prevState, [name]: value}));
    console.log(festival);
  };

  /*Modales*/
  const handleModalCrear = () => setModalCrear(!modalCrear);

  const handleModalEditar = () => setModalEditar(!modalEditar);

  const handleModalEliminar = () => setModalEliminar(!modalEliminar);

  /*Peticiones*/
  //Peticion Get
  const peticionGet=async()=>{
    await axios.get(urlFestivales)
        .then(response=>{
          setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
  };

  //Petición Post
  const peticionPost = async () => {
    var f = new FormData();
    f.append("nombre", festival.nombre);
    f.append("descripcion", festival.descripcion);
    f.append("METHOD", "POST");
    await axios.post(urlFestivales, f)
        .then((response) => {
          setData(data.concat(response.data));
          handleModalCrear();
        })
        .catch((error) => {
          console.log(error);
        });
  };

  //Petición Put
  const peticionPut = async () => {
    var f = new FormData();
    f.append("nombre", festival.nombre);
    f.append("descripcion", festival.descripcion);
    f.append("METHOD", "PUT");
    await axios.post( urlFestivales, f, {params: {id: festival.id} })
        .then( (response) => {
          var newData = data;
          newData.map(estefestival=>{
            if(estefestival.id === festival.id){
              estefestival.nombre = festival.nombre;
              estefestival.descripcion = festival.descripcion;
            }
          });
          setData(newData);
          handleModalEditar();
        }).catch(error=>{
          console.log(error);
        })
  };

  //Petición Delete
  const peticionDelete = async () => {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(urlFestivales, f, {params: {id: festival.id}})
        .then((response)=>{
          setData( data.filter(esteFestival => esteFestival.id !== festival.id));
          handleModalEliminar();
        }).catch((error)=>{
          console.log(error);
        })
  };

  const seleccionarFestival = (festival, caso) => {
        setFestival(festival);
        (caso === "Editar") ? handleModalEditar() : handleModalEliminar()
    };

  /*Llamda al API*/
  useEffect(()=>{
        peticionGet();
    },[])


    return (
    <div className="App">

      <Button variant="success" onClick={() => handleModalCrear()}>Nuevo</Button>

      <Table className="table table-striped table-bordered hover">
        <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        {data.map(festivales => {
          return(
              <tr key={festivales.id}>
                <td>{festivales.id}</td>
                <td>{festivales.nombre}</td>
                <td>{festivales.descripcion}</td>
                <td>
                  <Button className="btn btn-warning" onClick={() => seleccionarFestival(festivales, "Editar")}>Editar</Button>
                  <Button className="btn btn-danger"  onClick={() => seleccionarFestival(festivales, "Eliminar")}>Eliminar</Button>
                </td>
              </tr>
          );
        })}
        </tbody>
      </Table>

      <Modal
          show={modalCrear}
          onHide={handleModalCrear}
          backdrop="static"
          keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Festival</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nombre: </label>
            <br/>
            <input type="text" name="nombre" className="form-control" onChange={handleChange}/>
            <br/>
            <label>Descripción: </label>
            <br/>
            <input type="textarea" name="descripcion" className="form-control" onChange={handleChange}/>
            {/* <p><textarea className="form-control" name="descripcion" cols="40" rows="5"></textarea></p> */}
            <br/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleModalCrear()}>Cancelar</Button>
          <Button variant="primary" onClick={() => peticionPost()}>Crear</Button>
        </Modal.Footer>
      </Modal>

      <Modal
          show={modalEditar}
          onHide={handleModalEditar}
          backdrop="static"
          keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Festival</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nombre: </label>
            <br/>
            <input type="text" name="nombre" className="form-control" onChange={handleChange} value={festival && festival.nombre}/>
            <br/>
            <label>Descripción: </label>
            <br/>
            <input type="textarea" name="descripcion" className="form-control" onChange={handleChange} value={festival && festival.descripcion}
            />
            {/* <p><textarea className="form-control" name="descripcion" cols="40" rows="5"></textarea></p> */}
            <br/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleModalEditar()}>Cancelar</Button>
          <Button variant="primary" onClick={() => peticionPut()}>Editar</Button>
        </Modal.Footer>
      </Modal>

      <Modal
          show={modalEliminar}
          onHide={handleModalEliminar}
          backdrop="static"
          keyboard={false}
      >
        <ModalBody>
          ¿Estás seguro de que deseas eliminar {festival && festival.nombre} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Si
          </button>
          <button className="btn btn-secondary" onClick={()=>handleModalEliminar()}>
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
