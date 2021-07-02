/** @format */

import React, { Component } from "react";
import "../assets/css/SideBar.css";
import CloseIcon from "@material-ui/icons/Close";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

export default class SideBar extends Component {
  constructor() {
    super();
    this.state = {
        listPackage : [
            {
              id: 1,
              name: "Window",
            },
            {
              id: 2,
              name: "Visual Studio",
            },
            {
              id: 3,
              name: "Adobe",
            },
          ]
    };
  }
  render() {
    const handleDeletePackage = (e) => {
      const newList = this.state.listPackage.filter((Package) => Package.id !== e);
      this.setState({listPackage : newList})
    };
    return (
      <div
        className={
          this.props.toggle
            ? "container-side-bar toggle-on"
            : "container-side-bar toggle-off"
        }>
        <div className="header-side-bar">
          <p className="title-side-bar">Package</p>
          <CloseIcon
            onClick={this.props.handleToggleSideBar}
            className="close-icon"
          />
        </div>
        <div className="content-side-bar">
          {this.state.listPackage.map((Package) => (
            <div key={Package.id} className="package">
              <p className="name-package">{Package.name}</p>
              <DeleteOutlineIcon
                className="delete-package"
                value={Package.id}
                onClick={() => handleDeletePackage(Package.id)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
