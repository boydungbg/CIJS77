import React, { useEffect, useState, useContext } from 'react';
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
import UserContext from '../context/UserContext';

function DetailPhotoPage() {
  let userContext = useContext(UserContext);
  let params = useParams();
  let location = useLocation();
  let history = useHistory();
  let [input, setInput] = useState({
    image: "",
    description: "",
    createdAt: "",
    id: "",
    userId: ""
  });

  useEffect(() => {
    if (location.pathname.includes("edit-photos")) {
      fetch(`https://635d3184cb6cf98e56af2894.mockapi.io/api/v1/users/1/photos/${params.id}`).then((res) => res.json()).then((photo) => setInput({
        ...photo
      }));
    }
  }, [])

  const onChangeInput = (nameInput, value) => {
    setInput({
      ...input,
      [nameInput]: value
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (location.pathname.includes("edit-photos")) {
      fetch(`https://635d3184cb6cf98e56af2894.mockapi.io/api/v1/users/${userContext.userId}/photos/${input.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...input,
          image: input.image,
          description: input.description,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        if (res.status == 200) {
          history.push("/");
        }
      })
      return;
    }
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
      <input type="text" name="image" defaultValue={input.image} onChange={(e) => {
        onChangeInput("image", e.target.value);
      }} />
    </div>
    {input.image != null && input.image != "" ? <div>
      <img src={input.image} width="300" height="300"></img>
    </div> : <></>}
    <div>
      <label>Description</label>
      <textarea type="description" name="description" defaultValue={input.description} onChange={(e) => {
        onChangeInput("description", e.target.value);
      }} />
    </div>
    <button>{location.pathname.includes("edit-photos") ? 'Update photo' : "Add photo"}</button>
  </form>
}

export default DetailPhotoPage;