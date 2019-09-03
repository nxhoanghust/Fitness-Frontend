import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import HomePageScreen from "./pages/HomePageScreen";
import BlogScreen from "./pages/BlogScreen";
import "./App.css";
import RegisterScreen from "./pages/RegisterScreen";
import { Menu, Dropdown, Icon, message, Layout } from "antd";
import CommentSreen from "./pages/CommentScreen";
import ProfileScreen from "./pages/ProfileScreen";
import FindSpaceScreen from "./pages/FindSpaceScreen";

const { Footer } = Layout;
class App extends React.Component {
  componentDidMount() {
    const email = window.localStorage.getItem("email");
    const fullName = window.localStorage.getItem("fullName");
    const id = window.localStorage.getItem("_id");
    const url = window.location.pathname.split("/");
    this.setState({
      active: url[1]
    });
    if (email && id) {
      fetch("http://localhost:3001/users/test", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          fullName: fullName,
          _id: id
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
  state = {
    active: "",
    currentUser: {
      email: "",
      fullName: "",
      _id: ""
    }
  };

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
  render() {
    console.log(this.state);
    return (
      <div id="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="ml-4">
            <a className="navbar-brand" href="/">
              Mindx-Fitness
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
                  this.state.active === "" ? "nav-item active" : "nav-item "
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
                  this.state.active === "find"
                    ? "nav-item active"
                    : "nav-item "
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
                    <a className="ant-dropdown-link" href="#">
                      Welcome {this.state.currentUser.fullName},
                      <Icon
                        type="down"
                        className="ml-1"
                        style={{ fontSize: "16px" }}
                      />
                    </a>
                  </Dropdown>
                </li>
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
          </div>
        </nav>
        <div className="content">
          <BrowserRouter>
            <Route path="/" exact={true} component={HomePageScreen}></Route>
            <Route path="/blogs" exact={true} component={BlogScreen}></Route>
            <Route path="/login" exact={true} component={LoginScreen}></Route>
            <Route path="/find" exact={true} component={FindSpaceScreen}></Route>
            <Route path="/posts/" component={CommentSreen}></Route>
            <Route path="/users/" component={ProfileScreen}></Route>
            <Route
              path="/register"
              exact={true}
              component={RegisterScreen}
            ></Route>
          </BrowserRouter>
        </div>
        {/*<div className=" font-small  footer color">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-6 mt-md-0 pt-3 pl-5 footer-b color">
                <h5 className="text-uppercase font-weight-bold">About Us</h5>
                <p className="small-text ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Expedita sapiente sint, nulla, nihil repudiandae commodi
                  voluptatibus corrupti animi sequi aliquid magnam debitis,
                  maxime quam recusandae harum esse fugiat. Itaque, culpa?
                </p>
              </div>

              <div className="col-md-6 mb-md-0 pt-3 pl-5 footer-a color">
                <h5 className="text-uppercase font-weight-bold ">
                  Contact Us:
                </h5>
                <p className="small-text ">
                  Email: mindx-fitness@gmail.com
                  <br />
                  Phone Number: 0123456789
                </p>
              </div>
            </div>
          </div>

          <div className="footer-copyright text-center py-3 color">
            © 2019 Copyright: Mindx-Fitness.com
          </div>
                </div>*/}
      </div>
    );
  }
}

export default App;
