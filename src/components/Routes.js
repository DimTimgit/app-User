import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home.js";
import People from "../pages/People.js";
import Login from "../pages/Login.js";
import Register from "../pages/Register.js";
//import AuthRoute from "./AuthRoute.js";
const Routes = () => {
  return (
    <>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/user" render={() => <People />} />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/register" render={() => <Register />} />
    </>
  );
};

export default Routes;
