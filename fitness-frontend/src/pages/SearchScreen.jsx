import React from "react";
import _ from "lodash";
import Moment from "react-moment";
import "./SearchScreen.css";
import { Input, Card, Avatar, Icon, Tag, Button, Alert } from "antd";
import fitness8 from "../img/fitness8.jpg";

const { Search } = Input;
const url = window.location.pathname.split("/")[2];
class SearchScreen extends React.Component {
  state = {
    dataSource: [],
    dataTag: [],
    notFound: false,
    searchKey: "",
    loading: false,
    notFoundTag: false
  };

  componentDidMount() {
    console.log(url);
    if (url !== undefined) {
      this.setState({
        searchKey: url
      });
      fetch(`http://localhost:3001/posts/search/${url}`, { method: "GET" })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          if (data.data.length !== 0) {
            this.setState({
              dataSource: url ? data.data : [],
              notFound: false,
              loading: true
            });
          } else {
            this.setState({
              dataSource: [],
              notFound: true,
              loading: true
            });
          }
          if (data.dataTag.length !== 0) {
            this.setState({
              dataTag: url ? data.dataTag : [],
              notFoundTag: false,
              loading: false
            });
          } else {
            this.setState({
              dataTag: [],
              loading: false,
              notFoundTag: true
            });
          }
        })
        .catch(error => {
          console.log(error);
          window.alert(error);
        });
    }
  }
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
              notFound: false,
              loading: true
            });
          } else {
            this.setState({
              dataSource: [],
              notFound: true,
              loading: true
            });
          }
          if (data.dataTag.length !== 0) {
            this.setState({
              dataTag: this.state.searchKey ? data.dataTag : [],
              notFoundTag: false,
              loading: false
            });
          } else {
            this.setState({
              dataTag: [],
              loading: false,
              notFoundTag: true
            });
          }
        })
        .catch(error => {
          console.log(error);
          window.alert(error);
        });
    }
  }, 500);
  handleChange = _.debounce(() => {
    if (this.state.searchKey !== "") {
      fetch(`http://localhost:3001/posts/search/${this.state.searchKey}`, {
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          if (data.data.length !== 0) {
            this.setState({
              dataSource: this.state.searchKey ? data.data : [],
              notFound: false,
              loading: false
            });
          } else {
            this.setState({
              dataSource: [],
              notFound: true,
              loading: false,
              notFoundTag: true
            });
          }
          if (data.dataTag.length !== 0) {
            this.setState({
              dataTag: this.state.searchKey ? data.dataTag : [],
              notFoundTag: false,
              loading: false
            });
          } else {
            this.setState({
              dataTag: [],
              loading: false,
              notFoundTag: true
            });
          }
        })
        .catch(error => {
          console.log(error);
          window.alert(error);
        });
    }
  }, 500);

  render() {
    console.log(this.state);
    return (
      <div className="abc" style={{ marginTop: "20vh" }}>
        <div className="center">
          <Search
            className="container "
            placeholder=" Search"
            enterButton="Search"
            value={this.state.searchKey}
            size="large"
            onChange={event => {
              this.setState({
                searchKey: event.target.value,
                loading: true
              });
              this.handleChange();
            }}
            onSearch={this.handleSearch}
          />
        </div>
        {this.state.loading && this.state.searchKey ? (
          <Button
            type="primary"
            shape="circle"
            loading
            className="mt-3"
            style={{ marginLeft: "45%" }}
          />
        ) : null}
        {this.state.notFound == true ? (
          <Alert
            message="No Post Found!"
            type="warning"
            showIcon
            style={{ marginRight: "20vh", marginLeft: "20vh" }}
            className="mt-3 mb-3"
          ></Alert>
        ) : (
            <div style={{ marginRight: "20vh", marginLeft: "20vh" }}>
              {this.state.dataSource.length !== 0 ? (
                <div className="cap">Relate Post:</div>
              ) : null}
              {this.state.dataSource.map(item => {
                if (item.content.length > 300) {
                  var contentReg = item.content.substring(0, 297) + ". . .";
                } else {
                  var contentReg = item.content;
                }
                return (
                  <div
                    style={{ background: "#ECECEC", padding: "30px" }}
                    key={item._id}
                    className="mt-3"
                  >
                    <a href={"/posts/" + item._id}>
                      <Card
                        title={
                          <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                            {item.title}
                          </div>
                        }
                        bordered={false}
                        style={{ width: "100%" }}
                        actions={[
                          <div>
                            {item.commentNumber !== 0
                              ? (item.voteAvg / item.commentNumber).toFixed(2)
                              : 0}
                            <Icon type="star" theme="filled" className="ml-1" />
                          </div>,
                          <div>
                            {item.commentNumber}
                            <Icon
                              type="message"
                              theme="filled"
                              className="ml-1"
                            />
                          </div>,
                          <div>
                            <Icon type="clock-circle" className="mr-2" />
                            <Moment fromNow ago className="mr-1">
                              {item.createAt}
                            </Moment>
                            ago
                        </div>
                        ]}
                        extra={
                          <a
                            style={{ fontWeight: "bold" }}
                            href={"/users/" + item.author._id}
                            className="underline"
                          >
                            Author: {item.author.fullName}
                            {item.author.avatar ? (
                              <Avatar
                                size="large"
                                src={item.author.avatar}
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
                      >
                        <img src={item.srcUrl[0]} style={{ width: "27%" }}></img>
                        <p
                          style={{
                            width: "70%",
                            display: "inline-block",
                            float: "right"
                          }}
                        >
                          {contentReg}
                        </p>
                        {item.tag.map((i, index) => {
                          return (
                            <Tag className="mt-3" key={index}>
                              <a href="">{i}</a>
                            </Tag>
                          );
                        })}
                      </Card>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        {this.state.notFoundTag === true ? (
          <Alert
            message="No Tag Found!"
            type="warning"
            showIcon
            style={{ marginRight: "20vh", marginLeft: "20vh" }}
            className="mt-3 mb-3"
          ></Alert>
        ) : (
            <div style={{ marginRight: "20vh", marginLeft: "20vh" }}>
              {this.state.dataTag.length !== 0 ? (
                <div className="cap">Relate Tag:</div>
              ) : null}
              {this.state.dataTag.map(item => {
                if (item.content.length > 300) {
                  var contentReg = item.content.substring(0, 297) + ". . .";
                } else {
                  var contentReg = item.content;
                }
                return (
                  <div
                    style={{ background: "#ECECEC", padding: "30px" }}
                    key={item._id}
                    className="mt-3"
                  >
                    <a href={"/posts/" + item._id}>
                      <Card
                        title={
                          <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                            {item.title}
                          </div>
                        }
                        bordered={false}
                        style={{ width: "100%" }}
                        actions={[
                          <div>
                            {item.commentNumber !== 0
                              ? (item.voteAvg / item.commentNumber).toFixed(2)
                              : 0}
                            <Icon type="star" theme="filled" className="ml-1" />
                          </div>,
                          <div>
                            {item.commentNumber}
                            <Icon
                              type="message"
                              theme="filled"
                              className="ml-1"
                            />
                          </div>,
                          <div>
                            <Icon type="clock-circle" className="mr-2" />
                            <Moment fromNow ago className="mr-1">
                              {item.createAt}
                            </Moment>
                            ago
                        </div>
                        ]}
                        extra={
                          <a
                            style={{ fontWeight: "bold" }}
                            href={"/users/" + item.author._id}
                            className="underline"
                          >
                            Author: {item.author.fullName}
                            {item.author.avatar ? (
                              <Avatar
                                size="large"
                                src={item.author.avatar}
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
                      >
                        <img src={item.srcUrl[0]} style={{ width: "27%" }}></img>
                        <p
                          style={{
                            width: "70%",
                            display: "inline-block",
                            float: "right"
                          }}
                        >
                          {contentReg}
                        </p>
                        {item.tag.map((i, index) => {
                          return (
                            <Tag className="mt-3" key={index}>
                              <a href={"/search/" + i}>{i}</a>
                            </Tag>
                          );
                        })}
                        {/*item.srcUrl.map((i, index) => {
                      return (
                        <img
                          src={i}
                          style={{ width: "25%", display: "inline-block" }}
                          key={index}
                        ></img>
                      );
                    })*/}
                      </Card>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    );
  }
}

export default SearchScreen;
