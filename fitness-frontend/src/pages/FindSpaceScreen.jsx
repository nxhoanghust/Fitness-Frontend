import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./FindSpaceScreen.css";

import {
  Carousel,
  Radio,
  Menu,
  Dropdown,
  Button,
  message,
  List,
  Avatar,
  Spin,
  Icon,
  Row,
  Col,
  Empty,
  Input
} from "antd";
import fitness0 from "../img/fitness0.jpg";
import fitness1 from "../img/fitness1.jpg";
import fitness2 from "../img/fitness2.jpg";
import fitness4 from "../img/fitness4.jpg";

const { Search } = Input;

function nonAccentVietnamese(str) {
  str = str.toLowerCase();
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  str = str.split(" ").join("-");
  return str;
}

class FindSpaceScreen extends React.Component {
  state = {
    size: "large",
    name: [],
    address: [],
    type: [],
    loading: false,
    hasMore: true,
    nameSearch: [],
    district: "",
    searchKey: ""
  };
  handleButtonClick = e => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  handleMenuClick = e => {
    const value = nonAccentVietnamese(e.item.props.children);
    this.setState({
      loading: true
    });
    setTimeout(() => {
      fetch(`http://localhost:3001/find/district/${value}`, {
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          //console.log(data.data.nameN);
          console.log(data.data);
          this.setState({
            name: data.data.nameN,
            address: data.data.addressN,
            type: data.data.typeN,
            loading: false,
            searchKey: "",
            district: e.item.props.children
          });
        })
        .catch(error => {
          message.error(error);
        });
    }, 800);
    console.log(nonAccentVietnamese(e.item.props.children));
  };
  handleSearch = e => {
    var index = [];
    var regex = new RegExp(e.target.value, "i");
    this.state.name.forEach((value, i) => {
      //console.log(value.match(regex));
      if (value.match(regex) !== null) {
        //or val.match(/fine/g)
        index.push(i);
      }
    });
    this.setState({
      searchKey: e.target.value,
      nameSearch: index
    });
  };
  render() {
    console.log(this.state);
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
        </div>
        <div id="button" className="container">
          <div style={{ textAlign: "center", marginTop: "2%"   }}>
            <span className="note ml-1">G</span>: GYM ○
            <span className="note ml-1">Y</span>: YOGA ○
            <span className="note ml-1">A</span>: THỂ DỤC THẨM MỸ ○
            <span className="note ml-1">K</span>: KICK-BOXING ○
            <span className="note ml-1">D</span>: NHẢY-KHIÊU VŨ ○
            <span className="note ml-1">M</span>: VÕ THUẬT ○
            <span className="note ml-1">O</span>: RÈN LUYỆN THỂ LỰC ○
            <span className="note ml-1">Z</span> NHẢY ZUMBA ○
            <span className="note ml-1">S</span>: BƠI LỘI ○
            <span className="note ml-1">B</span>: LÀM ĐẸP
          </div>
          {/* <Radio.Group value={size} onChange={this.handleSizeChange} /> */}
          <br />
          <br />
          <Row gutter={20} style={{ marginLeft: "5%" }}>
            <Col span={12}>
              <Dropdown
                overlay={
                  <Menu onClick={this.handleMenuClick}>
                    <Menu.Item key="1">Cầu Giấy</Menu.Item>
                    <Menu.Item key="2">Ba Đình</Menu.Item>
                    <Menu.Item key="3">Hai Bà Trưng</Menu.Item>
                    <Menu.Item key="4">Hoàn Kiếm</Menu.Item>
                    <Menu.Item key="5">Đống Đa</Menu.Item>
                    <Menu.Item key="6">Thanh Xuân</Menu.Item>
                    <Menu.Item key="7">Hoàng Mai</Menu.Item>
                    <Menu.Item key="8">Tây Hồ</Menu.Item>
                  </Menu>
                }
              >
                <Button
                  className="button1"
                  type="primary"
                  shape="round"
                  size={size}
                  //style={{ marginLeft: "30%" }}
                >
                  Quận Nội Thành
                  <Icon type="down" />
                </Button>
              </Dropdown>
            </Col>
            <Col span={12}>
              <Dropdown
                overlay={
                  <Menu onClick={this.handleMenuClick}>
                    <Menu.Item key="1">Long Biên</Menu.Item>
                    <Menu.Item key="2">Nam Từ Liêm</Menu.Item>
                    <Menu.Item key="3">Bắc Từ Liêm</Menu.Item>
                    <Menu.Item key="4">Hà Đông</Menu.Item>
                    <Menu.Item key="5">Thanh Trì</Menu.Item>
                  </Menu>
                }
              >
                <Button
                  className="button1"
                  type="primary"
                  shape="round"
                  size={size}
                >
                  Quận Ngoại Thành
                  <Icon type="down" />
                </Button>
              </Dropdown>
            </Col>
          </Row>
          <br />

          {this.state.name.length !== 0 ? (
            <Search
              placeholder="input search text"
              value={this.state.searchKey}
              onChange={this.handleSearch}
              style={{ width: "22vh", float: "right", height: "4vh" }}
              className="mb-2"
            />
          ) : null}
          {this.state.district ? (
            <div
              className="mt-3 ml-3"
              style={{
                fontWeight: "bold",
                fontSize: "24px"
              }}
            >
              {"Quận " + this.state.district}
            </div>
          ) : null}
          {this.state.searchKey ? (
            this.state.nameSearch.length !== 0 ? (
              <div>
                {this.state.nameSearch.length !== 0 ? (
                  <div className="mt-5 ml-3 mb-1">
                    Found
                    <span
                      style={{ color: "#ff4136", fontWeight: "bold" }}
                      className="mr-1 ml-1"
                    >
                      {this.state.name.length}
                    </span>
                    results ...
                    <List
                      loading={this.state.loading}
                      className="list"
                      style={{ fontSize: "14px" }}
                      itemLayout="horizo  ntal"
                      dataSource={this.state.nameSearch}
                      renderItem={(item, index) => (
                        <List.Item key={index} className={"bg-" + (index % 2)}>
                          <List.Item.Meta
                            title={
                              <a href="/" style={{ fontWeight: "bold" }}>
                                {this.state.name[item]}
                              </a>
                            }
                            description={this.state.address[item]}
                          />
                          <div>{this.state.type[item]}</div>
                        </List.Item>
                      )}
                    />
                  </div>
                ) : null}
              </div>
            ) : (
              <Empty className="mt-5" description="No result found" />
            )
          ) : (
            <div>
              {this.state.name.length !== 0 ? (
                <div className="mt-5 ml-3 mb-1">
                  Found
                  <span
                    style={{ color: "#ff4136", fontWeight: "bold" }}
                    className="mr-1 ml-1"
                  >
                    {this.state.name.length}
                  </span>
                  results ...
                  <List
                    loading={this.state.loading}
                    className="list"
                    style={{ fontSize: "14px" }}
                    itemLayout="horizontal"
                    dataSource={this.state.name}
                    renderItem={(item, index) => (
                      <List.Item key={index} className={"bg-" + (index % 2)}>
                        <List.Item.Meta
                          title={
                            <a href="/" style={{ fontWeight: "bold" }}>
                              {item}
                            </a>
                          }
                          description={this.state.address[index]}
                        />
                        <div>{this.state.type[index]}</div>
                      </List.Item>
                    )}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default FindSpaceScreen;
