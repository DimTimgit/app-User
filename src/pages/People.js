import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";
import AddPerson from "../components/AddPerson";

const User = () => {
  const { person } = useContext(AuthContext);
  return !person ? <Redirect to="/login" /> : <AddPerson />;
};

export default User;
