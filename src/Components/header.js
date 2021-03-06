import React from "react";

class Header extends React.Component {
    constructor(props) {
        super(props);
        //console.log("Header.props",this.props)
        this.state = {
            showMenu: false
            // showHomeButton: localStorage.getItem("tokenID")
        };
    }

    Logout = e => {
        e.preventDefault();
        localStorage.removeItem("tokenID");

        this.props.history.push("/login");

        this.setState({ showMenu: false });
    };

    showMenu = e => {
        e.preventDefault();

        this.setState({
            showMenu: !this.state.showMenu
        });
    };
    homeClick = e => {
        e.preventDefault();
        if (localStorage.getItem("tokenID")) {
            this.props.history.push("/timeline");
        } else {
            this.props.history.push("/login");
        }
    };

    render() {
        return (
            <div>
                <meta charSet="utf-8" />
                <title>Create An Account</title>
                <link
                    href="css/bootstrap.css"
                    rel="stylesheet"
                    type="text/css"
                />
                <link
                    href="css/bootstrap-responsive.css"
                    rel="stylesheet"
                    type="text/css"
                />
                <div className="navbar navbar-inverse navbar-fixed-top">
                    <div className="navbar-inner">
                        <div className="container">
                            <button
                                type="button"
                                className="btn btn-navbar"
                                data-toggle="collapse"
                                data-target=".nav-collapse"
                            >
                                {" "}
                                <span className="icon-bar" />{" "}
                                <span className="icon-bar" />{" "}
                                <span className="icon-bar" />{" "}
                            </button>
                            <a className="brand" href>
                                PPL
                            </a>
                            <div className="pro_info pull-right">
                                <div className="pro_icn">
                                    <img src="images/pic_small.png" />
                                </div>
                                <div className="pro_txt">
                                    Me
                                    <b className="caret" />
                                </div>
                                <ul
                                    className="dropdown-menu"
                                    role="menu"
                                    aria-labelledby="dLabel"
                                >
                                    <li>
                                        <a tabIndex={-1} href="#">
                                            My Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a tabIndex={-1} href="#">
                                            Message Box
                                        </a>
                                    </li>
                                    <li>
                                        <a tabIndex={-1} href="#">
                                            Change Language
                                        </a>
                                    </li>
                                    <li className="divider" />
                                    <li>
                                        <a tabIndex={-1} href="#">
                                            <input
                                                type="text"
                                                placeholder="search"
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-collapse collapse">
                                <ul className="nav">
                                    <li className="active">
                                        {" "}
                                        <a href>Home</a>{" "}
                                    </li>
                                    <li className>
                                        {" "}
                                        <a href>E-Coupons</a>{" "}
                                    </li>
                                    <li className>
                                        {" "}
                                        <a href>E-Brands</a>{" "}
                                    </li>
                                    <li className>
                                        {" "}
                                        <a href>Resuse Market</a>{" "}
                                    </li>
                                    <li className>
                                        {" "}
                                        <a href>Lost and Found</a>{" "}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header">
                    <div className="header_lft">
                        <div className="logo">
                            <a href="#">
                                <img src="images/logo.png" />
                            </a>
                        </div>
                        <div className="navigatn">
                            <ul>
                                <li>
                                    <a
                                        href="#"
                                        onClick={this.homeClick}
                                        className="active"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#"> E-Coupons </a>
                                </li>
                                <li>
                                    <a href="#">E-Brands </a>
                                </li>
                                <li>
                                    <a href="#"> Resuse Market </a>
                                </li>
                                <li>
                                    <a href="#"> Lost and Found</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="header_rgt">
                        <div className="flag_div">
                            <img src="images/flag.png" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="txt_box"
                        />
                        <div className="msg_box">
                            <a href="#">
                                <span className="msg_count">100</span>
                            </a>
                        </div>
                        <div className="info_div">
                            <div className="image_div">
                                {" "}
                                <img src="images/pic.png" />{" "}
                            </div>
                            <div onClick={this.showMenu} className="info_div1">
                                <div>
                                    <a>Me</a>

                                    {this.state.showMenu ? (
                                        <div>
                                            <button onClick={this.Logout}>
                                                {" "}
                                                Logout{" "}
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;
