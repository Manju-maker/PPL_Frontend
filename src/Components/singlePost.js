import { Route } from "react-router-dom";
import React from "react";
import axios from "axios";
import callApi from "./Utilities/callApi";

class SinglePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            noOfComment: "",
            cat: "",
            Category: [],
            comment: "",
            pictureComment: [],
            imageupload: "",
            username: "",
            email: "",
            like: [],
            query: {
                fields: {},
                filter: { _id: this.props.match.params.picname },
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

            callApi(
                "get",
                `timeline/getPostData?params=${JSON.stringify(
                    this.state.query
                )}`,
                {},
                headers
            )
                .then(response => {
                    this.setState({
                        Category: response.data,
                        pictureComment: response.data[0].comment,
                        like: response.data[0].likes
                    });
                    console.log("After axios-----");

                    this.setState({
                        imageupload: this.state.Category[0].imageupload
                    });
                    this.setState({ email: this.state.Category[0].email });
                    this.setState({
                        noOfComment: this.state.Category[0].comment.length
                    });
                    this.setState({ cat: this.state.Category[0].cat });
                })
                .catch(err => {
                    console.log("errrrr>>>>>>", err);
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
        this.setState({ comment: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        let headers = {
            Accept: "application/json",
            Authorization: `Bearer ${this.userToken}`
        };

        callApi(
            "post",
            `timeline/uploadComment?params=${JSON.stringify(this.state.query)}`,
            this.state,
            headers
        )
            .then(response => {
                console.log("res--", response.data[0].comment.length);
                this.setState({
                    pictureComment: response.data[0].comment,
                    username: response.data[0].email,
                    noOfComment: response.data[0].comment.length
                });
            })
            .catch(err => {
                console.log("err---", err);
                if (err.response.status === 401) {
                    localStorage.removeItem("tokenID");
                    this.props.history.push("/login");
                }
            });
        this.setState({ comment: "" });
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="content">
                        <div className="content_rgt">
                            <div className="rght_btn">
                                <a href="#">Upload Post</a>{" "}
                            </div>
                            <div className="rght_btn">
                                <a href="#">Upload Category</a>{" "}
                            </div>
                            <div className="rght_cate">
                                <div className="rght_cate_hd" id="rght_cat_bg">
                                    Categories
                                </div>
                                <div className="rght_list">
                                    {this.state.Category.length > 0
                                        ? this.state.Category.map(cate => {
                                              return (
                                                  <div className="rght_list">
                                                      <ul>
                                                          <li>
                                                              <a
                                                                  href="#"
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
                                                                          src={`http://localhost:8081/${cate.imageupload}`}
                                                                      />
                                                                  </span>
                                                                  {cate.cat}
                                                              </a>
                                                          </li>
                                                      </ul>
                                                  </div>
                                              );
                                          })
                                        : ""}
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
                            <div className="contnt_2">
                                <div className="div_a">
                                    <div className="div_title">
                                        User Interface PSD Source files Web
                                        Designing for web
                                    </div>
                                    <div className="btm_rgt">
                                        <div className="btm_arc">
                                            {this.state.cat}
                                        </div>
                                    </div>
                                    <div className="div_top">
                                        <div className="div_top_lft">
                                            <img src="/images/img_6.png" />
                                            {this.state.email}
                                        </div>
                                        <div className="div_top_rgt">
                                            <span className="span_date">
                                                {new Date().getDate() +
                                                    "-" +
                                                    (new Date().getMonth() +
                                                        1) +
                                                    "-" +
                                                    new Date().getFullYear()}
                                            </span>
                                            <span className="span_time">
                                                {new Date().getHours() +
                                                    ":" +
                                                    new Date().getMinutes() +
                                                    "pm"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="div_image">
                                        <img
                                            src={`http://localhost:8081/${this.state.imageupload}`}
                                            alt="abc"
                                        />
                                    </div>
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
                                                    <a href="#">
                                                        <span className="btn_icon">
                                                            <img
                                                                src="/images/icon_003.png"
                                                                alt="share"
                                                            />
                                                        </span>
                                                        {this.state.like.length}{" "}
                                                        Likes
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span className="btn_icon">
                                                            <img
                                                                src="/images/icon_004.png"
                                                                alt="share"
                                                            />
                                                        </span>
                                                        {this.state.noOfComment}{" "}
                                                        Comments
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contnt_3">
                                <ul>
                                    <div>
                                        {this.state.pictureComment.length > 0
                                            ? this.state.pictureComment.map(
                                                  comm => {
                                                      return (
                                                          <div>
                                                              <li>
                                                                  <div className="list_image">
                                                                      <div className="image_sec">
                                                                          <img src="/images/post_img.png" />
                                                                      </div>
                                                                      <div className="image_name">
                                                                          <div>
                                                                              {
                                                                                  this
                                                                                      .state
                                                                                      .email
                                                                              }
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                                  <div className="list_info">
                                                                      {comm}
                                                                  </div>
                                                                  <input
                                                                      type="button"
                                                                      defaultValue="Reply"
                                                                      className="orng_btn"
                                                                  />
                                                              </li>
                                                          </div>
                                                      );
                                                  }
                                              )
                                            : ""}
                                    </div>

                                    <li>
                                        <div className="cmnt_div1">
                                            <form
                                                onSubmit={this.handleSubmit}
                                                type="Submit"
                                            >
                                                <input
                                                    onChange={this.handleChange}
                                                    value={this.state.comment}
                                                    name="comment"
                                                    type="text"
                                                    placeholder="Enter your Comment"
                                                    className="cmnt_bx1"
                                                    required
                                                />
                                                <input
                                                    type="Submit"
                                                    className="sub_bttn1"
                                                    defaultValue="Submit Comment"
                                                />
                                            </form>
                                        </div>
                                    </li>
                                </ul>
                                <div className="view_div">
                                    <a href="#">View more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clear" />
                </div>
            </div>
        );
    }
}
export default SinglePost;
