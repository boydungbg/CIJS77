import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>HomePage</h1>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
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
        fullnameM: "",
        usernameM: "",
        passwordM: "",
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
    if (nameInput == "username") {
      this.checkUsernameExist(value);
    }
    this.setState({
      ...this.state,
      [nameInput]: value,
      errorMessage: errorMessage,
    })
  }

  checkUsernameExist(valueInput) {
    fetch(`https://635d3184cb6cf98e56af2894.mockapi.io/api/v1/users?username=${valueInput}`, {
      method: "GET"
    }).then((response) => response.json()).then((users) => {
      if (users.filter((user) =>
        user.username == valueInput
      ).length > 0) {
        this.setState({
          ...this.state,
          errorMessage: {
            ...this.state.errorMessage,
            usernameM: "Username da ton tai",
          },
        })
      } else {
        this.setState({
          ...this.state,
          errorMessage: {
            ...this.state.errorMessage,
            usernameM: "",
          },
        })
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  handleSubmitForm = (e) => {
    e.preventDefault();

    const { errorMessage, fullname, password, username } = this.state
    if (Object.values(errorMessage).filter((value) => value != "").length > 0) {
      return;
    }
    fetch("https://635d3184cb6cf98e56af2894.mockapi.io/api/v1/users", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname: fullname,
        username: username,
        password: password,
      })
    }).then(() => {
      // window.location.href = "/login";
      const navigate = useNavigate();
      navigate('/login')
    }).catch((err) => {

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
          {errorMessage.usernameM != "" ? <div>{errorMessage.usernameM}</div> : <></>}
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

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
    }
  }

  onChangeInput = (nameInput, value) => {
    // const errorMessage = {
    //   ...this.state.errorMessage,
    // }
    // if (nameInput == "passwordConfirm" && this.state.password != value) {
    //   errorMessage['passwordConfirmM'] = "Password ko giong nhau";
    // } else {
    //   errorMessage['passwordConfirmM'] = "";
    // }
    // if (nameInput == "username") {
    //   this.checkUsernameExist(value);
    // }
    // this.setState({
    //   ...this.state,
    //   [nameInput]: value,
    //   errorMessage: errorMessage,
    // })
  }

  checkUsernameExist(valueInput) {
    fetch(`https://635d3184cb6cf98e56af2894.mockapi.io/api/v1/users?username=${valueInput}`, {
      method: "GET"
    }).then((response) => response.json()).then((users) => {
      if (users.filter((user) =>
        user.username == valueInput
      ).length > 0) {
        this.setState({
          ...this.state,
          errorMessage: {
            ...this.state.errorMessage,
            usernameM: "Username da ton tai",
          },
        })
      } else {
        this.setState({
          ...this.state,
          errorMessage: {
            ...this.state.errorMessage,
            usernameM: "",
          },
        })
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  handleSubmitForm = (e) => {

  }

  render() {
    const { errorMessage } = this.state
    return <>
      <h1>Login</h1>
      <form onSubmit={this.handleSubmitForm}>
        <div>
          <label>Username</label>
          <input type="text" name="username" onChange={(e) => {
            this.onChangeInput("username", e.target.value);
          }} />
          {errorMessage.usernameM != "" ? <div>{errorMessage.usernameM}</div> : <></>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={(e) => {
            this.onChangeInput("password", e.target.value);
          }} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  }
}
