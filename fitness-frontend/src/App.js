import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import HomePageScreen from "./pages/HomePageScreen";
import BlogScreen from "./pages/BlogScreen";
import "./App.css";
import RegisterScreen from "./pages/RegisterScreen";
import Moment from "react-moment";
import _ from "lodash";
import {
  Menu,
  Dropdown,
  Icon,
  message,
  Layout,
  Avatar,
  Button,
  AutoComplete,
  Input,
  Popover
} from "antd";
import CommentSreen from "./pages/CommentScreen";
import ProfileScreen from "./pages/ProfileScreen";
import SearchScreen from "./pages/SearchScreen";
import FindSpaceScreen from "./pages/FindSpaceScreen";
import logo from "./img/logo_transparent.png";
import StatisticScreen from "./pages/StatisticScreen";
const { Footer } = Layout;
const { TextArea, Search } = Input;
const { Option } = AutoComplete;

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
function onSelect(value) {
  console.log("onSelect", value);
}

class App extends React.Component {
  state = {
    dataSource: [],
    active: "",
    currentUser: {
      email: "",
      fullName: "",
      _id: ""
    }
  };
  componentDidMount() {
    const url = window.location.pathname.split("/");
    const email = window.localStorage.getItem("email");
    const fullName = window.localStorage.getItem("fullName");
    const id = window.localStorage.getItem("_id");
    const avatar = window.localStorage.getItem("avatar");
    this.setState({
      active: url[1]
    });
    if (email && id) {
      window.sessionStorage.setItem("email", email);
      window.sessionStorage.setItem("fullName", fullName);
      window.sessionStorage.setItem("_id", id);
      window.sessionStorage.setItem("avatar", avatar);
      fetch("http://localhost:3001/users/test", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: window.sessionStorage.getItem("email"),
          fullName: window.sessionStorage.getItem("fullName"),
          _id: window.sessionStorage.getItem("_id")
        })
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          if (data.success == true) {
            this.setState({
              currentUser: {
                email: data.data.email,
                fullName: data.data.fullName,
                _id: data.data._id
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
          window.alert(error.message);
        });
    }
  }
  componentWillMount() {
    const email = window.localStorage.getItem("email");
    const fullName = window.localStorage.getItem("fullName");
    const id = window.localStorage.getItem("_id");
    if (email && fullName) {
      this.setState({
        currentUser: {
          email: email,
          fullName: fullName,
          _id: id
        }
      });
    }
  }

  Logout() {
    fetch("http://localhost:3001/users/logout", {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.success === false) {
          message.error(data.message);
        } else {
          window.localStorage.removeItem("email");
          window.localStorage.removeItem("fullName");
          window.localStorage.removeItem("_id");
          window.localStorage.removeItem("avatar");
          window.sessionStorage.clear();
          message.success(data.message);
        }
        //console.log(data);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        window.alert(error.message);
      });
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
    console.log(this.state);
    const { dataSource } = this.state;
    return (
      <div id="container">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark"
          style={{ height: "8.5%" }}
        >
          <div className="ml-4">
            <a className="navbar-brand" href="/">
              <img src={logo} style={{ width: "15%" }} className="mt-1"></img>
            </a>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse  mr-4"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li
                className={
                  this.state.active == "" ? "nav-item active" : "nav-item "
                }
              >
                <a className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li
                className={
                  this.state.active === "blogs" || this.state.active === "posts"
                    ? "nav-item active"
                    : "nav-item "
                }
              >
                <a className="nav-link" href="/blogs">
                  Blogs
                </a>
              </li>
              <li
                className={
                  this.state.active === "find" ? "nav-item active" : "nav-item "
                }
              >
                <a className="nav-link" href="/find" value="find">
                  Find
                </a>
              </li>
            </ul>
            {this.state.currentUser.email && this.state.currentUser._id ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <div className="dropdown-list">
                            {this.state.currentUser.email}
                          </div>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href={"/users/" + this.state.currentUser._id}
                            className="dropdown-list"
                          >
                            Update Profile
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href="#"
                            className="dropdown-list"
                            onClick={this.Logout}
                          >
                            Logout
                          </a>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <a className="ant-dropdown-link mt-1" href="#">
                      Welcome {window.sessionStorage.getItem("fullName")}
                      {window.sessionStorage.avatar ? (
                        <Avatar
                          src={window.sessionStorage.avatar}
                          className="ml-1 mb-1"
                          style={{ backgroundColor: "white", fontSize: "16px" }}
                        ></Avatar>
                      ) : (
                        <Avatar icon="user" size="large" className="ml-1" />
                      )}
                      <Icon
                        type="down"
                        className="ml-1"
                        style={{ fontSize: "16px" }}
                      />
                    </a>
                  </Dropdown>
                </li>
                <ul className="navbar-nav mr-auto"></ul>
              </ul>
            ) : (
              <ul className="navbar-nav mr-auto">
                <li
                  className={
                    this.state.active === "login"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <a className="nav-link " href="/login" value="signin">
                    Sign In
                  </a>
                </li>
                <li
                  className={
                    this.state.active === "register"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <a className="nav-link " href="/register" value="signup">
                    Sign Up
                  </a>
                </li>
              </ul>
            )}
            <ul className="navbar-nav mr-auto ml-4">
              <li>
                <a href="/search">
                    <Icon
                    type="search"
                    style={{
                      color: "#262626",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: "2.5px"
                    }}
                    className="search"
                  />
                </a>
              </li>
              <li className="ml-2">
                <a href="#footer">
                  <Icon
                    type="phone"
                    theme="filled"
                    style={{
                      color: "#262626",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: "2.5px"
                    }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="content">
          <BrowserRouter>
            <Route path="/" exact={true} component={HomePageScreen}></Route>
            <Route path="/blogs" exact={true} component={BlogScreen}></Route>
            <Route path="/login" exact={true} component={LoginScreen}></Route>
            <Route
              path="/find"
              exact={true}
              component={FindSpaceScreen}
            ></Route>
            <Route path="/posts/" component={CommentSreen}></Route>
            <Route path="/users/" component={ProfileScreen}></Route>
            <Route
              path="/register"
              exact={true}
              component={RegisterScreen}
            ></Route>
            <Route path="/search/" component={SearchScreen}></Route>
            <Route path="/statistic" component={StatisticScreen}></Route>
          </BrowserRouter>
        </div>
        <div
          className="footer sticky-bottom"
          id="footer"
          style={{ float: "bottom" }}
        >
          <footer className="footer-distributed">
            <div className="footer-left">
              <h3>
                Company<span>logo</span>
              </h3>
              <p className="footer-links"></p>
              <p className="footer-company-name">Company Name &copy; 2015</p>
            </div>
            <div className="footer-center">
              <div>
                <i className="fa fa-map-marker"></i>
                <p>
                  <span>21 Revolution Street</span> Paris, France
                </p>
              </div>
              <div>
                <i className="fa fa-phone"></i>
                <p>+1 555 123456</p>
              </div>
              <div>
                <i className="fa fa-envelope"></i>
                <p>
                  <a href="mailto:support@company.com">support@company.com</a>
                </p>
              </div>
            </div>
            <div className="footer-right">
              <p className="footer-company-about">
                <span>About the company</span>
                Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
                euismod convallis velit, eu auctor lacus vehicula sit amet.
              </p>
              <div className="footer-icons">
                <a href="#">
                  <i className="fa fa-facebook">
                    <i type="facebook" />
                  </i>
                </a>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="#">
                  <i className="fa fa-github"></i>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
