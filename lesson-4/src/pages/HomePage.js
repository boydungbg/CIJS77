import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  useHistory,
  Redirect,
  useParams,
  useLocation,
  Link
} from "react-router-dom";

function HomePage() {
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
    <Link to={"/add-photos"}>Add photo</Link>
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
        listImage.map((value, index) => <Link to={`/edit-photos/${value.id}`}>
          <div key={index}>
            <img src={value.image} alt={value.description} width="200" height="200" />
          </div></Link>)
      }
    </div>
  </>
}

export default HomePage;