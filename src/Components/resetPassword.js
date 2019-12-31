import React from "react";
import Axios from "axios";

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = { newPassword: "", confirmPassword: "", errMessage: "" };
        console.log("PArams--", this.props.match.params.params);
    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.newPassword === this.state.confirmPassword) {
            let userDetails = {
                email: this.props.match.params.params,
                password: this.state.newPassword
            };

            Axios.post("http://localhost:8081/reset", userDetails)
                .then(response => {
                    console.log("response--", response.status);
                    if (response.status === 200) {
                        this.props.history.push("/login");
                    }
                })
                .catch(err => {
                    console.log("Error--", err);
                });
        } else {
            this.setState({ errMessage: "Password Mismatched" });
        }
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="content">
                        <div className="content_rgt">
                            <div className="register_sec">
                                <h1>Reset Password</h1>
                                <form onSubmit={this.handleSubmit}>
                                    <ul>
                                        <li>
                                            <span>Enter New Password</span>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                placeholder="Enter your new password"
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </li>
                                        <li>
                                            <span>Confirm Password</span>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Enter your password again"
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </li>
                                        <p style={{ color: "red" }}>
                                            {this.state.errMessage}
                                        </p>{" "}
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

export default ResetPassword;
