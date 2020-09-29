import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation";

import ContactsIcon from "@material-ui/icons/Contacts";
import { Link } from "react-router-dom";

import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/Person";
import logo from "../images/ghost.svg";
import { AuthContext } from "../context/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ff7043",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    color: "#fff",
    maxWidth: 80,
    padding: 0,
  },
  username: {
    marginLeft: "auto",
    marginRight: 25,
    height: 45,
    color: "#fff",
    backgroundColor: "blue",
    borderRadius: 5,
    maxWidth: 100,
  },
  logo: {
    marginLeft: 25,
    marginRight: 40,
    minWidth: 35,
    maxWidth: 65,
  },
});

const Navbar = () => {
  const { person, logout } = useContext(AuthContext);

  const classes = useStyles();

  const navbarLayout = !person ? (
    <BottomNavigation className={classes.root}>
      <BottomNavigationAction
        showLabel={true}
        label={<img src={logo} alt="GHOST" />}
        className={classes.logo}
      />
      {/* <BottomNavigationAction
        label="Users"
        value="user"
        icon={<PersonIcon />}
        className={classes.icon}
        component={Link}
        to="/"
      /> */}

      <BottomNavigationAction
        label="Add User"
        value="add"
        icon={<ContactsIcon />}
        className={classes.icon}
        component={Link}
        to="/user"
      />

      <BottomNavigationAction
        label="Login"
        icon={<PersonIcon />}
        className={classes.login}
        component={Link}
        to="/login"
        label={<span>Login</span>}
        showLabel={true}
      />

      <BottomNavigationAction
        label="Register"
        value="add"
        icon={<PersonAddIcon />}
        className={classes.register}
        component={Link}
        to="/register"
        label={<span>Register</span>}
        showLabel={true}
      />
    </BottomNavigation>
  ) : (
    <BottomNavigation className={classes.root}>
      <BottomNavigationAction
        showLabel={true}
        label={<img src={logo} alt="GHOST" />}
        className={classes.logo}
      />
      <BottomNavigationAction
        label="Users"
        value="user"
        icon={<PersonIcon />}
        className={classes.icon}
        component={Link}
        to="/"
      />

      <BottomNavigationAction
        label="Add User"
        value="add"
        icon={<ContactsIcon />}
        className={classes.icon}
        component={Link}
        to="/user"
      />

      <BottomNavigationAction
        className={classes.username}
        label={<span>{person.username}</span>}
        showLabel={true}
      />

      <BottomNavigationAction
        label="Logout"
        value="add"
        icon={<ExitToAppIcon />}
        className={classes.icon}
        label={<span>Logout</span>}
        showLabel={true}
        onClick={logout}
      />
    </BottomNavigation>
  );
  return navbarLayout;
};

export default Navbar;
