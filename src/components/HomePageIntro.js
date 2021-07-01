import {Component} from "react";

class HomePageIntro extends Component {
    render() {
        return (
            <div className="homepage-intro">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h4>Install your programs at once</h4>
                            <p>No toolbar, no next option, just pick apps and 1 click install</p>
                            <img src={process.env.PUBLIC_URL + 'image/example-install.png'} alt="Example install" className="img-responsive img-rounded"/>
                        </div>
                        <div className="col-sm-6">
                            <h4>Simple as that!</h4>
                            <p>We are trusted by thousands of users</p>
                            <p>Some feedbacks: </p>
                            <p>
                                “I'll bet the service saved me a couple hours”<br/>
                                <strong>My friend Tân</strong>
                            </p>
                            <p>
                                “Express install frees up your day and make me think twice about you. Maybe you're a good guy” <br/>
                                <strong>My neighbour</strong>
                            </p>
                            <p>
                                “This post can be fairly short because Ninite works exactly as advertised.”<br/>
                                <strong>Lifehacker</strong>
                            </p>
                            <p>"This is insane. Save me a lot of time, Now i can pick up my son without delay time!"<br/>
                                <strong>Mark Tucker</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePageIntro;
