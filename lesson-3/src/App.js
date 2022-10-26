import React from "react";
import './App.css';

function App() {
  return (
    <div className="App">
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
      <Counter />
    </div>
  );
}

export default App;

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      student: {
        name: "Dung",
        age: 18
      }
    }
    this.clickCounter = this.clickCounter.bind(this)
    console.log("init");
  }

  clickCounter() {
    this.setState({
      ...this.state,
      counter: this.state.counter + 1,
    })
  }
  // componentWillReceiveProps() {
  //   console.log("componentWillReceiveProps");
  // }

  componentWillMount() {
    console.log("will mount");
  }

  componentDidMount() {
    console.log("mounted")
  }

  render() {
    console.log("render");
    return <div><div>Counter: {this.state.counter}</div>
      <div>Counter: {this.state.student.age}</div>
      <button onClick={() => {
        this.setState({
          ...this.state,
          counter: this.state.counter + 1,
        })
      }}>Click me</button>
      <button onClick={() => {
        this.setState({
          ...this.state,
          student: {
            ...this.state.student,
            age: this.state.student.age + 1
          }
        })
      }}>Update student</button></div>
  }
}