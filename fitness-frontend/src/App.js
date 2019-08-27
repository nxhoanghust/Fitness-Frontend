import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import HomePageScreen from "./pages/HomePageScreen";
import BlogScreen from "./pages/BlogScreen";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="ml-4">
            <a className="navbar-brand" href="/">
              mind<span style={{ color: "#e82d07" }}>X</span> Fitness
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
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/blogs">
                  Blogs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/login">
                  Sign In
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/register">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <BrowserRouter>
          <Route path="/login" exact={true} component={LoginScreen}></Route>
          <Route path="/" exact={true} component={HomePageScreen}></Route>
          <Route path="/blogs" exact={true} component={BlogScreen}></Route>
        </BrowserRouter>
        <footer className="page-footer font-small teal pt-4 footer color">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3 footer-b color">
                <h5 className="text-uppercase font-weight-bold">About Us</h5>
                <p className="small-text ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Expedita sapiente sint, nulla, nihil repudiandae commodi
                  voluptatibus corrupti animi sequi aliquid magnam debitis,
                  maxime quam recusandae harum esse fugiat. Itaque, culpa?
                </p>
              </div>

              <div className="col-md-6 mb-md-0 mb-3 footer-a color">
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
        </footer>
      </div>
    );
  }
}

export default App;
