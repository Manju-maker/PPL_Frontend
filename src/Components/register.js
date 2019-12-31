import callApi from "./Utilities/callApi";
import { Link } from "react-router-dom";
import React from "react";
const axios = require("axios");

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pass: "",
            email: "",
            firstname: "",
            lastname: "",
            errMessage: ""
        };
    }
    componentDidMount() {
        if (localStorage.getItem("tokenID")) {
            this.props.history.push("/index");
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleClick = e => {
        e.preventDefault();
        let { username, pass, email, firstname, lastname } = this.state;
        let userData = { username, pass, email, lastname, firstname };
        callApi("post", "registerUser", userData)
            .then(response => {
                console.log("response---", response);
                if (response.data.length > 0) {
                    this.props.history.push("/login");
                } else {
                    this.setState({ errMessage: "email already exist" });
                }
            })
            .catch(err => {
                console.log("err----", err);
            });
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="content">
                        <div className="content_rgt">
                            <div className="register_sec">
                                <h1>Create An Account</h1>
                                <form
                                    onSubmit={this.handleClick}
                                    style={{ color: "black" }}
                                >
                                    <ul>
                                        <li>
                                            <span>Username</span>
                                            <input
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="Enter your username"
                                                name="username"
                                                required
                                            />
                                        </li>
                                        <li>
                                            <span>Password</span>
                                            <input
                                                type="password"
                                                onChange={this.handleChange}
                                                placeholder="Enter your password"
                                                name="pass"
                                                required
                                            />
                                        </li>
                                        <li>
                                            <span>Email</span>
                                            <input
                                                type="email"
                                                onChange={this.handleChange}
                                                placeholder="Enter your email"
                                                name="email"
                                                required
                                            />
                                        </li>
                                        <p style={{ color: "red" }}>
                                            {this.state.errMessage}
                                        </p>
                                        <li>
                                            <span>First Name</span>
                                            <input
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="Enter your first name"
                                                name="firstname"
                                                required
                                            />
                                        </li>
                                        <li>
                                            <span>Last Name</span>
                                            <input
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="Enter your last name"
                                                name="lastname"
                                                required
                                            />
                                        </li>
                                        <li>
                                            <input type="checkbox" required />I
                                            agree to Term &amp; Conditions
                                        </li>
                                        <li>
                                            <input
                                                type="submit"
                                                defaultValue="Register"
                                            />
                                        </li>
                                    </ul>
                                </form>
                                <div className="addtnal_acnt">
                                    I already have an account.
                                    <Link to="/login">Login My Account !</Link>
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
export default Register;
