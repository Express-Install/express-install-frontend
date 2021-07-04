/** @format */

import React, { Component } from "react";
import axios from "axios";
import { API_BaseURL, Logout_Account_API } from "../../constants/api";
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded";
import SideBar from "../SideBar";
import HowToUse from "./HowToUse";
import ModalApp from "../Form/ModalApp";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      toggleHowToUse: false
    };
  }

  render() {
    const logoutUser = async () => {
      try {
        await axios.post(
          API_BaseURL + Logout_Account_API,
          { refreshToken: localStorage.getItem("refreshToken") },
          { headers: { "Content-Type": "application/json" } }
        );
        localStorage.clear();
        // eslint-disable-next-line no-restricted-globals
        history.back();
      } catch (err) {
        console.log(err);
      }
    };

    const isLogin = () => {
      if (localStorage && localStorage.getItem("userName")) {
        let displayName = localStorage.getItem("userName");
        return (
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-toggle="dropdown">
              {displayName} &nbsp;
              <span className="caret" />
            </button>
            <ul className="dropdown-menu">
              <li onClick={logoutUser}>
                <a href="#">Logout</a>
              </li>
            </ul>
          </div>
        );
      } else
        return (
          <li>
            <a href="/sign-in">Sign in/Sign up</a>
          </li>
        );
    };
    const handleToggleSideBar = () => {
      this.setState({ toggle : this.state.toggle ? false : true });
    };

    const openHowToUse = () => {
      this.setState({
        toggleHowToUse: true
      });
    }

    const closeHowToUse = () => {
      this.setState({
        toggleHowToUse: false
      });
    }

    const renderHowToUse = () => {
      let open = this.state.toggleHowToUse;
      let xhtml = null;
      if (open === true) {
        xhtml = (
           <HowToUse open={open} onCloseForm={closeHowToUse}/>
        );
      }
      return xhtml;
    }

    return (
      <>
        <nav className="navbar-fixed-top">
          <span className="logo">
            <a href="#">
              <img
                src={process.env.PUBLIC_URL + "/logo.png"}
                alt="Express Install"
                className="brand-img"
              />
            </a>
          </span>
          <ul className="nav-links">
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Github</a>
            </li>
            <li onClick={openHowToUse}>
              <a href="#">
                How to use
              </a>
            </li>
            {renderHowToUse()}
            {isLogin()}
            <li>
              <a href="#">
                <ShoppingBasketRoundedIcon fontSize="large" onClick={handleToggleSideBar}/>
              </a>
            </li>
          </ul>
          {/*<div className="burger"></div>*/}
        </nav>
        <SideBar toggle={this.state.toggle} handleToggleSideBar={handleToggleSideBar}/>
      </>
    );
  }
}

export default NavBar;
