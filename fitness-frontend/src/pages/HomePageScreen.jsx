import React, { Component } from "react";
import "./dashboard.css";
import "./demo.css";
import "./footer-distributed-with-address-and-phones.css";
import "./homescreen.css";
class HomePageScreen extends React.Component {
  render() {
    return (
      <div>
        <div className="DashBoard">
          <br></br>
          <br></br>
          <header>
            <div className="quote text-center mx-auto mt-2">
              <h4>Premium</h4>
              <p>
                Now, there are obviously tons of core exercises you can do, and
                you probably know a handful already. But if you're looking for
                some new ideas, we've got you covered. Sure, traditional core
                exercises, like mountain climbers, leg lifts, and planks, are
                great. They get the job done. I, however, tend to get a little
                bored of doing the same things over and over again. Of course,
                consistency is a good thing, and also a great way to track your
                progress—but let's be honest.
              </p>
            </div>
          </header>
        </div>
        <div className="HomeScreen">
          <div className="body container-fluid">
            <div className="row intro-container" ref="foo1">
              <div className="col-6 image-intro">
                <img src="..img/menu-card.png" className="img-fluid" alt="" />
              </div>
              <div className="col-6">
                <div className="content-intro">
                  <h4>Make your own healthy menu</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus congue, est a interdum congue, lectus ligula varius
                    est, et hendrerit sapien diam nec lacus. Phasellus
                    ullamcorper mauris id magna porta finibus. Nulla suscipit
                    erat a ex posuere egestas.
                  </p>
                </div>
              </div>
            </div>
            <div className="row intro-container-2" ref="foo2">
              <div className="col-6">
                <div className="content-intro-2">
                  <h4>Make your own healthy menu</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus congue, est a interdum congue, lectus ligula varius
                    est, et hendrerit sapien diam nec lacus. Phasellus
                    ullamcorper mauris id magna porta finibus. Nulla suscipit
                    erat a ex posuere egestas.
                  </p>
                </div>
              </div>
              <div className="col-6 image-intro">
                <img src="..img/menu-card.png" className="img-fluid" alt="" />
              </div>
            </div>

            <div className="row intro-container" ref="foo3">
              <div className="col-6 image-intro">
                <img src="..img/menu-card.png" className="img-fluid" alt="" />
              </div>
              <div className="col-6">
                <div className="content-intro">
                  <h4>Make your own healthy menu</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus congue, est a interdum congue, lectus ligula varius
                    est, et hendrerit sapien diam nec lacus. Phasellus
                    ullamcorper mauris id magna porta finibus. Nulla suscipit
                    erat a ex posuere egestas.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}

export default HomePageScreen;
