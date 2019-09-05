import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./FindSpaceScreen.css";
import { Carousel, Radio, Menu, Dropdown, Button, Icon, message } from "antd";
import fitness0 from "../img/fitness0.jpg";
import fitness1 from "../img/fitness1.jpg";
import fitness2 from "../img/fitness2.jpg";
import fitness4 from "../img/fitness4.jpg";

class FindSpaceScreen extends React.Component {
  handleButtonClick(e) {
    message.info("Click on left button.");
    console.log("click left button", e);
  }

  handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }
  state = {
    size: "large"
  };
  render() {
    const { size } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
          <Carousel
            autoplay
            style={{
              textAlign: "center",
              overflow: "hidden",
              marginLeft: "auto"
            }}
          >
            <div>
              <img
                src={fitness0}
                style={{ objectFit: "cover", width: "100%" }}
              />
            </div>
            <div>
              <img
                src={fitness1}
                style={{ objectFit: "cover", width: "100%" }}
              />
            </div>
            <div>
              <img
                src={fitness2}
                style={{ objectFit: "cover", width: "100%" }}
              />
            </div>
            <div>
              <img
                src={fitness4}
                style={{ objectFit: "cover", width: "100%" }}
              />
            </div>
          </Carousel>
          ,
        </div>
        <div id="button">
          {/* <Radio.Group value={size} onChange={this.handleSizeChange} /> */}
          <br />
          <br />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1">Cầu Giấy</Menu.Item>
                <Menu.Item key="2">Ba Đình</Menu.Item>
                <Menu.Item key="3">Hai Bà Trưng</Menu.Item>
              </Menu>
            }
          >
            <Button
              className="button1"
              type="primary"
              shape="round"
              size={size}
            >
              Hà Nội <Icon type="down" />
            </Button>
          </Dropdown>

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1">Hải Châu</Menu.Item>
                <Menu.Item key="2">Thanh Khê</Menu.Item>
                <Menu.Item key="3">Hòa Vang</Menu.Item>
              </Menu>
            }
          >
            <Button
              className="button1"
              type="primary"
              shape="round"
              size={size}
            >
              Đà Nẵng <Icon type="down" />
            </Button>
          </Dropdown>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1">Quận 1</Menu.Item>
                <Menu.Item key="2">Quận 2</Menu.Item>
                <Menu.Item key="3">Quận 3</Menu.Item>
              </Menu>
            }
          >
            <Button
              className="button1"
              type="primary"
              shape="round"
              size={size}
            >
              TP. Hồ Chí Minh <Icon type="down" />
            </Button>
          </Dropdown>
          <br />
        </div>
      </div>
    );
  }
}
export default FindSpaceScreen;
