import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  useHistory,
  Redirect,
  useParams,
  useLocation
} from "react-router-dom";

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
    this.setState({
      ...this.state,
      [nameInput]: value,
    })
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    fetch(`https://635d3184cb6cf98e56af2894.mockapi.io/api/v1/users?username=${this.state.username}`, {
      method: "GET"
    }).then((response) => response.json()).then((users) => {
      let userFound = users.find((user) =>
        user.username === this.state.username
      )
      let message = ''
      if (userFound != null) {
        if (this.state.username == userFound.username && userFound.password === this.state.password) {
          localStorage.setItem("userId", JSON.stringify(userFound.id));
          this.props.history.push("/");
        } else {
          message = "Sai username hoac password"
        }
      } else {
        message = "Sai username hoac password"
      }
      this.setState({
        ...this.state,
        password: "",
        errorMessage: message
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return <>
      <h1>Login</h1>
      <form onSubmit={this.handleSubmitForm}>
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
        {this.state.errorMessage != '' ? <div>{this.state.errorMessage}</div> : <></>}
        <div>
          <button >Login</button>
        </div>
      </form>
    </>
  }
}

export default LoginPage = withRouter(LoginPage);
