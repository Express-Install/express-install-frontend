/** @format */

import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "react-notifications/lib/notifications.css";
import {NotificationContainer} from "react-notifications";
import {createNotification} from "../Helper/notification";
import axios from "axios";
import {API_BaseURL, Verify_Email_API} from "../constants/api";
import * as qs from 'query-string';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "15px"
    }
}));

export default function VerifyEmail() {
    const classes = useStyles();
    let history = useHistory();

    // eslint-disable-next-line no-restricted-globals
    const parsed = qs.parse(location.search);
    const verifyToken = parsed.token;
    const verify = async () => {
        try {
            await axios.post(`${API_BaseURL + Verify_Email_API}?token=${verifyToken}`, {});
        } catch (err) {
            createNotification("error", "Email verification failed!");
        }
        history.push("/");
        console.log(verifyToken);
    };

    verify();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                Verifying...
            </div>
            <NotificationContainer/>
        </Container>
    );
}
