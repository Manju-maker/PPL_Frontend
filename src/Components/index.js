import { Link } from "react-router-dom";
import React from "react";
import moment from "moment";
import { includes, orderBy, uniqBy, filter } from "lodash";
import callApi from "./Utilities/callApi";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imageupload: "",
            cat: "",
            picture: [],
            filteredPost: [],
            Category: [],
            showForm: false,
            query: {
                fields: {
                    _id: 1,
                    comment: 1,
                    likes: 1,
                    email: 1,
                    cat: 1,
                    imageupload: 1,
                    path: 1,
                    userId: 1,
                    uploadTime: 1
                },
                filter: {},
                option: { skip: 0, limit: 0, sort: { uploadTime: -1 } }
            }
        };
    }
    componentDidMount() {
        if (localStorage.getItem("tokenID") != null) {
            this.userToken = JSON.parse(
                localStorage.getItem("tokenID")
            )[1].token;
            let headers = {
                Accept: "application/json",
                Authorization: `Bearer ${this.userToken}`
            };
            console.log(headers);
            callApi(
                "get",
                `timeline/getPostData?params=${encodeURI(
                    JSON.stringify(this.state.query)
                )}`,
                {},
                headers
            )
                .then(response => {
                    this.setState(
                        {
                            Category: response.data,
                            picture: response.data,
                            filteredPost: response.data
                        },
                        () => {
                            this.setState({
                                Category: uniqBy(this.state.Category, "cat")
                            });
                        }
                    );
                })
                .catch(err => {
                    console.log("Err--", err);
                    if (err.response.status === 401) {
                        localStorage.removeItem("tokenID");
                        this.props.history.push("/login");
                    }
                });
        } else {
            this.props.history.push("/login");
        }
    }
    handleChange = e => {
        let { value, name, files } = e.target;
        if (files != null) {
            this.setState({ imageupload: files[0] });
        } else {
            this.setState({
                [name]: value
            });
        }
    };
    submitform = e => {
        e.preventDefault();
        let id = JSON.parse(localStorage.getItem("tokenID"))[0]._id;
        let formData = new FormData();
        formData.append("email", this.state.email);
        formData.append("userId", id);
        formData.append("cat", this.state.cat.toUpperCase());
        formData.append("imageupload", this.state.imageupload);

        let headers = {
            Accept: "application/json",
            Authorization: `Bearer ${this.userToken}`
        };

        callApi("post", "timeline/imageUpload", formData, headers)
            .then(response => {
                this.setState(
                    {
                        picture: response.data,
                        Category: response.data,
                        filteredPost: response.data
                    },
                    () => {
                        this.setState({
                            Category: uniqBy(this.state.Category, "cat")
                        });
                    }
                );
            })
            .catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem("tokenID");
                    this.props.history.push("./login");
                }
            });
        this.setState({ showForm: !this.state.showForm });
    };

    showForm = e => {
        return (
            <div>
                <form onSubmit={this.submitform}>
                    Username:
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="email"
                        required
                    />
                    <br></br>
                    <br></br>
                    <input
                        type="file"
                        name="imageupload"
                        onChange={this.handleChange}
                        required
                    />
                    <br></br>
                    <br></br>
                    Category:
                    <input
                        type="text"
                        name="cat"
                        onChange={this.handleChange}
                        required
                    />
                    <br></br>
                    <br></br>
                    <input type="submit" value="upload" />
                </form>
            </div>
        );
    };

    handleClick = e => {
        e.preventDefault();
        this.setState({ showForm: !this.state.showForm });
    };

    latestFirst = e => {
        let latestPost = orderBy(this.state.picture, "uploadTime", "desc");
        this.setState({ filteredPost: latestPost });
    };

    oldestFirst = e => {
        let oldestPost = orderBy(this.state.picture, "uploadTime", "asc");
        this.setState({ filteredPost: oldestPost });
    };

    mostCommented = e => {
        let headers = {
            Accept: "application/json",
            Authorization: `Bearer ${this.userToken}`
        };

        callApi("get", "timeline/mostCommented", {}, headers)
            .then(response => {
                this.setState({ filteredPost: response.data });
            })
            .catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem("tokenID");
                    this.props.history.push("/login");
                }
            });
    };
    clickLike = (id, likes_id, e) => {
        e.preventDefault();
        let myData = {
            userId: JSON.parse(localStorage.getItem("tokenID"))[0]._id,
            imageId: id
        };
        let headers = {
            Accept: "application/json",
            Authorization: `Bearer ${this.userToken}`
        };
        if (!includes(likes_id, myData.userId)) {
            callApi(
                "post",
                `timeline/Likes?params=${this.state.query}`,
                myData,
                headers
            )
                .then(response => {
                    this.setState({ picture: response.data });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    categoryPost = (singleCategory, e) => {
        console.log("called---", singleCategory);
        e.preventDefault();
        var commonCategory = filter(this.state.picture, category => {
            return category.cat == singleCategory;
        });
        console.log("myPost---", commonCategory);
        this.setState({ filteredPost: commonCategory });
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="content">
                        <div className="content_rgt">
                            <div className="rght_btn">
                                {" "}
                                <span className="rght_btn_icon">
                                    <img src="/images/btn_iconb.png" alt="up" />
                                </span>{" "}
                                <span className="btn_sep">
                                    <img src="/images/btn_sep.png" alt="sep" />
                                </span>
                                <a href="#" onClick={this.handleClick}>
                                    Upload Post
                                </a>{" "}
                            </div>
                            <div className="rght_btn">
                                {" "}
                                <span className="rght_btn_icon">
                                    <img src="/images/btn_icona.png" alt="up" />
                                </span>{" "}
                                <span className="btn_sep">
                                    <img src="images/btn_sep.png" alt="sep" />
                                </span>{" "}
                                <a href="#">Invite Friends</a>{" "}
                            </div>
                            <div className="rght_cate">
                                <div className="rght_cate_hd" id="rght_cat_bg">
                                    Categories
                                </div>
                                <div className="rght_list">
                                    <ul>
                                        {this.state.Category.length > 0 &&
                                            this.state.Category.map(cat => {
                                                return (
                                                    <div className="rght_list">
                                                        <ul>
                                                            <li>
                                                                <a
                                                                    href="#"
                                                                    onClick={e => {
                                                                        this.categoryPost(
                                                                            cat.cat,
                                                                            e
                                                                        );
                                                                    }}
                                                                    style={{
                                                                        color:
                                                                            "black",
                                                                        fontSize: 20
                                                                    }}
                                                                >
                                                                    <span className="list_icon">
                                                                        <img
                                                                            style={{
                                                                                width: 50,
                                                                                height: 50
                                                                            }}
                                                                            src={`http://localhost:8081/${cat.imageupload}`}
                                                                        />
                                                                    </span>
                                                                    {cat.cat}
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                            <div className="rght_cate">
                                <div className="rght_cate_hd" id="opn_cat_bg">
                                    Featured
                                </div>
                                <div className="sub_dwn">
                                    <div className="feat_sec">
                                        <div className="feat_sec_img">
                                            <img
                                                src="/images/feat_img1.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="feat_txt">
                                            Lorem Ipusum Text
                                        </div>
                                        <div className="btm_rgt">
                                            <div className="btm_arc">Cats</div>
                                        </div>
                                    </div>
                                    <div className="feat_sec">
                                        <div className="feat_sec_img">
                                            <img
                                                src="/images/feat_img2.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="feat_txt">
                                            Lorem Ipusum Text
                                        </div>
                                        <div className="btm_rgt">
                                            <div className="btm_arc">Dogs</div>
                                        </div>
                                    </div>
                                    <div className="feat_sec">
                                        <div className="feat_sec_img">
                                            <img
                                                src="/images/feat_img3.png"
                                                alt="image"
                                            />
                                        </div>
                                        <div className="feat_txt">
                                            Lorem Ipusum Text
                                        </div>
                                        <div className="btm_rgt">
                                            <div className="btm_arc">
                                                Rabbits
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content_lft">
                            <div className="contnt_1">
                                <div className="list_1">
                                    <ul>
                                        <li>
                                            <input
                                                type="checkbox"
                                                className="chk_bx"
                                            />
                                            Friends
                                        </li>
                                        <li>
                                            <input
                                                type="checkbox"
                                                className="chk_bx"
                                            />
                                            Flaged
                                        </li>
                                    </ul>
                                </div>
                                <div className="post_div">
                                    <div className="post_list">
                                        <ul>
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={this.latestFirst}
                                                >
                                                    <span className="list_img">
                                                        <img src="/images/img_1.png" />
                                                    </span>
                                                    Latest First
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={this.oldestFirst}
                                                >
                                                    <span className="list_img">
                                                        <img src="/images/img_2.png" />
                                                    </span>
                                                    Oldest First
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="list_img">
                                                        <img src="/images/img_3.png" />
                                                    </span>
                                                    Most Pet
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="list_img">
                                                        <img src="/images/img_4.png" />
                                                    </span>
                                                    Most Clicks
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={this.mostCommented}
                                                >
                                                    <span className="list_img">
                                                        <img src="/images/img_5.png" />
                                                    </span>
                                                    Most Commented
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="post_txt">
                                        4 New Post Updates
                                    </div>
                                </div>
                            </div>
                            <div>
                                {this.state.showForm ? this.showForm() : null}
                                <h1>
                                    {this.state.filteredPost.length > 0 &&
                                        this.state.filteredPost.map(pic => {
                                            return (
                                                <div>
                                                    <div className="contnt_2">
                                                        <div className="div_a">
                                                            <div className="div_title">
                                                                User Interface
                                                                PSD Source files
                                                                Web Designing
                                                                for web
                                                            </div>
                                                            <div className="btm_rgt">
                                                                <div className="btm_arc">
                                                                    {pic.cat}
                                                                </div>
                                                            </div>
                                                            <div className="div_top">
                                                                <div className="div_top_lft">
                                                                    <img src="/images/img_6.png" />
                                                                    {pic.email}
                                                                </div>
                                                                <div className="div_top_rgt">
                                                                    <span className="span_date">
                                                                        {moment(
                                                                            pic.uploadTime
                                                                        ).format(
                                                                            "MMMM Do YYYY"
                                                                        )}
                                                                    </span>
                                                                    <span className="span_time">
                                                                        {moment(
                                                                            pic.uploadTime
                                                                        ).format(
                                                                            "h:mm:ss a"
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Link
                                                        to={`/myPost/${pic._id}`}
                                                    >
                                                        <img
                                                            style={{
                                                                width: 400,
                                                                height: 300
                                                            }}
                                                            src={`http://localhost:8081/${pic.imageupload}`}
                                                        />
                                                    </Link>{" "}
                                                    <div className="div_btm">
                                                        <div className="btm_list">
                                                            <ul>
                                                                <li>
                                                                    <a href="#">
                                                                        <span className="btn_icon">
                                                                            <img
                                                                                src="/images/icon_001.png"
                                                                                alt="share"
                                                                            />
                                                                        </span>
                                                                        Share
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        <span className="btn_icon">
                                                                            <img
                                                                                src="/images/icon_002.png"
                                                                                alt="share"
                                                                            />
                                                                        </span>
                                                                        Flag
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        onClick={e =>
                                                                            this.clickLike(
                                                                                pic._id,
                                                                                pic.likes,
                                                                                e
                                                                            )
                                                                        }
                                                                    >
                                                                        <span className="btn_icon">
                                                                            <img
                                                                                src="/images/icon_003.png"
                                                                                alt="share"
                                                                            />
                                                                        </span>
                                                                        {
                                                                            pic
                                                                                .likes
                                                                                .length
                                                                        }{" "}
                                                                        Like
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        to={`/myPost/${pic._id}`}
                                                                    >
                                                                        <a href="#">
                                                                            <span className="btn_icon">
                                                                                <img
                                                                                    src="/images/icon_004.png"
                                                                                    alt="share"
                                                                                />
                                                                            </span>
                                                                            {
                                                                                pic
                                                                                    .comment
                                                                                    .length
                                                                            }{" "}
                                                                            Comments
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="clear" />
                </div>
            </div>
        );
    }
}

export default Index;
