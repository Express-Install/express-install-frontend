/** @format */

import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import VerifyEmail from "./components/VerifyEmail";

class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/" component={Home} exact/>
                <Route path="/sign-in" component={SignIn} exact/>
                <Route path="/sign-up" component={SignUp} exact/>
                <Route path="/verify-email" component={VerifyEmail} exact/>
            </Router>
        );
    }
}

export default App;
