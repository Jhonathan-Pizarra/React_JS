/*Login Forma #2: con componente de clase*/
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "unmail@mail.com", //mail1@mail.com
          password: "" //12345
        };
    }

     handleEmailChange = ({target: {value}}) => {
        console.log(value);
        this.setState({value});
     };

    handlePasswordChange = ({target: {value}}) =>{
        this.setState({value})
    };

    handleFormSubmit = (event) => {
        console.log("Submit");
        alert('Usuario: '+(this.email)+' '+'Password: '+(this.password));
        event.preventDefault(); {/*Esta función evita que se actualize la página completa*/}
    };

    render() {
        const {email, password} = this.state;

        return (
          <div>
              <form onSubmit={this.handleFormSubmit}>
                  <h2>Iniciar Sesión</h2>
                  <label>
                      Correo
                      <input type="email" value={this.email} onChange={this.handleEmailChange}/>
                  </label>
                  <label>
                      Password
                      <input type="password" value={this.password} onChange={this.handlePasswordChange} />
                  </label>
                  <button type="submit">
                      Enter
                  </button>
              </form>
          </div>
        );
    }
}

