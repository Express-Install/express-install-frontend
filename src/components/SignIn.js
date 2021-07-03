/** @format */

import React, {useState, useEffect} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "react-notifications/lib/notifications.css";
import {
    NotificationContainer
} from "react-notifications";
import {createNotification} from "../Helper/notification";
import {API_BaseURL, Login_Account_API} from "../constants/api";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "15px"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();

    let history = useHistory();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    /*const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("tokenStore")}`}
    };*/

    useEffect(() => {
        if (localStorage) {
            const emailRegister = localStorage.getItem("email");
            if (emailRegister) {
                setUser({email: emailRegister});
            }
            const passwordRemember = localStorage.getItem("password");
            if (passwordRemember) {
                setUser({email: passwordRemember});
            }
        }
    }, []);

    const [checked, setChecked] = useState(false);

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            createNotification("error", "Please complete all information");
            return;
        }
        try {
            const res = await axios.post(API_BaseURL + Login_Account_API, {
                email: user.email,
                password: user.password,
            });
            setUser({email: "", password: ""});
            localStorage.setItem("tokenStore", res.data.tokens.access.token);
            localStorage.setItem("refreshToken", res.data.tokens.refresh.token);
            localStorage.setItem("userID", res.data.user.id);
            if (localStorage.getItem("userName")) {
                console.log(localStorage.getItem("userName"));
            } else {
                localStorage.setItem("userName", res.data.user.name);
            }
            if (checked) {
                localStorage.setItem("password", JSON.stringify(user.password));
            }
            createNotification("success", "Log in successfully!");
            setTimeout(function () {
                history.push("/");
            }, 1000);
            /*Verified email*/
            // await axios.post(API_BaseURL + "/v1/auth/send-verification-email",
            //     {},
            //     {headers: {Authorization: `Bearer ${res.data.tokens.access.token}`}}
            // );
        } catch (err) {
            createNotification("error", "Username or password is incorrect ");
        }
    };

    const isRememberMe = (e) => {
        setChecked(!checked);
    };

    // const sendVerifyEmail = async () => {
    //     try {
    //         const res = await axios.post(API_BaseURL + "/v1/auth/send-verification-email",
    //             {},
    //             config
    //         );
    //         console.log(res.data);
    //         createNotification("info", "Check your email for verification");
    //     } catch (err) {
    //         createNotification("error", "Something wrong when sending verifycation email");
    //     }
    // }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Link href="/">
                    <Avatar
                        src={process.env.PUBLIC_URL + "/logo.png"}
                        className={classes.large}>
                        {/*<LockOutlinedIcon />*/}
                    </Avatar>
                </Link>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={loginSubmit}>
                    <TextField
                        value={user.email}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={onChangeInput}
                    />
                    <TextField
                        value={user.password}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onChangeInput}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={checked}
                                color="primary"
                                onChange={isRememberMe}
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgot" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/sign-up" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <NotificationContainer/>
        </Container>
    );
}
