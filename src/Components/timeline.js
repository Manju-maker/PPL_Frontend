import { Link } from "react-router-dom";
import { includes, uniqBy, filter } from "lodash";
import React from "react";
import $ from "jquery";
import moment from "moment";
import callApi from "./Utilities/callApi";
class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imageupload: "",
            userId: "",
            picture: [],
            filteredPost: [],
            cat: "",
            Category: [],
            showForm: false,
            count: 0,
            query: {
                fields: {},
                filter: {},
                option: { skip: 0, limit: 2, sort: { uploadTime: -1 } }
            }
        };
    }

    componentDidMount() {
        if (localStorage.getItem("tokenID") != null) {
            this.userToken = JSON.parse(
                localStorage.getItem("tokenID")
            )[1].token;
            this.userId = JSON.parse(localStorage.getItem("tokenID"))[0]._id;
            let headers = {
                Accept: "application/json",
                Authorization: `Bearer ${this.userToken}`
            };
            callApi("get", "timeline/count", {}, headers).then(response => {
                console.log("count------", response.data.count);
                this.setState({ count: response.data.count });
                console.log("count------", this.state.count);
                this.getAllPosts();
            });

            $(window).scroll(this.scrollPaging);
        } else {
            this.props.history.push("/login");
        }
    }
    componentWillUnmount() {
        $(window).unbind("scroll");
    }

    scrollPaging = () => {
        const windowScrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();
        const scrollHeight = windowHeight + windowScrollTop;
        const fetchNewDataHeight = 0;
        if (scrollHeight + fetchNewDataHeight > documentHeight) {
            if (
                this.state.query.option.skip + this.state.query.option.limit <
                this.state.count
            ) {
                this.state.query.option.skip += this.state.query.option.limit;
                this.getAllPosts();
                console.log("Scrolled");
            }
        }
    };

    getAllPosts = () => {
        let headers = {
            Accept: "application/json",
            Authorization: `Bearer ${this.userToken}`
        };
        this.state.query.filter = {
            ...this.state.query.filter,
            userId: this.userId
        };
        callApi(
            "get",
            `timeline/getPostData?params=${JSON.stringify(this.state.query)}`,
            {},
            headers
        )
            .then(response => {
                this.setState(
                    {
                        Category: this.state.Category.concat(response.data),
                        picture: this.state.picture.concat(response.data),
                        filteredPost: this.state.filteredPost.concat(
                            response.data
                        )
                    },
                    () => {
                        this.setState({
                            Category: uniqBy(this.state.Category, "cat")
                        });
                    }
                );
            })
            .catch(err => {
                console.log("err", err);
                if (err.response.status === 401) {
                    localStorage.removeItem("tokenID");
                    this.props.history.push("/login");
                }
            });
    };

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
        let filter = { userId: id };

        let formData = new FormData();
        formData.append("email", this.state.email);
        formData.append("userId", id);
        formData.append("cat", this.state.cat.toUpperCase());
        formData.append("imageupload", this.state.imageupload);
        formData.append("filter", JSON.stringify(filter));

        let headers = {
            Accept: "application/json",
            Authorization: `Bearer ${this.userToken}`
        };

        callApi("post", "timeline/imageUpload", formData, headers)
            .then(response => {
                this.setState(
                    {
                        picture: response.data,
                        filteredPost: response.data,
                        Category: response.data
                    },
                    () => {
                        this.setState({
                            Category: uniqBy(this.state.Category, "cat")
                        });
                    }
                );
            })
            .catch(err => {
                console.log("err----", err);
                // localStorage.removeItem("tokenID");
                // this.props.history.push("/login");
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
                    />{" "}
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

    clickLike = (id, likes_id, e) => {
        console.log("e---", e);
        e.preventDefault();
        let myData = {
            userId: JSON.parse(localStorage.getItem("tokenID"))[0]._id,
            imageId: id,
            filter: { _id: JSON.parse(localStorage.getItem("tokenID"))[0]._id }
        };
        let headers = {
            Accept: "application/json",
            Authorization: `Bearer ${this.userToken}`
        };
        if (!includes(likes_id, myData.userId)) {
            callApi("post", "timeline/Likes", myData, headers)
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
            <div className="container">
                <div className="content">
                    <div className="content_rgt">
                        <div className="rght_btn">
                            {" "}
                            <span className="rght_btn_icon">
                                <img src="images/btn_iconb.png" alt="up" />
                            </span>{" "}
                            <span className="btn_sep">
                                <img src="images/btn_sep.png" alt="sep" />
                            </span>
                            <a href="#" onClick={this.handleClick}>
                                Upload Post
                            </a>{" "}
                        </div>

                        <div className="rght_btn">
                            {" "}
                            <span className="rght_btn_icon">
                                <img src="images/btn_icona.png" alt="up" />
                            </span>{" "}
                            <span className="btn_sep">
                                <img src="images/btn_sep.png" alt="sep" />
                            </span>
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
                                                              onClick={e =>
                                                                  this.categoryPost(
                                                                      cate.cat,
                                                                      e
                                                                  )
                                                              }
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
                                            src="images/feat_img1.png"
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
                                            src="images/feat_img2.png"
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
                                            src="images/feat_img3.png"
                                            alt="image"
                                        />
                                    </div>
                                    <div className="feat_txt">
                                        Lorem Ipusum Text
                                    </div>
                                    <div className="btm_rgt">
                                        <div className="btm_arc">Rabbits</div>
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
                            <div className="timeline_div">
                                <div className="timeline_div1">
                                    <div className="profile_pic">
                                        <img src="images/timeline_img1.png" />
                                        <div className="profile_text">
                                            <a href="#">Change Profile Pic</a>
                                        </div>
                                    </div>
                                    <div className="profile_info">
                                        <div className="edit_div">
                                            <a href="#">
                                                Edit{" "}
                                                <img src="images/timeline_img.png" />
                                            </a>
                                        </div>
                                        <div className="profile_form">
                                            <ul>
                                                <li>
                                                    <div className="div_name1">
                                                        Name :
                                                    </div>
                                                    <div className="div_name2"></div>
                                                </li>
                                                <li>
                                                    <div className="div_name1">
                                                        Sex :
                                                    </div>
                                                    <div className="div_name2">
                                                        Female
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="div_name1">
                                                        Description :
                                                    </div>
                                                    <div className="div_name3">
                                                        This is an example of a
                                                        comment. You can create
                                                        as many comments like
                                                        this one or sub comments
                                                        as you like and manage
                                                        all of your content
                                                        inside Account.
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="timeline_div2">
                                    <ul>
                                        <li>
                                            <a href="#" className="active">
                                                Timeline{" "}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">About </a>
                                        </li>
                                        <li>
                                            <a href="#">Album</a>
                                        </li>
                                        <li>
                                            <a href="#"> Pets</a>
                                        </li>
                                        <li>
                                            <a href="#">My Uploads </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            {this.state.showForm ? this.showForm() : null}

                            <h1>
                                {this.state.filteredPost.length > 0
                                    ? this.state.filteredPost.map(pic => {
                                          return (
                                              <div>
                                                  <div className="contnt_2">
                                                      <div className="div_a">
                                                          <div className="div_title">
                                                              User Interface PSD
                                                              Source files Web
                                                              Designing for web
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
                                                                      Likes
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
                                      })
                                    : ""}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Timeline;
