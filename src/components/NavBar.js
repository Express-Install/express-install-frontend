import {Component} from "react";

class NavBar extends Component {
    render() {
        const getLeftStringOfAt = (str) => {
            let subString = str.split("@");
            subString = subString[0].slice(1);
            return subString;
        };

        const isLogin = () => {
            if (localStorage && localStorage.getItem("email")){
                let displayName = getLeftStringOfAt(localStorage.getItem("email"));
                console.log(displayName);
                return (
                    <li><a style={{cursor: "pointer"}} href="/">Chào {displayName}</a></li>
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
