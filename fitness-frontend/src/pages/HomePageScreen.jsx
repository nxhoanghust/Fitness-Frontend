import React, { Component } from "react";
import "./dashboard.css";
import "./demo.css";
import "./footer-distributed-with-address-and-phones.css";
import "./homescreen.css";
import fitness5 from "../img/fitness5.jpg";
import fitness6 from "../img/fitness6.jpg";
import fitness7 from "../img/fitness7.jpg";
class HomePageScreen extends React.Component {
  render() {
    return (
      <div>
        <div className="DashBoard">
          <br></br>
          <br></br>
          <header>
            <div className="quote text-center mx-auto mt-2">
              <h2>Premium</h2>
              <p>
                Now, there are obviously tons of core exercises you can do, and
                you probably know a handful already. But if you're looking for
                some new ideas, we've got you covered. Sure, traditional core
                exercises, like mountain climbers, leg lifts, and planks, are
                great. They get the job done. However, I tend to get a little
                bored of doing the same things over and over again.
              </p>
            </div>
          </header>
        </div>
        <br />
        <div className="HomeScreen">
          <div className="body container-fluid">
            <div className="row intro-container" ref="foo3">
              <div className="col-6 image-intro">
                <img src={fitness7} className="img-fluid" alt="" />
              </div>
              <div className="col-6">
                <div className="content-intro">
                  <h4>Stay Motivated</h4>
                  <p>
                    An important key to being in shape is to set goals and keep
                    a positive mindset. If you stay positive, you will be able
                    to push yourself to get that fit body you've always wanted.
                    Powered by Examiners, the largest pool of knowledgeable and
                    passionate contributors in the world, we provide unique and
                    original content to enhance life in your local city wherever
                    that may be.
                  </p>
                </div>
              </div>
            </div>
            <div className="row intro-container-2" ref="foo2">
              <div className="col-6">
                <div className="content-intro-2">
                  <h4>Exercise Daily</h4>
                  <p>
                    Exercise daily for at least an hour. You do not have to kill
                    yourself from running, jogging, etc., but you should have
                    some sort of moderate physical activity in your everyday
                    life. If you're looking to shed a few pounds fast, do a
                    higher-level intensity workout. For example, go on a walk at
                    a brisk pace for an hour.
                  </p>
                </div>
              </div>
              <div className="col-6 image-intro">
                <img src={fitness5} className="img-fluid" alt="" />
              </div>
            </div>
            <br />
            <div className="row intro-container" ref="foo1">
              <div className="col-6 image-intro">
                <img src={fitness6} className="img-fluid" alt="" />
              </div>
              <div className="col-6">
                <div className="content-intro">
                  <h4>Be Sure to Get Sleep</h4>
                  <p>
                    Even though most of us have eight-hour jobs during the day
                    or night, it is crucial to get enough sleep to recharge the
                    body's batteries. Six to eight hours of sleep will keep the
                    body going throughout the day You should only nap for about
                    a half hour. This will prevent you from staying up later in
                    the night.
                  </p>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
          </div>
        </div>
        
      </div>
    );
  }
}

export default HomePageScreen;
