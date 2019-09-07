import React from "react";
import Moment from "react-moment";
import _ from "lodash";
import {
  Breadcrumb,
  Icon,
  Modal,
  Input,
  Upload,
  message,
  Tag,
  Row,
  Col,
  Carousel,
  Card,
  Avatar,
  Pagination,
  AutoComplete,
  Button
} from "antd";
import "./BlogScreen.css";
import "antd/dist/antd.css";
import { TweenOneGroup } from "rc-tween-one";

const { TextArea, Search } = Input;
const { Option } = AutoComplete;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function onSelect(value) {
  console.log("onSelect", value);
}

/*function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
  return new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((item, idx) => ({
      query,
      category: `${query}${idx}`,
      count: getRandomInt(200, 100)
    }));
}*/
function renderOption(item) {
  return (
    <Option key={item._id}>
      <a
        className="global-search-item"
        href={`/posts/${item._id}`}
        style={{
          color: "#343a40"
        }}
      >
        <span className="global-search-item-desc">
          <a
            href={`/posts/${item._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-1"
          >
            {item.title}
          </a>
          by {item.author.fullName}
        </span>
        <span className="global-search-item-count"></span>
        <div>
          <Moment fromNow ago className="mr-1">
            {item.createAt}
          </Moment>
          ago
        </div>
      </a>
    </Option>
  );
}
function roundHalf(num) {
  return Math.round(num * 2) / 2;
}
/*function newDate(date) {
  return date.substring(0, 10);
}*/
class BlogScreen extends React.Component {
  componentDidMount() {
    const email = window.localStorage.getItem("email");
    const fullName = window.localStorage.getItem("fullName");
    if (email && fullName) {
      fetch("http://localhost:3001/users/test", {
        credentials: "include",
        method: "POST"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          //console.log(data);
          if (data.success == true) {
            this.setState({
              currentUser: {
                email: data.data.email,
                fullName: data.data.fullName
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
          window.alert(error.message);
        });
    }
    //take the post
    fetch(
      `http://localhost:3001/posts/get?pageNumber=${this.state.pageNumber}&pageSize=${this.state.PageSize}`,
      { method: "GET", credentials: "include" }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log(data);
        this.setState({
          data: data.data,
          total: data.total
        });
      })
      .catch(error => {
        console.log(error);
        message.error(error.message);
      });
    // end test
  }

  state = {
    pageNumber: 1,
    PageSize: 5,
    total: 0,
    currentUser: {
      email: "",
      fullName: ""
    },
    content: "",
    previewVisible: false,
    previewImage: "",
    fileList: [],
    tags: [],
    inputValue: "",
    title: "",
    inputVisible: false,
    data: [],
    dataSource: [],
    notFound: false
  };
  //tags
  handleTagClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    //console.log(tags);
    this.setState({ tags });
  };

  showTagInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputTageChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputTagConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ""
    });
  };

  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleTagClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  handlePictureCancel = () => this.setState({ previewVisible: false });
  handleChange = ({ fileList }) => {
    if (fileList[fileList.length - 1].size > 5000000) {
      message.error("Please choose file with size <5MB");
      fileList.pop();
    } else if (
      !fileList[fileList.length - 1].name.match(/jpeg|png|jpg|PNG|JPG|JPEG/)
    ) {
      message.error("Not recorgnize the type");
      fileList.pop();
    } else {
      this.setState({ fileList });
    }
  };

  handlePicturePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };
  //Handle Modal
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  //OnSubmit
  handleOk = e => {
    //console.log(this.state.fileList);
    if (!this.state.content) {
      message.error("Please Input your content ");
    } else if (!this.state.title) {
      message.error("Please Input your Title ");
    } else if (this.state.fileList.length === 0) {
      message.error("Please Input your image ");
    } else if (this.state.tags.length === 0) {
      message.error("Please Enter a tag! Tags will have people easy to search");
      //upload img
    } else {
      const formData = new FormData();
      for (const item of this.state.fileList) {
        formData.append("images", item.originFileObj);
        //console.log(item);
      }
      fetch("http://localhost:3001/upload/image", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json"
          //"Content-Type": "multipart/form-data"
        },
        body: formData
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          // console.log(data.imageUrl);
          //console.log(this.state);
          fetch("http://localhost:3001/posts/create", {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              content: this.state.content,
              imageUrl: data.imageUrl,
              tag: this.state.tags,
              title: this.state.title
            })
          })
            .then(res => {
              return res.json();
            })
            .then(data1 => {
              if (data1.success === false) {
                message.error(data1.message);
              } else {
                message.success("Post successful");
                window.location.href = "/blogs";
              }
            })
            .catch(err => {
              console.log(err);
              this.setState({
                errMessage: err.message
              });
            });
        })
        .catch(error => {
          message.error(error);
        });
    }
  };
  //OnCancel
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  handleContentChange = e => {
    this.setState({
      content: e.target.value
    });
  };
  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  //pagination
  handlePaginationChange = e => {
    //console.log(e);
    this.setState({
      pageNumber: Number(e)
    });

    //fetch api
    fetch(
      `http://localhost:3001/posts/get?pageNumber=${e}&pageSize=${this.state.PageSize}`,
      { method: "GET", credentials: "include" }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log(data);
        this.setState({
          data: data.data,
          total: data.total
        });
      })
      .catch(error => {
        console.log(error);
        window.alert(error.message);
      });
  };
  handleSearch = _.debounce(value => {
    if (value !== "") {
      fetch(`http://localhost:3001/posts/search/${value}`, { method: "GET" })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          /*this.setState({
          dataSource: value ? searchResult(value) : []
        });*/
          if (data.data.length !== 0) {
            this.setState({
              dataSource: value ? data.data : [],
              notFound: false
            });
          } else {
            //message.warning("No post found");
            this.setState({
              dataSource: [],
              notFound: false
            });
          }
        })
        .catch(error => {
          console.log(error);
          window.alert(error);
        });
    }
  }, 800);

  render() {
    const { dataSource } = this.state;
    console.log(this.state);
    const { previewVisible, previewImage, fileList } = this.state;
    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="ml-5 mr-5 pt-3">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item">
              <a href="/" style={{ fontSize: "17px" }}>
                <Icon type="home" className="mr-1" />
                Home/
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>/</Breadcrumb.Separator>
            <Breadcrumb.Item className="breadcrumb-item">
              <a href="/Blogs" style={{ fontSize: "17px" }}>
                Blogs/
              </a>
            </Breadcrumb.Item>
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="row ml-4 mt-3" style={{ width: "100%" }}>
          <Row style={{ width: "100%" }}>
            <Col span={6}>
              {window.sessionStorage._id && window.sessionStorage.email ? (
                <button
                  type="button"
                  className="btn btn-outline-dark add-post "
                  onClick={this.showModal}
                  style={{
                    width: "200px",
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                >
                  <Icon type="plus" style={{ fontSize: 14 }} />
                  New Post
                </button>
              ) : null}
            </Col>
            <Col span={7} style={{ float: "right" }}>
              <div
                className="global-search-wrapper"
                style={{ width: 400, marginLeft: "89px", fontSize: "18px" }}
              >
                <AutoComplete
                  className="global-search"
                  size="large"
                  style={{ width: "100%" }}
                  dataSource={dataSource.map(renderOption)}
                  onSelect={onSelect}
                  onSearch={this.handleSearch}
                  placeholder="Search here"
                  optionLabelProp="text"
                >
                  <Input
                    size="default"
                    style={{ fontSize: "18px" }}
                    suffix={
                      <Button
                        className="search-btn"
                        style={{ marginRight: -12 }}
                        size="large"
                        type="primary"
                      >
                        <Icon type="search" />
                      </Button>
                    }
                  />
                </AutoComplete>
              </div>
            </Col>
          </Row>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <form>
              <h3 className="modal-upload">Title:</h3>
              <Input
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleTitleChange}
                maxLength={10}
              ></Input>
              <h3 className="modal-upload">Content:</h3>
              <TextArea
                id="content"
                rows={12}
                placeholder="Enter your content..."
                onChange={this.handleContentChange}
                value={this.state.content}
              />
              <h3 className="modal-upload">Picture:</h3>
            </form>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePicturePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={this.handlePictureCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
            <div>
              <div style={{ marginBottom: 16 }}>
                <TweenOneGroup
                  enter={{
                    scale: 0.8,
                    opacity: 0,
                    type: "from",
                    duration: 100,
                    onComplete: e => {
                      e.target.style = "";
                    }
                  }}
                  leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                  appear={false}
                >
                  {tagChild}
                </TweenOneGroup>
              </div>
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputTageChange}
                  onBlur={this.handleInputTagConfirm}
                  onPressEnter={this.handleInputTagConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showTagInput}
                  style={{ background: "#fff", borderStyle: "dashed" }}
                >
                  <Icon type="plus" /> New Tag
                </Tag>
              )}
            </div>
          </Modal>
        </div>
        <Row>
          <Col span={18} className="post">
            {this.state.data
              ? this.state.data.map(i => {
                  if (i.content.length > 600) {
                    var contentReg = i.content.substring(0, 597) + ". . .";
                  } else {
                    var contentReg = i.content;
                  }
                  return (
                    <div style={{ background: "#ECECEC", padding: "30px" }}>
                      <Row gutter={24}>
                        <Col span={24}>
                          <a
                            href={"/posts/" + i._id}
                            style={{ height: "40vh" }}
                          >
                            <Card
                              className="post-h"
                              title={<a className="caption">{i.title}</a>}
                              bordered={false}
                              extra={
                                <a
                                  style={{ fontWeight: "bold" }}
                                  href={"/users/" + i.author._id}
                                  className="underline"
                                >
                                  Author: {i.author.fullName}
                                  {i.author.avatar ? (
                                    <Avatar
                                      size="large"
                                      src={i.author.avatar}
                                      className="mb-2 ml-2 border-bl"
                                      style={{
                                        borderWidth: "1px",
                                        borderStyle: "solid"
                                      }}
                                    ></Avatar>
                                  ) : (
                                    <Avatar
                                      icon="user"
                                      size="large"
                                      className="ml-2 "
                                      style={{
                                        borderWidth: "1px",
                                        borderStyle: "solid"
                                      }}
                                    />
                                  )}
                                </a>
                              }
                              actions={[
                                <div>
                                  {i.commentNumber !== 0
                                    ? (i.voteAvg / i.commentNumber).toFixed(2)
                                    : 0}
                                  <Icon
                                    type="star"
                                    theme="filled"
                                    className="ml-1"
                                  />
                                </div>,
                                <div>
                                  {i.commentNumber}
                                  <Icon
                                    type="message"
                                    theme="filled"
                                    className="ml-1"
                                  />
                                </div>,
                                <div>
                                  <Icon type="clock-circle" className="mr-2" />
                                  <Moment fromNow ago className="mr-1">
                                    {i.createAt}
                                  </Moment>
                                  ago
                                </div>
                              ]}
                            >
                              {i.srcUrl.length === 1 ? (
                                <img
                                  src={i.srcUrl[0]}
                                  className="center"
                                  style={{
                                    width: "76%",
                                    height: "98%",
                                    objectFit: "cover"
                                  }}
                                ></img>
                              ) : (
                                <Carousel
                                  autoplay
                                  vertical
                                  style={{
                                    width: "76%",
                                    height: "98%",
                                    float: "center",
                                    objectFit: "cover"
                                  }}
                                  className="center"
                                >
                                  {i.srcUrl.map(item => {
                                    //console.log(item);
                                    return (
                                      <div className="center">
                                        <img
                                          src={item}
                                          style={{
                                            width: "76%",
                                            height: "98%",
                                            float: "center",
                                            objectFit: "cover"
                                          }}
                                          className="center"
                                        ></img>
                                      </div>
                                    );
                                  })}
                                </Carousel>
                              )}
                              <div className="mt-2 content-box">
                                {contentReg}
                              </div>
                              {i.tag.map((item, index) => {
                                return (
                                  <Tag className="mt-3" key={index}>
                                    <a href={"/search/" + item}>{item}</a>
                                  </Tag>
                                );
                              })}{" "}
                            </Card>
                          </a>
                        </Col>
                      </Row>
                    </div>
                  );
                })
              : null}
          </Col>
          <Col span={4} style={{ float: "right" }} className="mr-5 mt-3">
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
          </Col>
        </Row>
        <Row>
          <Col span={8} className="center mb-4" style={{ width: "100%" }}>
            <Pagination
              size="large"
              total={this.state.total}
              onChange={this.handlePaginationChange}
              defaultPageSize={5}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default BlogScreen;
