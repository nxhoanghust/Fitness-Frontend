import React from "react";
import { Descriptions, Avatar } from "antd";
import "antd/dist/antd.css";
import "./ProfileScreen.css";
import moment from "moment";

const usersId = window.location.pathname.split("/")[2];

class ProfileScreen extends React.Component {
  state = {
    profile: "",
    data: ""
  };
  componentDidMount() {
    if (usersId === "profile") {
      this.setState({
        profile: "users"
      });
      fetch("http://localhost:3001/users/test", {
        credentials: "include",
        method: "POST"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.success == true) {
            this.setState({
              data: data.data
            });
          }
        })
        .catch(error => {
          console.log(error);
          window.alert(error.message);
        });
    } else {
      this.setState({
        profile: "another"
      });
      fetch(`http://localhost:3001/users/${usersId}`, {
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
  }
  render() {
    console.log(this.state);
    return (
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
              <img src={this.state.data.avatar}></img>
            ) : (
              <Avatar shape="square" size={120} icon="user" className="ml-2" />
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
    );
  }
}

export default ProfileScreen;
