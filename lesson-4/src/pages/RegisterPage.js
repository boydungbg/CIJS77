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
      const { match, location, history } = this.props;
      history.replace("/login");
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

export default RegisterPage = withRouter(RegisterPage)