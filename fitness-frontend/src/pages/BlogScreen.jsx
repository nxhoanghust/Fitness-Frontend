import React from "react";
import { Breadcrumb, Icon, Modal, Input, Upload, message, Button } from "antd";
import "./BlogScreen.css";
import "antd/dist/antd.css";

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
  state = {
    content: "",
    previewVisible: false,
    previewImage: "",
    fileList: []
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
    console.log(this.state);
    if (!this.state.content) {
      message.error("Please input your content ");
    } else if (!this.state.fileList) {
      message.error("Please input your image ");
    } else {
      //upload img
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
  render() {
    console.log(this.state.content);
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="ml-5 mr-5">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item">
              <a href="/">
                <Icon type="home" />
                Home/
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>/</Breadcrumb.Separator>
            <Breadcrumb.Item className="breadcrumb-item">
              <a href="/Blogs">Blogs/</a>
            </Breadcrumb.Item>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <button
            type="button"
            className="btn btn-outline-dark add-post mr-5"
            onClick={this.showModal}
          >
            <Icon type="plus" style={{ fontSize: 14 }} />
            New Post
          </button>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <form>
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
          </Modal>
        </div>
      </div>
    );
  }
}

export default BlogScreen;
