import { NavLink } from "react-router-dom";
import React, { Component } from "react";

import { SearchBox } from "./activity/SearchBox.jsx";
import eventBus from "../services/event-bus-service.js";

export class Header extends Component {
  state = {
    isHomePage: false,
  };

  unsubscribeHome;
  unsubscribeOutOfHome;

  componentDidMount() {
    this.unsubscribeHome = eventBus.on("homePage", () => {
      this.setState({ isHomePage: true }, console.log("im home"));
    });

    this.unsubscribeOutOfHome = eventBus.on("out of homePage", () => {
      this.setState({ isHomePage: false }, console.log("out of homePage"));
    });
  }

  componentWillUnmount() {
    this.unsubscribeHome();
    this.unsubscribeOutOfHome();
  }

  render() {
    const { isHomePage } = this.state;
    return (
      <header className="main-header">
        <div className="left-end">
          <div className="logo">
            <NavLink to="/">Logo</NavLink>
          </div>
          <div>
            <NavLink to="/activity">Explore</NavLink>
          </div>
        </div>

        {!isHomePage && <SearchBox cssClass={"header-search"} />}

        <div className="right-end">
          <div>
            <NavLink to={`/login`}>Login</NavLink>
            <NavLink to={`/signUp`}>SignUp</NavLink>
            <NavLink to={`/user`}>UserProfile</NavLink>
          </div>
        </div>
      </header>
    );
  }
}
