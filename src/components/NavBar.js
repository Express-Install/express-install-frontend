import {Component} from "react";
import axios from "axios";
import {API_BaseURL} from "../constants/api";

class NavBar extends Component {
    render() {

        const logoutUser = async () => {
            try{
                 await axios.post(API_BaseURL+"/v1/auth/logout",
                    {refreshToken: localStorage.getItem("refreshToken")},
                    {headers: {'Content-Type': 'application/json'}}
                    );
                await localStorage.clear();
                // eslint-disable-next-line no-restricted-globals
                await history.back();
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
                    // <li><a style={{cursor: "pointer"}} href="/">Chào {displayName}</a></li>
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
