import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imageupload: "",
            userId: "",
            cat: "",
            toggle: false,
            mostCommented: [],
            picture: [],
            Category: [],
            date: new Date(),
            bool: false,
            showForm: false
        };
    }

    componentWillMount() {
        if (localStorage.getItem("tokenID")) {
            this.props.history.push("/index");
        } else {
            this.props.history.push("/login");
        }
    }
    componentDidMount() {
        axios
            .post("http://localhost:8081/timeline/getAllPost", this.state)
            .then(response => {
                // console.log("Categories--",typeof(response.data));
                this.setState({ Category: response.data });
                this.setState({ picture: response.data });
                //  console.log("array of cat",tthis.state.Category);
            });
    }
    handlechange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    };
    handleFile = e => {
        this.setState({ imageupload: e.target.files[0] }, () => {});
    };

    submitform = e => {
        e.preventDefault();
        let id = localStorage.getItem("tokenID");
        let formData = new FormData();
        formData.append("email", this.state.email);
        formData.append("userId", id);
        formData.append("cat", this.state.cat);
        formData.append("imageupload", this.state.imageupload);
        axios
            .post("http://localhost:8081/timeline/imageupload", formData)
            .then(response => {
                this.setState({ picture: response.data });
                console.log("Picture--", this.state.picture);
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
                        onChange={this.handlechange}
                        name="email"
                        required
                    />
                    <br></br>
                    <br></br>
                    <input
                        type="file"
                        name="imageupload"
                        onChange={this.handleFile}
                        required
                    />
                    <br></br>
                    <br></br>
                    Category:
                    <input
                        type="text"
                        name="cat"
                        onChange={this.handlechange}
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
        if (this.state.bool === false) {
            this.setState({ toggle: false });
            this.setState({ picture: this.state.picture.reverse() });
        }
        this.setState({ bool: true });
    };

    oldestFirst = e => {
        if (this.state.bool === true) {
            this.setState({ toggle: false });
            this.setState({ picture: this.state.picture.reverse() });
        }
        this.setState({ bool: false });
    };

    mostCommented = e => {
        axios
            .post("http://localhost:8081/timeline/mostCommented")
            .then(response => {
                this.setState({ toggle: true });
                this.setState({ mostCommented: response.data });

                // console.log(response.data)
            });
        //console.log("bool",this.state.bool)
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
                                </span>{" "}
                                <a href="#">Invite Friends</a>{" "}
                            </div>
                            <div className="rght_cate">
                                <div className="rght_cate_hd" id="rght_cat_bg">
                                    Categories
                                </div>
                                <div className="rght_list">
                                    <ul>
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
                                                        <img src="images/img_1.png" />
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
                                                        <img src="images/img_2.png" />
                                                    </span>
                                                    Oldest First
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="list_img">
                                                        <img src="images/img_3.png" />
                                                    </span>
                                                    Most Pet
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="list_img">
                                                        <img src="images/img_4.png" />
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
                                                        <img src="images/img_5.png" />
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
                                {this.state.toggle === false ? (
                                    <h1>
                                        {this.state.picture.length > 0
                                            ? this.state.picture.map(pic => {
                                                  return (
                                                      <div>
                                                          <div className="contnt_2">
                                                              <div className="div_a">
                                                                  <div className="div_title">
                                                                      User
                                                                      Interface
                                                                      PSD Source
                                                                      files Web
                                                                      Designing
                                                                      for web
                                                                  </div>
                                                                  <div className="btm_rgt">
                                                                      <div className="btm_arc">
                                                                          {
                                                                              pic.cat
                                                                          }
                                                                      </div>
                                                                  </div>
                                                                  <div className="div_top">
                                                                      <div className="div_top_lft">
                                                                          <img src="images/img_6.png" />
                                                                          {
                                                                              pic.email
                                                                          }
                                                                      </div>
                                                                      <div className="div_top_rgt">
                                                                          <span className="span_date">
                                                                              {pic.uploadTime.slice(
                                                                                  0,
                                                                                  10
                                                                              )}
                                                                          </span>
                                                                          <span className="span_time">
                                                                              {pic.uploadTime.slice(
                                                                                  11,
                                                                                  16
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
                                                                                      src="images/icon_001.png"
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
                                                                                      src="images/icon_002.png"
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
                                                                                      src="images/icon_003.png"
                                                                                      alt="share"
                                                                                  />
                                                                              </span>
                                                                              0
                                                                              Likes
                                                                          </a>
                                                                      </li>
                                                                      <li>
                                                                          <a href="#">
                                                                              <span className="btn_icon">
                                                                                  <img
                                                                                      src="images/icon_004.png"
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
                                                                      </li>
                                                                  </ul>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  );
                                              })
                                            : ""}
                                    </h1>
                                ) : (
                                    <h1>
                                        {this.state.mostCommented.length > 0
                                            ? this.state.mostCommented.map(
                                                  pic => {
                                                      return (
                                                          <div>
                                                              <div className="contnt_2">
                                                                  <div className="div_a">
                                                                      <div className="div_title">
                                                                          User
                                                                          Interface
                                                                          PSD
                                                                          Source
                                                                          files
                                                                          Web
                                                                          Designing
                                                                          for
                                                                          web
                                                                      </div>
                                                                      <div className="btm_rgt">
                                                                          <div className="btm_arc">
                                                                              {
                                                                                  pic.cat
                                                                              }
                                                                          </div>
                                                                      </div>
                                                                      <div className="div_top">
                                                                          <div className="div_top_lft">
                                                                              <img src="images/img_6.png" />
                                                                              {
                                                                                  pic.email
                                                                              }
                                                                          </div>
                                                                          <div className="div_top_rgt">
                                                                              <span className="span_date">
                                                                                  {pic.uploadTime.slice(
                                                                                      0,
                                                                                      10
                                                                                  )}
                                                                              </span>
                                                                              <span className="span_time">
                                                                                  {pic.uploadTime.slice(
                                                                                      11,
                                                                                      16
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
                                                                                          src="images/icon_001.png"
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
                                                                                          src="images/icon_002.png"
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
                                                                                          src="images/icon_003.png"
                                                                                          alt="share"
                                                                                      />
                                                                                  </span>

                                                                                  0
                                                                                  Likes
                                                                              </a>
                                                                          </li>
                                                                          <li>
                                                                              <a href="#">
                                                                                  <span className="btn_icon">
                                                                                      <img
                                                                                          src="images/icon_004.png"
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
                                                                          </li>
                                                                      </ul>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      );
                                                  }
                                              )
                                            : ""}
                                    </h1>
                                )}
                            </div>

                            <div className="contnt_2">
                                <div className="div_a">
                                    <div className="div_title">
                                        User Interface PSD Source files Web
                                        Designing for web
                                    </div>
                                    <div className="btm_rgt">
                                        <div className="btm_arc">Cats</div>
                                    </div>
                                    <div className="div_top">
                                        <div className="div_top_lft">
                                            <img src="images/img_6.png" />
                                            Steave Waugh
                                        </div>
                                        <div className="div_top_rgt">
                                            <span className="span_date">
                                                02 Jan 2014
                                            </span>
                                            <span className="span_time">
                                                11:15am
                                            </span>
                                        </div>
                                    </div>
                                    <div className="div_image">
                                        <img
                                            src="images/lft_img.png"
                                            alt="pet"
                                        />
                                    </div>
                                    <div className="div_btm">
                                        <div className="btm_list">
                                            <ul>
                                                <li>
                                                    <a href="#">
                                                        <span className="btn_icon">
                                                            <img
                                                                src="images/icon_001.png"
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
                                                                src="images/icon_002.png"
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
                                                                src="images/icon_004.png"
                                                                alt="share"
                                                            />
                                                        </span>
                                                        Comments
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span className="btn_icon">
                                                            <img
                                                                src="images/icon_003.png"
                                                                alt="share"
                                                            />
                                                        </span>
                                                        Likes
                                                    </a>
                                                </li>
                                                <div
                                                    className="like_count"
                                                    style={{
                                                        marginRight: "10px"
                                                    }}
                                                ></div>
                                                <li>
                                                    <a href="#">
                                                        <span className="btn_icon">
                                                            <img
                                                                src="images/icon_003.png"
                                                                alt="share"
                                                            />
                                                        </span>
                                                        Unlike
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contnt_2">
                                <div className="div_a">
                                    <div className="div_title">
                                        User Interface PSD Source files Web
                                        Designing for web
                                    </div>
                                    <div className="btm_rgt">
                                        <div className="btm_arc">Dogs</div>
                                    </div>
                                    <div className="div_top">
                                        <div className="div_top_lft">
                                            <img src="images/img_6.png" />
                                            Steave Waugh
                                        </div>
                                        <div className="div_top_rgt">
                                            <span className="span_date">
                                                02 Jan 2014
                                            </span>
                                            <span className="span_time">
                                                11:15am
                                            </span>
                                        </div>
                                    </div>
                                    <div className="div_image">
                                        <img
                                            src="images/lft_img1.png"
                                            alt="pet"
                                        />
                                    </div>
                                    <div className="div_btm">
                                        <div className="btm_list">
                                            <ul>
                                                <li>
                                                    <a href="#">
                                                        <span className="btn_icon">
                                                            <img
                                                                src="images/icon_001.png"
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
                                                                src="images/icon_002.png"
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
                                                                src="images/icon_004.png"
                                                                alt="share"
                                                            />
                                                        </span>
                                                        Comments
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span className="btn_icon">
                                                            <img
                                                                src="images/icon_003.png"
                                                                alt="share"
                                                            />
                                                        </span>
                                                        Likes
                                                    </a>
                                                </li>
                                                <div
                                                    className="like_count"
                                                    style={{
                                                        marginRight: "10px"
                                                    }}
                                                ></div>
                                                <li>
                                                    <a href="#">
                                                        <span className="btn_icon">
                                                            <img
                                                                src="images/icon_003.png"
                                                                alt="share"
                                                            />
                                                        </span>
                                                        Unlike
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
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

export default Index;
