import './App.css';
import {Component} from "react";
import NavBar from "./components/NavBar";
import HomePageIntro from "./components/HomePageIntro";
import Form from "./components/Form";
import Suggestion from "./components/Suggestion";
import Footer from "./components/Footer";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <NavBar/>
                <HomePageIntro/>
                <div className="seperate"/>
                <div className="container alert alert-warning js-homepage-old-os hidden">
                    <p>As of February 14th, 2021 Express Install has ended support for Windows XP and Windows Vista as well as
                        the related server platforms Server 2003 and Server 2008.</p>
                    <p>You'll need to upgrade your Windows version to continue using Express.</p>
                </div>
                {/*Form*/}
                <Form/>
                <div className="separate"/>
                {/*Suggestion*/}
                <Suggestion/>
                {/*Footer*/}
                <Footer/>
            </div>
        );
    }
}

export default App;
