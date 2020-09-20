import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import { connect } from 'react-redux'

import {logout} from '../store/actions/userActions.js';
import { SearchBox } from "./activity/SearchBox.jsx";
import eventBus from "../services/event-bus-service.js";

export class _Header extends Component {
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
    const user = this.props.user;
    return (
      <div className="main-header-wrapper">
        <header className="main-header">
          <div className="left-end">
            <div className="logo">
              <NavLink to="/">
                <div className="logo-img">
                  <img src={require("../assets/img/logo.jpg")} />
                </div>
              </NavLink>
            </div>
            <div>
              <NavLink className="nav-override-color" to="/activity">Explore</NavLink>
            </div>
          </div>

          {!isHomePage && <SearchBox cssClass={"header-search"} />}

          {(!user) ? (
            <div className="right-end">
              <div>
                <NavLink className="nav-override-color" to={`/login`}>Login</NavLink>
                <NavLink className="nav-override-color" to={`/signUp`}>SignUp</NavLink>
              </div>
              <div>
                <NavLink className="nav-override-color" to={`/user`}><i className="far fa-2x fa-user-circle"></i></NavLink>
              </div>
            </div>) :
            <div className="right-end">
              <div>
                <div className = "cp" onClick={this.props.logout}>Logout</div>
              </div>
              <div>
          <NavLink className="nav-override-color" to={`/user`}><img className="attending-img cp" src={user.imgUrl} alt ="#"/></NavLink>
              </div>
            </div>
          }
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.loggedInUser
  }
}
const mapDispatchToProps = {
  logout
}

export const Header = connect(mapStateToProps, mapDispatchToProps )(_Header)