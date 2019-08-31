import React, { Component } from "react";
import './dashboard.css';
import './demo.css'
import './footer-distributed-with-address-and-phones.css'
import './homescreen.css'
class HomePageScreen extends React.Component {
  render() {
    return <div>
      <div className="DashBoard">
        <br></br>
        <br></br>
        <header>
          <div className="quote text-center mx-auto mt-2">
            <h4>Premium</h4>
            <p>Now, there are obviously tons of core exercises you can do,
              and you probably know a handful already.
              But if you're looking for some new ideas, we've got you covered.
              Sure, traditional core exercises, like mountain climbers, leg lifts, and planks, are great.
              They get the job done. I, however, tend to get a little bored of doing the same things over and over again.
               Of course, consistency is a good thing, and also a great way to track your progress—but let's be honest, sometimes we all just need a new challenge to keep our fitness routines feeling fresh and exciting.</p>
          </div>
        </header>
      </div>
      <div className="HomeScreen">
        <div className="body container-fluid">
          <div className="row intro-container" ref='foo1'>
            <div className="col-6 image-intro">
              <img src='..img/menu-card.png' className="img-fluid" alt="" />
            </div>
            <div className="col-6">
              <div className="content-intro">
                <h4>Make your own healthy menu</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus congue, est a
                    interdum congue, lectus ligula varius est, et hendrerit sapien diam nec lacus.
                        Phasellus ullamcorper mauris id magna porta finibus. Nulla suscipit erat a ex posuere egestas.</p>
              </div>

            </div>
          </div>
          <div className="row intro-container-2" ref='foo2'>
            <div className="col-6">
              <div className="content-intro-2">
                <h4>Make your own healthy menu</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus congue, est a
                    interdum congue, lectus ligula varius est, et hendrerit sapien diam nec lacus.
                        Phasellus ullamcorper mauris id magna porta finibus. Nulla suscipit erat a ex posuere egestas.</p>
              </div>
            </div>
            <div className="col-6 image-intro">
              <img src='..img/menu-card.png' className="img-fluid" alt="" />
            </div>
          </div>

          <div className="row intro-container" ref='foo3'>
            <div className="col-6 image-intro">
              <img src='..img/menu-card.png' className="img-fluid" alt="" />
            </div>
            <div className="col-6">
              <div className="content-intro">
                <h4>Make your own healthy menu</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus congue, est a
                    interdum congue, lectus ligula varius est, et hendrerit sapien diam nec lacus.
                        Phasellus ullamcorper mauris id magna porta finibus. Nulla suscipit erat a ex posuere egestas.</p>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
      </div>
      <div className="footer">
        <footer className="footer-distributed">
          <div className="footer-left">
            <h3>Company<span>logo</span></h3>
            <p className="footer-links">
            </p>
            <p className="footer-company-name">Company Name &copy; 2015</p>
          </div>
          <div className="footer-center">
            <div>
              <i className="fa fa-map-marker"></i>
              <p><span>21 Revolution Street</span> Paris, France</p>
            </div>
            <div>
              <i className="fa fa-phone"></i>
              <p>+1 555 123456</p>
            </div>
            <div>
              <i className="fa fa-envelope"></i>
              <p><a href="mailto:support@company.com">support@company.com</a></p>
            </div>
          </div>
          <div className="footer-right">
            <p className="footer-company-about">
              <span>About the company</span>
              Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor
              lacus vehicula sit amet.
                </p>
            <div className="footer-icons">
              <a href="#"><i className="fa fa-facebook"><icon type="facebook"/></i></a>
              <a href="#"><i className="fa fa-twitter"></i></a>
              <a href="#"><i className="fa fa-linkedin"></i></a>
              <a href="#"><i className="fa fa-github"></i></a>

            </div>
          </div>
        </footer>
      </div>
    </div>;
  }
}

export default HomePageScreen;
