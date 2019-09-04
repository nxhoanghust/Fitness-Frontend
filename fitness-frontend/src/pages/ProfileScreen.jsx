import React from "react";
import {
  Descriptions,
  Avatar,
  Button,
  Form,
  Input,
  Select,
  Upload,
  Icon,
  message,
  Modal
} from "antd";
import "antd/dist/antd.css";
import "./ProfileScreen.css";
import moment from "moment";

const usersId = window.location.pathname.split("/")[2];
const phoneRegex = /^0(1\d{9}|9\d{8})$/;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG/JPEG file!");
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error("Image must smaller than 5MB!");
  }
  return isJpgOrPng && isLt5M;
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};
class ProfileScreen extends React.Component {
  state = {
    profile: "",
    data: "",
    loading: false,
    fullName: "",
    phoneNumber: "",
    avatar: "",
    imgFile: "",
    visible: false
  };
  componentDidMount() {
    fetch(`http://localhost:3001/users/profile/${usersId}`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          data: data.data
        });
      })
      .catch(error => {
        console.log(error);
        window.alert(error.message);
      });
  }
  // modal
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    //console.log(e);
    this.setState({
      visible: false
    });
    var fullName = "";
    var phoneNumber = "";
    if (this.state.phoneNumber && !phoneRegex.test(this.state.phoneNumber)) {
      message.error("Invalid Phone Number");
    } else if (!this.state.imgFile) {
      message.error("Please input image");
    } else {
      if (this.state.fullName == "") {
        fullName = this.state.data.fullName;
      } else {
        fullName = this.state.fullName;
      }
      if (this.state.phoneNumber == "") {
        phoneNumber = this.state.data.phoneNumber;
      } else {
        phoneNumber = this.state.phoneNumber;
      }
      const formData = new FormData();
      formData.append("avatar", this.state.imgFile);
      fetch("http://localhost:3001/upload/avatar", {
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
          //console.log(data);
          fetch("http://localhost:3001/users/update-profile", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              _id: this.state.data._id,
              fullName: fullName,
              phoneNumber: phoneNumber,
              avatar: data.data.imageUrl
            })
          })
            .then(res => {
              return res.json();
            })
            .then(data1 => {
              console.log(data1);
              window.localStorage.removeItem("avatar");
              window.sessionStorage.removeItem("avatar");
              window.localStorage.setItem("avatar", data.data.imageUrl);
              window.sessionStorage.setItem("avatar", data.data.imageUrl);
            })
            .catch(err => {
              console.log(err);
              window.alert(err.message);
            });
        })
        .catch(error => {
          //console.log(error);
          //window.alert(error.message);
        });
      message.success("Profile Updated");
      if (this.state.fullName !== "") {
        window.sessionStorage.removeItem("fullName");
        window.sessionStorage.setItem("fullName", this.state.fullName);
        window.localStorage.removeItem("fullName");
        window.localStorage.setItem("fullName", this.state.fullName);
      }
      //window.location.reload();
    }
  };

  handleCancel = e => {
    //console.log(e);
    this.setState({
      visible: false
    });
  };

  //
  handleChange = info => {
    console.log(info);
    if (info.file.status === "uploading") {
      this.setState({
        loading: true,
        imgFile: info.file.originFileObj
      });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };
  handleChangePhoneNumber = e => {
    this.setState({
      phoneNumber: e.target.value
    });
  };
  handleChangeName = e => {
    this.setState({
      fullName: e.target.value
    });
  };
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    console.log(this.state);
    return (
      <div className=" pt-4 ml-5 pl-5 mr-5 pr-5 ">
        <h1 className="mb-2 mr-2" style={{ textAlign: "center" }}>
          User Profile:
        </h1>
        <div
          className=" pt-4 ml-5 pl-5 mr-5 pr-5"
          style={{
            fontSize: "19px"
          }}
        >
          <Descriptions title="User Info">
            <div>
              Avatar:
              {this.state.data.avatar ? (
                <img
                  className="ml-2"
                  src={this.state.data.avatar}
                  style={{ width: "120px" }}
                ></img>
              ) : (
                <Avatar
                  shape="square"
                  size={120}
                  icon="user"
                  className="ml-2"
                />
              )}
            </div>
            <Descriptions.Item label="UserName" className="pt-3">
              {this.state.data.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Email" className="pt-3">
              {this.state.data.email}
            </Descriptions.Item>
            <Descriptions.Item label="Telephone">
              {this.state.data.phoneNumber
                ? "0" + this.state.data.phoneNumber
                : "Undefined"}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {this.state.data.address}
            </Descriptions.Item>
            <Descriptions.Item label="Create At">
              {moment(this.state.data.createAt).format("LLLL")}
            </Descriptions.Item>
          </Descriptions>
        </div>
        {window.sessionStorage._id === usersId ? (
          <div className="ml-5 mt-4">
            <Button
              type="primary"
              onClick={this.showModal}
              style={{ float: "left", height: "2.2rem" }}
              className="ml-5"
            >
              Update Profile
            </Button>
            <Modal
              title="Update Profile"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Form
                {...formItemLayout}
                onSubmit={this.handleSubmit}
                id="formUpdate"
              >
                <Form.Item label="email">
                  <Input
                    placeholder={this.state.data.email}
                    className="ml-4"
                    disabled
                  />
                </Form.Item>
                <Form.Item label="UserName">
                  <Input
                    placeholder={this.state.data.fullName}
                    value={this.state.fullName}
                    onChange={this.handleChangeName}
                    className="ml-4"
                  />
                </Form.Item>
                <Form.Item label="phoneNumber">
                  <Input
                    placeholder={"0" + this.state.data.phoneNumber}
                    value={this.state.phoneNumber}
                    onChange={this.handleChangePhoneNumber}
                    className="ml-4"
                  />
                </Form.Item>
                <Form.Item label="avatar">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader ml-4"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ProfileScreen;
