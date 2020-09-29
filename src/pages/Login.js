import TextField from "@material-ui/core/TextField";
import React, { useContext, useState } from "react";

//import irbis from "../images/Xuhn.gif";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../context/auth";

const useStyles = makeStyles((theme) => ({
  image: {
    width: 10,
    height: 10,
    margin: "20px auto",
  },
  title: {
    textAlign: "center",
  },
  form: {
    width: 400,
    margin: "20px auto",
    textAlign: "center",
  },
  textField: {
    width: "100%",
    marginBottom: "25px",
  },
}));

const Login = (props) => {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  let [loginPerson, { loading }] = useMutation(LOGIN_PERSON, {
    update(proxy, { data: { login: person } }) {
      context.login(person);
      props.history.push("/");
    },
    onErrror(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  let formSubmit = (e) => {
    e.preventDefault();
    loginPerson();
  };

  let onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <h2 className={classes.title}>Login</h2>
      <form onSubmit={formSubmit} className={classes.form}>
        <TextField
          error={errors.username ? true : false}
          variant="outlined"
          label="Username"
          helperText={
            errors.username ? errors.username : "Enter your best username"
          }
          type="text"
          name="username"
          className={classes.textField}
          value={values.username}
          onChange={onChange}
        />
        <TextField
          error={errors.password ? true : false}
          variant="outlined"
          label="Password"
          helperText={errors.password ? errors.password : "Enter your password"}
          type="password"
          name="password"
          className={classes.textField}
          value={values.password}
          onChange={onChange}
        />

        {errors.general && (
          <div className={classes.error}>{errors.general}</div>
        )}
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

const LOGIN_PERSON = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;
export default withRouter(Login);
