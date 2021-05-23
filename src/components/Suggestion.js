import {Component} from "react";

class Suggestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFormToggle: false
        }
    }

    toggleSuggestion = () => {
        this.setState({
            isFormToggle: !this.state.isFormToggle
        });
    }
    suggestApp = () => {
        alert('Thanks for your suggestion! We will work on this ASAP')
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h4>Express Install can</h4>
                        <ul>
                            <li>start working as soon as you run it</li>
                            <li>not bother you with any choices or options</li>
                            <li>install apps in their default location</li>
                            <li>say no to toolbars or extra junk</li>
                            <li>install 64-bit apps on 64-bit machines</li>
                            <li>do all its work in the background</li>
                            <li>install the latest stable version of an app</li>
                            <li>skip any reboot requests from installers</li>
                            <li>use your proxy settings from Internet Explorer</li>
                            <li>download apps from each publisher's official site</li>
                            <li>verify digital signatures or hashes before running anything</li>
                            <li>work best if you turn off any web filters or firewalls</li>
                            <li>save you a lot of time!</li>
                        </ul>
                        <h4>Suggest an app</h4>
                        <p>
                            We only add popular user-requested apps to Express Install. <br/>
                        </p>
                        <p>
                            <button className="btn btn-primary" type="button" onClick={this.toggleSuggestion}>Show
                                suggestion
                            </button>
                        </p>
                        <form className={this.state.isFormToggle === true ? '' : 'hidden'}>
                            <p>
                                I want to see&nbsp;&nbsp;
                                <input placeholder="app name"/>
                                on Ninite.
                            </p>
                            <p>
                                Email me at&nbsp;&nbsp;
                                <input type="email" placeholder="your email (optional)"/>
                                (optional) when it's ready.
                            </p>
                            <p style={{display: "flex"}}>
                                <button className="btn btn-primary" type="reset" onClick={this.suggestApp}>Suggest this
                                    app
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <button className="btn btn-danger" type="reset" onClick={this.toggleSuggestion}>Cancel
                                </button>
                                <br/>
                            </p>
                        </form>
                    </div>
                    <div className="col-sm-6">
                        <h4>Express Pro Edition Coming soon</h4>
                        <p>
                            <a href="https://www.facebook.com/nguyentanvuong1998/">
                                <img
                                    src="https://d8f7mp21btv4f.cloudfront.net/img/proappsheet/appsheet_small-36d37ca6c6e9c3f2ff57a3d730fcc43f.jpg"
                                    alt="Ninite Pro&#39;s new web interface" className="img-responsive"/>
                            </a>
                        </p>
                        <p><a
                            href="https://photo-cms-plo.zadn.vn/w653/Uploaded/2021/xpckxpiu/2020_03_10/meo-plo_xiow.jpg">Express
                            Pro</a> has a new web interface. <a
                            href="https://i.pinimg.com/originals/60/45/b1/6045b177c7ed2848d4e1b66b69eb4790.jpg">Click
                            here to learn more.</a></p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Suggestion;
