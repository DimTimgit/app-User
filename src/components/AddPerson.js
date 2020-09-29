import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import FETCH_USERS from "../util/gql";
import { Alert, AlertTitle } from "@material-ui/lab";
//import person from "../../../models/user";
const useStyles = makeStyles();
const AddPerson = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    //email: new String().getFullEmail(),
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [addPerson] = useMutation(ADD_PERSON, {
    update(cache, { data: { addUser } }) {
      if (cache.data.data.ROOT_QUERY) {
        const users = cache.readQuery({
          query: FETCH_USERS,
        });
        cache.writeQuery({
          query: FETCH_USERS,
          data: {
            getUsers: [addUser, ...users.getUsers],
          },
        });
      }
      setValues({
        name: "",
        email: "",
      });
      setError("");
      setOpen(true);
    },
    onError(e) {
      setError(e.graphQLErrors[0].message);
    },
    variables: values,
  });
  let handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value,
    });
  };

  let formSubmit = (e) => {
    e.preventDefault();
    addPerson();
  };
  return (
    <>
      <h2 className={classes.title}>Add Person</h2>
      <form className={classes.root} onSubmit={formSubmit}>
        <TextField
          variant="outlined"
          label="Name"
          type="text"
          name="name"
          fullWidth
          error={error ? true : false}
          helperText={error && error}
          className={classes.textField}
          value={values.name}
          onChange={handleChange}
        />

        <TextField
          variant="outlined"
          label="Email"
          type="text"
          name="email"
          fullWidth
          className={classes.textField}
          value={values.email}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" className={classes.button}>
          ADD
        </Button>
        {open && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success alert — <strong>check it out!</strong>
          </Alert>
        )}
      </form>
    </>
  );
};

const ADD_PERSON = gql`
  mutation addUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      name
      email
      username
    }
  }
`;
export default AddPerson;
