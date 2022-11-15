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
import DetailPhotoPage from "../pages/DetailPhotoPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const router = [
  <Route exact path="/register"  >
    <RegisterPage />
  </Route>,
  <Route exact path="/login" >
    <LoginPage />
  </Route>,
  <PrivateRoute exact component={HomePage} path="/" />,
  <PrivateRoute exact component={DetailPhotoPage} path="/add-photos" />,
  <PrivateRoute exact component={DetailPhotoPage} path="/edit-photos/:id" />,
]

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