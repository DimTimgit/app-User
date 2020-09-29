import React from "react";
import { useQuery } from "react-apollo-hooks";
//import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import FETCH_USERS from "../util/gql";
import image from "../images/irbis.jpg";
import {
  Button,
  CardActionArea,
  CardActions,
  CardMedia,
} from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    marginTop: 50,
    position: "relative",
  },
  progress: {
    position: "absolute",
    top: 55,
    left: "50%",
    transform: "translateX(-50%)",
  },
});

const Users = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(FETCH_USERS);
  if (loading)
    return <LinearProgress className={classes.progress} color="secondary" />;
  if (error) return <p>Error :(</p>;
  return (
    <Grid container justify="center" spacing={2}>
      {data.getUsers.map((user, index) => (
        <Grid key={index} item xs={6}>
          <User user={user} />
        </Grid>
      ))}
    </Grid>
  );
};
const User = (user) => {
  const { name, email, username, id } = user.user;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia image={image} title={name} className={classes.media} />
      </CardActionArea>
      <CardContent>
        <Typography className={classes.name} color="textSecondary" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" component="h2">
          {email}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttons}>
        <Button size="small" color="primary" className={classes.button}>
          {username}
        </Button>

        <Button size="small" color="primary" className={classes.botton}>
          GGGGG
        </Button>
      </CardActions>
    </Card>
  );
};

export default Users;
