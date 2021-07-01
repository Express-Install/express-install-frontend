import {Component} from "react";
import axios from "axios";
import {API_BaseURL, Logout_Account_API} from "../constants/api";

class NavBar extends Component {
    render() {

        const logoutUser = async () => {
            try{
                 await axios.post(API_BaseURL + Logout_Account_API,
                    {refreshToken: localStorage.getItem("refreshToken")},
                    {headers: {'Content-Type': 'application/json'}}
                    );
                 localStorage.clear();
                // eslint-disable-next-line no-restricted-globals
                history.back();
            }catch (err){
                console.log(err);
            }
        }

        const isLogin = () => {
            if (localStorage && localStorage.getItem("userName")){
                let displayName = localStorage.getItem("userName");
                return (
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button"
                                data-toggle="dropdown">{displayName} &nbsp;
                            <span className="caret"/></button>
                        <ul className="dropdown-menu">
                            <li onClick={logoutUser}><a href="#">Logout</a></li>
                        </ul>
                    </div>
                )
            }else return (
                <li><a href="/sign-in">Sign in/Sign up</a></li>
            )
        }
        return (
            <nav className="navbar-fixed-top">
                <span className="logo">
                    <a href="#"><img src={process.env.PUBLIC_URL + '/logo.png'} alt="Express Install" className="brand-img"/></a>
                </span>
                <ul className="nav-links">
                    <li><a href="#">Help</a></li>
                    <li><a href="#">Github</a></li>
                    <li><a href="#">How to use</a></li>
                    {isLogin()}
                </ul>
                {/*<div className="burger"></div>*/}
            </nav>
        );
    }
}

export default NavBar;
