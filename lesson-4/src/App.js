import './App.css';
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
import { router } from './configs/router';
import UserContext from './context/UserContext';

function App() {
  let userId = localStorage.getItem("userId");
  return (
    <UserContext.Provider value={{ userId: JSON.parse(userId) }}>
      <Router>
        <Switch>
          {router.map((route) => route)}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}



export default App;


// class HomePage extends React.Component {
//   constructor(props) {
//     console.log("init component");
//     super(props)
//     this.state = {
//       counter: 0
//     }
//   }

//   componentWillMount() {
//     console.log("componentWillMount");
//   }

//   componentDidMount() {
//     console.log("componentDidMount");
//   }

//   componentWillUpdate() {
//     console.log("componentWillUpdate");
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     return nextState.counter % 2 == 0;
//   }

//   componentWillReceiveProps(nextProps) {
//     console.log("componentWillReceiveProps");
//   }

//   componentDidUpdate() {
//     console.log("componentDidUpdate");
//   }

//   componentWillUnmount() {
//     console.log("componentWillUnmount");
//   }

//   render() {
//     console.log("render");
//     return <>
//       <h1>HomePage</h1>
//       <div>
//         <div>{this.state.counter}</div>
//         <button onClick={() => {
//           this.setState({
//             counter: this.state.counter + 1
//           })
//         }}>+1</button>
//       </div>
//       <div>
//         <button onClick={() => {
//           this.props.history.push("/login");
//         }}>go to login page</button>
//       </div>
//     </>
//   }
// }

// HomePage = withRouter(HomePage);