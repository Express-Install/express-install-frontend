import {Component} from "react";


class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="footer">
                <div className="container text-center">
                    <ul className="list-inline">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Security</a></li>
                        <li><a href="#">Credit</a></li>
                        <li><a href="#">Term</a></li>
                    </ul>
                    <p>
                        <big>©2021 Created by Vương & Khải</big>
                        <br/>
                        <small>Tutor: Vũ Đình Long</small>
                    </p>
                </div>
            </div>
        );
    }
}

export default Footer;
