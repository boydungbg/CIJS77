import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  useHistory,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* <HomePage /> */}
          <HomePageHook />
        </Route>
        <Route exact path="/register"  >
          <RegisterPage />
        </Route>
        <Route exact path="/login" >
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}


export default App;


class HomePage extends React.Component {
  constructor(props) {
    console.log("init component");
    super(props)
    this.state = {
      counter: 0
    }
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.counter % 2 == 0;
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    console.log("render");
    return <>
      <h1>HomePage</h1>
      <div>
        <div>{this.state.counter}</div>
        <button onClick={() => {
          this.setState({
            counter: this.state.counter + 1
          })
        }}>+1</button>
      </div>
      <div>
        <button onClick={() => {
          this.props.history.push("/login");
        }}>go to login page</button>
      </div>
    </>
  }
}

HomePage = withRouter(HomePage);

function HomePageHook() {
  let history = useHistory();
  let [listImage, setListImage] = useState([]);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(10);
  let [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    getListPhotos();
  }, [])

  useEffect(() => {
    getListPhotos();
  }, [page])

  function getListPhotos() {
    fetch(`https://635d3184cb6cf98e56af2894.mockapi.io/api/v1/users/1/photos?page=${page}&limit=${limit}`).then((response) => response.json()).then((res) => {
      setListImage([...res.items]);
      setMaxPage(res.count / limit);
    }).catch((err) => console.log(err))
  }

  return <>
    <h1>HomePage</h1>
    <div>
      {page > 1 ? <button onClick={() => {
        setPage(page - 1)
      }}>Previous Page</button> : <></>}
      <>{page}</>
      {page < maxPage ? <button onClick={() => {
        setPage(page + 1)
      }}>Next page</button> : <></>}
    </div>
    <div>
      <select onChange={(e) => {
        setLimit(e.target.value);
        setPage(1);
      }} defaultValue={limit} >
        <option value={10} >10</option>
        <option value={20} >20</option>
        <option value={50} >50</option>
        <option value={100}>100</option>
      </select>
    </div>
    <div>
      {
        listImage.map((value, index) => <div key={index}>
          <img src={value.image} alt={value.description} />
        </div>)
      }
    </div>
  </>
}

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

RegisterPage = withRouter(RegisterPage)

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
