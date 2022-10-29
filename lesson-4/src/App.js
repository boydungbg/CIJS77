import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <RegisterPage />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}


export default App;

class RegisterPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: "",
      username: "",
      password: "",
      passwordConfirm: "",
      errorMessage: {
        fullname: "",
        username: "",
        password: "",
        passwordConfirmM: "",
      }
    }
  }

  onChangeInput = (nameInput, value) => {
    const errorMessage = {
      ...this.state.errorMessage,
    }
    if (nameInput == "passwordConfirm" && this.state.password != value) {
      errorMessage['passwordConfirmM'] = "Password ko giong nhau";
    } else {
      errorMessage['passwordConfirmM'] = "";
    }
    this.setState({
      ...this.state,
      [nameInput]: value,
      errorMessage: errorMessage,
    })
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { errorMessage, fullname, password, username } = this.state
    if (Object.values(errorMessage).filter((value) => value != "").length > 0) {
      return;
    }
    fetch("https://635d3184cb6cf98e56af2894.mockapi.io/api/v1/users", {
      method: "POST",
      body: JSON.stringify({
        user: {
          name: fullname,
          username: username,
          password: password,
        }
      })
    });
  }

  render() {
    const { errorMessage } = this.state
    return <>
      <h1>Register</h1>
      <form onSubmit={this.handleSubmitForm}>
        <div>
          <label>Fullname</label>
          <input type="text" name="fullname" onChange={(e) => {
            this.onChangeInput("fullname", e.target.value);
          }} />
        </div>
        <div>
          <label>Username</label>
          <input type="text" name="username" onChange={(e) => {
            this.onChangeInput("username", e.target.value);
          }} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={(e) => {
            this.onChangeInput("password", e.target.value);
          }} />
        </div>
        <div>
          <label>Password confirm</label>
          <input type="password" name='passwordConfirm' onChange={(e) => {
            this.onChangeInput("passwordConfirm", e.target.value);
          }} />
          {errorMessage.passwordConfirmM != "" ? <div>{errorMessage.passwordConfirmM}</div> : <></>}
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  }
}