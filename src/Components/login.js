import { Link } from "react-router-dom";
import React from "react";
import callApi from "./Utilities/callApi";
const axios = require("axios");

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            data: [],
            errMessage: "",
            query: {
                fields: {},
                filter: {},
                option: { skip: 0, limit: 0, sort: { uploadTime: -1 } }
            }
        };
    }

    componentDidMount() {
        if (localStorage.getItem("tokenID")) {
            this.props.history.push("/index");
        }
    }

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    };

    handleClick = e => {
        e.preventDefault();
        let userDetails = {
            email: this.state.email,
            pass: this.state.pass,
            query: this.state.query
        };

        callApi("post", "login", userDetails)
            .then(response => {
                console.log("Response>>>", response);
                if (response.data.length > 0) {
                    if (!response.data[0].verify) {
                        this.setState({
                            errMessage: "Verify your email first"
                        });
                    } else {
                        localStorage.setItem(
                            "tokenID",
                            JSON.stringify(response.data)
                        );
                        this.props.history.push("/index");
                    }
                } else if (response.status === 204) {
                    this.setState({
                        errMessage: "Invalid Username or Password"
                    });
                }
            })
            .catch(err => {
                console.log("err===", err);
            });
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="content">
                        <div className="content_rgt">
                            <div className="login_sec">
                                <h1>Log In</h1>
                                <form onSubmit={this.handleClick}>
                                    <ul>
                                        <li>
                                            <span>Email-ID</span>
                                            <input
                                                color="black"
                                                type="email"
                                                name="email"
                                                onChange={this.handleChange}
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </li>
                                        <li>
                                            <span>Password</span>
                                            <input
                                                color="black"
                                                type="password"
                                                name="pass"
                                                onChange={this.handleChange}
                                                placeholder="Enter your password"
                                                required
                                            />
                                        </li>
                                        <p style={{ color: "red" }}>
                                            {this.state.errMessage}
                                        </p>
                                        <li>
                                            <input type="checkbox" />
                                            Remember Me
                                        </li>
                                        <li>
                                            <input
                                                type="submit"
                                                defaultValue="Log In"
                                            />
                                            <Link to="/forgot">
                                                Forgot Password
                                            </Link>
                                        </li>
                                    </ul>
                                </form>
                                <div className="addtnal_acnt">
                                    I do not have any account yet.
                                    <Link to="/">Create My Account Now !</Link>
                                </div>
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

export default Login;
