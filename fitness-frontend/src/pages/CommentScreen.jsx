import React from "react";
import "./CommentScreen.css";
import moment from "moment";
import {
  message,
  Breadcrumb,
  Icon,
  Row,
  Col,
  Carousel,
  Card,
  Avatar,
  Dropdown,
  Calendar,
  Tag,
  Form,
  Rate,
  Input,
  Comment,
  Tooltip
} from "antd";
import "antd/dist/antd.css";
import renderHTML from "react-render-html";
const { Meta } = Card;
const { Textarea } = Input;
const postsId = window.location.pathname.split("/")[2];

class CommentSreen extends React.Component {
  state = {
    data: "",
    dataComment: "",
    author: "",
    currentUser: {
      email: "",
      fullName: "",
      id: ""
    },
    vote: 0,
    value: 3,
    commentContent: "",
    likes: 0,
    dislikes: 0,
    action: null,
    color: [
      "magenta",
      "red",
      "volcano",
      "orange",
      "gold",
      "lime",
      "green",
      "cyan",
      "blue",
      "geekblue",
      "purple"
    ]
  };
  like = () => {
    fetch(`http://localhost:3001/:post`);
  };

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: "disliked"
    });
  };

  componentDidMount() {
    /*fetch("http://localhost:3001/users/test", {
      method: "POST"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        console.log("run");
        this.setState({
          currentUser: {
            email: data.data.email,
            fullName: data.data.fullName,
            _id: data.data._id
          }
        });
      })
      .catch(error => {
        console.log(error);
        window.alert(error.message);
      });
*/
    const id = window.sessionStorage.getItem("_id");
    const fullName = window.sessionStorage.getItem("fullName");
    const email = window.sessionStorage.getItem("email");
    fetch(`http://localhost:3001/posts/${postsId}`, {
      credentials: "include",
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.success === true) {
          this.setState({
            data: data.data,
            dataComment: data.dataComment,
            author: data.data.author,
            vote: data.data.vote
          });
        } else {
          message.error(data.message);
        }
      })
      .catch(error => {
        console.log(error);
        message.error(error.message);
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:3001/posts/${postsId}/add-comment`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: this.state.commentContent,
        voteStar: this.state.value
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        window.alert(error.message);
      });
  };

  handleChange = value => {
    this.setState({ value });
  };
  handleContentChange = e => {
    this.setState({
      commentContent: e.target.value
    });
  };
  /*actions = {[
    <span key="comment-basic-like">
      <Tooltip title="Like">
        <Icon
          type="like"
          theme={action === "liked" ? "filled" : "outlined"}
          onClick={this.like}
        />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: "auto" }}>
        {this.state.like ? (likeLocal += this.state.like) : likeLocal}
      </span>
    </span>,
    <span key=' key="comment-basic-dislike"'>
      <Tooltip title="Dislike">
        <Icon
          type="dislike"
          theme={action === "disliked" ? "filled" : "outlined"}
          onClick={this.dislike}
        />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: "auto" }}>{item.dislike}</span>
    </span>,
    <span key="comment-basic-reply-to">Reply to posts</span>
  ]};*/

  render() {
    console.log(this.state);
    var like = 0;

    const { action } = this.state;
    const { value } = this.state;
    const menu = (
      <div
        style={{
          width: 300,
          border: "1px solid #d9d9d9",
          borderRadius: 4,
          backgroundColor: "#e6e6e6"
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <div className="ml-1">Create At:</div>
          <div className="ml-2 " style={{ fontStyle: "oblique" }}>
            {moment(this.state.data.createAt).format("LLLL")}
          </div>
        </div>

        <Calendar
          fullscreen={false}
          value={moment(this.state.data.createAt)}
        ></Calendar>
      </div>
    );
    return (
      <div
        className="ml-5 mr-5 pt-3"
        style={{
          marginTop: "7%"
        }}
      >
        <Breadcrumb separator=">" className="mb-3">
          <Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item">
              <a href="/" style={{ fontSize: "17px" }}>
                <Icon type="home" className="mr-1" />
                Home
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>/</Breadcrumb.Separator>
            <Breadcrumb.Item className="breadcrumb-item">
              <a href="/Blogs" style={{ fontSize: "17px" }}>
                Blogs
              </a>
            </Breadcrumb.Item>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumb-item">
            <a href="" style={{ fontSize: "17px" }}>
              {this.state.data.title}
            </a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col
            span={18}
            className="ml-1"
            style={{
              backgroundColor: "#ededed",
              borderWidth: "1px",
              borderStyle: "solid"
            }}
          >
            <Carousel autoplay className="border">
              {this.state.data.srcUrl
                ? this.state.data.srcUrl.map(i => {
                    return (
                      <div
                        style={{
                          width: "76%",
                          height: "100%"
                        }}
                      >
                        <img
                          src={i}
                          style={{
                            width: "100%",
                            height: "27rem",
                            objectFit: "contain",
                            verticalAlign: "top"
                          }}
                        ></img>
                      </div>
                    );
                  })
                : null}
            </Carousel>
            <Col span={5}>
              {this.state.data.avatar ? (
                <Card
                  cover={
                    <Avatar className="mt-2">
                      <img src={this.state.data.avatar}></img>
                    </Avatar>
                  }
                  className="bg-content"
                  actions={[
                    <a href={"/users/" + this.state.author._id}>
                      <Icon type="profile" key="profile" />
                    </a>,
                    <Dropdown overlay={menu}>
                      <Icon type="calendar" key="calendar" />
                    </Dropdown>
                  ]}
                ></Card>
              ) : (
                <Card
                  className="bg-content"
                  cover={
                    this.state.author.avatar ? (
                      <Avatar
                        size={64}
                        src={this.state.author.avatar}
                        className="center"
                      />
                    ) : (
                      <Avatar size={64} icon="user" className="center" />
                    )
                  }
                  style={{ border: "none" }}
                  actions={[
                    <a href={"/users/" + this.state.author._id}>
                      <Icon type="profile" key="profile" />
                    </a>,
                    <Dropdown overlay={menu}>
                      <Icon type="calendar" key="calendar" />
                    </Dropdown>
                  ]}
                >
                  <Meta
                    title={<div className="center">Author:</div>}
                    description={
                      <div style={{ textAlign: "center" }}>
                        {this.state.author.fullName}
                      </div>
                    }
                    style={{ padding: "0px", margin: "0px" }}
                  ></Meta>
                </Card>
              )}
            </Col>
            <Col span={19} className="pt-4 bg-content">
              <div style={{ width: "100%" }}>
                <div className="mb-2 ml-2">USER POST</div>
                <h2
                  style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  className="mb-4 ml-2"
                >
                  {this.state.data.title}
                </h2>
                <div
                  className="ml-1 mb-5 pb-3 mr-2 content-html"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain"
                  }}
                >
                  {renderHTML(`${this.state.data.content}`)}
                </div>
                <div style={{ float: "right" }} className="mb-2 mr-4">
                  {this.state.vote ? (
                    <div>
                      Average Rate :
                      {" " +
                        (
                          this.state.data.voteAvg /
                          this.state.data.commentNumber
                        ).toFixed(1) +
                        " "}
                      stars
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={
                          this.state.data.vote ? this.state.data.vote : null
                        }
                        className="ml-2 pb-5"
                      ></Rate>
                    </div>
                  ) : null}
                </div>
              </div>
            </Col>
          </Col>
          <Col span={4} style={{ float: "right" }} className="mr-5 ">
            <div className="btn-group-vertical" style={{ width: "100%" }}>
              <button type="button" className="btn btn-secondary button-group">
                Categories:
              </button>
              <button
                type="button"
                className="btn btn-secondary button-group"
                onClick={e => {
                  e.preventDefault();
                  window.location.href = "/search/Boxing";
                }}
              >
                Boxing
              </button>
              <button
                type="button"
                className="btn btn-secondary button-group"
                onClick={e => {
                  e.preventDefault();
                  window.location.href = "/search/Yoga";
                }}
              >
                Yoga
              </button>
              <button
                type="button"
                className="btn btn-secondary button-group"
                onClick={e => {
                  e.preventDefault();
                  window.location.href = "/search/Diet";
                }}
              >
                Diet
              </button>
              <button
                type="button"
                className="btn btn-secondary button-group"
                onClick={e => {
                  e.preventDefault();
                  window.location.href = "/search/Street-Workout";
                }}
              >
                Street Workout
              </button>
              <button
                type="button"
                className="btn btn-secondary button-group"
                onClick={e => {
                  e.preventDefault();
                  window.location.href = "/search/Gym";
                }}
              >
                Gym
              </button>
            </div>
            <div>
              <h4 className="mt-4" style={{ marginBottom: 16 }}>
                Relative Tags:
              </h4>
              <div>
                {this.state.data.tag
                  ? this.state.data.tag.map(item => {
                      return (
                        <Tag
                          style={{ fontSize: "20px" }}
                          color={
                            this.state.color[Math.ceil(Math.random() * 10)]
                          }
                        >
                          <a href={"/search/" + item}> {item}</a>
                        </Tag>
                      );
                    })
                  : null}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="ml-1 mt-3 mb-4">
          <Col span={18}>
            <Row>
              {this.state.dataComment
                ? this.state.dataComment.map(item => {
                    return (
                      <div>
                        <Comment
                          author={<a>{item.author.fullName}</a>}
                          avatar={
                            item.author.avatar ? (
                              <Avatar src={item.author.avatar} alt="Avatar" />
                            ) : (
                              <Avatar
                                src={<Icon type="profile" key="profile"></Icon>}
                                alt="Avatar"
                              />
                            )
                          }
                          content={
                            <div>
                              {item.content}
                              <div
                                className="mb-3 mr-2"
                                style={{ float: "right" }}
                              >
                                Rate:
                                <Rate
                                  disabled
                                  defaultValue={item.voteStar}
                                  className="ml-2"
                                ></Rate>
                              </div>
                            </div>
                          }
                          datetime={
                            <Tooltip
                              title={moment().format("YYYY-MM-DD HH:mm:ss")}
                            >
                              <span>{moment(item.createAt).fromNow()}</span>
                            </Tooltip>
                          }
                          className="border-comment"
                        ></Comment>
                      </div>
                    );
                  })
                : null}
            </Row>
            <Row
              style={{ borderWidth: "0.5px", borderStyle: "dashed" }}
              className="pl-3 pr-3"
            >
              {window.sessionStorage._id && window.sessionStorage.email ? (
                <Form onSubmit={this.handleSubmit} id="comment-form">
                  <Form.Item className="form-group mt-3">
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                      class="form-control"
                      rows="5"
                      id="comment"
                      required
                      maxLength={500}
                      onChange={this.handleContentChange}
                      value={this.state.commentContent}
                    ></textarea>
                    <Form.Item label="Rate">
                      <Rate
                        id="rate"
                        onChange={this.handleChange}
                        value={value}
                      />
                    </Form.Item>
                    <Form.Item>
                      <button
                        type="submit"
                        className="mt-2 mb-2 btn btn-primary"
                        style={{ float: "right" }}
                      >
                        Add Comment
                      </button>
                    </Form.Item>
                  </Form.Item>
                </Form>
              ) : (
                <a className="form-group" href="/login">
                  <label htmlFor="comment">Comment:</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    id="comment"
                    disabled
                    placeholder="Please sign in to comment"
                  ></textarea>
                </a>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CommentSreen;
