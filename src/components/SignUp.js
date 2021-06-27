/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {API_BaseURL} from "../constants/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  passwordWarning: {
    fontSize: "12px",
    color: "#ff6347"
  }
}));

export default function SignUp() {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const createNotification = (type, message) => {
    switch (type) {
      case "success":
        NotificationManager.success(message, "SUCCESS");
        break;
      case "error":
        NotificationManager.error(message, "ERROR");
        break;
      case "info":
        NotificationManager.info(message, "INFO");
      default:
        break;
    }
  };

  let history = useHistory();

  const registerSubmit = async (e) => {
    e.preventDefault();
    const userName = user.firstName + " " + user.lastName;
    if (!userName || !user.email || !user.password) {
      createNotification("error", "Please complete all information");
      return;
    }
    try {
      const res = await axios.post(
        API_BaseURL+"/v1/auth/register",
        {
          name: userName,
          email: user.email,
          password: user.password,
        }
      );
      setUser({ name: "", email: "", password: "" });
      createNotification("success", "Sign up successfully!");
      setTimeout(function () {
        history.push("/sign-in");
      }, 1000);
      if (localStorage) {
        localStorage.setItem("email", user.email);
      }
    } catch (err) {
        createNotification("error", "");
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Link href="/">
          <Avatar
            src={process.env.PUBLIC_URL + "/logo.png"}
            className={classes.large}>
            <LockOutlinedIcon />
          </Avatar>
        </Link>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={registerSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onChangeInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={onChangeInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChangeInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.passwordWarning}>
              *Password must be contained text and numbers. At least 8 characters
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <NotificationContainer />
    </Container>
  );
}
