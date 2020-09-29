import TextField from "@material-ui/core/TextField";
import React, { useContext, useState } from "react";
import irbis from "../images/Xuhn.gif";
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

const Register = (props) => {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [addPerson, { data }] = useMutation(REGISTER_Person, {
    update(proxy, { data: { register: person } }) {
      context.login(person);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  let onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  let formSubmit = (e) => {
    e.preventDefault();
    addPerson();
    if (Object.keys(errors).length === 0) {
      setValues({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }

    setErrors({});
  };
  return (
    <>
      <div className={classes.image}>
        <img src={irbis} />
      </div>
      <h2 className={classes.title}>Register</h2>
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
          error={errors.email ? true : false}
          variant="outlined"
          label="Email"
          helperText={errors.email ? errors.email : "Enter your email"}
          type="text"
          name="email"
          className={classes.textField}
          value={values.email}
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

        <TextField
          error={errors.confirmPassword ? true : false}
          variant="outlined"
          label="Confirm Password"
          helperText={
            errors.confirmPassword
              ? errors.confirmPassword
              : "Enter your password"
          }
          type="password"
          name="confirmPassword"
          className={classes.textField}
          value={values.confirmPassword}
          onChange={onChange}
        />

        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

const REGISTER_Person = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      inputData: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
    }
  }
`;

export default withRouter(Register);
