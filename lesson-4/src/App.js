import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  useHistory,
  Redirect,
} from "react-router-dom";
import { useContext } from 'react';

let UserContext = React.createContext();

function App() {
  let userId = localStorage.getItem("userId");
  return (
    <UserContext.Provider value={{ userId: JSON.parse(userId) }}>
      <Router>
        <Switch>
          <Route exact path="/register"  >
            <RegisterPage />
          </Route>
          <Route exact path="/login" >
            <LoginPage />
          </Route>
          <PrivateRoute exact component={HomePageHook} path="/" />
          <PrivateRoute exact component={AddPhotoPage} path="/add-photos" />
        </Switch>
      </Router>
    </UserContext.Provider>
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

LoginPage = withRouter(LoginPage);


function PrivateRoute({ component: Component, path, ...rest }) {
  let userId = localStorage.getItem("userId");
  return <Route {...rest}
    render={(props) => {
      return userId != null && userId != "" ? <Component {...props} /> : <Redirect to={{
        pathname: "/login"
      }} />
    }}>
  </Route>
}

function AddPhotoPage() {
  let userContext = useContext(UserContext);
  let history = useHistory();
  let [input, setInput] = useState({
    image: "",
    description: "",
  })

  const onChangeInput = (nameInput, value) => {
    setInput({
      ...input,
      [nameInput]: value
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    fetch(`https://635d3184cb6cf98e56af2894.mockapi.io/api/v1/users/${userContext.userId}/photos`, {
      method: "POST",
      body: JSON.stringify({
        userId: userContext.userId,
        image: input.image,
        description: input.description
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      if (res.status == 201) {
        setInput({
          image: "",
          description: "",
        })
        history.push("/");
      }
    })
  }

  return <form onSubmit={handleSubmitForm}>
    <div>
      <label>Image</label>
      <input type="text" name="image" onChange={(e) => {
        onChangeInput("image", e.target.value);
      }} />
    </div>
    <div>
      <label>Description</label>
      <textarea type="description" name="description" onChange={(e) => {
        onChangeInput("description", e.target.value);
      }} />
    </div>
    <button>Them photo</button>
  </form>
}

