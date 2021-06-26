import {Component} from "react";

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar-fixed-top">
                <span className="logo">
                    <a href="#"><img src={process.env.PUBLIC_URL + '/logo.png'} alt="Express Install" className="brand-img"/></a>
                </span>
                <ul className="nav-links">
                    <li><a href="#">Help</a></li>
                    <li><a href="#">Github</a></li>
                    <li><a href="#">How to use</a></li>
                    <li><a href="/sign-in">Sign in</a></li>
                    <li><a href="/sign-up">Sign up</a></li>
                </ul>
                {/*<div className="burger"></div>*/}
            </nav>
        );
    }
}

export default NavBar;
