import React from "react";
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
  Carousel
} from "antd";
import "./BlogScreen.css";
import "antd/dist/antd.css";
import { TweenOneGroup } from "rc-tween-one";

const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class BlogScreen extends React.Component {
  componentDidMount() {
    const email = window.localStorage.getItem("email");
    const fullName = window.localStorage.getItem("fullName");
    if (!email || !fullName) {
      fetch("http://localhost:3001/users/test", {
        credentials: "include",
        method: "GET"
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
    } else {
      this.setState({
        currentUser: {
          email: email,
          fullName: fullName
        }
      });
    }
    //take the post
    fetch(`http://localhost:3001/posts/get`, { method: "GET" })
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log(data);
        this.setState({
          data: data.data
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
    data: []
  };
  //tags
  handleTagClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
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
    console.log(this.state.fileList);
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
        console.log(item);
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
          console.log(this.state);
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
              console.log(data1);
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

  render() {
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
                <Icon type="home" />
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

        <div className="row">
          {this.state.currentUser.email ? (
            <Row>
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
            </Row>
          ) : null}
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
          <Col span={19} className="post">
            {this.state.data.map(i => {
              return (
                <Carousel autoplay>
                  {i.srcUrl.map(item => {
                    //console.log(item);
                    return (
                      <div>
                        <img src={item} style={{ width: "300px" }}></img>
                      </div>
                    );
                  })}
                  <div>{i.content} </div>
                </Carousel>
              );
            })}
          </Col>
          <Col span={4}>
            <div class="btn-group-vertical" style={{ width: "100%" }}>
              <button type="button" class="btn btn-secondary button-group">
                Categories
              </button>
              <button type="button" class="btn btn-secondary button-group">
                Boxing
              </button>
              <button type="button" class="btn btn-secondary button-group">
                Yoga
              </button>
              <button type="button" class="btn btn-secondary button-group">
                Diet
              </button>
              <button type="button" class="btn btn-secondary button-group">
                Street Workout
              </button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BlogScreen;
