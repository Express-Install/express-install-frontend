/** @format */

import "../App.css";
import { Component } from "react";
import NavBar from "./NavBar/NavBar";
import HomePageIntro from "./HomePageIntro";
import Form from "./Form/index";
import Suggestion from "./Suggestion";
import Footer from "./Footer";
import ModalJob from "./Modal-job";
import SideBar from "./SideBar";

class Home extends Component {

    render() {
        /*let getJob = (job) => {
            this.setState({
                job: job
            });
        }*/

    return (
      <div>
        <ModalJob/>
        <NavBar />
        <HomePageIntro />
        <div className="seperate" />
        <div className="container alert alert-warning js-homepage-old-os hidden">
          <p>
            As of February 14th, 2021 Express Install has ended support for
            Windows XP and Windows Vista as well as the related server platforms
            Server 2003 and Server 2008.
          </p>
          <p>
            You'll need to upgrade your Windows version to continue using
            Express.
          </p>
        </div>
        {/*Form*/}
        <Form/>
        <div className="separate" />
        {/*Suggestion*/}
        <Suggestion />
        {/*Footer*/}
        <Footer />
      </div>
    );
  }
}

export default Home;
