import logo from './logo.svg';
import { useState } from "react";
import './App.css';
import axios from "axios";

const API_PRODUCTS = "https://635d3184cb6cf98e56af2894.mockapi.io/api/v1/products";
function App() {
  let [input, setInput] = useState();
  let [products, setProducts] = useState([]);
  let timeOutId = null;


  const handleSearchInput = (e) => {
    if (timeOutId != null) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      axios.get(`${API_PRODUCTS}`, {
        params: {
          name: e.target.value,
          createdAtMax: "",
          createdAtMin: ""
        }
      }).then((res) => {
        setProducts([...res.data]);
      }).catch();
    }, 500);
  }
  return (
    <>
      <div className="App">
        <input type="text" name="search-product" placeholder="Search product" onChange={handleSearchInput} />
      </div>
      <div>
        <ul>
          {products.map(({ name, id }, index) => {
            return <li><a href={`/products/${id}`}>{name}</a></li>
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
