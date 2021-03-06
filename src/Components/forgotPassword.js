import React from "react";
import Axios from "axios";

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            message: ""
        };
    }
    componentDidMount() {
        if (localStorage.getItem("tokenID")) {
            this.props.history.push("/index");
        }
    }

    handleChange = e => {
        this.setState({ email: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        let userEmail = { email: this.state.email };
        Axios.post("http://localhost:8081/forgot", userEmail)
            .then(response => {
                if (response.data.length > 0) {
                    if (this.state.email === response.data[0].email) {
                        this.props.history.push(`/reset${this.state.email}`);
                    }
                } else {
                    this.setState({ message: "Email not registered" });
                }
            })
            .catch(err => {
                console.log("Error--", err);
            });
    };

    // submitPassword = e => {
    //     e.preventDefault();
    //     let userDetails = { email: this.state.email, pass: this.state.pass };
    //     callApi("post", "forgot", userDetails).then(response => {
    //         console.log("response---->>>", response.data);
    //         if (response.data.n === 1) {
    //             this.props.history.push("/login");
    //         } else {
    //             this.setState({ message: "email not registered" });
    //         }
    //     });
    // };

    render() {
        console.log(this.state.email);
        return (
            <div>
                <div className="container">
                    <div className="content">
                        <div className="content_rgt">
                            <div className="register_sec">
                                <h1>Forgot Password</h1>
                                <form onSubmit={this.handleSubmit}>
                                    <ul>
                                        <li>
                                            <span>Enter E-mail ID</span>

                                            <input
                                                type="email"
                                                value={this.state.email}
                                                placeholder="User@gmail.com"
                                                name="email"
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </li>
                                        <p style={{ color: "red" }}>
                                            {this.state.message}
                                        </p>
                                        <li>
                                            <input
                                                type="submit"
                                                defaultValue="Submit"
                                            />
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                        <div className="content_lft">
                            <h1>Welcome from PPL!</h1>
                            <p className="discrptn">
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable. If you are going to use a passage of
                                Lorem Ipsum, you need to be sure there isn't
                                anything embarrassing hidden in the middle of
                                text.{" "}
                            </p>
                            <img src="images/img_9.png" alt="" />{" "}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ForgotPassword;
